const math = require('mathjs');
const Discord = require('discord.js');
const { Command } = require('discord.js-commando');

module.exports = class CalculateCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'calculate',
			aliases: ['calc'],
			group: 'utility',
			memberName: 'calculate',
            description: 'calculates expressions',
            args: [
                {
                    key: 'expression',
                    prompt: 'Enter expression',
                    type: 'string',
                },
            ],
		});
	}

	run(message, { expression }) {
		let response;
		try {
			response = math.evaluate(expression);

		} catch (e) {
			return message.channel.send('invalid calculation!');
		}

		const math_embed = new Discord.MessageEmbed()
		.setColor('RANDOM')
		.setTitle('Calculation')
		.addField('Input', `\`\`\`\n${expression}\`\`\``)
		.addField('Output', `\`\`\`${response}\`\`\``)

		return message.channel.send(math_embed);
	}
};