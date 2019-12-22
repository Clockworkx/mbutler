const { Command, RichDisplay } = require('klasa');
const { MessageEmbed } = require('discord.js');

const images = [
    'https://i.imgur.com/Y8KoTyf.jpg',
    'https://i.imgur.com/IV2p711.jpg',
    'https://i.imgur.com/ZgEZdWt.jpg'
];

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {name:'a', description: 'Test RichDisplay' });
    }

    async run(message) {
        return new RichDisplay()
        .addPage(new MessageEmbed().setDescription('First page'))
        .addPage(new MessageEmbed().setDescription('Second page'))
        .run(await message.send('Loading...'));
    }

};