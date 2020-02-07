const { MessageEmbed } = require('discord.js');
const Discord = require('discord.js');
const { isUnit, generate_pages, display_page } = require('../../util/util')
 /**
 * @param {import('klasa').KlasaMessage} message
 */

const { Command, RichDisplay } = require('klasa');
const fetch = require('node-fetch')
const item_data = require('../../assets/TFT static data/items')
const { ordinal_suffix } = require('../../util/util')

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: 'tft',
            enabled: true,
            runIn: ['text', 'dm', 'group'],
            cooldown: 0,
            deletable: false,
            bucket: 1,
            aliases: [''],
            guarded: false,
            nsfw: false,
            permissionLevel: 0,
            requiredPermissions: [],
            requiredSettings: [],
            subcommands: false,
            description: 'Lookup a summoner\`s last tft games',
            quotedStringSupport: true, 
            usage: '<summoner_name:string>',
            usageDelim: '',
            extendedHelp: 'No extended help available.'
        });

        
          
    }
    async run(message, [summoner_name]) {
        const headers = {
            "Content-Type": "Authorization",
            "X-Riot-Token": "RGAPI-ed168ce1-8331-443f-ba05-81e2f7b0c647"

        }

        const summoner_url = 'https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/' + summoner_name; // by summoner name

        const summoner = await fetch(summoner_url, {
            method: 'get',
            headers: headers
        })
        .then(response => response.json())

        const match_id_url = 'https://europe.api.riotgames.com/tft/match/v1/matches/by-puuid/' + summoner.puuid.toString() + '/ids?count=5'

        const match_id = await fetch(match_id_url, {
            method: 'get',
            headers: headers
        })
        .then(response => response.json())

        const match_info_url = 'https://europe.api.riotgames.com/tft/match/v1/matches/' 

        const match_info = [];
        for (let i = 0; i < match_id.length; i++) {
            await fetch(match_info_url + match_id[i], {
                method: 'get',
                headers: headers
            })
            .then(response => response.json())
            .then(json => { match_info[i] = json.info.participants.find(participant => participant.puuid === summoner.puuid)})
            //  
        }
        //match_info[0].info.participants.filter(participant => participant.puuid === summoner.puuid)

        console.log(match_info[1])
      //  console.log(match_id)
       // message.channel.send(data.entries[0].summonerName.toString())
       const tft_match_display = new RichDisplay(new MessageEmbed()
       .setDescription(`TFT History for ${summoner.name} `)
       )
       for (let i = 0; i < match_id.length; i++) {

        
        console.log(match_info)
        let page = new MessageEmbed()
        .setColor('RANDOM')
        .setTitle(`Match ${i+1}: Placed ${ordinal_suffix(match_info[i].placement)}\n`)
        //.addField('Match', match_id[i])
        
        let traits = match_info[i].traits.filter(trait => trait.tier_current > 0);
        traits.sort((a, b) => b.num_units - a.num_units)    
        let trait_string = traits.map(traits => `${traits.num_units} ${traits.name}`).join(' ') || 'No activated traits';
       console.log(trait_string)
        page.setDescription(`**Traits: ${trait_string}**`)

        
        // for (const j of match_info[i].traits.filter(trait => trait.tier_current > 0)) {
        //     traits + `${j.num_units} ${j.name}`
        // }
        
        
        let units = [];
        for (let j of match_info[i].units) {
            let items = [];
            if (j.items.length){
                for (let k of j.items) {
                    let item_name = item_data.find(item => item.id === k).name
                    items.push(item_name)
                }
                units.push(`${j.name}\nItems: ${items.join(', ')}`)
            }
            else units.push(j.name)
        }
        
        for (let i = 0; i < units.length; i++) {
            page.addField(`Unit ${i+1}`, units[i], true)
        }
        page
        .addBlankField()
        .addField('Total damage to players:', match_info[i].total_damage_to_players, true)
        .addField('Round eliminated:', match_info[i].last_round, true)
        .addField('Players eliminated:', match_info[i].players_eliminated, true)


        tft_match_display.addPage(page)  
    }
       tft_match_display.run(await message.channel.send(new MessageEmbed().setDescription('Loading')))
    }

    async init() {
        /*
         * You can optionally define this method which will be run when the bot starts
         * (after login, so discord data is available via this.client)
         */
    }

};
