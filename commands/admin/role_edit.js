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
		message.channel.messages.fetch('626583570550358017').then(msg => {
			const received_embed = msg.embeds[0];
			const edited_embed = new Discord.MessageEmbed(received_embed)
			.setDescription(`Reagiere mit dem entsprechenden emoji um deine Klassen und weitere Gruppen auszuwählen\n\n
            __**Klassen**__\n`+
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
			`__**Lust mit anderen Maplern andere Spiele zu spielen?**__\n`+
			`<:lol:632977206242443335> - League of Legends\n`+
			`<a:minecraft:632976785792958483> - Minecraft\n`+
			`<:rubiks:632977276392177674> - Social Games (Spiele wie scribble.io, Monopoly und der gleichen)\n\n`+
			`__**Möchtest du den Channel mit offiziellen Maple Story 2 news sehen?**__\n`+
			`<:News:672631229752803358> - MS2 News Channel\n\n`+
			`__**Möchtest du den Channel für Botbefehle sehen?**__\n`+
			`<a:Botnutzer:672627816080343050> - Serverbot Channel\n\n`

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