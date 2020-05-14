/**
 * A ping pong bot, whenever you send "ping", it replies "pong".
 */

require('dotenv').config();

// Import the discord.js module
const Discord = require('discord.js');

// Create an instance of a Discord client
const client = new Discord.Client();

const debug = require('debug');

const log = debug('debugger');

/**
 * The ready event is vital, it means that only _after_ this will your bot start
 * reacting to information received from Discord
 */
client.on('ready', () => {
  log('I am ready!');
});

// Create an event listener for messages
client.on('message', (message) => {
  log('Message found: {}', message);
  log('Message content: {}', message.content);
  if (message.content === 'ping') {
    message.channel.send('pong');
  } else if (message.content === 'off') {
    message.channel.send('turning off');
    process.exit();
  }
});

// Log our bot in using the token from https://discordapp.com/developers/applications/me
client.login(process.env.BOT_TOKEN);
