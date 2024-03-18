module.exports = {
    name: 'volume',
    aliases: 'vol',
    execute(message, args) {
        const player = message.client.manager.get(message.guild.id);
        const trackIndex = Number(args[0]) - 1;
        const { channel } = message.member.voice;
        const volume = parseInt(args[0]);

        if (!player) return message.reply("There is nothing on the queue!");
        if (!args.length) return message.reply('`g?vol {level}`\nExample: `g?vol 100`');
        if (!channel) return message.reply("Please join voice channel first!");
        if (channel.id !== player.voiceChannel) return message.reply("Hey! I'm in diffrent voice channel!");
        if (!args[0] || isNaN(args[0])) return message.reply("Please choose Level between 0-120");
        if (volume >= 0 && volume <= 120) {player.setVolume(volume); return message.reply(`Volume level is set to ${volume}`)} 
        else return message.reply(`Please choose Level between 0-120.`)
    }
}