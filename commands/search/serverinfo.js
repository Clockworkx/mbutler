const Discord = require('discord.js');
 /**
 * @param {import('klasa').KlasaMessage} message
 */

const { Command } = require('klasa');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: 'serverinfo',
            enabled: true,
            runIn: ['text', 'group'],
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
        console.log(this.client.user.avatarURL())
        const embed = new Discord.MessageEmbed()
        .setTitle(`Serverinfo for ${message.guild.name}`)
        .setAuthor('Some name', this.client.user.avatarURL())
        .setThumbnail(this.client.user.avatarURL())
        .setDescription(`For help with the server contact ${message.guild.owner}`)
        .addField('Usercount', message.guild.members.filter(members => !members.user.bot).size, true)
        .addField('Created at', message.guild.createdAt, true)
        .addBlankField()
        .addField('Serverbot', this.client.user, true)
        .addField(`Commands`, `Type .help in any chat to get a list of commands.`, true)
        .setColor('RANDOM')


        message.channel.send(embed)
        

    }

    async init() {
        /*
         * You can optionally define this method which will be run when the bot starts
         * (after login, so discord data is available via this.client)
         */
    }

};
