const { Command } = require('discord.js-commando');

module.exports = class MeowCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'blank',
			group: 'admin',
			memberName: 'meow',
            description: 'Replies with a meow, kitty cat.',
            ownerOnly: true,
            hidden: true,
            args: [
                {
                    key: 'text',
                    prompt: 'texttt',
                    type: 'string',
                },
            ],
		});
	}

	run(message, { text }) {
		return message.say(text);
	}
};