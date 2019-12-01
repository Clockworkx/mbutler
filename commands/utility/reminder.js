const { Command } = require('discord.js-commando');
const { Reminder } = require('../../dbObjects')
const moment = require('moment')
const schedule = require('node-schedule');
const { format, addHours, addDays, addMinutes, addSeconds, differenceInSeconds } = require('date-fns') 
const { return_number } = require('../../helper/argumentHelper')
const Sequelize = require('sequelize');


module.exports = class ReminderCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'r',
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
					oneOf: ['minutes', 'hours', 'days']
                },
            ],
		});
	}

	async run(message, { content, time, time_unit }) {

		let now = new Date();
		let execution_date;
		time_unit = time_unit.toLowerCase()
		console.log('date at call', now)

		if (time_unit === 'minute' || time_unit === 'minutes'){
			execution_date = addSeconds(now, time)
		} 
		if (time_unit === 'hour' || time_unit === 'hours'){
			execution_date = addHours(now, time)
		}
		if (time_unit === 'day' || time_unit === 'days'){
			execution_date = addDays(now, time)
		} 
		//console.log('execution date', datee)
		
		//add reminder to database
		Reminder.create({
			discord_id: message.author.id,
			reminder_content: content,
			date: addSeconds(now, 3),
			is_reminded: false
		}).then(reminder => {
			message.say(message.author.id)
			//console.log('reminder object', reminder)
			message.say(`Reminder \"${reminder.reminder_content}\" added id: ${reminder.id} date: ${reminder.date}`);
			let job = schedule.scheduleJob(reminder.date, function(){
				let schedule_now = new Date();
				console.log('The world is going to end today.');
				console.log('difference between dates in sec ',differenceInSeconds(now, schedule_now))
				Reminder.update({
					is_reminded: true
				  }, {
					where: { id: reminder.id },
					returning: true,
				  })
				  .then(result => {
					//console.log('number of rows affected: ', result[0]);
					//console.log('object affected:', result[1]);
					// result = [x] or [x, y]
					// [x] if you're not using Postgres
					// [x, y] if you are using Postgres
				  }).catch(error => console.log(error));
			})
			//console.log('job', job)
			//console.log('next invo', job.nextInvocation());
		}).catch(error => console.log(error))

		if (content === 'list' || content === '-l'){
			const tagList = await Reminder.findAll({ attributes: ['reminder_content', 'id'] });
			console.log('find all', tagList)
			const tagString = tagList.map(t => t.reminder_content + t.id) || 'No tags set.';
			console.log('find all', tagString)
			message.say(tagList)
			return message.channel.send(`List of tags: ${tagString}`);
		}


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