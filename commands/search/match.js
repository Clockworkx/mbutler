const { Command } = require('klasa');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: 'love',
            enabled: true,
            runIn: ['text', 'dm', 'group'],
            cooldown: 0,
            deletable: false,
            bucket: 1,
            aliases: ['match', 'fit'],
            guarded: false,
            nsfw: false,
            permissionLevel: 0,
            requiredPermissions: [],
            requiredSettings: [],
            subcommands: false,
            description: 'Calculates love between two users',
            quotedStringSupport: true, 
            usage: '<user1:user> <user2:user>',
            usageDelim: ' ',
            extendedHelp: 'No extended help available.'
        });

         
          
    }
    async run(message, [user1, user2]) {
		return message.send(`There's ${Math.floor((Math.random() * 100))}% love between ${user1} and ${user2}`);
    }

    async init() {
        /*
         * You can optionally define this method which will be run when the bot starts
         * (after login, so discord data is available via this.client)
         */
    }

};