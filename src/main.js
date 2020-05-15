/**
 * A ping pong bot, whenever you send "ping", it replies "pong".
 */

require("dotenv").config();

// Import the discord.js module
const Discord = require("discord.js");

// Create an instance of a Discord client
const client = new Discord.Client();

// Define debugger things
const debug = require("debug");
const log = debug("debugger");

function sendMessage(clientForMessage, message) {
    clientForMessage.channel.send(message);
}

function replyWithAvatar(clientForMessage) {
    clientForMessage.reply(clientForMessage.author.displayAvatarURL());
}
// Define things for express
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

// ReadableStreams, in this example YouTube audio
const ytdl = require("ytdl-core");

let connection = null;
let dispatcher = null;

// Set view engine and static folder
app.set("view engine", "ejs");
app.use(express.static("public"));

/* Start web server on the port 80 */
app.get("/", (req, res) => {
    res.render("index");
});

app.listen(PORT, () => {
    log("Example app listening on port {}!", PORT);
});

/* Functions for the bot */
async function createConnection(message) {
    connection = await message.member.voice.channel.join();
}

/**
 * The ready event is vital, it means that only _after_ this will your bot start
 * reacting to information received from Discord
 */
client.on("ready", () => {
    log("I am ready!");
    client.user.setActivity("Tomorrowland", { type: "LISTENING" });
    log(client);
});

// Create an event listener for messages
client.on("message", (message) => {
    if (!message.guild) return;
    log("Message found: {}", message);
    log("Message content: {}", message.content);
    log("Message channel: {}", message.channel);

    if (message.content === "ping") {
        sendMessage(message, "pong");
    } else if (message.content === "off") {
        sendMessage(message, "turning off");
        process.exit();
    } else if (message.content === "avatar") {
        replyWithAvatar(message);
    } else if (message.content === "!join") {
        // Only try to join the sender's voice channel if they are in one themselves
        if (message.member.voice.channel) {
            createConnection(message);
        } else {
            message.reply("You need to join a voice channel first!");
        }
    } else if (message.content === "!play") {
        if (connection != null) {
            dispatcher = connection.play(
                ytdl(
                    "https://www.youtube.com/watch?v=y6120QOlsfU&pbjreload=10",
                    {
                        filter: "audioonly",
                    }
                )
            );
            dispatcher.setVolume(0.5); // half the volume
        }
    } else if (message.content === "!pause") {
        dispatcher.pause();
    } else if (message.content === "!resume") {
        dispatcher.resume();
    } else if (message.content === "!end") {
        dispatcher.destroy(); // end the stream
    }
});

if(dispatcher != null){
    dispatcher.on("finish", () => {
        log("Finished playing!");
        dispatcher = connection.play(
            ytdl(
                "https://www.youtube.com/watch?v=y6120QOlsfU&pbjreload=10",
                {
                    filter: "audioonly",
                }
            )
        );
    });
}


// Log our bot in using the token from https://discordapp.com/developers/applications/me
client.login(process.env.BOT_TOKEN);
