const Discord = require('discord.js');
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
            name: 'urban',
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
            promptLimit: 1,
            description: '',
            quotedStringSupport: true, 
            flagSupport: true,
            usage: '(word:word)',
            usageDelim: '',
            extendedHelp: '<word> or <word> (--random) or -any for random word.'
        }); 
        this
			.createCustomResolver('word', (arg, possible, msg, [word]) => {
                console.log('arg', arg);
                if (arg) return arg;
                if (msg.flagArgs.any) return undefined;
                if (msg.flagArgs.random) throw 'You must provide a word before --random'; 
                throw 'Provide a word to look-up.'
                
        } )
    }
    async run(message, [word]) {
        console.log('params', message.params)
        console.log(message.flagArgs)
        let res;
        // This is where you place the code you want to run for your command
        do {
            if (message.flagArgs.any){
                console.log('if1')
                res = await urban.random().catch(e => {
                    return message.channel.send('***word not found***');
                });
            } // random word
            else if (message.flagArgs.random){
                console.log('if2') 
                res = await urban.random(word).catch(e => {
                    return message.channel.send('***word not found***');
                });
            } // word with random entry
            else {
                console.log('if3')
                res = await urban(word).catch(e => {
                    return message.channel.send('***word not found***');
                });
            } // non-random word and highest rated entry
        } while (res.definition > 1024);
        
        const urban_embed = new Discord.MessageEmbed()
        .setAuthor('Urban Dictionary', 'https://i.imgur.com/8lzetyL.png')
        .setColor('RANDOM')
        .setTitle(`**${res.word}**`)
        .setURL(res.urbanURL)
		.addField(`**» Definition «\n**`, `${res.definition}*`) // .replace(/\[|\]/g, '')
		.setFooter(`👍 ${res.thumbsUp} 👎 ${res.thumbsDown} Author: ${res.author}`)
        .addField(`**» Example «**`, `*${res.example}*\n`) //? shorten(res.example.replace(/\[|\]/g, ''), 1000) : 'None'
        .addBlankField()

        if (urban_embed) return message.channel.send(urban_embed);
    }

    async init() {
        /*
         * You can optionally define this method which will be run when the bot starts
         * (after login, so discord data is available via this.client)
         */
    }

};

// if you return undefined then the argument is not required
// if you return a value then it is required
// if you throw then it requires a value and was not provided
// so say you're using subcommands, and you need a value with 1 of them, but not the other one
// then you can check if the action was the command that needed it, and if it was then return the value or throw if it wasn't provided
// and if it's not the subcommand that requires a value then return undefined

// Uhm... in that case, I guess that... you can make custom prompts
// Fortunately they're easy to make
// https://klasa.js.org/#/docs/klasa/master/class/Command?scrollTo=definePrompt
// Here's an example for it: https://github.com/kyranet/Skyra/blob/master/src/commands/Games/c4.ts#L31
 
// SaintMorningletzten Freitag um 19:06 Uhr
// Thank you so much. Will make the switch then.
 
// Pawfessional TypeScripterletzten Freitag um 19:06 Uhr
// https://twitter.com/WolfgalVlad/status/1203012266637058050?s=19

// Vladdy 💜 (@WolfgalVlad)
// Got my #hacktoberfest merch and I'm happy!! The new shirt looks awesome, and I'm looking forward to building a collection of Hacktoberfest merch in the future!

// Thank you @hacktoberfest, @ThePracticalDev and everyone else involved into this for making this event! :blue_heart::orange_heart:...


// Twitter
// Pog
 
// **kyra**letzten Freitag um 19:07 Uhr
// You can have prompts on all commands minus that one, the prompt options are per-command
// So yeah, you give the prompt options in ClientOptions.pieceDefaults.commands, then disable prompting for that one and use the custom prompts
// And if you define all 3 args as optional, it'll go through and you'll be able to call your prompts with the types you want, and as many arguments as you want