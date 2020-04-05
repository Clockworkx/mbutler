const Discord = require('discord.js');
const { Command } = require('klasa');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: 'role_react',
            enabled: false,
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
        message.channel.messages.fetch('638265593090408449') //📰
        .then(msg => msg.react('672637041535615016'))
        .then(reaction =>  reaction.message.react('672637538229288970'))
        .then(reaction =>  reaction.message.react('672636777537994760'))
        .then(reaction =>  reaction.message.react('672639408226172958'))
        .then(reaction =>  reaction.message.react('672650072697339914'))
        .then(reaction =>  reaction.message.react('672641167778906122'))
        .then(reaction =>  reaction.message.react('672650088027521025'))
        
        
        // .then(msg => { message.channel.send(emoji.which(emoji.get(reaction.emoji.name)
        //     msg.react('🤖').then(reaction => {
        //         console.log('reaction UNI')
        //     console.log(reaction.emoji)
        //     reaction.message.react('632976785792958483').then(reaction => {
            
        //         console.log('reaction cistpm,')
        //         console.log(reaction)
        //     })

        //     })
            
        // })
        
  //.then(console.log)
  //.catch(console.error)})
  //.then(msg => console.log(msg)){msg.react('🤔')}
        // .then(msg => msg.react('🤖'))
        // .then(reaction => {
        //     reaction.message.react('632976785792958483')
        //     console.log(reaction.message.reactions)
        // })
		// .then(reaction => reaction.message.react('632977276392177674'))
        	
    }

    async init() {
        /*
         * You can optionally define this method which will be run when the bot starts
         * (after login, so discord data is available via this.client)
         */
    }

};