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
    timeZone: 'America/New_York', //https://www.zeitverschiebung.net/en/ and find your city and enter here
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
    .setApplicationId('1199302612357492746')
    .setType('STREAMING')
    .setURL('https://www.youtube.com/watch?v=XQ9qdj6OOaU') //Must be a youtube video link 
    .setState('Your State')
    .setName('mrnekrozyt')
    .setDetails(`linktr.ee/flixy.ae [${formatTime()}]`)
    .setStartTimestamp(Date.now())
 .setAssetsLargeImage('https://media4.giphy.com/media/l46CAVjYnwLGTwG5O/giphy.gif') //You can put links in tenor or discord and etc.
    .setAssetsLargeText('Large Text') //Text when you hover the Large image
    .setAssetsSmallImage('https://c.tenor.com/TgKK6YKNkm0AAAAi/verified-verificado.gif') //You can put links in tenor or discord and etc.
    .setAssetsSmallText('Small Text') //Text when you hover the Small image
    .addButton('Discord Server', 'discord.gg/obiwan')
    .addButton('Youtube Channel', 'https://www.youtube.com/channel/UCNyMQIrAVUW5lS3t72fkKqQ');

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
