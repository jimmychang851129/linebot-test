/**
  *  introduction handler
  *  all the message, request, events related to introduction are handled by these handler
  */

const { LineHandler } = require('bottender')
const fs = require('fs')
const textDIR = "./handler/response/"

const isSelfIntro = context => {
  const {event} = context
  if (event.postback.query.req && event.postback.query.req === 'selfintro'){ 
    return true
  }
  return false
}

// send introduction message to client
const handleSelfIntro = context => { 
  data = fs.readFileSync(textDIR+'selfintro.txt')
  context.replyText(data.toString())
}

const isStrength = context => {
  const {event} = context
  if (event.postback.query.req && event.postback.query.req === 'strength'){ 
    return true
  }
  return false
}

// send strength message to user
const handleStrength = context => {
  data = fs.readFileSync(textDIR+'strength.txt')
  context.replyText(data.toString())
}

const isProject = context => {
  const {event} = context
  if (event.postback.query.req && event.postback.query.req === 'project'){
      return true
  }
  return false
}

// send project message to user
const handleProject = context => {
  data = fs.readFileSync(textDIR+'project.txt')
  context.replyText(data.toString())
}

const isMotivation = context =>{
  const {event} = context
  if(event.postback.query.req && event.postback.query.req == 'motivation'){ 
    return true
  }
  return false
}

// send motivation message to user
const handleMotivation = context =>{
  var data = fs.readFileSync(textDIR+'motivation.txt')
  context.replyText(data.toString())
}

// create a handler to handle introduction event
module.exports = new LineHandler()
  .on(isSelfIntro,handleSelfIntro)
  .on(isStrength, handleStrength)
  .on(isProject, handleProject)
  .on(isMotivation, handleMotivation)
  .onEvent(context => console.log('Uncaught event:', context.event.rawEvent))
  .build()