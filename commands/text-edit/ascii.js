const { Command } = require('discord.js-commando');
const ascii = require('ascii-art');

module.exports = class AsciiCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'ascii',
			group: 'text-edit',
			memberName: 'ascify',
            description: 'turns text into ascii',
            args: [
                {
                    key: 'text',
                    prompt: 'enter the text for ascii conversion',
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