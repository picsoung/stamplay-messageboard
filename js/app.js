/*
* UI effects and template init
*/
$('#tofocus').on('click', function(){ $('#console-input').focus()})
new WOW().init();

//Init mustache template for our user messages
var temp = $('#message-template').html();
Mustache.parse(temp); 
var urlRegExp = new RegExp(/(http:\/\/)|(https:\/\/)/gi)




/*
* STEP 2 INIT SDK AND GITHUB SIGNUP
* https://github.com/Stamplay/stamplay-js-sdk#user
*/
Stamplay.init("YOUR APP ID");
var user = new Stamplay.User().Model;
user.currentUser()
.then(function(){
  //let's check if the user is logged
  if(user.isLogged()) {
    $('#console-input').attr("disabled", false);
    $('#console-message').html("Post a message:");
    $('.guest-content').hide()
    $('.logged-content').show() 
  };
})

$('#login-button').on('click',function(){
  //Start Github Login OAuth flow
  user.login('github')
})



/*
* STEP 3 SAVE AND FETCH MESSAGES
* Listeners
*/
$('#console-input').keyup(function(e){
  if(e.keyCode == 13){
    if(!$('#console-input').val()==''){
      
      //stamplay sdk create custom obj
      var comment = $('#console-input').val();
      var message = new Stamplay.Cobject('message').Model
      message.set('comment', comment);      
      message.set('avatar', user.get('profileImg'));
      message.set('username', user.instance.identities.github._json.login);
      message.save();

      //clean console content
      $('#console-input').val('');
    }
  }
});

/*
* Fetch messages created so far 
*/
var feed = new Stamplay.Cobject('message').Collection;
  feed.fetch({page:1, per_page:100, sort: '-dt_create'}).then(function(){
  	feed.instance.forEach(function(elem){    		
  		var d = new Date(elem.instance.dt_create)
			elem.instance.date = d.toLocaleString('en-EN');

		  var rendered = Mustache.render(temp, elem.instance);
			$('#feed-stream').append(rendered);
		})    		
});




/*
* STEP 4.
* Pusher listeners
*/
var pusher = new Pusher('YOUR APP ID HERE');
var channel = pusher.subscribe('public');
channel.bind('message', function(data) {
	
  var d = new Date(data.dt_create)
  data.date = d.toLocaleString('en-EN');
  data.comment = data.comment.replace('&quot;', '"').replace('&#x27;',"'").replace('&lt;','<').replace('&gt;','>')

	var rendered = Mustache.render(temp, data);
	$('#feed-stream').prepend(rendered)
});
