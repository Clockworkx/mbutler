const { Command } = require('klasa');
const { piDependencies } = require('mathjs');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: 'votekick',
            enabled: true,
            runIn: ['text', 'dm', 'group'],
            cooldown: 0,
            deletable: false,
            bucket: 1,
            aliases: ['vk'],
            guarded: false,
            nsfw: false,
            permissionLevel: 0,
            requiredPermissions: [],
            requiredSettings: [],
            subcommands: false,
            description: '',
            quotedStringSupport: true, 
            usage: '<user:user>',
            usageDelim: '',
            extendedHelp: 'No extended help available.'
        });

         
          
    }
    async run(message, [user]) {
        const filter = (reaction, user) => {
            return ['👍', '👎'].includes(reaction.emoji.name);
        }
        let up = 0;
        let down = 0;

        let voteMessage = await message.channel.send(`${message.author} started a votekick against ${user.toString()}`)
        //console.log(voteMessage)
        voteMessage.awaitReactions(filter, { time: 15000, max: 99})
        .then(collected => {
           // console.log(collected.get('👍').count > collected.get('👎').count)
           up = collected.get('👍')
           if (up) up = up.count ;
           down = collected.get('👎').count
           if (down) down = down.count ;

            if (up > down) message.channel.send(`${user.toString()} was kicked, fuckin asshole.`)
            else message.channel.send(`${user.toString()} you had luck.`)
        })
        .catch(collected => {
            message.channel.send('No one voted, fucking :pepegas:')
        })

    }

    async init() {
        /*
         * You can optionally define this method which will be run when the bot starts
         * (after login, so discord data is available via this.client)
         */
    }

};