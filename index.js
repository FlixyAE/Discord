const Discord = require('discord.js-selfbot-v13');
const client = new Discord.Client({
  readyStatus: false,
  checkUpdate: false
});

const keepAlive = require('./server.js');
keepAlive();

function formatTime() { //Credits to himika#0001 and never#0001
  const date = new Date();
  const options = {
    timeZone: 'Europe/Oslo', //https://www.zeitverschiebung.net/en/ and find your city and enter here
    hour12: true,
    hour: 'numeric',
    minute: 'numeric'
  };
  return new Intl.DateTimeFormat('en-US', options).format(date);
}

client.on('ready', async () => {
  console.clear();
  console.log(`${client.user.tag} - rich presence started!`);

  const r = new Discord.RichPresence()
    .setApplicationId('1208392776413220865')
    .setType('STREAMING')
    .setURL('https://www.twitch.tv/flixy_14') //Must be a youtube video link 
    .setState('AFK')
    .setName('𝓕𝓛𝓘𝓧𝓨❦')
    .setDetails(`linktr.ee/flixy.ae`)
    .setStartTimestamp(Date.now())
    .setAssetsLargeImage('https://media1.giphy.com/media/I6wUi5eTdUCWI/giphy.gif') //You can put links in tenor or discord and etc.
    .setAssetsLargeText('Forreal.') //Text when you hover the Large image
  .setAssetsSmallImage('https://media1.giphy.com/media/D6aoDE0OSYiYojubBW/giphy.gif?cid=6c09b952joz86vbpk26r0wnvpq9vbbb481l49inc8yz9veyl&ep=v1_internal_gif_by_id&rid=giphy.gif&ct=s) //You can put links in tenor or discord and etc.
      .setAssetsSmallText('verified.') //Text when you hover the Small image
      .addButton('My Links', 'https://linktr.ee/flixy.ae')
      .addButton('gg/frieza', 'https://discord.gg/frieza');

    client.user.setActivity(r);
    client.user.setPresence({ status: "online" }); //dnd, online, idle, offline

    let prevTime = null;
    setInterval(() => {
      const newTime = formatTime();
      if (newTime !== prevTime) {
        const newDetails = `linktr.ee/flixy.ae`;
        r.setDetails(newDetails);
        client.user.setActivity(r);
        prevTime = newTime;
      }
    }, 1000); // Update every second
  });

  client.login(process.env['TOKEN']);
