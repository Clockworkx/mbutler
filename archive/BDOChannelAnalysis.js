BDOChannelAnalysis// const log = console.log.bind(console);
// const watcher = chokidar.watch(folder, {
//     ignored: 'C:/Users/Marco/Desktop/Neuer Ordner (3)/Logs/engine', 
//     persistent: true,
//     ignoreInitial: true,
//     depth: 0,
// })

    //     .map((file) => {
    //     accumStats = fs.statSync(logPath + file)
    //     currValStats = fs.statSync(logPath + file)
           
    //     console.log(file);
        
    //     console.log(stats.mtime);
    //     console.log(stats.ctime);
    
    // })
  //  let lastLine = 0;
    // watcher
    // .on('ready', async () => {
    //    //console.log(watcher.getWatched())
    //    const w = watcher.getWatched()
    //    for (const [k, v] of Object.entries(w)) {
    //       // console.log(w[k])
    //        //await watcher.unwatch(w[k])
    //    }
    //    //console.log(watcher.getWatched())

    //     watcher.on('add', async filePath => {
    //       //  console.log('PATH', filePath)
    //       log(`File ${filePath} has been added`)
    //     })
            
    //     watcher.on('change', file => {
    //         log(`File ${file} has been changed`)
    //         // readLastLines.read(filePath, 1)
    //         // .then((lines) => console.log(lines));
    //         isKeywordInFile(file, ['channel', 'stuck'])


               
            
         //   console.log(watcher.getWatched())
//         })
//     })

//   .on('unlink', path => log(`File ${path} has been removed`))

let channel = {
    channelName: '',
    disconnects: 0,
}

let spots = []

let spot = {
    spotName: '',
    channelData: [],
    timeSpentDisconnected: 0
}
// const newClicks = { 
//     ...clicks, 
//     left: clicks.left + 1 
//   }
//   setClicks(newClicks)
// }

let spotName = 'hystria'

spots.push(
    {...spot,
        spotName: spotName}
    )
console.log(spots)

