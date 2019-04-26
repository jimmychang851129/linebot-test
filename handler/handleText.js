/**
  * Text handler, all messages that are text are handled here
  */

const { LineHandler } = require('bottender')

exports.echoText = async context =>{
  	// b = 0x100079
    // await context.replyText("你說 : "+context.event.message.text)
    // await context.replyText('\u0010\u0000y')
    context.pushTemplate('if the list is not shown, please try cellphone or other devices', {
      type: 'buttons',
      thumbnailImageUrl: 'https://www.csie.ntu.edu.tw/~b04902092/linebot/engineer.jpg',
      imageSize: 'contain',
      title: '個人簡介',
      text: '可以問我以下問題><',
      actions: [
        {
          type: 'postback',
          label: '自我介紹',
          data: 'flowtype=intro&req=selfintro',
        },
        {
          type: 'postback',
          label: '擅長領域',
          data: 'flowtype=intro&req=strength',
        },
        {
          type: 'postback',
          label: '做過專案',
          data: 'flowtype=intro&req=project',
        },
        {
          type: 'postback',
          label: '為何申請Line',
          data: 'flowtype=intro&req=motivation',
        },
      ],
    });
}