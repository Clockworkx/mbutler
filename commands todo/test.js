const Discord = require('discord.js');
 /**
 * @param {import('klasa').KlasaMessage} message
 */


const urban = require('relevant-urban');
const { remove_option } = require('../../helper/argumentHelper')

// module.exports = class UrbanCommand extends Command {
// 	constructor(client) {
// 		super(client, {
// 			name: 'urban',
// 			group: 'search',
//             memberName: 'urban',
//             aliases: ['ud'],
//             description: 'Defines a word according to urban dictionary',
//             args: [
//                 {
//                     key: 'word',
//                     prompt: 'Type in the word to look up, if no word is provided you get a random word',
//                     type: 'string',
//                     infinite: true,
//                     default: ['random'],
//                 },
//             ],
// 		});
// 	}


const { Command } = require('klasa');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: 'tt',
            enabled: true,
            runIn: ['text', 'dm', 'group'],
            cooldown: 0,
            deletable: false,
            bucket: 1,
            aliases: ['ud'],
            guarded: false,
            nsfw: false,
            permissionLevel: 0,
            requiredPermissions: [],
            requiredSettings: [],
            subcommands: false,
            description: '',
            quotedStringSupport: true, 
            flagSupport: true,
            usage: '<test:string>',
            usageDelim: ' ',
            extendedHelp: 'No extended help available.'
        });
        // this
		// 	.createCustomResolver('key', (arg, possible, msg, [action]) => {
        //         console.log('arg',arg)
        //         console.log('poss', possible)
        //         console.log('mess', msg.args)
        //         console.log('action', [action])
        //         console.log('arg true?', Boolean(arg))
        //        if (msg.argFlags.any) return undefined;
            
            
                
        // } )
    }
    async run(message, [first, second]) {
        //console.log('message', message.command.usage)
        //console.log('params',[first], [second])
        let test = this.client.channels.find(channel => channel.name === 'test')
        test.send('hi')
        let ticketCreatedMessage = this.client.channels.find(channel => channel.name === 'test');

        const ticketCreatedEmbed = new Discord.MessageEmbed()
                .setColor('#24D330')
                .setTitle('Ticket Opened [ID]')
                .setDescription(' test')
                .setTimestamp()
                .setFooter('Ticket Bot');
        ticketCreatedMessage.send(ticketCreatedEmbed);

    }

    async init() {
        /*
         * You can optionally define this method which will be run when the bot starts
         * (after login, so discord data is available via this.client)
         */
    }

};
