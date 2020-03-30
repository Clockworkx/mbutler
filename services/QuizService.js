const Discord = require('discord.js')
const schedule = require('node-schedule');
const RichDisplay = require('klasa')
const { addSeconds } = require('date-fns')
const fetch = require('node-fetch')
const { isUnit, generate_pages, display_page, decodeHtml, shuffleArray } = require('../util/util')
const emojiCharacters = require('../util/emojiCharacters');
const { Points } = require('../dbObjects')
 
module.exports = {
    quizService: async function (client) {
        const filter = (reaction, user) => {
            return [emojiCharacters[1], emojiCharacters[2], emojiCharacters[3], emojiCharacters[4]]
            .includes(reaction.emoji.name) && user.id !== client.user.id
                //  reaction.emoji.name.includes'👌' //;
        };
        let date = startQuestion()
        
        schedule.scheduleJob('*/1 * * * *', async function() {
            let question = await getQuestion()
            let questionText = decodeHtml(question.results[0].question)
            console.log('after func', question)

            let pointsMultiplier;
            const difficulty = question.results[0].difficulty.toLowerCase()
            if (difficulty === 'easy') pointsMultiplier = 1
            else if (difficulty === 'medium') pointsMultiplier = 3
            else if (difficulty === 'hard') pointsMultiplier = 6
            const earnablePoints = pointsMultiplier * 5

            
            let questionEmbed = new Discord.MessageEmbed()
            .setTitle('Quiz Question!')
            .setColor('RANDOM')
            .setThumbnail('https://i.imgur.com/P5qgda0.png')
            .setDescription(`${questionText}\n**Reward ${earnablePoints}** points 💰`);
            
            let answerEmojis = [];
            
            let correctAnswer
            if (question.results[0].type === 'boolean') {
                questionEmbed.addField('***1***', 'True', true).addField('***2***', 'False', true);
                for (let i = 0; i < 2; i++) {
                    answerEmojis.push(emojiCharacters[i+1])
                }
                answerEmojis.push()

            }
            else {
                let options = question.results[0].incorrect_answers.map(s => decodeHtml(s));
                options.push(decodeHtml(question.results[0].correct_answer))
                shuffleArray(options)
                console.log(options)
                correctAnswer = options.indexOf(question.results[0].correct_answer) +1
                console.log('corr ans', correctAnswer)
                for (let i = 0; i < 4; i++) {
                    let inline = true;
                    // console.log(i+1)
                    // if ((i+1) % 3 === 0)
                    // console.log(inline)
                    questionEmbed.addField(`***${i+1}***`, options[i], inline);
                    answerEmojis.push(emojiCharacters[i+1])
                }
            }
            
            let channel = await client.guilds.cache.find(g => g.id === '401377808322002944').channels.cache.find(c => c.id === '694211415317282916')
      
            quizMessage = await channel.send(questionEmbed)
            
                for (emoji of answerEmojis) {
                    await quizMessage.react(emoji)
                }
            
                let collectedAnswers = await quizMessage.awaitReactions(filter, { max: 4, time: 15000, });
                // errors: ['time']  // 
                console.log('size', collectedAnswers.size)
               for (let i = 0; i < collectedAnswers.size; i++) {
                   console.log('has?', collectedAnswers.has(emojiCharacters[i+1]))
                   if (collectedAnswers.has(emojiCharacters[i+1])) {
                       console.log(emojiCharacters[correctAnswer])
                       console.log('get', collectedAnswers.get(emojiCharacters[i+1]))
                   }
                   
               }
            
            if(collectedAnswers.size > 0) {
                let candidates = collectedAnswers.get(emojiCharacters[correctAnswer])
               // console.log('candidates', candidates.users.cache)
              //  console.log('reaction', candidates.emoji)
                //channel.send(`winners size ${candidates.users.cache.size-1}`)
                winners = verifyCandidates(candidates.users.cache, collectedAnswers)
                console.log('final winners', winners)
                winnerString = winners.map(w => w.username).join(', ')
                channel.send(`${winnerString} have answered correctly and earned ${earnablePoints} points 💰`)
                console.log(winnerString)
                // for (let i = 0; i < winners.length; i++) {
                //     console.log(winners[i].username)
                //     channel.send(winners[i].toString())
                // }

                const receivedEmbed = quizMessage.embeds[0];
                const resolvedQuizEmbed = new Discord.MessageEmbed(receivedEmbed).addField('Correct answer:', question.results[0].correct_answer)
                quizMessage.edit(resolvedQuizEmbed)

                distributeRewards(winners, earnablePoints, channel)
                }
                else channel.send('Not enough participants')
            } 
             // if (question.results[0].type === 'multiple') {
            //     // for (let [key, value] of collectedAnswers) {
            //     //     console.log(key + " = " + value)
            //     // }
            //    // checkWinners()
            //     channel.send(`winners are ` )

            // }
            // else {
                
            // } 
            )
    } 
}

