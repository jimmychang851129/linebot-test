const { LineBot } = require('Bottender');
const { createServer } = require('Bottender/express');
const { Line } = require('messaging-api-line');

const bot = new LineBot({
  // channelSecret: process.env.channelSecret, // 填上 Channel Secret
  // accessToken: process.env.accessToken // 填上 Access Token
  accessToken:"8zDmb+NjnZa028+aNoTiMbF3yzmt1PuqsRDnkcEGzRADz2nDAdRg0L+mVMoebm/+52lt/Gv05yQyw11jM0BBlLLA1jucfkFkYqgjN66x4uJHnOVIKwLOztU4nLz9eEr2oQ/IyY8Q7PyZGFeva0gZ/AdB04t89/1O/w1cDnyilFU=",
  channelSecret:"4dbdf03bc69dd166eed787ed2f5d04c9"
});
  
// bot.onEvent(async context => {
//   await context.sendText('Hello World');
// });

bot.onEvent(async context => {
  console.log("context = ",context);
  if (context.event.isFollow) {
    await context.sendText('妳好，我是張均銘');
  } 
  else if (context.event.isText) {
    await context.replyText("你說 : "+context.text)
  } 
  else {
    await context.sendText('看不懂OAO');
  }
});

const server = createServer(bot);
  
server.listen(process.env.PORT||3000, () => {
  console.log('server is running on 3000 port...');
});

// const server = express();

// server.use(bodyParser.json({
//     verify: (req, res, buf) => {
//         req.rawBody = buf.toString();
//     },
// }));