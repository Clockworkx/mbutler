const { Command } = require('klasa');
const Discord = require('discord.js')

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: 'init_roles',
            enabled: true,
            runIn: ['text', 'dm', 'group'],
            cooldown: 0,
            deletable: false,
            bucket: 1,
            aliases: ['ir'],
            guarded: false,
            nsfw: false,
            permissionLevel: 0,
            requiredPermissions: [],
            requiredSettings: [],
            subcommands: false,
            description: 'admin command to print out configured roles for the role reaction system',
            quotedStringSupport: true, 
            usage: '',
            usageDelim: '',
            extendedHelp: 'No extended help available.'
        });

         
          
    }
    async run(message, [first, second]) {
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

    }

    async init() {
        /*
         * You can optionally define this method which will be run when the bot starts
         * (after login, so discord data is available via this.client)
         */
    }

};