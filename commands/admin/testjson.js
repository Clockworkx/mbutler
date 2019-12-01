const { Command } = require('discord.js-commando');
const accounts = require('../../assets/json/test');

module.exports = class TestJsonCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'test',
			group: 'admin',
			memberName: 'test',
            description: 'Replies with a meow, kitty cat.',
            ownerOnly: true,
            hidden: false,
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
        message.say(accounts['accounts'][0]['name'])
		for (let index = 0; index < accounts['accounts'].length; index++) {
            if (accounts['accounts'][index]['used'] === false){
                message.say(`name: ${accounts['accounts'][index]['name']} password:${accounts['accounts'][index]['password']} `)
                accounts['accounts'][index]['used'] = true;
                return;
            }
        }
    }
};