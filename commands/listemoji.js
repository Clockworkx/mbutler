module.exports = {
	name: 'listemoji',
	aliases: ['smileys'],
	description: "lists the server's emoji'",
	uses_arguments: false,
	usage: '',
	guild_only: true,
	cooldown: 5,
	execute(message, arguments) {
		const emojiList = message.guild.emojis.map(e=>e.toString()).join(" ");
  		message.channel.send(emojiList);
	},
};