const path = require('path');
const config = require('./config.json');
const roleService = require('./services/roleService')
const colors = require('colors')
const { schedule_reminders } = require('./commands/General/reminder')
const { Client } = require('klasa');

const client = new Client({
  fetchAllMembers: false,
  prefix: '.',
  commandEditing: true,
  typing: true,
  partials: ['MESSAGE', 'CHANNEL'],
});


client.once('ready', () => {  
  schedule_reminders(client);
  client.user.setActivity(".help", {
    type: "LISTENING"
  })
  console.log('\n')
 // schedule_reminders(client);
  console.log(`Logged in as`.brightBlue.underline
  + `\n`
  + `name:`.brightCyan.underline
  + ` ${client.user.tag}`.brightYellow
  + `\n`
  +`id:`.brightRed.underline
  + ` ${client.user.id}`.brightYellow
  + `\n`
  + `on Servers:`.brightMagenta.underline);
  // client.guilds.forEach((guild) => {
  //   console.log(` -  ${guild.name}`.brightYellow);
  // })
  console.log(`\n` + `Everything is loaded and ready!`.rainbow.underline);
});

client
  .on('error', console.error)
  // .on('commandError', (cmd, err) => {
  //   console.error(`Error in command ${cmd.groupID}:${cmd.memberName}`, err)
  // })
  .on('messageReactionAdd', async (reaction, user) => {
    roleService.add_group(reaction, user)
  })
  .on('messageReactionRemove', async (reaction, user) => {
    roleService.remove_group(reaction, user)
  })

client.login(config.token);
