const { Command } = require('klasa');
const Discord = require('discord.js')

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: 'role',
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
            usage: '<member:member> <add|remove> <role:role>',
            usageDelim: ' ',
            extendedHelp: 'No extended help available.'
        });



    }
    async run(message, [member, action, role]) {
        if (!member) return
        
        message.guild.roles.fetch().then(roles => {
            if (roles.cache.find(r => r.name === role.name)) {
                if (action === 'add') member.roles.add(role)
                if (action === 'remove') member.roles.remove(role)
            } 
           
        }).catch(err => console.log(err))
    }

    async init() {
        /*
         * You can optionally define this method which will be run when the bot starts
         * (after login, so discord data is available via this.client)
         */
    }

};