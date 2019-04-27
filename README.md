# LineBot

## QRcode

you can interact with this linebot by scanning the below QRcode

![](https://i.imgur.com/8l9u1KW.png)

## Example

## Enviornment

Nodejs == 8.11.3
bottender: ^0.15.17
express: 4.16.4
linebot: 1.4.1
messaging-api-line": ^0.7.15

## Installation

1. Register a Line developer account and create a channel

2. Install Nodejs and npm first

```
$ git clone https://github.com/jimmychang851129/linebot-test.git
$ cd linebot-test/
$ npm i
$ touch .env
$ Regsiter a channel and write token and secret into .env file
$ node index.js > user.log     // save the output to user.log
```
Sample .env file

```
Channel_token= '<your channel token>'
Channel_secret='<your channel secret>'
```

3. heroku or ngrok to obtain https url

Since Line platform only supports webhooks which are accessible through https, ngrok or heroku is required to provide a https access to our server.
you can either operate your server with ngrok or heroku to acquire a https url. Paste this url to Line Channel webpage, to be more specific, webhook field.

## Code Structure

Structure of this project is provided in [here](https://www.csie.ntu.edu.tw/~b04902092/linebot/LineBotBorn.pdf)

- **index.js**
    
    the entry code of this server, Specifying the port to which server is listening and forwarding all event to handler.js

- **handler/handler.js**
    
    Received events from the server and forward the request to the registered handler that is in charge of that event.

- **handler/handlerIntro.js**
    
    Handle introduction-relted events and send corresponding response to the client

- **handler/handleText.js**

    Handle message-related events and send corresponding response to the client

- **handler/handleSticker.js**

	Handle Sticker-related events and send corresponding response to the client

- **richmenu.json**

    my richmenu, you can create it by sending post request to the Line platform, [here is the document](https://developers.line.biz/en/docs/messaging-api/using-rich-menus/#create-a-rich-menu)

## Feature

### Event-driven programming

Every button pushed or every message sent are events, and events are handled by code. For me, I think this is the way line bot works: perceving all the actions as events and assigned them to handlers.

### high scalability

Code structure is simple. handler.js handle all the event and forward to specific handler.
To add a new handler to a new event, just register the handler in handler.js and create a new file running this new handler

### Users' requests 

Store all the requests information. Not only can it make debug easier but detect malicious user as well.

## Future work
1. Docker
2. Heroku MongoDB
3. other feature?
4. test
