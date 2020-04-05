const math = require('mathjs');
const Discord = require('discord.js');
const { Command } = require('klasa');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: 'calculate',
            enabled: true,
            runIn: ['text', 'dm', 'group'],
            cooldown: 0,
            deletable: false,
            bucket: 1,
            aliases: [''],
            guarded: false,
            nsfw: false,
            permissionLevel: 0,
            requiredPermissions: [],
            requiredSettings: [],
            subcommands: false,
            description: 'Evaluates mathematical expressions',
            quotedStringSupport: true, 
            usage: '<expression:string>',
            usageDelim: '',
            extendedHelp: 'No extended help available.'
        });

         
          
    }
    async run(message, [expression]) {
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

    async init() {
        /*
         * You can optionally define this method which will be run when the bot starts
         * (after login, so discord data is available via this.client)
         */
    }

};

