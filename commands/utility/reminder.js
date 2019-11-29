const { Command } = require('discord.js-commando');

module.exports = class ReminderCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'reminder',
			group: 'utility',
			memberName: 'Reminder',
            description: 'reminds you',
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