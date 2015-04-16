# Speedhack-realtime-message-board
A realtime message board powered by Stamplay for [http://speedhack.io](speedhack.io)

![Speedhack](https://speedhack.stamplayapp.com/img/email_header.png "Speedhack")

Welcome to the Stamplay Speedhack Challenge. Use Stamplay to quickly build a full featured realtime message board in 15 minutes. The challenge is splitted into parts which require the implementation of user stories (user can signup and login, user publishes a new messages, UI updates in realtime). 

Expected outcome:
* Fail: The app deployed isn’t working properly.
* Pass: The app deployed does let users post a message. There are some bonus sub-challenges included in the project. The more bonus sub-challenges completed the better the ranking for the team!

At [Stamplay](https://stamplay.com) we love events where the hacker ethos of developers spread all over the place. This events cultivate communities where aspiring hackers have the opportunity to learn, build, and share their creations with the world. This is a realtime message board built with Stamplay and Pusher with client-side only code.

In this app users can signup with Github and leave a message on the board that gets updated in realtime. 
Here is what you will get: [https://speedhack.stamplayapp.com](speedhack.stamplayapp.com)

-----------------------
## Requirements / Resources

* Sign up for a [free account](http://editor.stamplay.com/apps) on Stamplay.
* A Github account
* NPM installed
* Stamplay [https://stamplay.com/docs/rest-api](REST API Reference)

-----------------------
## 1. When a user signup, send him a welcome email

* Create a new app on Stamplay
* Add "Email" component
* Create a task to send a welcome email saying "welcome to the speedhack" to new registered users
* Create a new USER via API (email: speedhack-[teamname]@stamplay.com, password: "speedhackrocks")
* We'll get the email by your team if you succeed with this


-----------------------
## 2. Setup Github login, deploy frontend

![Github OAuth](http://speedhack.stamplayapp.com/img/github_screenshot.png "Github OAuth")

* Enable Github signup for users
	* Create a Github app [https://github.com/settings/applications](https://github.com/settings/applications)
	* Fill the "Authorized Redirect URIs" with this URL **https://[YOURAPPID].stamplayapp.com/auth/v0/github/callback**
* Install stamplay command line tool ```npm install -g stamplay cli```
* Init the project and copy all the frontend assets from this project
* Open app.js, find the Stamplay JS SDK initialization and edit it so that it works with your app
* Deploy frontend with Stamplay command line tool [https://stamplay.com/docs/hosting](https://stamplay.com/docs/hosting)


-----------------------
## 3. Using custom objects define the data model **Message** defined as follows:

* Name: `comment`, Type: `string`, required, the question’s title
* Name: `avatar`, Type: `string`, required, the question’s body
* Name: `username`, Type: `string`, required, the question’s body

After completing this Stamplay will instantly expose REST APIs for our new resources at this URL: `https://APPID.stamplayapp.com/api/cobject/v0/message`

* Create a new Message via API with the following data:  {comment:"speedhack rocks", avatar:"https://speedhack.stamplayapp.com/img/logo-robot.jpg", username:"speedhack"}


-----------------------
## 4. Add realtime update connecting Pusher

* Go on pusher, login (user: speedhack@stamplay.com pwd:1234567890) and create a new app for your team
* On Stamplay add Pusher component and configure it with copying and pasting the app_id, key, secret from your Pusher app
* Create a task that sends a realtime notification with pusher every time a new message is created

```	
		channel: public
		event: message
		Data:
			username | {{coinstance.username}}
			avatar | {{coinstance.avatar}}
			comment | {{coinstance.comment}}
			dt_create | {{coinstance.dt_create}}
```

* Open app.js and setup pusher to work with your app
* Deploy again your frontend
* Check if you're UI is updating in realtime after a new message get published

You're all set, congrats!

