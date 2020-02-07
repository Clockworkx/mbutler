const { MessageEmbed } = require('discord.js');
const Discord = require('discord.js');
const { isUnit, generate_pages, display_page } = require('../../util/util')
 /**
 * @param {import('klasa').KlasaMessage} message
 */

const { Command, RichDisplay } = require('klasa');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: 'emojilist',
            enabled: true,
            runIn: ['text', 'dm', 'group'],
            cooldown: 0,
            deletable: false,
            bucket: 1,
            aliases: ['el'],
            guarded: false,
            nsfw: false,
            permissionLevel: 0,
            requiredPermissions: [],
            requiredSettings: [],
            subcommands: false,
            description: '',
            quotedStringSupport: true, 
            usage: '<normal|animated:default>',
            usageDelim: '',
            extendedHelp: 'No extended help available.'
        });

         
          
    }
    async run(message, [type]) {
       // let pages = generate_pages(tagString, 10)
			//display_page(pages, page_number)
			const list_embed = new RichDisplay(new MessageEmbed()
            .setColor('RANDOM')
			.setTitle('hi')
			);

           
            let is_animated = true
            if (type === 'normal') is_animated = false
            
            let n = 0;
            let page;
            for (let i of message.guild.emojis.filter(animated => animated.animated === is_animated )) {
                
                if (n % 9 === 0){
                    page = new MessageEmbed()
                    list_embed.addPage(page)

                }
                page.addField(i[1].name, i[1].toString(), true)
                .setColor('RANDOM')
                .setTitle(`Emojis of ${message.guild.name}`)
                .setDescription('You can make the bot say an emoji by using: ".e emoji_name"')
               
                n++;
            } 

            list_embed.run(await message.channel.send(new MessageEmbed().setDescription('Loading')))
         
    
    }

    async init() {
        /*
         * You can optionally define this method which will be run when the bot starts
         * (after login, so discord data is available via this.client)
         */
    }

};
