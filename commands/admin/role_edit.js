const Discord = require('discord.js');
const { Command } = require('klasa');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: 'edit_roleselection',
            enabled: true,
            runIn: ['text', 'dm', 'group'],
            cooldown: 0,
            deletable: false,
            bucket: 1,
            aliases: ['si'],
            guarded: false,
            nsfw: false,
            permissionLevel: 0,
            requiredPermissions: [],
            requiredSettings: [],
            subcommands: false,
            description: '',
            quotedStringSupport: true, 
            usage: '',
            usageDelim: '',
            extendedHelp: 'No extended help available.'
        });

         
          
    }
    async run(message, [first, second]) {
		message.channel.messages.fetch('638265593090408449').then(msg => {
			const received_embed = msg.embeds[0];
			const edited_embed = new Discord.MessageEmbed(received_embed)
			.setDescription(`__**React with the correct emoji to get your server roles.**__\n\n`+
            `<:LeagueOfLegends:638257644292931589> - League of Legends\n` +
            `<:TFT:672637041535615016> - Teamfight Tactics\n`+
		    `<:CSGO:638254615535681539> - Counter Strike:Global Offensive\n` +
		    `<:RocketLeague:638254640722477056> - Rocket League\n` +
		    `<:TheDivision2:638254650469908490> - The Division 2\n` +
	    	`<a:RainbowSixSiege:638254624695910410> - Rainbow Six Siege\n`+
            `<:ApexLegends:638263898880868353> - Apex Legends\n`+
            `<:Overwatch:672637538229288970> - Overwatch\n`+
			`<a:Minecraft:672636777537994760> - Minecraft\n`+
			`<:SocialGames:672639408226172958> - Social Games (Games like Scribble.io, Monopoly and the like)\n\n`+
			`__**Do you want to see bot-related channels?**__\n`+
            `<a:Botuser:672650072697339914> - Marco's Butler Channel <#651136328871837706> (My own Discord Bot)\n`+
            `<:MusicChannel:672641167778906122> - Musicbot channel <#563758825212215296> (Queue music to the Music Bot)\n`+
            `<:PokeCatching:672650088027521025> - Pokecord Channel <#564469705687957559> (Catching Pokemon in Discord)`


			);
			//message.channel.send(edited_embed);
			msg.edit(edited_embed);
			console.log(msg);
			//msg.channel.send(old_message);
			 })

    }

    async init() {
        /*
         * You can optionally define this method which will be run when the bot starts
         * (after login, so discord data is available via this.client)
         */
    }

};