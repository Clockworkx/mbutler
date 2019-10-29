const weather = require('weather-js');
const Discord = require('discord.js');

module.exports = {
	name: 'weather',
	aliases: [],
	description: 'get weather info for your city:',
	uses_arguments: true,
	usage: '<city or zipcode>',
	guild_only: true,
	cooldown: 5,
	execute(message, arguments) {
        weather.find({search: arguments.join(" "), degreeType: 'C'}, function(err, result){
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
    },
};