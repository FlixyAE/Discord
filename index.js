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
    .setApplicationId('1356258863116193953')
    .setType('STREAMING')
    .setURL('https://www.twitch.tv/flixy_14') //Must be a youtube video link 
    .setState('AFK')
    .setName('flixy')
    .setDetails(`.gg/hers`)
    .setStartTimestamp(Date.now())
    .setAssetsLargeImage('https://media.discordapp.net/attachments/1194477816448831609/1194479434540011540/banners_pinterest_654429389620007906.jpg?ex=67eb5a29&is=67ea08a9&hm=50838906df5527f6d1e1c1da2ca2c1476979b9e3a30e1482c8f646930309cd4e&') //You can put links in tenor or discord and etc.
    .setAssetsLargeText('linktr.ee/flixy.ae.') //Text when you hover the Large image
  .setAssetsSmallImage('') //You can put links in tenor or discord and etc.
    .setAssetsSmallText('') //Text when you hover the Small image
    .addButton('My Links', 'https://linktr.ee/flixy.ae')
    .addButton('nitro giveaway', 'https://discord.gg/hers');

    client.user.setActivity(r);
    client.user.setPresence({ status: "dnd" }); //dnd, online, idle, offline

    let prevTime = null;
    setInterval(() => {
      const newTime = formatTime();
      if (newTime !== prevTime) {
        const newDetails = `.gg/hers`;
        r.setDetails(newDetails);
        client.user.setActivity(r);
        prevTime = newTime;
      }
    }, 1000); // Update every second
  });

  client.login(process.env['TOKEN']);
