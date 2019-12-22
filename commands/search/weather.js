const weather = require('weather-js');
const Discord = require('discord.js');

 /**
 * @param {import('klasa').KlasaMessage} message
 */

const { Command } = require('klasa');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: 'weather',
            enabled: true,
            runIn: ['text', 'dm', 'group'],
            cooldown: 0,
            deletable: false,
            bucket: 1,
            aliases: [''],
            guarded: false,
            nsfw: false,
            permissionLevel: 0,
            requiredPermissions: [],
            requiredSettings: [],
            subcommands: false,
            extendedHelp: 'Enter the location, e.g. "San Francisco, CA',
            description: 'get weather information for your city/country/apache helicopter',
            quotedStringSupport: true, 
            usage: '<location:string>',
            usageDelim: '',
            extendedHelp: 'No extended help available.'
        });

         
          
    }
    async run(message, [location]) {
        weather.find({search: location, degreeType: 'C'}, function(err, result){
            if (err) message.channel.send(err)

            if (result === undefined || result.length === 0 ){
                message.channel.send(`**invalid location**`)
                return;
            }

            var current = result[0].current // current part of json object
            var location = result[0].location

            const weather_embed = new Discord.MessageEmbed()
            .setDescription(`**${current.skytext}**`) 
            .setAuthor(`Weather for ${current.observationpoint}`) 
            .setThumbnail(current.imageUrl) 
            .setColor('RANDOM') 
            .addField('Timezone', `UTC ${location.timezone}`, true)
            .addField('Time',`${current.observationtime}`, true) 
            .addField('Day/Date',`${current.day}, ${current.date}`, true)  
            .addField('Temperature',`${current.temperature} degrees ${location.degreetype}`, true)
            .addField('Feels Like', `${current.feelslike} degrees ${location.degreetype}`, true)
            .addField('Winds',current.winddisplay, true)
            .addField('Humidity', `${current.humidity}%`, true)
            .setTimestamp()

           

            message.channel.send(weather_embed);
        });
    }

    async init() {
        /*
         * You can optionally define this method which will be run when the bot starts
         * (after login, so discord data is available via this.client)
         */
    }

};
