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
    timeZone: 'GMT/UTC', //https://www.zeitverschiebung.net/en/ and find your city and enter here
    hour12: false,
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
    .setURL('https://www.twitch.tv/the_flixy15') //Must be a youtube video link 
    .setState('Might Be Afk')
    .setName('mrnekrozyt')
    .setDetails(`linktr.ee/flixy.ae [${formatTime()}]`)
    .setStartTimestamp(Date.now())
 .setAssetsLargeImage('https://cdn.discordapp.com/attachments/1164832441639379026/1207996512777404448/542E67BF-6022-463F-95FC-2D74ED6F5C33.gif?ex=65e1ad6c&is=65cf386c&hm=187b74e1e29b731b437c15ed275aa6caebb03d33118043849f3b0a292df52563&') //You can put links in tenor or discord and etc.
    .setAssetsLargeText('My Time') //Text when you hover the Large image
    .setAssetsSmallImage('https://cdn.discordapp.com/emojis/1173090926080577706.gif') //You can put links in tenor or discord and etc.
    .setAssetsSmallText('Insert Here') //Text when you hover the Small image
    .addButton('Join The Discord Server', 'https://discord.gg/obiwan')
    .addButton('Subscribe To My Youtube Channel', 'https://www.youtube.com/@FlixyAE');

  client.user.setActivity(r);
  client.user.setPresence({ status: "dnd" }); //dnd, online, idle, offline

  let prevTime = null;
  setInterval(() => {
    const newTime = formatTime();
    if (newTime !== prevTime) {
      const newDetails = `linktr.ee/flixy.ae [${newTime}]`;
      r.setDetails(newDetails);
      client.user.setActivity(r);
      prevTime = newTime;
    }
  }, 1000); // Update every second
});

const mySecret = process.env['TOKEN'];
client.login(mySecret);
