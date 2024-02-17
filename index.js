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
  return new Intl.DateTimeFormat('en-US', options).format(date)
}

client.on('ready', async () => {
  console.clear();
  console.log(`${client.user.tag} - rich presence started!`);

  const r = new Discord.RichPresence()
    .setApplicationId('1136410082255581245')
    .setType('STREAMING')
    .setURL('https://www.twitch.tv/flare_discord') //Must be a youtube video link 
    .setState('AFK')
    .setName('Forreal')
    .setDetails(`Flare Discord Bot.`)
    .setStartTimestamp(Date.now())
    .setAssetsLargeImage('https://tenor.com/view/shadow-the-hedgehog-edgy-moon-cross-arms-teleport-gif-4917223') //You can put links in tenor or discord and etc.
    .setAssetsLargeText('Sleep.') //Text when you hover the Large image
.setAssetsSmallImage('https://c.tenor.com/TgKK6YKNkm0AAAAi/verified-verificado.gif') //You can put links in tenor or discord and etc.
    .setAssetsSmallText('verified.') //Text when you hover the Small image
    .addButton('Invite No one', 'https://discord.gg/obiwan')
    .addButton('Subscribe To My YT', 'https://www.youtube.com/channel/UCNyMQIrAVUW5lS3t72fkKqQ/');

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
