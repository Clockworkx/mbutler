const Discord = require('discord.js');
const translator = require('custom-translate')
const fancyDictionary = require('../assets/json/fancy')
const moment = require('moment')

module.exports = {
	name: 'fancy',
	aliases: [],
	description: 'makes your text looks fancy.',
	uses_arguments: true,
	usage: '<text>',
	guild_only: false,
	cooldown: 5,
	//listed: 0,
	execute(message, arguments) {
		const date = moment()
		if (message.content.length > 2000) return message.channel.send('Maximum text size exceeded (2000)');

		fancied_message = translator.letterTrans(arguments.join(' '), fancyDictionary);
		message.channel.send(`${fancied_message}\n - ${message.author} ${date.format('dddd, MMMM Do YYYY, HH:mm:ss')}`);

		//const embed = new Discord.MessageEmbed()
		// .setAuthor(`@${message.author.tag}`)
		// .setThumbnail('https://i.imgur.com/wSTFkRM.png')
		// .addField(`Nachricht von ${message.member.user}`, fancied_message)
		// .addBlankField()
		// .addField('Nachricht', message.member.user)
		// .setColor('RANDOM')

		//message.channel.send(embed);
		
	},
};