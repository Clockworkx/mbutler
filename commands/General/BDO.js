const Discord = require('discord.js');
const { Command } = require('klasa');
const { getLootStats, isProcessRunning2 } = require('../../services/BDOService')

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: 'BDO',
            enabled: true,
            runIn: ['text', 'dm', 'group'],
            cooldown: 0,
            deletable: false,
            bucket: 1,
            aliases: ['bdo'],
            guarded: false,
            nsfw: false,
            permissionLevel: 7,
            requiredPermissions: [],
            requiredSettings: [],
            subcommands: true,
            description: '',
            quotedStringSupport: true,
            usage: '<up|loot:default>',
            usageDelim: ' ',
            extendedHelp: 'No extended help available.'
        });



    }
    async loot(message, []) {
        
        const loot = await getLootStats()
        const sessionTime = (loot.DurationTick / 1000 / 60 / 60 ).toFixed(2)
        console.log(loot)
        
        
        const lootMessage = loot.ItemStats.map(item => 
                `__*${item.Name}*__ Total: **${item.Count}** Hour: **${(item.Count / sessionTime).toFixed(2)}**`)
                console.log(lootMessage)
        const lootEmbed = new Discord.MessageEmbed()
        .setDescription(lootMessage)
        .setTitle(`Session Running for ${sessionTime} hours`)
        .setColor('RANDOM')
        .setThumbnail('https://preview.redd.it/92opki8ut7t41.jpg?width=960&crop=smart&auto=webp&s=5f409091fe6399535e8edf78b64be58d10d16391')
        message.channel.send(lootEmbed)
    }

    async up(message, []) {
        if (isProcessRunning2()) message.send('BDO is running!')
        //console.log(await isProcessRunning2())
       // else message.send('BDO CRASHED!!!')
    }




    async init() {
        /*
         * You can optionally define this method which will be run when the bot starts
         * (after login, so discord data is available via this.client)
         */
    }

};
