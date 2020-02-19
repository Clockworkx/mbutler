const math = require('mathjs');
const Discord = require('discord.js');
const { Command } = require('klasa');
const { colorRolesDb } = require('../../dbObjects')

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: 'roleSort',
            enabled: true,
            runIn: ['text', 'dm', 'group'],
            cooldown: 0,
            deletable: false,
            bucket: 1,
            aliases: ['rss'],
            guarded: false,
            hidden: true,
            nsfw: false,
            permissionLevel: 7,
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
    async run(message, [expression]) {
        const cRoles = await colorRolesDb.findAll();
        
        let lastPosition = message.guild.roles.highest.rawPosition - 4
        for (let i = 0; i < cRoles.length; i++) {
            console.log('pos to set to', lastPosition)
            console.log('role name', cRoles[i].roleName)
            let role = message.guild.roles.cache.find(roles => roles.name === cRoles[i].roleName)
            console.log('pos before', role.position )
            await role.setPosition(lastPosition)
            console.log('pos after', role.position )
            lastPosition -= 1;
            console.log('pos to set to after', lastPosition)
        }
        //console.log(message.guild.roles.cache.find(roles => roles.name === 'Punch').name)
		

    }

    async init() {
        /*
         * You can optionally define this method which will be run when the bot starts
         * (after login, so discord data is available via this.client)
         */
    }

};

