const Discord = require('discord.js');

module.exports = {
	name: 'afk',
	aliases: [],
	description: 'admin command to print out configured roles for the role reaction system',
	uses_arguments: false,
	usage: '',
	guild_only: true,
	cooldown: 5,
	//listed: 0,
	execute(message, arguments) {
	
		const rollen_embed = new Discord.RichEmbed()
	   .setColor('#0099ff')
	   .setTitle('Server Rollen')
	   .setDescription("<:Priester:626434117038374912> - Priester\n" +
       "<:Seelenfessler:626434116803362836> - Seelenfessler\n" +
   	   "<:Runenfechter:626434116740710431> - Runenfechter\n" +
   	   "<:Schlaeger:626434116660887554> - Schläger\n" +
 	   "<:Magier:626434116866408449> - Magier\n" +
 	   "<:Assassine:626434116497440780> - Assassine\n" +
  	   "<:Kanonier:626434116862345226> - Kanonier\n" +
  	   "<:Bogenschuetze:626432685627277361> - Bogenschütze\n" +
  	   "<:Berserker:626434116845568040> - Berserker\n" +
  	   "<:Bandit:626434116866408448> - Bandit\n" +
	   "<:Ritter:626434116669276191> - Ritter\n"
	   );
	   message.channel.send(rollen_embed);
	},
};