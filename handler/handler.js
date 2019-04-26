/**
 * Receive all the events and distribute these events to a specific handler
 * can be thought as a center receiving events and distributing them to a specific handler
 */
const { LineHandler } = require('bottender')
const queryString = require('query-string')
const handleIntroduction = require('./handleIntro.js')
var handleText = require('./handleText.js')

const isIntroduction = context => {
  const {event} = context
  if (event.isPostback) {
      console.log('postback:',JSON.stringify(event.postback))
      event.postback['query'] = queryString.parse(event.postback.data)
      console.log('postback.query:', event.postback.query)
    if (event.postback.query && event.postback.query.flowtype === 'intro'){
      return true
    }
  }
  return false
}

const SendIntroList = context => {
    context.pushTemplate('if the list is not shown, please update your line to LINE 6.7.0 or later version', {
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

// handler that receive all events and distribute it to handler that is in charge
module.exports = new LineHandler()
  .onText(context =>{
    handleText.echoText(context)
  })
  .onFollow(SendIntroList)
  .on(isIntroduction,handleIntroduction)  // not yet test
  .onEvent(context => {
    console.log('Uncaught event:', context.event.rawEvent)
  })
  .build()