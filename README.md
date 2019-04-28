# LineBot

## QRcode

you can interact with this linebot by scanning the below QRcode

![](https://i.imgur.com/8l9u1KWm.png)

## Example


![](https://i.imgur.com/J5JrLiam.png)

![](https://i.imgur.com/eltA2kom.png)


## Enviornment

Nodejs == 8.11.3

bottender: ^0.15.17

express: 4.16.4

linebot: 1.4.1

messaging-api-line": ^0.7.15

## Installation

### method 1 : heroku

1. Register a Line developer account, create a channel, and access the token and channel secret

2. execute following command

```
$ git clone https://github.com/jimmychang851129/linebot-test.git
$ cd linebot-test/
$ touch .env
$ Regsiter a channel(step 1) and write token and secret into .env file
$ run heroku in step3
// the server will occupy port 3000 or process.env.PORT
```

Sample .env file

```
Channel_token= '<your channel token>'
Channel_secret='<your channel secret>'
```

3. deploy code to heroku or run ngrok to obtain https url
    - if deployed to heroku, follow instruction from this [link](https://hackmd.io/p4cSSIgIS8irYGHuZkd-AA)

```
Since Line platform only supports webhooks which are accessible through
https, ngrok or heroku provides https access to our server.
you can either operate your server with ngrok or heroku to acquire a https
url. Paste this url to Line Channel webpage, to be more specific, webhook
field.
```

4. After obtain https url from step 3. Copy the url and paste it to the webhook field on line developer webpage

5. create a richmenu through postman, sorry for the inconvenience Orz. The image used is image/2.png, and the richmenu.json file is the richmenu format used. **richmenu_postrequest.json** provides sample post request to Line platform to create richmenu.

### method2 : Docker + ngrok

1. Same as above, register an account and acquire a channel, its secret, and token
2. install Docker, ngrok
3. run following command

```
$ git clone https://github.com/jimmychang851129/linebot-test.git
$ cd linebot-test/
$ create a .env file same as method1, paste the secret and token to the .env file
$ ./setup.sh             // create image
$ ./run.sh               // run container
$ ./ngrok http 3000     //connect port 3000 to ngrok server(since our container
by default connect to localhost through port 3000)
In run.sh you can decide which port to connect to container
Just make sure you assign the same port to both container and ngrok

Stop and remove the container
$ ./clean.sh

Remove the image
$ ./remove.sh
```

4. Paste the webhook obtained from ngrok to the webhook field in channel management webpage

5. create a richmenu through postman, sorry for the inconvenience Orz. The image used is image/2.png, and the richmenu.json file is the richmenu format used. **richmenu_postrequest.json** provides sample post request to Line platform to create richmenu.

6. FYI, to perceive the container, you can type following commands

```
$ docker exec -it roselia sh  // login to the container
$ docker logs roselia // see log output of the container
roselia is the name of the container, which is also my favorite band
```

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

- **richmenu_postrequest.json**

    Sample post request used to create richmenu, this file is exported from Postman.

## Feature

### High scalability

I think event driven programming is best suitted for linebot, so every message sent or button pushed is an event and can be handled by specific handler.

Code structure is simple. handler.js handle all the event and forward to specific handler.
To add a new handler to a new event, just register the handler in handler.js and create a new file running this new handler

### Users' requests storage

Store all the requests information. Not only can it make debug easier but detect malicious user as well.

### User friendly UI

Adopted richmenu and template message to help user make request to back-end server, so every request can be handled correctly

### Error handling

Using try, catch to identify where the error is, especially in responsing to Line platform. I place try, catch block in every response to the Line platform to help finding errors.

## Future work
1. Heroku MongoDB
2. test
3. other feature?
