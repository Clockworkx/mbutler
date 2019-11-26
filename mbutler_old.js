const fs = require('fs');
const Discord = require('discord.js');
const commando = require('discord.js-commando')
const {prefix, token} = require('./config.json');

const client = new commando.Client({
	owner: '90997305578106880',
  commandPrefix: ''
});


//const cooldowns = new Discord.Collection();


const command_files = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of command_files){
  const command = require(`./commands/${file}`);

  // set a new item in the Collection
  // with the key as the command name and the value as the exported module
  client.commands.set(command.name, command);
}

client.once('ready', () => {
  client.user.setActivity(".help", {type: "LISTENING"})
  console.log("Servers:");
  client.guilds.forEach((guild) => {
      console.log(" - " + guild.name);
  })
  console.log('ready');
  console.log(client.user.tag + "has logged in.");
});


client.on('message', message => {
  if (!message.content.startsWith(prefix) || message.author.bot)
  {
    if(message.embeds)
    {
      const rollen_embed_message = message.embeds.find(msg => msg.title === 'S');
      if(rollen_embed_message)
      {
        rollen_embed_message.message.react('626434117038374912')
        .then(reaction => reaction.message.react('626434116803362836'))
        .then(reaction => reaction.message.react('626434116740710431'))
        .then(reaction => reaction.message.react('626434116660887554'))
        .then(reaction => reaction.message.react('626434116866408449'))
        .then(reaction => reaction.message.react('626434116497440780'))
        .then(reaction => reaction.message.react('626434116862345226'))
        .then(reaction => reaction.message.react('626432685627277361'))
        .then(reaction => reaction.message.react('626434116845568040'))
        .then(reaction => reaction.message.react('626434116866408448'))
        .then(reaction => reaction.message.react('626434116669276191'))
        .then(reaction => reaction.message.react('632977206242443335'))
        .then(reaction => reaction.message.react('632976785792958483'))
        .then(reaction => reaction.message.react('632977276392177674'))
        .catch(err => console.error);
      }
    }
    if (message.channel.id === '626186020475502642' && !message.author.bot){
      message.react('✅');
      message.react('❌'); 
    }
    console.log('returned');
    return;
    
  } 

  const arguments = message.content.slice(prefix.length).split(/ +/);
  const command_name = arguments.shift().toLowerCase();
  console.log(arguments);
  console.log(command_name);
  //console.log(message.author.id);

  const command = client.commands.get(command_name) 
  || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(command_name));


  if (!command) return;
  


  if (command.guild_only && message.channel.type !== 'text'){
    return message.reply('This command cannot be used inside DMs!');
  }

  if (command.uses_arguments && !arguments.length){
    let reply = 'This commmand requires arguments that you did not provide!';

    if (command.usage){
      reply += `\nYou can use the command like this: \`${prefix}${command.name} ${command.usage}\``;
    }

    return message.channel.send(reply);
  }

  if (!cooldowns.has(command.name)) {
		cooldowns.set(command.name, new Discord.Collection());
	}

  //Timeout for commands  
	const now = Date.now();
	const timestamps = cooldowns.get(command.name);
	const cooldown_amount = (command.cooldown || 3) * 1000;

	if (timestamps.has(message.author.id)) {
		const expiration_time = timestamps.get(message.author.id) + cooldown_amount;

		if (now < expiration_time) {
			const time_left = (expiration_time - now) / 1000;
			return message.reply(`please wait ${time_left.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
		}
}

timestamps.set(message.author.id, now);
setTimeout(() => timestamps.delete(message.author.id), cooldown_amount);

  try {
  command.execute(message, arguments);
  
  } catch (error) {
	console.error(error);
	message.reply('there was an error trying to execute your command!');
  }

});

client.on('messageReactionAdd', async (reaction, user) => {
    
  let apply_role = async () => {
      let emoji_name = reaction.emoji.name;
      let role = reaction.message.guild.roles.find(role => role.name.toLowerCase().replace(/\W/gi, '') === emoji_name.toLowerCase());
      let member = reaction.message.guild.members.find(member => member.id === user.id);
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
});

client.on('messageReactionRemove', async (reaction, user) => {
    
  let remove_role = async () => {
      let emoji_name = reaction.emoji.name;
      let role = reaction.message.guild.roles.find(role => role.name.toLowerCase().replace(/\W/gi, '') === emoji_name.toLowerCase());
      let member = reaction.message.guild.members.find(member => member.id === user.id);
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
});


client.login(token);

