const Discord = require('discord.js');
const urban = require('relevant-urban');

module.exports = {
	name: 'urban',
	aliases: ['ud'],
	description: 'Defines a word according to urban dictionary.',
	uses_arguments: true,
	usage: '<word> to get the highest rated entry. <random> to get a random word definition. <word> --top to get a random entry for your word (not highest rated) ',
	guild_only: true,
	cooldown: 1,
	async execute (message, arguments) {
        let res;
        if (arguments[0] === 'random'){
            res = await urban.random().catch(e => {
                return message.channel.send('***word not found***');
            });
        }
        else if (arguments[1] === '--top'){
            res = await urban.random(arguments.join(' ')).catch(e => {
                return message.channel.send('***word not found***');
            });
        }
        else {
            res = await urban(arguments.join(' ')).catch(e => {
                return message.channel.send('***word not found***');
            });
        }

        const urban_embed = new Discord.MessageEmbed()
        .setAuthor('Urban Dictionary', 'https://i.imgur.com/8lzetyL.png')
        .setColor('Random')
        .setTitle(`**${res.word}**`)
        .setURL(res.urbanURL)
		.addField(`**» Definition «\n**`, `${res.definition}*`) // .replace(/\[|\]/g, '')
		.setFooter(`👍 ${res.thumbsUp} 👎 ${res.thumbsDown} Author: ${res.author}`)
        .addField(`**» Example «**`, `*${res.example}*\n`); //? shorten(res.example.replace(/\[|\]/g, ''), 1000) : 'None'
        
        message.channel.send(urban_embed);
    },
};