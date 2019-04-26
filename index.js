const { LineBot } = require('bottender');
const { createServer } = require('bottender/express');
const { Line } = require('messaging-api-line');
const handler = require('./handler/handler.js')
const bot = new LineBot({
  // channelSecret: process.env.channelSecret, // 填上 Channel Secret
  // accessToken: process.env.accessToken // 填上 Access Token
  accessToken:"Rwf7gygc/VRYx2gZtKDC6Be//WtFaxFSsBnD/SKWN8jW9EMZh48xoZXgbFJatmsc52lt/Gv05yQyw11jM0BBlLLA1jucfkFkYqgjN66x4uJOXhMxSxgHoHlLVQp6tW3o85LJadpv60IhIir+4MRo4gdB04t89/1O/w1cDnyilFU=",
  channelSecret:"4dbdf03bc69dd166eed787ed2f5d04c9"
});

// LISTEN TO ALL THE EVENT
bot.onEvent(handler);


// Create Server
const server = createServer(bot);

server.listen(process.env.PORT||3000, () => {
  console.log('server is running on 3000 port...');
});