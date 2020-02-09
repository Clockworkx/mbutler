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
            name: 'tft',
            enabled: true,
            runIn: ['text', 'dm', 'group'],
            cooldown: 0,
            deletable: false,
            bucket: 1,
            aliases: ['t'],
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
            extendedHelp: '.tft Summonername, e.g. .tft James Willson'
        });

        
          
    }
    async run(message, [summoner_name]) {
        const headers = {
            "Content-Type": "Authorization",
            "X-Riot-Token": "RGAPI-83dbb373-c3ce-4bd7-8cd6-3dc679ae5f04"
        }
        const companion_image_url = 'https://raw.communitydragon.org/pbe/plugins/rcp-be-lol-game-data/global/default/assets/loadouts/companions/'
        const uniform_summoner_name = encodeURI(summoner_name)
        


        const summoner_url = 'https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/' 
        + uniform_summoner_name // by summoner name .replace(/ /g,"%20")
        //console.log('summoner url', summoner_url);

        const summoner = await fetch(summoner_url, {
            method: 'get',
            headers: headers
        })
        .then(response => response.json()).catch(err => message.channel.send('No Summoner found'))
        //console.table(summoner)

        
        const match_id_url = 'https://europe.api.riotgames.com/tft/match/v1/matches/by-puuid/'
        + summoner.puuid + '/ids?count=5'
        //console.log('match_id_url', match_id_url)

        const match_id = await fetch(match_id_url, {
            method: 'get',
            headers: headers
        })
        .then(response => response.json()).catch(err => message.channel.send('No recent matches found'))
       // console.table(match_id)

        const match_info_url = 'https://europe.api.riotgames.com/tft/match/v1/matches/' 

        let matches = []
        for (let i = 0; i < match_id.length; i++) {
            let match = await fetch(match_info_url + match_id[i], {
                method: 'get',
                headers: headers
            })
            .then(response => response.json()).catch(err => message.channel.send('No match info found'))
            //console.log('match', i, match.info.participants.find(participant => participant.puuid === summoner.puuid))
            matches[i] = match.info.participants.find(participant => participant.puuid === summoner.puuid) 
            delete match['info']['participants']
            matches[i]['info']= match.info
        }
        //console.log(matches[0])
        const tft_match_display = new RichDisplay(new MessageEmbed())

        for (let i = 0; i < match_id.length; i++) {
            let active_traits = matches[i].traits
            .filter(traits => traits.tier_current > 0 )
            .sort((a, b) => b.num_units - a.num_units) 
            let traits_string = active_traits.map(traits => `**${traits.num_units} ${traits.name}**`).join(' ');
            
            
            const companion_image_path = companion.find(companion => companion.contentId === matches[i].companion.content_ID ).loadoutsIcon.split('/')
            const companion_image_name = companion_image_path[companion_image_path.length-1].toLowerCase()

            let match_date = new Date(matches[i].info.game_datetime)

            let game_version = matches[i].info.game_version.split(' ')
            let game_version_string = 'Game version' + game_version[1].toString()
            
            
            let game_type;
            if (matches[i].info.queue_id === 1100) game_type = 'Ranked'
            if (matches[i].info.queue_id === 1090) game_type = 'Normal'
            

            let page = new MessageEmbed()
            .setTitle(`__Match ${i+1}: Placed ${ordinal_suffix(matches[i].placement)} in ${game_type} Game on ${format(match_date, 'do/MMM/yyyy')}__`)
            .setThumbnail(companion_image_url + companion_image_name)
            .setColor('RANDOM')
            .setDescription(traits_string)

            for (let j = 0; j < matches[i].units.length; j++) {
                if(matches[i].units.length > 0){
                    let item_string = item_to_String(matches[i].units[j].items)

                    page.addField(`__**Unit ${j+1}**__`, `***${matches[i].units[j].character_id.slice(5)}***\n ${item_string}`, true)

                    if (j === matches[i].units.length - 1 && matches[i].units.length % 3 !== 0) page.addBlankField(true)
                }
            }

            page
            .addField('Round eliminated', matches[i].last_round, true)
            .addField('Damage to players', matches[i].total_damage_to_players, true)
            .addField('Gold left', matches[i].gold_left, true)
            .setFooter('Some footer text here', 'https://i.imgur.com/wSTFkRM.png');
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

function item_to_String(items) {
    let item_string = '';
    for (let i = 0; i < items.length; i++) {
        let item_name = item_data.find(item => item.id === items[i]).name
        item_string += `__**Item ${i+1}:**__ ***${item_name}***\n`
    }
    return item_string.toString()
    
}