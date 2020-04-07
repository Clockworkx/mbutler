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
		const rollenEmbed = new Discord.MessageEmbed()
		.setColor('#0099ff')
		.setTitle('Server Rollen')
        .setDescription(`__**Reagiere mit dem entsprechenden Emoji um deine Rollen zu erhalten!**__\n\n`+
        `__**Plattform**__\n`+
		`<:PC:697068625390993468> - PC\n` +
		`<:Playstation:697068610560065666> - Playstation\n` +
        `<:xbox:697077474785362063> - XBOX\n` +
        `__**Alter, falls du es angeben möchtest**__\n` +
        `<:16:697068550552027259> - 16+\n` + 
        `<:18:697066777187844166> - 18+\n` + 
        `<:21:697066856313389168> - 21+\n` + 
        `__**Möchtest du Bot oder Nachrichtenchannel sehen?**__\n` +
		`<a:Botchannel:697068636204040273> - Botchannel\n` +
		`<:Neuigkeiten:697068714595582043> - Neuigkeiten\n`
		);
		message.channel.send(rollenEmbed);

    }

    async init() {
        /*
         * You can optionally define this method which will be run when the bot starts
         * (after login, so discord data is available via this.client)
         */
    }

};