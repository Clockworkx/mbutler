const { MessageEmbed } = require('discord.js');
const Discord = require('discord.js');
const { isUnit, generate_pages, display_page } = require('../../util/util')
 /**
 * @param {import('klasa').KlasaMessage} message
 */

const { Command, RichDisplay } = require('klasa');
const fetch = require('node-fetch')
const item_data = require('../../assets/TFT static data/items')
const companion = require('../../assets/TFT static data/companions.json')
const { ordinal_suffix } = require('../../util/util')
var format = require('date-fns/format')

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: 'build',
            enabled: false,
            runIn: ['text', 'dm', 'group'],
            cooldown: 0,
            deletable: false,
            bucket: 1,
            aliases: ['items'],
            guarded: false,
            nsfw: false,
            permissionLevel: 0,
            requiredPermissions: [],
            requiredSettings: [],
            subcommands: false,
            description: 'Lookup a summoner\`s last tft games',
            quotedStringSupport: true, 
            usage: '<champion:string>',
            usageDelim: '',
            extendedHelp: '.tft Summonername, e.g. .tft James Willson'
        });

        
          
    }
    async run(message, [summoner_name]) {
        const headers = {
            "Content-Type": "Authorization",
            "X-Riot-Token": "RGAPI-1164bf46-a842-46d8-97fc-1903f3fba633"
        }
        const champ = 'https://www.probuilds.net/guide/show/KR/4229179597/XzS0vKCJUb7n-CFPVceWRQdipXzWZmjyiI7xiSxIxSz8NWU'

        const summoner = await fetch(champ, {
            method: 'get',
            //headers: headers
        })
        .then(response => response.json()).catch(err => message.channel.send('No Summoner found'))
        //console.table(summoner)
        console.log(summoner)
    }
}
