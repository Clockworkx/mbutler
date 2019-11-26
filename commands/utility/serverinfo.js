module.exports = {
	name: 'serverinfo',
	aliases: ['srvrinfo', 'server'],
	description: 'Displays server info',
	uses_arguments: false,
	usage: '',
	guild_only: true,
	cooldown: 5,
	execute(message, arguments) {
		if(message.guild.available === true){
            connected_servers = message.client.guilds.map((u) => { return u.name.replace(/,/g, "\n") });
            message.channel.send(`Servername: ${message.guild.name}\nTotal members: ${message.guild.members.filter(member => !member.user.bot).size}\nConnected Servers: ${connected_servers}`);
        }
	},
};