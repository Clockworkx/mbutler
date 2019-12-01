const { CommandoClient } = require('discord.js-commando');
const path = require('path');
const config = require('./config.json');
const roleService = require('./services/roleService')
const colors = require('colors')

const client = new CommandoClient({
  commandPrefix: '.',
  owner: '193676015623602176',
  invite: 'https://discord.gg/z3PUM4G',
  partials: ['MESSAGE', 'CHANNEL'],
});

client.registry
  .registerDefaultTypes()
  .registerGroups([
    ['admin', 'Admin'],
    ['text-edit', 'Text Manipulation'],
    ['fun', 'Fun'],
    ['info', 'Information'],
    ['utility', 'Utility'],
    ['search', 'Searches the Web'],
  ])
  .registerDefaultGroups()
  .registerDefaultCommands()
  .registerCommandsIn(path.join(__dirname, 'commands'));

client.once('ready', () => {
  client.user.setActivity(".help", {
    type: "LISTENING"
  })
  console.log('\n')
  console.log(`Logged in as`.brightBlue.underline
  + `\n`
  + `name:`.brightCyan.underline
  + ` ${client.user.tag}`.brightYellow
  + `\n`
  +`id:`.brightRed.underline
  + ` ${client.user.id}`.brightYellow
  + `\n`
  + `on Servers:`.brightMagenta.underline);
  client.guilds.forEach((guild) => {
    console.log(` -  ${guild.name}`.brightYellow);
  })
  console.log(`\n` + `Everything is loaded and ready!`.rainbow.underline);
});

client
  .on('error', console.error)
  .on('commandError', (cmd, err) => {
    console.error(`Error in command ${cmd.groupID}:${cmd.memberName}`, err)
  })
  .on('messageReactionAdd', async (reaction, user) => {
    roleService.add_group(reaction, user)
  })
  .on('messageReactionRemove', async (reaction, user) => {
    roleService.remove_group(reaction, user)
  })

client.login(config.token);
