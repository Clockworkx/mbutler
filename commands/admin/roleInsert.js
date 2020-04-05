const { Command } = require('klasa');
const { colorRolesDb, colorRolesDb2 } = require('../../dbObjects')


module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: 'RoleInsert',
            enabled: false,
            runIn: ['text', 'dm', 'group'],
            cooldown: 0,
            deletable: false,
            bucket: 1,
            aliases: ['ri'],
            guarded: false,
            nsfw: false,
            permissionLevel: 0,
            requiredPermissions: [],
            requiredSettings: [],
            subcommands: false,
            description: 'makes text look fancy',
            quotedStringSupport: true, 
            usage: '',
            usageDelim: '',
            extendedHelp: 'No extended help available.'
        });

    }
    async run(message, [text]) {
        //---------------------------------------------------------------------------------------
        //Get Roles from server, insert into database 
        //
        // let colorRoles = message.channel.guild.roles.cache//.fetch().then(roles => {
        //     console.log(colorRoles)
        //     for (const [key, value] of colorRoles){
        //         if (value.name !== 'Skyra' || value.name !== 'Color-Chan' || value.name !== 'TestButller' || value.name !== 'Marco\`s Butler' || value.name !== '@everyone')
        //         {
        //             colorRolesDb.create({
        //                 roleId: value.id,
        //                 roleName: value.name,
        //                 roleHexColor: value.hexColor
        //             }).then(reminder => {
        //                 console.log('reminder object', reminder)
        //             }).catch(error => console.log(error))
        //         }
                
        //     }       
        //---------------------------------------------------------------------------------------

        //get roles from database, insert into new database
        const colorRoles = await colorRolesDb.findAll();	
       
        for (let i = 0; i < colorRoles.length; i++) {
            console.log(colorRoles[i].roleName, colorRoles[i].roleHexColor)

            message.guild.roles.create({
                data: {
                  name: colorRoles[i].roleName,
                  color: colorRoles[i].roleHexColor,
                },
                reason: 'we needed a role for Super Cool People',
              })
                .then(role => {
                    message.channel.send('role created', role.name, role.hexColor)
                    colorRolesDb2.create({
                        roleId: role.id,
                        roleName: role.name,
                        roleHexColor: role.hexColor
                    }).then(reminder => {
                        console.log('reminder object', reminder)
                    }).catch(error => console.log(error))
                    
                })
                .catch(console.error);
            
                        
            
        }
        
    }

    async init() {
        /*
         * You can optionally define this method which will be run when the bot starts
         * (after login, so discord data is available via this.client)
         */
    }

};