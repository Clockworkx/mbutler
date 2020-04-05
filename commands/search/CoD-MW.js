
const answers = require('../../assets/json/8-ball')
//const cod = require('call-of-duty-api')
const { Command } = require('klasa');
const codAPI = require('call-of-duty-api')();
const Discord = require('discord.js')
const dateFns = require('date-fns')

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: 'cod',
            enabled: true,
            runIn: ['text', 'dm', 'group'],
            cooldown: 0,
            deletable: false,
            bucket: 1,
            aliases: ['mw'],
            guarded: false,
            nsfw: false,
            permissionLevel: 0,
            requiredPermissions: [],
            requiredSettings: [],
            subcommands: false,
            description: 'Display CoD Warzone stats',
            quotedStringSupport: true, 
            usage: '<psn|xbl|battle:default> <name:string>',
            usageDelim: ' ',
            extendedHelp: 'No extended help available.'
        });

         
          
    }
    async run(message, [platform, name]) {
        let playerData
        try {
            playerData = await codAPI.MWwz(name, codAPI.platforms[platform])
        }
        catch (err) {
            message.channel.send('User not found or wrong platform selected')
        }

        console.log(playerData)
        function getTimeString(minutes) {
            const fixedDate = new Date(0)
            return dateFns.formatDistance(fixedDate, dateFns.addSeconds(fixedDate, minutes))
        }
       
        const statsEmbed = new Discord.MessageEmbed()
        .setTitle(`Battle Royale Statistics for ${name}`)
        .setDescription(`**Level:** ***${playerData.Data.level}***\t**Platform:** ***${playerData.Data.platform}***`)
        .setColor('RANDOM')
        .setThumbnail(`https://www.callofduty.com/cdn/app/icons/mw/ranks/mp/icon_rank_${playerData.Data.level}.png`)
        .addField('Wins', playerData.br.wins, true)
        .addField('Top 5', playerData.br.topFive, true)
        .addField('Top 10', playerData.br.topTen, true)
        .addField('Top 25', playerData.br.topTwentyFive, true)
        .addField('Kills', playerData.br.kills, true)
        .addField('Deaths', playerData.br.deaths, true)
        .addField('K/D Ratio', playerData.br.kdRatio.toFixed(2), true)
        .addField('Downs', playerData.br.downs, true)
        .addField('Revives', playerData.br.revives, true)
        .addField('Avg. Life', getTimeString(playerData.br.timePlayed / playerData.br.gamesPlayed), true)
        .addField('Score', playerData.br.score, true)
        .addField('Score/min', playerData.br.scorePerMinute.toFixed(2), true)
        .addField('Score/game', playerData.br.score / playerData.br.gamesPlayed.toFixed(2), true)
        .addField('Contracts', playerData.br.contracts, true)
        .addField('Win %', playerData.br.wins / playerData.br.gamesPlayed, true)
    
    
        
        message.channel.send(statsEmbed)

    }
    
        

    async init() {
        /*
         * You can optionally define this method which will be run when the bot starts
         * (after login, so discord data is available via this.client)
         */
    }

};


