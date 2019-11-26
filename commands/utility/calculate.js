const math = require('mathjs');
const Discord = require('discord.js');

module.exports = {
	name: 'calc',
	aliases: ['latency', 'lag'],
	description: 'shows ping from you to the server and back to you.',
	uses_arguments: true,
	usage: '',
	guild_only: true,
	cooldown: 5,
	execute(message, arguments) {
		let response;
		try {
			response = math.evaluate(arguments.join(' '));

		} catch (e) {
			return message.channel.send('invalid calculation!');
		}

		const math_embed = new Discord.MessageEmbed()
		.setColor('RANDOM')
		.setTitle('Calculation')
		.addField('Input', `\`\`\`js\n${arguments.join('')}\`\`\``)
		.addField('Output', `\`\`\`${response}\`\`\``)

		message.channel.send(math_embed);
        
	},
};