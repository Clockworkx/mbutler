
const ascii = require('ascii-art');
const Discord = require('discord.js');
 /**
 * @param {import('klasa').KlasaMessage} message
 */

const { Command } = require('klasa');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: 'ascii',
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
            description: 'turns text into ascii',
            quotedStringSupport: true, 
            usage: '<text:string>',
            usageDelim: '',
            extendedHelp: 'No extended help available.'
        });

         
          
    }
    async run(message, [text]) {

		ascii.font(text, 'Doom', (error, rendered) => {
            if (error) throw error;

            rendered = rendered.trimRight();
            if (rendered.length > 2000) return message.channel.send('Message is too long!');

            message.channel.send(rendered, {
                code: 'md'
            });
        });


    }

    async init() {
        /*
         * You can optionally define this method which will be run when the bot starts
         * (after login, so discord data is available via this.client)
         */
    }

};
