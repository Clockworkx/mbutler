const ascii = require('ascii-art');

module.exports = {
	name: 'ascii',
	aliases: ['latency', 'lag'],
	description: 'shows ping from you to the server and back to you.',
	uses_arguments: false,
	usage: '',
	guild_only: true,
	cooldown: 5,
	execute(message, arguments) {
        ascii.font(arguments.join(' '), 'Doom', function(rendered){ 
            rendered = rendered.trimRight(); // remove whitespaces right side from string

            if (rendered.length > 2000) return message.channel.send('Message is too long!');

            message.channel.send(rendered, {
                code: 'md'
            });
        });
	},
};