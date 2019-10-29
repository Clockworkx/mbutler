const Discord = require('discord.js');
module.exports = {
	name: 'role_react',
	aliases: [''],
	description: `Gives you your or another person's id and discord name`,
	uses_arguments: false,
	usage: '<user> can be left out to get your user info',
	guild_only: true,
	cooldown: 5,
	execute(message, arguments) {
		message.channel.messages.fetch('638265593090408449').then(msg => { msg.react('638263898880868353')
				
				.catch(err => console.error);
			}
		)
	},
};
		