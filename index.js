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
    .setApplicationId('1136410082255581245')
    .setType('STREAMING')
    .setURL('https://www.twitch.tv/flare_discord') //Must be a youtube video link 
    .setState('Hosting')
    .setName('Flare')
    .setDetails(`Flare Discord Bot.`)
    .setStartTimestamp(Date.now())
    .setAssetsLargeImage('https://cdn.discordapp.com/attachments/1164832441639379026/1207996512777404448/542E67BF-6022-463F-95FC-2D74ED6F5C33.gif?ex=65eae7ec&is=65d872ec&hm=482538cd965fc9ec894c88666fb775461ba2453fcf6c7c748c26dd780a3a11d0&') //You can put links in tenor or discord and etc.
    .setAssetsLargeText('Flare logo.') //Text when you hover the Large image
.setAssetsSmallImage('https://media.discordapp.net/attachments/1139564276042965164/1139629624268181535/untitled14.png?width=426&height=426') //You can put links in tenor or discord and etc.
    .setAssetsSmallText('verified.') //Text when you hover the Small image
    .addButton('Invite Flare To Your Server', 'https://google.com')
    .addButton('Github', 'https://google.com');

  client.user.setActivity(r);
  client.user.setPresence({ status: "online" }); //dnd, online, idle, offline

  let prevTime = null;
  setInterval(() => {
    const newTime = formatTime();
    if (newTime !== prevTime) {
      const newDetails = `Flare Discord Bot.`;
      r.setDetails(newDetails);
      client.user.setActivity(r);
      prevTime = newTime;
    }
  }, 1000); // Update every second
});

client.login(process.env['TOKEN']);
