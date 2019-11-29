const { Command } = require('discord.js-commando');
const answers = require('../../assets/json/8-ball')

module.exports = class EightBallCommand extends Command {
	constructor(client) {
		super(client, {
			name: '8-ball',
			group: 'fun',
			memberName: '8-ball',
            description: 'consult 8-ball',
            args: [
                {
                    key: 'question',
                    prompt: 'Your question for the 8-ball?',
                    type: 'string',
                },
            ],
		});
	}

	run(message, { question }) {
        return message.say(`${question} 🎱 ${answers[Math.floor(Math.random() * answers.length)]} 🎱`);
	}
};