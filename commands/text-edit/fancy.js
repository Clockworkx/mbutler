const { Command } = require('discord.js-commando');
const translator = require('custom-translate')
const fancyDictionary = require('../../assets/json/fancy')
const moment = require('moment')

module.exports = class FancyCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'fancy',
			group: 'text-edit',
			memberName: 'fancify',
            description: 'makes text look fancy',
            args: [
                {
                    key: 'text',
                    prompt: 'Enter the text to be fancified',
					type: 'string',
					validate: text => text.length < 2000
                },
            ],
		});
	}

	run(message, { text }) {
		const date = moment()

		let fancied_message = translator.letterTrans(text, fancyDictionary);
		message.say(`${fancied_message}\n - ${message.author} ${date.format('dddd, MMMM Do YYYY, HH:mm:ss')}`);
	}
};