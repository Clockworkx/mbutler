const { MessageEmbed } = require('discord.js');
const Discord = require('discord.js');
const { isUnit, generate_pages, display_page } = require('../../util/util')
 /**
 * @param {import('klasa').KlasaMessage} message
 */

const { Command, RichDisplay } = require('klasa');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: 'emoji',
            enabled: true,
            runIn: ['text', 'dm', 'group'],
            cooldown: 0,
            deletable: false,
            bucket: 1,
            aliases: ['e'],
            guarded: false,
            nsfw: false,
            permissionLevel: 0,
            requiredPermissions: [],
            requiredSettings: [],
            subcommands: false,
            description: '',
            quotedStringSupport: true, 
            usage: '<emoji_type:string>',
            usageDelim: '',
            extendedHelp: 'No extended help available.'
        });

         
          
    }
    async run(message, [emoji_input]) {
        

        message.delete({ timeout: 5000 });
        let emoji = message.guild.emojis.cache.find(emoji => emoji.name.toLowerCase() === emoji_input.toLowerCase())
        if (emoji) message.channel.send(emoji.toString())
        else message.channel.send('Emoji not found')

        

       
    }

    async init() {
        /*
         * You can optionally define this method which will be run when the bot starts
         * (after login, so discord data is available via this.client)
         */
    }

};
