const { Points } = require('../../dbObjects')
const Discord = require('discord.js');
 /**
 * @param {import('klasa').KlasaMessage} message
 */

const { Command } = require('klasa');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: 'Points',
            enabled: true,
            runIn: ['text', 'dm', 'group'],
            cooldown: 0,
            deletable: false,
            bucket: 1,
            aliases: ['punkte'],
            guarded: false,
            nsfw: false,
            permissionLevel: 0,
            requiredPermissions: [],
            requiredSettings: [],
            subcommands: true,
            description: 'turns text into ascii',
            quotedStringSupport: true, 
            usage: '<myPoints|list|give:default> [user:member] [points:int]',
            usageDelim: ' ',
            extendedHelp: 'No extended help available.'
        });

         
          
    }
    async give(message, [user, points]) {
        console.log(message.author.id)
        if (message.author.id !== '381550162973294602' && message.author.id !== '193676015623602176') return message.channel.send('Missing permission!')
        const UserPoints = await Points.findOne({
            where: { DiscordUserId: user.id } })
            .then()
            //console.log(UserPoints.Points)
            
            if (UserPoints) {
                points += UserPoints.Points
                await Points.update({ Points: points }, {
                    where: {
                      DiscordUserId: user.id
                    }
                  }).then(message.channel.send(`${user} has earned ${points} points💰`))
            }
            else{
                await Points.create({
                    DiscordUserId: user.id,
                    Points: points,
                }).then(Points => {
                    console.log('Points inserted for', Points)
                    message.channel.send(`You have earned ${points} points💰`)
                }).catch(error => console.log(error))

            }
    }

    async list(message, []) {
        const UserPoints = await Points.findAll({ order: [['Points', 'DESC']], limit: 10
            })
            
            const leaderboardEmbed = new Discord.MessageEmbed()
            .setTitle('Points Leaderboard')
            .setThumbnail('https://i.imgur.com/GTy1o5U.jpg')
            .setColor('RANDOM')
            for (let i = 0; i < UserPoints.length; i++) {
                const name = await (await this.client.users.fetch(UserPoints[i].DiscordUserId.toString()))//.toString()
                leaderboardEmbed.addField(`Rank ${i+1}`, `${name.username} \`\`Points: ${UserPoints[i].Points}💰\`\``)

            }

            return message.channel.send(leaderboardEmbed)
    }

    async myPoints(message, []) {
        await Points.findOne({
            where: { DiscordUserId: message.author.id } })
            .then(UserPoints => message.channel.send(`You have **${UserPoints.Points}** Points💰`))

    }


    async init() {
        /*
         * You can optionally define this method which will be run when the bot starts
         * (after login, so discord data is available via this.client)
         */
    }

};
