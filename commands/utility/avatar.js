module.exports = {
	name: 'avatar',
	aliases: ['profilepicture'],
  description: "Gives you a link to your or another person's profile picture",
	uses_arguments: false,
	usage: '(person) can be left out to show your avatar.',
	guild_only: false,
	cooldown: 5,
    execute(message, arguments) {
        if (!message.mentions.users.size){
            return message.channel.send(`Your avatar: ${message.author.displayAvatarURL}`);
          }
      
          const avatar_list = message.mentions.users.map(user => { return `${user.username}'s avatar: ${user.displayAvatarURL}`});
          message.channel.send(avatar_list);
        },
};