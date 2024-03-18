const toml = require('toml');
const fs = require("fs");
const config = toml.parse(fs.readFileSync('./config.toml', 'utf-8'));
module.exports = {
    name: 'invite',
    execute(message) {
        message.channel.send(`[Here is my invite!](<https://discord.com/oauth2/authorize?client_id=${config.bot.clientid}&permissions=274914937344&scope=bot+applications.commands>)`)
    }
}