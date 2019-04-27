/**
  * handle Sticker requests, send random Sticker to the user
  */

const { LineHandler } = require('bottender')

const LinepackageID = '11537'
const LineStickerList = ['52002744','52002749','52002770','52002749']

function RandomSticker(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

exports.resSticker = async context =>{
	sticker = {
		packageId: LinepackageID,
		stickerId: LineStickerList[RandomSticker(0,4)]
	}
	context.replySticker(sticker);
}