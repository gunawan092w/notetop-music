module.exports = {
    name: 'pause',
    execute(message) {
        const player = message.client.manager.get(message.guild.id);
        const { channel } = message.member.voice;
 
        if (!player) return message.reply("Hey! There is nothing playing right now!");
        if (!channel) return message.reply("Please join on Voice Channel First.");
        if (channel.id !== player.voiceChannel) return message.reply("Hey! I'm in the diffrent Voice Channel!");
        if (player.paused) return message.reply("Hey! It's already paused.");
 
        player.pause(true); return message.reply("Player has been paused!");
    },
};