//function announceWinners() 

async function distributeRewards(winners, earnablePoints, channel) {
    for (let i = 0; i < winners.length; i++) {
        const UserPoints = await Points.findOne({
            where: { DiscordUserId: user.id } })
            .then()
            
            if (UserPoints) {
                const points = UserPoints.Points + earnablePoints
                await Points.update({ Points: points }, {
                    where: {
                      DiscordUserId: winners[i].id
                    }
                  }).then(console.log(`${winners[i].username} has earned ${points} points 💰`))
            }
            else{
                await Points.create({
                    DiscordUserId: winners[i].id,
                    Points: earnablePoints,
                }).then(Points => {
                   // console.log('Points inserted for', Points)
                    console.log(`${winners[i].username} ${earnablePoints} points 💰`)
                }).catch(error => console.log(error))
    
            }
        
    }
    

                    
}

function verifyCandidates(candidates, collectedAnswers) {
    
    let winners = [];
    
        for ([idd, user] of candidates) {
            if (user.bot === true) continue;
            console.log('Candidate', user)

            let givenAnswers = 0;
            for ([key, value] of collectedAnswers) {
                
                console.log('Answer emoji', value.users.reaction.emoji.name)
                
                //if (collectedAnswers.has(value2.emoji)){
                   // console.log('key, vlaue of 2nd', key, value.users.reaction)

                    //if (value.users.cache.has(user))
                    console.log('has given answer to emoji: ', value.users.cache.has(user.id) )
                    if (value.users.cache.has(user.id)) givenAnswers += 1;
                    console.log('given answers', givenAnswers)
                  //  let currentAnswer = collectedAnswers.get(collectedAnswers)
                    //if (currentAnswer.users.cache.has(value)) console.log('current candidate', value) 
                   // winners.push(value)
               // }
                
            }
            if (givenAnswers < 2) winners.push(user)
            else continue;
        }
        
    if (winners.length === 0) return 'No one has answered correctly!';
    return winners;
}

function checkWinners(collectedReactions, candidates) {
    const optionsChosen = collectedReactions.size
    if (optionsChosen > 1) {
        for (candidate of candidates) {}
    }

}

async function getQuestion() {
    let tokenRequest = await fetch('https://opentdb.com/api_token.php?command=request', {
            method: 'get'
        }).then(response => response.json()).catch(err => message.channel.send('Could not retrieve session token'))

    const questionApiURL = 'https://opentdb.com/api.php?amount=1&type=multiple' + `&token=${tokenRequest.token}`
    
    const question = await fetch(questionApiURL, {
        method: 'get',
        //headers: headers
    }).then(response => response.json()).catch(err => message.channel.send('No question found'))

    console.log(question.results[0])
    return question

}

function startQuestion() {
    let rdate = new Date();
    let date = addSeconds(rdate, 5)
    return date;
 }


//  // async-await
// client.on('event', async (parameter) => {
//     // async function scope
//     try {
//       const value = await parameter.doPromisifiedAction();
//       // repeat pattern of awaiting promises to both wait for their completion and to get their values, storing the value in variables for reference
//     } catch (e) {
//       console.error(e);
//       // if any of the awaited promises fail, catch the error(s)
//     }
//   });
  
//   // then
//   client.on('event', (parameter) => {
//     parameter.doPromisifiedAction()
//       .then((value) => {
//         // do stuff with the `value`, return what you want to be available in the next `then` you chain
//       })
//       .then((something) => {
//         // do more stuff with the `something` received from the previous then
//         // repeat pattern of chaining `then`s for proper order of completion amongst promise operations
//       })
//       .catch(console.error);
//   });