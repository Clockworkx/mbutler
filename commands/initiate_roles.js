const Discord = require('discord.js');

module.exports = {
	name: 'initiate_roles',
	aliases: [],
	description: 'admin command to print out configured roles for the role reaction system',
	uses_arguments: false,
	usage: '',
	guild_only: true,
	cooldown: 5,
	//listed: 0,
	execute(message, arguments) {
	
		const rollen_embed = new Discord.MessageEmbed()
	   .setColor('#0099ff')
	   .setTitle('Server Rollen')
	   .setDescription(`React with the correct emoji to get your server roles.\n`+
	   `<:LeagueOfLegends:638257644292931589> - League of Legends\n` +
	   `<:CSGO:638254615535681539> - Counter Strike:Global Offensive\n` +
		`<:RocketLeague:638254640722477056> - Rocket League\n` +
		`<:TheDivision2:638254650469908490> - The Division 2\n` +
		`<a:RainbowSixSiege:638254624695910410> - Rainbow Six Siege\n`+
		`<:ApexLegends:638263898880868353> - Apex Legends\n`
		);
		message.channel.send(rollen_embed);
	},
};