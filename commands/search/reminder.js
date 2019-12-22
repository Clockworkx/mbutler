const { Reminder } = require('../../dbObjects')
const moment = require('moment')
const schedule = require('node-schedule');
const { format, addHours, addDays, addMinutes, addSeconds, differenceInSeconds, compareAsc } = require('date-fns') 
const Sequelize = require('sequelize');
const { isUnit, generate_pages, display_page } = require('../../util/util')
const Countdown = require('moment-countdown');

const { Command, RichDisplay } = require('klasa');
const { MessageEmbed } = require('discord.js');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
			subcommands: true,
			aliases: ['remindme', 'rm'],
			promptLimit: 1,
			usage: '<list|delete|me:default> (reminder_id:id) (text:text) (time:time) (unit:unit) (page:page)',
			usageDelim: ' ',
			description: 'uwu',
			extendedHelp: 'text',
		});

		this.createCustomResolver('id', (arg, possible, msg, [arg1]) => {
			if (arg1 !== 'delete') return undefined 
			if (arg1 === 'delete' &&  !isNaN(arg)) return arg 
			else throw 'missing id';
		})
		.createCustomResolver('text', (arg, possible, msg, [arg1]) => {
			if (arg1 !== 'me') return undefined 
			if (arg) return arg;
			else throw 'Reminder needs content';
		})
		.createCustomResolver('time', (arg, possible, msg, [arg1]) => {
			if (arg1 !== 'me') return undefined 
			console.log('number test',  isNaN(arg))
			if (arg1 === 'me' && !isNaN(arg)) return parseFloat(arg)
			else throw 'provide time';
		})
		.createCustomResolver('unit', (arg, possible, msg, [arg1]) => {
			if (arg1 !== 'me') return undefined 
			if (arg1 === 'me' && isUnit(arg)) return arg.toLowerCase();
			else throw 'time unit (hours/..)';
		})
		.createCustomResolver('page', (arg, possible, msg, [arg1]) => {
			console.log('isnan', isNaN(arg))
			if (arg1 !== 'list' || !arg) return undefined 
			if (arg && isNaN(arg)) throw 'give a page number please';
			return parseInt(arg); 
			
		})
	}
	
	async me(message, [id, text, time, unit]) {
		// console.log('args', message.args)
		// console.log('params', message.params)
		// console.log(text, time, unit)
		// const tests = [
		// 		Reminder.upsert({ discord_id: '1', reminder_content: 'Tea', date: addSeconds(new Date(), 30), is_reminded:false }),
		// 		Reminder.upsert({ discord_id: '1', reminder_content: 'Tea2', date: addSeconds(new Date(), 60), is_reminded:false }),
		// 		Reminder.upsert({ discord_id: '1', reminder_content: 'Tea3', date: addSeconds(new Date(), 120), is_reminded:false }),
		// 	];
		// 	await Promise.all(tests);
		
		let now = new Date();
		let execution_date;

		let time_unit = unit
		
		console.log('date at call', now)

		if (time_unit === 'minute' || time_unit === 'minutes'){
			execution_date = addMinutes(now, time)
		} 
		if (time_unit === 'hour' || time_unit === 'hours'){
			execution_date = addHours(now, time)
		}
		if (time_unit === 'day' || time_unit === 'days'){
			execution_date = addDays(now, time)
		} 


		//add reminder to database
		Reminder.create({
			discord_id: message.author.id,
			reminder_content: text,
			date: execution_date,
			is_reminded: false
		}).then(reminder => {
			//console.log('reminder object', reminder)
			start_reminder(execution_date, reminder, this.client)
			message.channel.send(`I will remind you in ${time} ${time_unit} about **${reminder.reminder_content}**`)
			
		}).catch(error => console.log(error))

		
	}
    async list(message, [,,,,page_number]) {
		console.log('list args', message.args)
		console.log('list params', message.params)
		console.log('number from []', page_number)

			const tagList = await Reminder.findAll({
				attributes: ['reminder_content', 'id', 'date'] ,
				where: {
					discord_id: message.author.id,
					is_reminded: false
				}
			});
			
			const tagString = tagList.map(t => `${t.id} |\t${t.reminder_content} | in ${moment().countdown(t.date)}`) || 'No tags set.';

		if (tagList.length > 0) {
			let pages = generate_pages(tagString, 10)
			//display_page(pages, page_number)
			const list_embed = new RichDisplay(new MessageEmbed()
			.setColor('RANDOM')
			.setTitle('Your Reminders')
			.setDescription('These are your reminders:')
			);


			let to_edit = new MessageEmbed().setDescription('Loading')
			for (let i = 0; i < pages.length; i++){
				list_embed.addPage(template => template.setDescription(`ID\tReminder\n${pages[i]}`));
			}
			list_embed.run(await message.channel.send(new MessageEmbed().setDescription('Loading')))
			//return message.channel.send(`ID\t Reminder\n${pages[page_number-1]}\n\npage ${page_number}/${pages.length}`, { code: 'md' })
		}
		else return message.channel.send('No reminders found.').then(msg => msg.delete({timeout: 15000}));
	}
		
	
	async delete(message, params) {
		console.log('delete')
		var arr = [{key: 1, value: 10}, { key: 2, value: 20}, {key: 3, value: 30}]
		console.log(arr)
		var rarr = arr.map(obj => {
			console.log('obj', obj)
			var r_obj = {};
			console.log('objkey in function', obj.key)
			console.log('objkey in function', obj.value)
			r_obj[obj.key] = obj.value;
			console.log(r_obj)

			return r_obj;
		})
		console.log('key', arr[1].key)
		message.channel.send(arr);

	}
	async test(message, params) {

		const embed = new MessageEmbed().setDescription('embed1');
		const embed2 = new MessageEmbed().setDescription('embed2');
		message.channel.send(embed).then(msg => msg.edit(embed2));
	//	message.channel.send(embed).then(msg => console.log('editable?', msg.editable))
		// const display = new RichDisplay()
        //     .addPage(new MessageEmbed().setDescription('First page'))
        //     .addPage(new MessageEmbed().setDescription('Second page'))
		// 	display.run(await message.send('load'));
		// 	message.channel.send(embed).then(msg => console.log('edited message', msg.editable))
		message.channel.send('const version = 12;', { code: 'js' });




		}
		
	
	
	
};

