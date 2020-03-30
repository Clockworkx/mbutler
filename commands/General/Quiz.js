const { MessageEmbed } = require('discord.js');
const Discord = require('discord.js');
const fetch = require('node-fetch')
const { isUnit, generate_pages, display_page, decodeHtml } = require('../../util/util')
const emojiCharacters = require('../../util/emojiCharacters');
const { quizService } = require('../../services/QuizService')

 /**
 * @param {import('klasa').KlasaMessage} message
 */

const { Command, RichDisplay } = require('klasa');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: 'quiz',
            enabled: true,
            runIn: ['text', 'dm', 'group'],
            cooldown: 0,
            deletable: false,
            bucket: 1,
            aliases: ['q'],
            guarded: false,
            nsfw: false,
            permissionLevel: 0,
            requiredPermissions: [],
            requiredSettings: [],
            subcommands: false,
            description: '',
            quotedStringSupport: true, 
            usage: '', //<answer:string>
            usageDelim: '',
            extendedHelp: 'No extended help available.'
        });

         
          
    }
    async run(message, [emoji_input]) {
        quizService(message.client);
    }

    async init() {
        /*
         * You can optionally define this method which will be run when the bot starts
         * (after login, so discord data is available via this.client)
         */
    }

};
