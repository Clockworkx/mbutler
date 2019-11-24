const Discord = require('discord.js');
const translator = require('custom-translate')
const fancyDictionary = require('../assets/json/fancy')

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
		if (message.content.length > 2000) return message.channel.send('Maximum text size exceeded (2000)');

		fancied_message = translator.letterTrans(message.content, fancyDictionary);
		message.channel.send(fancied_message);

	},
};