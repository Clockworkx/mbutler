const { Command, CommandoClient } = require('discord.js-commando');
const { Reminder } = require('../../dbObjects')
const moment = require('moment')
const schedule = require('node-schedule');
const { format, addHours, addDays, addMinutes, addSeconds, differenceInSeconds, compareAsc } = require('date-fns') 
const { return_number } = require('../../helper/argumentHelper')
const Sequelize = require('sequelize');


module.exports = class ReminderCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'remind',
			group: 'utility',
			memberName: 'reminder',
			description: 'reminds you',
			aliases: ['rmd', 'remind'],
            args: [
				{
                    key: 'content',
                    prompt: 'What shall I remind you about?',
                    type: 'string',
				},
				{
                    key: 'time',
                    prompt: 'time',
                    type: 'integer',
				},
				{
                    key: 'time_unit',
                    prompt: 'time_unit',
					type: 'string',
					oneOf: ['minutes','minute', 'hour', 'hours','day', 'days']
                },
            ],
		});
	}

	async run(message, { content, time, time_unit }) {
		
		// const tests = [
		// 		Reminder.upsert({ discord_id: '1', reminder_content: 'Tea', date: addSeconds(new Date(), 30), is_reminded:false }),
		// 		Reminder.upsert({ discord_id: '1', reminder_content: 'Tea2', date: addSeconds(new Date(), 60), is_reminded:false }),
		// 		Reminder.upsert({ discord_id: '1', reminder_content: 'Tea3', date: addSeconds(new Date(), 120), is_reminded:false }),
		// 	];
		// 	await Promise.all(tests);
		
		let now = new Date();
		let execution_date;

		time_unit = time_unit.toLowerCase();
		
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
		//let test = now.toISOString();
		//console.log(test)
		//var dateString = now.toString();

		//add reminder to database
		Reminder.create({
			discord_id: message.author.id,
			reminder_content: content,
			date: execution_date,
			is_reminded: false
		}).then(reminder => {
			//console.log('reminder object', reminder)
			start_reminder(execution_date, reminder, this.client)
			message.channel.send(`I will remind you in ${time} ${time_unit} about **${reminder.reminder_content}**`)
			//message.say(`Reminder \"${reminder.reminder_content}\" added id: ${reminder.id} date: ${reminder.date}`);
			
			//console.log('job', job)
			
		}).catch(error => console.log(error))

		// if (content === 'list' || content === '-l'){
		// 	const tagList = await Reminder.findAll({ attributes: ['reminder_content', 'id'] });
		// 	console.log('find all', tagList)
		// 	const tagString = tagList.map(t => t.reminder_content + t.id) || 'No tags set.';
		// 	console.log('find all', tagString)
		// 	message.say(tagList)
		// 	return message.channel.send(`List of tags: ${tagString}`);
		// }


		// equivalent to: SELECT * FROM tags WHERE name = 'tagName' LIMIT 1;
		// add tag
		// const tag = await Reminder.findOne({
		// 	where: {
		// 		reminder_content: content,
		// 		is_reminded: false
		// 	} 
		// });
		// console.log('find one', tag)
		
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

function start_reminder (date, reminder, message) {

	let job = schedule.scheduleJob(date, function(){
		message.users.get(reminder['discord_id']).send(`You wanted me to remind you about: **${reminder['reminder_content']}**`);

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