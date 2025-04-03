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
    .setApplicationId('1253738152166690866')
    .setType('STREAMING')
    .setURL('https://youtube.com/watch?si=durCNX7E87lw0hwW&v=AjWfY7SnMBI&feature=youtu.be') //Must be a youtube video link 
    .setState('join for nitro gw')
    .setName('flixy')
    .setDetails(`/hers`)
    .setStartTimestamp(Date.now())
    .setAssetsLargeImage('https://cdn.discordapp.com/attachments/1194477816448831609/1194479107443003452/banners_pinterest_654429389619273739.jpg?ex=67eb59db&is=67ea085b&hm=491166f8b09a3afc62af093cb59ef66fe2fe8fcdebe21fcc9f7d7fb32f33dd6c&') //You can put links in tenor or discord and
    .setAssetsLargeText('') //Text when you hover the Large image
    .setAssetsSmallImage('') //You can put links in tenor or discord and etc.
    .setAssetsSmallText('Small Text') //Text when you hover the Small image
    .addButton('nitro giveaway', 'https://discord.gg/hers')
    .addButton('join server', 'https://discord.gg/hers');

  

  client.user.setActivity(r);
  client.user.setPresence({ status: "dnd" }); //dnd, online, idle, offline

  let prevTime = null;
  setInterval(() => {
    const newTime = formatTime();
    if (newTime !== prevTime) {
      const newDetails = `/hers`;
      r.setDetails(newDetails);
      client.user.setActivity(r);
      prevTime = newTime;
    }
  }, 1000); // Update every second
});

const mySecret = process.env['TOKEN'];
client.login(mySecret);
