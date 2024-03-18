module.exports = {
    name: 'remove',
    aliases: 'rm',
    execute(message, args) {
        const player = message.client.manager.get(message.guild.id);
        const trackIndex = Number(args[0]) - 1;
        const { channel } = message.member.voice;
        const rmTrk = player.queue[trackIndex]; 
        
        if (!player) return message.reply("There is nothing on the queue!");
        if (!args.length) return message.reply('`g?remove {position}`\nExample: `g?remove 1`');
        if (!channel) return message.reply("Please join voice channel first!");
        if (channel.id !== player.voiceChannel) return message.reply("Hey! I'm in diffrent voice channel!");
        
        if (!args[0] || isNaN(args[0])) return message.reply("Invalid Track Position!");
        if (trackIndex < 0 || trackIndex >= player.queue.length) {return message.reply("Invalid track Position!")}
        player.queue.splice(trackIndex, 1); return message.reply(`\`${rmTrk.title}\` has been removed from the queue!`);
    }
}