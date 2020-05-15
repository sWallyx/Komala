/**
 * Komala bot main file
 */
// Import server modules
const express = require('express');
const serverless = require('serverless-http');

// Import the discord.js module
const Discord = require('discord.js');

// Enviroment values
require('dotenv').config();

// Create an instance of a Discord client
const client = new Discord.Client();

client.login(process.env.BOT_TOKEN);

// Create debugger
const debug = require('debug');
const log = debug('debugger');

// Define express
const app = express();
const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    hello: 'hi!'
  });
});

app.use('/.netlify/functions/api', router);

module.exports = app;
module.exports.handler = serverless(app);