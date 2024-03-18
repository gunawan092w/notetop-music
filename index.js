const { GatewayIntentBits, Client, Collection, REST, Routes } = require('discord.js');
const { Manager } = require("erela.js")
const Spotify = require("erela.js-spotify")
const fs = require("fs");
const toml = require('toml');

const client = new Client({intents: [GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent, GatewayIntentBits.Guilds, GatewayIntentBits.GuildVoiceStates, GatewayIntentBits.GuildIntegrations]})
const config = toml.parse(fs.readFileSync('./config.toml', 'utf-8'));
const clientID = config.spotify.clientid
const clientSecret = config.spotify.clientsecret

const commands = []; client.commands = new Collection(); const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {const command = require(`./commands/${file}`); client.commands.set(command.name, command)}

client.manager = new Manager ({
    plugins: [ new Spotify({ clientID, clientSecret }) ],
    nodes: [{ host: "lavalink.ddns.net", port:2433 , password: "discord.gg/FqEQtEtUc9", retryDelay: 5000 }],
    //nodes: [{ host: "127.0.0.1", port:8081, password: "youshallnotpass", retryDelay: 5000, version: "v4", useVersionPath: true }],
    send: (id, payload) => { const guild = client.guilds.cache.get(id); if (guild) guild.shard.send(payload); }
});

client.manager.on("trackStart", (player, track) => {const channel = client.channels.cache.get(player.textChannel); channel.send(`Now playing: \`${track.title}\`, requested by \`${track.requester.tag}\`.`)});
client.manager.on("queueEnd", player => {const channel = client.channels.cache.get(player.textChannel); channel.send("Queue ended, Leaving Voice Channel..."); player.destroy()});
client.manager.on("nodeConnect", node => {console.log(`Node "${node.options.identifier}" connected.`)})
client.manager.on("nodeError", (node, error) => {console.log(`Node "${node.options.identifier}" encountered an error: ${error.message}.`)})

client.once("ready", () => {
    client.manager.init(client.user.id); 
    console.log(`Logged in as ${client.user.tag}`); 
    client.user.setActivity({ name: `${client.guilds.cache.size} Servers | ${config.bot.prefix}help`})
    console.log('run webserver');
    server();
});

client.on("raw", d => client.manager.updateVoiceState(d));
client.on("messageCreate", async (message) => {
    if (!message.content.startsWith(config.bot.prefix) || message.author.bot) return;
        const args = message.content.slice(config.bot.prefix.length).trim().split(/ +/); const commandName = args.shift().toLowerCase();
        if (!client.commands.has(commandName)) return; const command = client.commands.get(commandName);
        try {command.execute(message, args)} catch (error) {console.error(error); message.reply('Whoops! It seems like i encountered an error! Contact @gunawan092w on github');
    }
});

function server() {
    const express = require('express'); const app = express(); const PORT = process.env.PORT || 3000;

    app.get('/', (req, res) => {
        const guildsCount = client.guilds.cache.size;
        const usersCount = client.users.cache.size;
        const channelsCount = client.channels.cache.size;
        res.json({guilds: guildsCount, users: usersCount, channels: channelsCount});
    });

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
} client.login(config.bot.token)
