module.exports = {
  name: 'play',
  execute: async (message, args) => {
    const { channel } = message.member.voice;
    const player = message.client.manager.create({ guild: message.guild.id, voiceChannel: channel.id, textChannel: message.channel.id });
    const search = args.join(' ');

    if (!channel) return message.reply('Please join voice channel first');
    if (!args.length) return message.reply('`g?play {link or query}`\nExample: `g?play Every Summertime` or `g?play https://youtu.be/OXtZfPZIex4`');
    if (player.state !== "CONNECTED") player.connect();

    let res; try { res = await player.search(search, message.author); if (res.loadType === 'LOAD_FAILED') { if (!player.queue.current) player.destroy(); throw res.exception; }} 
    catch (err) { console.error(err); return message.reply(`Uh oh, Something went wrong!  "\`${err.message}\`"`); }
    
    switch (res.loadType) {
      case 'NO_MATCHES': if (!player.queue.current) player.destroy(); return message.reply('Whoops! No Results...');
      case 'TRACK_LOADED': player.queue.add(res.tracks[0]); if (!player.playing && !player.paused && !player.queue.size) player.play(); return message.reply(`\`${res.tracks[0].title}\` has been added to queue!`);
      case 'PLAYLIST_LOADED': player.queue.add(res.tracks); if (!player.playing && !player.paused && player.queue.totalSize === res.tracks.length) player.play(); return message.reply(`\`${res.playlist.name}\` with ${res.tracks.length} tracks has been added to queue!`);
      case 'SEARCH_RESULT': { player.queue.add(res.tracks[0]); if (!player.playing && !player.paused && !player.queue.size) player.play({ volume: 100 }); return message.reply(`\`${res.tracks[0].title}\` has been added to queue!`); }
    }
  },
};