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
    .setURL('https://www.twitch.tv/the_flixy15') //Must be a youtube video link 
    .setState('Most Likely AFK')
    .setName('Forreal')
    .setDetails(`linktr.ee/flixy.ae.`)
    .setStartTimestamp(Date.now())
    .setAssetsLargeImage('https://i.pinimg.com/originals/b6/4f/7e/b64f7e4f813385e4de1ee3f30241e320.gif') //You can put links in tenor or discord and etc.
    .setAssetsLargeText('AFK.') //Text when you hover the Large image
.setAssetsSmallImage('https://cdn.discordapp.com/emojis/1173090926080577706.gif') //You can put links in tenor or discord and etc.
    .setAssetsSmallText('𝓕𝓛𝓘𝓧𝓨❦.') //Text when you hover the Small image
    .addButton('Join The Discord Server', 'https://discord.gg/frieza')
    .addButton('My Links', 'https://linktr.ee/flixy.ae')

  client.user.setActivity(r);
  client.user.setPresence({ status: "online" }); //dnd, online, idle, offline

  let prevTime = null;
  setInterval(() => {
    const newTime = formatTime();
    if (newTime !== prevTime) {
      const newDetails = `linktr.ee/flixy.ae.`;
      r.setDetails(newDetails);
      client.user.setActivity(r);
      prevTime = newTime;
    }
  }, 1000); // Update every second
});

client.login(process.env['TOKEN']);
