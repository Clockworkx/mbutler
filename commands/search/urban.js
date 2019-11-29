const Discord = require('discord.js');
const urban = require('relevant-urban');
const { Command } = require('discord.js-commando');
const { remove_option } = require('../../helper/argumentHelper')

module.exports = class UrbanCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'urban',
			group: 'search',
            memberName: 'urban',
            aliases: ['ud'],
            description: 'Defines a word according to urban dictionary',
            args: [
                {
                    key: 'word',
                    prompt: 'Type in the word to look up, if no word is provided you get a random word',
                    type: 'string',
                    infinite: true,
                    default: ['random'],
                },
            ],
		});
	}

	async run(message, { word }) {
        let full_word = remove_option(word, '-random').join(' ').toLowerCase();
        let res;

        if (full_word === 'random'){
            res = await urban.random().catch(e => {
                return message.channel.send('***word not found***');
            });
        } // random word
        else if (full_word !== 'random' && word.includes('-random')){ 
            res = await urban.random(full_word).catch(e => {
                return message.channel.send('***word not found***');
            });
        } // non-random word and non-highest rated entry
        else {
            res = await urban(word.join(' ')).catch(e => {
                return message.channel.send('***word not found***');
            });
        } // non-random word and highest rated entry

        const urban_embed = new Discord.MessageEmbed()
        .setAuthor('Urban Dictionary', 'https://i.imgur.com/8lzetyL.png')
        .setColor('Random')
        .setTitle(`**${res.word}**`)
        .setURL(res.urbanURL)
		.addField(`**» Definition «\n**`, `${res.definition}*`) // .replace(/\[|\]/g, '')
		.setFooter(`👍 ${res.thumbsUp} 👎 ${res.thumbsDown} Author: ${res.author}`)
        .addField(`**» Example «**`, `*${res.example}*\n`) //? shorten(res.example.replace(/\[|\]/g, ''), 1000) : 'None'
        .addBlankField()

        if (urban_embed.length > 1024) message.say('Entry is too long to display in discord');
        else message.channel.send(urban_embed);
	}
};