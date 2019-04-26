/**
  *  introduction handler
  *  all the message, request, events related to introduction are handled by these handler
  */

const { LineHandler } = require('bottender')
const fs = require('fs')
const isSelfIntro = context => {
  console.log("in selfintro context = ",context)
  const {event} = context
  if (event.postback.query.req && event.postback.query.req === 'selfintro') return true
  return false
}

// unfinished
const handleSelfIntro = context => { 
  data = fs.readFileSync('./handler/selfintro.txt')
  context.replyText(data.toString())
}

const isStrength = context => {
  const {event} = context
  if (event.postback.query.req && event.postback.query.req === 'strength') return true
  return false
}

// unfinished
const handleStrength = context => {
  data = fs.readFileSync('./handler/strength.txt')
  console.log("data = ",data)
  context.replyText(data.toString())
}

const isProject = context => {
  const {event} = context
  if (event.postback.query.req && event.postback.query.req === 'project') return true
  return false
}

// unfinished
const handleProject = context => {
  data = fs.readFileSync('./handler/project.txt')
  console.log("data = ",data)
  context.replyText(data.toString())
}

const isMotivation = context =>{
  const {event} = context
  if(event.postback.query.req && event.postback.query.req == 'motivation') return true
  return false
}

const handleMotivation = context =>{
  var data = fs.readFileSync('./handler/motivation.txt')
  context.replyText(data.toString())
}

module.exports = new LineHandler()
  .on(isSelfIntro,handleSelfIntro)
  .on(isStrength, handleStrength)
  .on(isProject, handleProject)
  .on(isMotivation, handleMotivation)
  .onEvent(context => console.log('Uncaught event:', context.event.rawEvent))
  .build()