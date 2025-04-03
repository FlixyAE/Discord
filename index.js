const Discord = require('discord.js-selfbot-v13');
const client = new Discord.Client({
  readyStatus: false,
  checkUpdate: false
});

const keepAlive = require('./server.js');
keepAlive();

// Function to format the time (using Europe/Oslo timezone)
function formatTime() { 
  const date = new Date();
  const options = {
    timeZone: 'Europe/Oslo', // Your local timezone
    hour12: false,
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric' // Show seconds as well
  };
  return new Intl.DateTimeFormat('en-US', options).format(date);
}

// Configurations (Config 1 & Config 2) - Do not change anything here
const config1 = {
  streamURL: "https://twitch.tv/twitch",
  state: 'join for nitro gw',
  details: '/hers',
  largeImage: 'https://cdn.discordapp.com/attachments/1194477816448831609/1194479107443003452/banners_pinterest_654429389619273739.jpg?ex=67eb59db&is=67ea085b&hm=491166f8b09a3afc62af093cb59ef66fe2fe8fcdebe21fcc9f7d7fb32f33dd6c&',
  smallImage: '',
  smallText: 'Small Text',
  button1: ['nitro giveaway', 'https://discord.gg/hers'],
  button2: ['join server', 'https://discord.gg/hers']
};

const config2 = {
  streamURL: "https://twitch.tv/twitch",
  state: 'asleep or afk',
  details: '/hers [AFK]',
  largeImage: 'https://cdn.discordapp.com/attachments/1194477816448831609/1194479107443003452/banners_pinterest_654429389619273739.jpg?ex=67eb59db&is=67ea085b&hm=491166f8b09a3afc62af093cb59ef66fe2fe8fcdebe21fcc9f7d7fb32f33dd6c&',
  smallImage: '',
  smallText: 'Small Text',
  button1: ['nitro giveaway', 'https://discord.gg/hers'],
  button2: ['join server', 'https://discord.gg/hers']
};

// Default config
let currentConfig = config1;

client.on('ready', async () => {
  console.clear();
  console.log(`${client.user.tag} - rich presence started!`);

  const r = new Discord.RichPresence()
    .setApplicationId('1253738152166690866')
    .setType('STREAMING')
    .setURL(currentConfig.streamURL)
    .setState(currentConfig.state)
    .setName('flixy')
    .setDetails(currentConfig.details) // Initial details set
    .setStartTimestamp(Date.now())
    .setAssetsLargeImage(currentConfig.largeImage)
    .setAssetsLargeText('')
    .setAssetsSmallImage(currentConfig.smallImage)
    .setAssetsSmallText(currentConfig.smallText)
    .addButton(currentConfig.button1[0], currentConfig.button1[1])
    .addButton(currentConfig.button2[0], currentConfig.button2[1]);

  client.user.setActivity(r);
  client.user.setPresence({ status: "dnd" }); // dnd, online, idle, offline

  let prevTime = null;
  setInterval(() => {
    const newTime = formatTime(); // Get formatted time in Europe/Oslo timezone
    if (newTime !== prevTime) {
      // Dynamically update the `details` to show current time
      const newDetails = `${currentConfig.details} | Current time: ${newTime}`; 
      r.setDetails(newDetails); // Update details with the current time
      client.user.setActivity(r); // Set activity with updated details
      prevTime = newTime; // Store the last time
    }
  }, 1000); // Update every second
});

// Command to switch config
client.on('messageCreate', (message) => {
  if (message.author.bot) return;

  if (message.content === '!config 1') {
    currentConfig = config1;
    message.reply("Switched to config 1.");
  }

  if (message.content === '!config 2') {
    currentConfig = config2;
    message.reply("Switched to config 2.");
  }
});

const mySecret = process.env['TOKEN'];
client.login(mySecret);
