module.exports = {
	name: 'userinfo',
	aliases: ['usrinfo'],
	description: `Gives you your or another person's id and discord name`,
	uses_arguments: false,
	usage: '<user> can be left out to get your user info',
	guild_only: true,
	cooldown: 5,
	execute(message, arguments) {
		console.log(message.author.username);
		let user = message.client.users.find(user => user.username == arguments[0]);
		if (arguments.length){
			message.channel.send(`The person's username: ${user.id}`);
		}
		else {
			message.channel.send(`Your username: ${message.author.username}\nYour ID: ${message.author.id}`);
		} 

	},
};