module.exports = {
	name: 'match',
	aliases: ['love', 'fit'],
	description: 'shows how much two people fit together.',
	uses_arguments: true,
	usage: '<person1> <person2>',
	guild_only: true,
	cooldown: 5,
	execute(message, arguments) {
		match_percentage = Math.floor((Math.random() * 100));
		message.channel.send(`There's ${match_percentage}% love between ${arguments[0]} and ${arguments[1]}`);
	},
};