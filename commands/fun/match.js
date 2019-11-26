const { Command } = require('discord.js-commando');

module.exports = class LoveCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'love',
			group: 'fun',
			memberName: 'love',
			description: 'Calculates love between two users',
			aliases: ['match', 'fit'],
            args: [
                {
                    key: 'user1',
                    prompt: 'enter the first user e.g. @user',
					type: 'user',
				},
				{
                    key: 'user2',
                    prompt: 'enter the second user e.g. @user',
					type: 'user',
                },
            ],
		});
	}

	run(message, { user1, user2 }) {
		return message.say(`There's ${Math.floor((Math.random() * 100))}% love between ${user1} and ${user2}`);
	}
};