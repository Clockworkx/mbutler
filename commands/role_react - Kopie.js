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
		message.channel.fetchMessage('626583570550358017').then(msg => {
			
			const rollen_embed_message = msg.embeds.find(msg => msg.title === 'Server Rollen');
			const edited_embed = new Discord.RichEmbed(rollen_embed_message);
			if(rollen_embed_message)
			{
				 rollen_embed_message.message.react('632977206242443335')
				.then(reaction => reaction.message.react('632976785792958483'))
				.then(reaction => reaction.message.react('632977276392177674'))
				.catch(err => console.error);
			}
		})
	},
};
		