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

function sendMessage(clientForMessage, message) {
  clientForMessage.channel.send(message);
}

function replyWithAvatar(clientForMessage) {
  clientForMessage.reply(clientForMessage.author.displayAvatarURL());
}
/**
 * The ready event is vital, it means that only _after_ this will your bot start
 * reacting to information received from Discord
 */
client.on('ready', () => {
  log('I am ready!');
  client.user.setActivity('Tomorrowland', { type: 'LISTENING' });
  log(client);
});

// Create an event listener for messages
client.on('message', (message) => {
  if (!message.guild) return;
  log('Message found: {}', message);
  log('Message content: {}', message.content);
  log('Message channel: {}', message.channel);

  if (message.content === 'ping') {
    sendMessage(message, 'pong');
  } else if (message.content === 'off') {
    sendMessage(message, 'turning off');
    process.exit();
  } else if (message.content === 'avatar') {
    replyWithAvatar(message);
  }
});

// Log our bot in using the token from https://discordapp.com/developers/applications/me
client.login(process.env.BOT_TOKEN);
