/**
  * Text handler, all messages that are text are handled here
  */

const { LineHandler } = require('bottender')

function RandomNum() {
  min = Math.ceil(1);
  max = Math.floor(5);
  var output = Math.floor(Math.random() * (max - min)) + min
  return output.toString()+'.jpeg'
}

exports.resText = async context =>{
    // send the template message when the text includes intro
    const data = context.event.message.text;
    // send the ppt if the text contains LineBot的誕生
    if(data.includes("How LineBot is created")){
      try{
        await context.replyText("Slides : https://www.csie.ntu.edu.tw/~b04902092/linebot/LineBotBorn.pdf")
      }
      catch(error){
        console.log("handleText.js-> resText error(LineBot born), error = ",error)
      }
    }
    else{
      try{
        await context.pushTemplate('The flux message can only be shown in mobile phone, please use your smart phone instead. Sorry for the inconvenience', {
          type: 'buttons',
          thumbnailImageUrl: 'https://www.csie.ntu.edu.tw/~b04902092/linebot/'+RandomNum(),
          imageSize: 'cover',
          title: 'Introduction',
          text: 'Hello I am bot licon. You can ask me following questions.',
          actions: [
            {
              type: 'postback',
              label: 'Self-intro',
              data: 'flowtype=intro&req=selfintro',
            },
            {
              type: 'postback',
              label: 'Personality',
              data: 'flowtype=intro&req=strength',
            },
            {
              type: 'postback',
              label: 'Projects',
              data: 'flowtype=intro&req=project',
            },
            {
              type: 'postback',
              label: 'Why Line?',
              data: 'flowtype=intro&req=motivation',
            },
          ],
        });
      } 
      catch(error){
        console.log("handleText.js-> resText error, error = ",error)
      }
    }
}