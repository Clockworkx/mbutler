const { MessageEmbed } = require('discord.js');
const Discord = require('discord.js');
const Canvas = require('canvas');
const { colorRolesDb, colorRolesUser, colorRolesServer } = require('../../dbObjects')
/**
* @param {import('klasa').KlasaMessage} message
*/

const { Command, RichDisplay } = require('klasa');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: 'color',
            enabled: true,
            runIn: ['text', 'dm', 'group'],
            cooldown: 0,
            deletable: false,
            bucket: 1,
            aliases: ['c'],
            guarded: false,
            nsfw: false,
            permissionLevel: 0,
            promptLimit: 1,
            requiredPermissions: [],
            requiredSettings: [],
            subcommands: true,
            description: 'assign your display color and see a list of available colors',
            quotedStringSupport: true,
            usage: '<add|list|get:default> (roleName:RoleName) (color:color) [member:member]',
            usageDelim: ' ',
            extendedHelp: 'No extended help available.'
        });

        this.createCustomResolver('color', (arg, possible, msg, [arg1]) => {
            if (arg1 !== 'add') return undefined
            if (arg1 === 'add' && arg) return arg
            else throw 'missing color';
        })

        this.createCustomResolver('rolename', (arg, possible, msg, [arg1]) => {
            if (arg1 === 'list') return undefined
            if (['get', 'add'].includes(arg1)) console.log('yes')
            if (['get', 'add'].includes(arg1) && arg) {
                console.log('yes2', arg)
                return arg


            }
            else throw 'missing role name';
        })
    }

    async add(message, [roleName, color]) {
        message.guild.roles.create({
            data: {
                name: roleName,
                color: color,
                position: 1,
            },
            reason: 'Color Group',
        }).then(role => {
            colorRolesServer.create({
                roleId: role.id,
                roleName: role.name,
                roleHexColor: role.hexColor,
            }).then(color => {
                console.log('color object', color)
            }).catch(error => console.log(error))
            let embed = new MessageEmbed()
                .setColor(color)
                .setDescription(`Group ${role.color} added`)
            message.channel.send(embed)
        }).catch(console.error);
    }

    async list(message, [emoji_input]) {
        const colorRoles = await colorRolesDb.findAll();
        const canvas = Canvas.createCanvas(950, 700);
        const ctx = canvas.getContext('2d');

        Canvas.registerFont('assets/fonts/Lato-Regular.ttf', { family: 'Lato-Regular' })
        ctx.font = 'bold 32px "Lato-Regular"';

        let xOffset = 0;
        let yOffset = 30;
        for (let i = 0; i < colorRoles.length; i++) {
            if (i % 17 === 0 && i !== 0) {
                console.log('truze')
                xOffset += 300
                yOffset = 30
            }
            ctx.fillStyle = colorRoles[i].roleHexColor;
            ctx.fillText(colorRoles[i].roleName, xOffset, yOffset); //
            yOffset += 610 / 17;

        }
        const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'colorlist.png');
        message.channel.send(attachment);
    }

    async get(message, [colorRoleName, color, member]) {
        let target;
        if (member === message.author) target = message.author;
        else target = member;
        console.log('target', message.member)
        console.log('target id', message.member.id)

        message.guild.roles.fetch()
            .then(async roles => {
                let colorRole = roles.cache.find(roles => roles.name.toLowerCase() === colorRoleName.toLowerCase())
                if (colorRole) {
                    target.roles.add(colorRole)
                        .then(async member => {
                            const currentColorRolesUser = await colorRolesUser.findOne({
                                where: { DiscordUserId: target.id, guildID: message.guild.id }
                            })

                            if (currentColorRolesUser === null) {
                                console.log('new color user')

                                await colorRolesUser.create({
                                    DiscordUserId: target.id,
                                    CurrentRole: colorRole.name,
                                    guildID: message.guild.id
                                }).then(ColorUser => {
                                    console.log('ColorRolesUser created', ColorUser)
                                }).catch(error => console.log(error))

                            }
                            else {
                                console.log('color user existent')

                                const previousColorRoleName = currentColorRolesUser.CurrentRole
                                console.log('prev role name', previousColorRoleName)
                                const previousColorRole = message.guild.roles.cache.find(roles => roles.name === previousColorRoleName)
                                console.log('prev color role', previousColorRole.name)

                                if (previousColorRole === colorRole) {

                                    console.log('same color role')
                                    return;
                                }

                                target.roles.remove(previousColorRole)

                                colorRolesUser.update({
                                    CurrentRole: colorRole.name
                                }, {
                                    where: { DiscordUserId: target.id, guildID: message.guild.id },
                                    returning: true,
                                }).then(result => {
                                    console.log('color user updated:')
                                    //console.log('Current Role updated:', result[1][0]['CurrentRole'])
                                }).catch(error => console.log(error));
                            }
                        })
                    let sucessEmbed = new MessageEmbed()
                        .setColor(colorRole.hexColor)
                        .setDescription(`${target} your namecolor is now ${colorRole.name}`)
                    message.send(sucessEmbed)
                }
                else message.send('Not a color')
            })
    }

    async init() {
        /*
         * You can optionally define this method which will be run when the bot starts
         * (after login, so discord data is available via this.client)
         */
    }

};
