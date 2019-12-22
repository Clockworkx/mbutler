const translator = require('custom-translate')
const fancyDictionary = require('../../assets/json/fancy')
const moment = require('moment')
const { Command } = require('klasa');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: 'fancy',
            enabled: true,
            runIn: ['text', 'dm', 'group'],
            cooldown: 0,
            deletable: false,
            bucket: 1,
            aliases: [],
            guarded: false,
            nsfw: false,
            permissionLevel: 0,
            requiredPermissions: [],
            requiredSettings: [],
            subcommands: false,
            description: 'makes text look fancy',
            quotedStringSupport: true, 
            usage: '<text:string>',
            usageDelim: '',
            extendedHelp: 'No extended help available.'
        });

         
          
    }
    async run(message, [text]) {
		const date = moment()

		let fancied_message = translator.letterTrans(text, fancyDictionary);
		message.send(`${fancied_message}\n - ${message.author} ${date.format('dddd, MMMM Do YYYY, HH:mm:ss')}`)
    }

    async init() {
        /*
         * You can optionally define this method which will be run when the bot starts
         * (after login, so discord data is available via this.client)
         */
    }

};