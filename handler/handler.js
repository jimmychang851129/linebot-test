/**
 * Receive all the events and distribute these events to a specific handler
 * can be thought as a center receiving events and distributing them to a specific handler
 */

const { LineHandler } = require('bottender')
const queryString = require('query-string')
const handleIntroduction = require('./handleIntro.js')
var handleText = require('./handleText.js')
var handleSticker = require('./handleSticker.js')

const isIntroduction = context => {
  const {event,session} = context
  if (event.isPostback) {
      event.postback['query'] = queryString.parse(event.postback.data)
    if (event.postback.query && event.postback.query.flowtype === 'intro'){
      console.log("user : ",session,", request: postback, query: ",event.postback.query," info : ",event)
      return true
    }
  }
  return false
}

const isSticker = context =>{
  const {event,session} = context
  console.log("user : ",session,", request: Sticker, info : ",event)
  return event.isSticker
}

const SendIntroList = async context => {
    const {event,session} = context
    console.log("user : ",session,", request: follow, info : ",event)
    try{
      await context.pushTemplate('The flux message can only be shown in mobile phone, please use your smart phone instead. Sorry for the inconvenience', {
      type: 'buttons',
      thumbnailImageUrl: 'https://www.csie.ntu.edu.tw/~b04902092/linebot/engineer.jpg',
      imageSize: 'contain',
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
    console.log("handler.js-> SendIntroList error, error = ",error)
  }
}

// handler that receive all events and distribute it to handler that is in charge
module.exports = new LineHandler()
  .onText(context =>{
    const {event,session} = context
    console.log("user : ",session,", request: Text, info : ",event)
    handleText.resText(context)
  })
  .on(isSticker,context =>{
    handleSticker.resSticker(context)
  })
  .onFollow(SendIntroList)
  .onJoin(SendIntroList)
  .on(isIntroduction,handleIntroduction)
  .onEvent(context => {
    console.log('Uncaught event:', context.event.rawEvent)
  })
  .build()