const Discord = require('discord.js');
module.exports = {
	name: 'role_edit',
	aliases: [''],
	description: `Gives you your or another person's id and discord name`,
	uses_arguments: false,
	usage: '<user> can be left out to get your user info',
	guild_only: true,
	cooldown: 5,
	execute(message, arguments) {
		message.channel.fetchMessage('626583570550358017').then(msg => {
			const received_embed = msg.embeds[0];
			const edited_embed = new Discord.RichEmbed(received_embed).
			setDescription(`Reagiere mit dem entsprechenden emoji um deine Klassen auszuwählen\n`+
			//`${received_embed.description}\n`+
			`<:Priester:626434117038374912> - Priester\n` +
			`<:Seelenfessler:626434116803362836> - Seelenfessler\n` +
			`<:Runenfechter:626434116740710431> - Runenfechter\n` +
			`<:Schlaeger:626434116660887554> - Schläger\n` +
			`<:Magier:626434116866408449> - Magier\n` +
			`<:Assassine:626434116497440780> - Assassine\n` +
			`<:Kanonier:626434116862345226> - Kanonier\n` +
			`<:Bogenschuetze:626432685627277361> - Bogenschütze\n` +
			`<:Berserker:626434116845568040> - Berserker\n` +
			`<:Bandit:626434116866408448> - Bandit\n` +
			`<:Ritter:626434116669276191> - Ritter\n\n`+
			`Lust mit anderen Maplern andere Spiele zu spielen? reagiere mit\n`+
			`<:lol:632977206242443335> - League of Legends\n`+
			`<a:minecraft:632976785792958483> - Minecraft\n`+
			`<:rubiks:632977276392177674> - Social Games (Spiele wie scribble.io, Monopoly und der gleichen)\n`
			);
			//message.channel.send(edited_embed);
			msg.edit(edited_embed);
			console.log(msg);
			//msg.channel.send(old_message);
			 })

	},
};