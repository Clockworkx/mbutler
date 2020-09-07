const chokidar = require('chokidar')
const path = require('path')
const Stream = require('stream')
const fsp = require('fs').promises
const readline = require('readline')
const readLastLines = require('read-last-lines');
const { compareAsc, parseISO } = require('date-fns')
const fs = require('fs')
const findProcess = require('find-process')
const find = require('find-process')
const soundPlay = require('sound-play')
const { Message } = require('discord.js')
Tail = require('tail').Tail;

const logPath = 'C:/Users/Marco/Desktop/third order/rocketleague/Logs/'
const lootPath = 'C:/Users/Marco/Desktop/third order/rocketleague/Scripts/BDO/scripts/LootTracker/Sessions/'



module.exports = {
    BDOLogChecker: async function (client) {
        // setInterval(async () => await getLatestFile(logPath, file => 
        //     console.log('callback file', file) ),
        //     1000)
        let channel = await client.guilds.cache.find(g => g.id === '561278369728299016').channels.cache.find(c => c.id === '655444733572939777')
        // quizMessage = await channel.send('works')

        // await getLatestFile(logPath)

        const warningSoundPath = path.join(__dirname, '/../assets/sound/', 'warning.mp3')
        const latestLog = await getLatestFile(logPath)

        console.log(logPath + latestLog)
        tail = new Tail(logPath + latestLog, {logger: console})
        tail.on('line', (data) => {
            console.log(data)
            if (['channel', 'ReEnterManager', 'stuck'].some(e => {data.includes(e)})) {
                console.log('IN Channel Select', data)
                if (data.includes('stuck')) {
                    soundPlay.play(warningSoundPath).then(() => console.log('done'))
                    console.log('STUCK!')
                }
                channel.send(data)
            }

        })
        tail.on("error", function(error) {
            console.log('ERROR: ', error);
          });
        const watcher = chokidar.watch(logPath, {
            ignored: /(^|[\/\\])\../, // ignore dotfiles
            persistent: true
        });

        watcher
            .on('ready', () => {
                console.log(logPath)
                console.log('ready')
                watcher.on('add', path => {
                    const newPath = path.replace(/\\/g,'/',)
                    console.log('newpath', newPath)
                    console.log(`File ${path} has been added`)
                    console.log(tail)
                    tail.unwatch()
                    console.log(tail)
                    tail = new Tail(newPath)
                    tail.on('line', (data) => {
                        console.log(data)
                        if (['channel', 'ReEnterManager'].some(e => data.includes(e))) {
                            console.log('IN Channel Select', data)
                            channel.send(data)
                        }
            
                    })
                    tail.on("error", function(error) {
                        console.log('ERROR: ', error);
                      });

                })
                //.on('change', path => console.log(`File ${path} has been changed`))
                .on('unlink', path => console.log(`File ${path} has been removed`));
            })



        isKeywordInFile(logPath + latestLog, ['Player'])
        //watchFile(logPath + latestLog)
        //await getLatestFile(logPath, callback, errorCB)
        //const latestFile = await getLatestFile(logPath, (e) => console.log('callback', e))
        // console.log(latestFile)
        // 
        isProcessRunning()

    },
    getLootStats, isProcessRunning2
}



function watchFile(file) {
    let fsWait = false;

    fs.watch(file, (event, filename) => {
        if (filename) {
            if (fsWait) return
            fsWait = setTimeout(() => {
                fsWait = false
            }, 1000)
            console.log(filename, 'changed')
        }
    })
}
async function isKeywordInFile(filePath, keywords) {
    const fileStream = fs.createReadStream(filePath)

    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    })
    // Note: we use the crlfDelay option to recognize all instances of CR LF
    // ('\r\n') in input.txt as a single line break.
    let lineCount = 0
    let i = 0
    for await (const line of rl) {
        // console.log(keywords)
        if (keywords.some(elementValue => line.includes(elementValue))) console.log('line', lineCount, line)
        lineCount++
        //if (line.includes('channel')) console.log('line', i, line)
        //console.log(line)

    }
    console.log('Lines', lineCount)
    return

}
//function getLatestFile(folder, callback = (e) => { console.log(e); return}, error = (ecb) => {console.log(ecb)} ) {
// function getLatestFile(folder, callback, error) {
//     const defaultCallback = (e) => console.log(e, 'is not a function')
//     console.log('first c')
//     fsp.readdir(folder, { withFileTypes: true }).then(async files => {
//         const latestFile = await files.filter(e => e.isFile())
//         .map(e => e.name)
//         .reduce( async (accumulator, currentValue) => {
//             let accumStats = (await fsp.stat(folder + await accumulator)).mtime
//             let currValStats = (await fsp.stat(folder + await currentValue)).mtime
//             if (compareAsc(accumStats, currValStats)) return currentValue
//             else return accumulator
//         })

//         if (callback != undefined) {
//             if (typeof callback == "function") {
//                 callback(latestFile)
//             } else {
//                 defaultCallback(latestFile)
//             }
//         } else {
//             defaultCallback(latestFile)
//         }
//     }).catch(err => {
//         if (err != undefined) {
//             if (typeof err == "function") {
//                 error(err)
//             } else {
//                 defaultCallback(err)
//             }
//         } else {
//             defaultCallback(err)
//         }   
//     })
// }       

async function getLatestFile(folder) {
    const files = await fsp.readdir(folder, { withFileTypes: true });
    console.log(files.length)
    const latestFile = files.filter(e => e.isFile())
        .map(e => e.name)
        .reduce(async (accumulator, currentValue) => {
            let accumStats = (await fsp.stat(folder + await accumulator)).mtime
            let currValStats = (await fsp.stat(folder + await currentValue)).mtime
            if (compareAsc(accumStats, currValStats)) return currentValue
            else return accumulator
        });

    return latestFile;
}

// function getLootStats () {
//     getLatestFile(lootPath, latestFile => {
//         return fsp.readFile(lootPath + latestFile, 'utf-8')
//           .then(loot => {
//             const a = JSON.parse(loot)
//             console.log(a)
//         })
//       })
// }

async function getLootStats() {
    const latestFile = await getLatestFile(lootPath);
    console.log('latestFile', latestFile)
    const loot = await fsp.readFile(lootPath + latestFile, 'utf-8');
    return JSON.parse(loot);
}

function isProcessRunning() {
    find('name', 'BlackDesert64', true).then(list => {
        if (list.length) console.log(`${list[0].name} Running with ppid: ${list[0].ppid} pid: ${list[0].pid}`)

        const warningSoundPath = path.join(__dirname, '/../assets/sound/', 'warning.mp3')

        if ((!list.length)) {
            soundPlay.play(warningSoundPath).then(() => console.log('done'))
            console.log('BDO CRASHED!')
        }
        setTimeout(() => {
            isProcessRunning()
        }, 60000)
    })
}

// function isProcessRunning2 () {
//     const running = find('name', 'Programmname', true).then(list => {y
//         console.log('running', running)
//         if (list.length) return true
//         if (!list.length) return false
//     })
//     return running
// }


async function isProcessRunning2() {
    const programList = await find('name', 'BlackDesert64', true)
    //console.log('pl', programList)
    if (programList.length) return true
    if (!programList.length) return false
}

