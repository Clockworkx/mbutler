const Discord = require('discord.js')
const schedule = require('node-schedule');
const RichDisplay = require('klasa')
const { addSeconds } = require('date-fns')
const fetch = require('node-fetch')
const { isUnit, generate_pages, display_page, decodeHtml, shuffleArray } = require('../util/util')
const emojiCharacters = require('../util/emojiCharacters');
const { Points } = require('../dbObjects');
const { n } = require('../util/emojiCharacters');

 
module.exports = {
    ChannelStatusUpdate: function (oldState, newState) {
          if (newState.channelID === oldState.channelID) return

          if (newState.channelID === '626243698992218136' || oldState.channelID === '626243698992218136'){
              console.log('works')
              if (newState.channelID === null) {
                    oldState.channel.edit({ name: `Among Us ${oldState.channel.members.size}` })
                    .then(t => console.log('channel changed to', t.name))
                    .catch(e => console.log('error in null', e))
              }                                     
              if (newState.channelID === '626243698992218136') {
                  newState.channel.edit({ name: `Among Us ${newState.channel.members.size}` })
                  .then(t => console.log('channel changed to', t.name))
                  .catch(e => console.log('error in null', e))
              }          
       }
    } 
}
//console.log('new state equals channelid')
                // console.log(newState.channel.members.size)
                // console.log('old',oldState.channelID,'new', newState.channelID)
                // console.log('channel', newState.channel)
