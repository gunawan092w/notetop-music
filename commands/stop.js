module.exports = {
    name: 'stop',
    execute(message) {
        const player = message.client.manager.get(message.guild.id);
        const { channel } = message.member.voice;
        if (!player) return message.reply("Hey! There is nothing playing right now!");
        if (!channel) return message.reply("Please join voice channel first");
        if (channel.id !== player.voiceChannel) return message.reply("Hey! I'm in diffrent voice channel!");
        player.destroy(); return message.reply("Queue Cleared!");
    },
};