function schedule_reminders(client) {
	console.log('reminders scheduled.')
	let now = new Date();
	Reminder.findAll({ where: { is_reminded: false } }).then(reminders => {
		
		// projects will be an array of Project instances with the specified name
		for (let i = 0; i < reminders.length; i++) {
			//console.log(reminders[i]['id'])
			//console.log(reminders[i]['reminder_content'])

			//compareAsc 1 if the first after second, -1 if first before second and 0 if equal
			if (compareAsc(reminders[i]['date'], now) === 1){

				start_reminder(reminders[i]['date'], reminders[i], client)
				console.log('start remimders called',reminders[i]['date'] + reminders[i]['id'] )
			}
			else {
				console.log(`${reminders[i]['date']} < ${now}`)
				Reminder.update({
					is_reminded: true
				  }, {
					  where: { id: reminders[i]['id'] },
					  returning: true,
					}).then(result => {
						console.log('is_reminded updated:', result[1][0]['id'])
					}).catch(error => console.log(error));
			}
			
		}
		
	})
}

function start_reminder (date, reminder, client) {

	let job = schedule.scheduleJob(date, function(){
		client.users.get(reminder['discord_id']).send(`You wanted me to remind you about: **${reminder['reminder_content']}**`);

		//console.log('difference between dates in sec ',differenceInSeconds(eh, schedule_now))
		Reminder.update({
			is_reminded: true
		  }, {
			  where: { id: reminder['id'] },
			  returning: true,
			})
			.then(result => {
				let rarray = result[1];
				console.log('is_reminded updated:', result[1][0]['id'])
				console.log(new Date())
				
				//console.log('number of rows affected: ', result[0]);
				//console.log('object affected:', result[1][0]);
				// result = [x] or [x, y]
				// [x] if you're not using Postgres
				// [x, y] if you are using Postgres
			}).catch(error => console.log(error));
		})
		console.log('next invo', job.nextInvocation());	
	}


module.exports.schedule_reminders = schedule_reminders;


//You could derive command, add that method, and then derive that class for those command needing it
