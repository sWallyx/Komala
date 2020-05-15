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

const express = require('express');

const app = express();
app.set('view engine', 'ejs');

/* Start web server on the port 80 */
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(80, () => {
  log('Example app listening on port 80!');
});


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
  // If the message is "ping"
  if (message.content === 'ping') {
    // Send "pong" to the same channel
    message.channel.send('pong');
  }
});

// Log our bot in using the token from https://discordapp.com/developers/applications/me
client.login(process.env.BOT_TOKEN);

