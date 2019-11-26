const { Command } = require('discord.js-commando');
const ascii = require('ascii-art');

module.exports = class MeowwCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'test',
			group: 'text-edit',
			memberName: 'ascify',
            description: 'turns text into ascii',
            args: [
                {
                    key: 'text',
                    prompt: 'enter text to turn into ascii',
                    type: 'string',
                    infinite: true,
                },
            ],
		});
	}

	run(message, { text }) {
        let full_text = text.join(' ');

		ascii.font(full_text, 'Doom', (error, rendered) => {
            if (error) throw error;

            rendered = rendered.trimRight();
            if (rendered.length > 2000) return message.channel.send('Message is too long!');

            message.channel.send(rendered, {
                code: 'md'
            });
        });
	}
};