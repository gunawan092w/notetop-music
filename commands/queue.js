const { EmbedBuilder } = require("discord.js");
const toml = require('toml'); const fs = require("fs");
const config = toml.parse(fs.readFileSync('./config.toml', 'utf-8'));

module.exports = {
  name: 'queue',
  execute(message, args) {
    const player = message.client.manager.get(message.guild.id); if (!player) return message.reply("There is nothing on the queue!");  
    const queue = player.queue; 
    const embed = new EmbedBuilder() .setAuthor({ name: `Queue for ${message.guild.name}` });
    const page = args.length && Number(args[0]) ? Number(args[0]) : 1; 
    const end = page * 10; 
    const start = end - 10;
    const tracks = queue.slice(start, end); const maxPages = Math.ceil(queue.length / 10);
    

      
    if (queue.current) embed.addFields([{ name: "Current", value: `[${queue.current.title}](${queue.current.uri})`}]);
    if (!tracks.length) embed.setDescription(`No tracks in ${page > 1 ? `page ${page}` : "the queue"}.`);
    else embed.setDescription(tracks.map((track, i) => `${start + (++i)} - [${track.title}](${track.uri})`).join("\n"));
    embed.setFooter({ text: `Page ${page > maxPages ? maxPages : page} of ${maxPages} - ${config.bot.prefix}queue <page>` }); return message.reply({ embeds: [embed] });

  },
};