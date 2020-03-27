const Discord = require('discord.js')

module.exports = {
    add_group: async function (reaction, user) {
        let apply_role = async () => {
            let emoji_name = reaction.emoji.name;
            let role = reaction.message.guild.roles.cache.find(role => role.name.toLowerCase().replace(/\W/gi, '') === emoji_name.toLowerCase());
            let member = reaction.message.guild.members.cache.find(member => member.id === user.id);
            try {
                if(role && member) {
                    //console.log("Role and member found.");
                    await member.roles.add(role);
                    console.log(`Role ${role.name} added to ${member.displayName} (User: ${member.user.tag})`);
                }
            }
            catch(err) {
                console.log(err);
            }
        }
        if(reaction.message.partial)
        {
            try {
                let msg = await reaction.message.fetch(); 
                //console.log(msg.id);
                if(msg.id === '626583570550358017' || msg.id === '638265593090408449')
                {
                    //console.log("Fetched and cached message")
                    apply_role();
                }
            }
            catch(err) {
                console.log(err);
            }
        }
        else 
        {
            //console.log("Not a partial.");
            if(reaction.message.id === '626583570550358017' || reaction.message.id === '638265593090408449') {
                //console.log('Message in cache');
                apply_role();
            }
        }
    },
    remove_group: async function (reaction, user) {
        let remove_role = async () => {
            let emoji_name = reaction.emoji.name;
            let role = reaction.message.guild.roles.cache.find(role => role.name.toLowerCase().replace(/\W/gi, '') === emoji_name.toLowerCase());
            let member = reaction.message.guild.members.cache.find(member => member.id === user.id);
            try {
                if(role && member) {
                    //console.log("Role and member found.");
                    await member.roles.remove(role);
                    console.log(`Role ${role.name} removed from ${member.displayName} (User: ${member.user.tag})`);
                }
            }
            catch(err) {
                console.log(err);
            }
        }
      
        if(reaction.message.partial)
        {
            try {
                let msg = await reaction.message.fetch(); 
                //console.log(msg.id);
                if(msg.id === '626583570550358017' || msg.id === '638265593090408449')
                {
                    //console.log("Fetched and cached message")
                    remove_role();
                }
            }
            catch(err) {
                console.log(err);
            }
        }
        else 
        {
            //console.log("Not a partial.");
            if(reaction.message.id === '626583570550358017' || reaction.message.id === '638265593090408449') {
                //console.log('Message in cache');
                remove_role();
            }
        }
    },
};