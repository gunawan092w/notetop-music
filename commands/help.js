const toml = require('toml'); const fs = require("fs");
const config = toml.parse(fs.readFileSync('./config.toml', 'utf-8'));
module.exports = {
    name: 'help',
    execute(message) {
        message.channel.send(`
\`\`\`Available Commands:
1. ${config.bot.prefix}help - Shows the list of commands
2. ${config.bot.prefix}play - Play songs from youtube or spotify
3. ${config.bot.prefix}resume - Resumes the player
4. ${config.bot.prefix}pause - Pauses the player
5. ${config.bot.prefix}stop - Stops the player
6. ${config.bot.prefix}queue - Shows the list of queue
7. ${config.bot.prefix}remove - Removes specified track from the queue
8. ${config.bot.prefix}skip - Skips the track
9. ${config.bot.prefix}volume - Volume Level (0-120)
10. ${config.bot.prefix}loop - Enable / Disable the Loop!
11. ${config.bot.prefix}invite - Get Invite link from this bot\`\`\`
        `);
    },
  };