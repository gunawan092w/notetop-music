module.exports = {
    name: 'loop',
    execute(message, args) {
        const player = message.client.manager.get(message.guild.id);
        const { channel } = message.member.voice;
        const queueRepeat = player.queueRepeat ? "enabled" : "disabled";
        const trackRepeat = player.trackRepeat ? "enabled" : "disabled";

        if (!player) return message.reply("Hey! There is nothing playing right now!");
        if (!channel) return message.reply("Please join voice channel first");
        if (channel.id !== player.voiceChannel) return message.reply("Hey! I'm in diffrent voice channel!");
        
        if (args.length && /queue/i.test(args[0])) {player.setQueueRepeat(!player.queueRepeat); return message.reply(`Loop for Queue ${queueRepeat}!`)}
        player.setTrackRepeat(!player.trackRepeat); return message.reply(`Loop for track ${trackRepeat}!`);
    }
}