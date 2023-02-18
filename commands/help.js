const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
    .setName('help')
    .setDescription(`Information about Commands available in this bot!`),
    async execute (interaction, client) {
        
        const embed = new EmbedBuilder()
        .setColor("Blue")
        .setTitle("Help Center")
        .setDescription(`Pages of Help Command`)
        .addFields({ name: "Page 1", value: "List Page of Help"})
        .addFields({ name: "Page 2", value: "Community Commands"})
        .addFields({ name: "Page 3", value: "Music Command"})
        .setFooter({ text: "Credit to: [MrJAwesome](https://www.youtube.com/@MrJAwesomeYT)"})
        
        const embed2 = new EmbedBuilder()
        .setColor("Blue")
        .setTitle("Community Commands")
        .setDescription(`Information about Community Commands`)
        .addFields({ name: "/help", value: "You are here! List information of available commands!"})
        .addFields({ name: "/test", value: "This indicates if the command is working or not."})
        .addFields({ name: "/ping", value: "not actually pings from discord server but it replies Pong!"})
        .addFields({ name: "/server", value: "Shows Information about this server - basic command"})
        .addFields({ name: "/user", value: "Shows Information about User who ran this command."})
        .addFields({ name: "/button", value: "Command that indicates if the button works or not."})
        .setFooter({ text: "Credit to: [MrJAwesome](https://www.youtube.com/@MrJAwesomeYT)" })
        .setTimestamp()

        const embed3 = new EmbedBuilder()
        .setColor("Blue")
        .setTitle("Music Commands")
        .setDescription(`Information About Music Commands`)
        .addFields({ name: "Whoops!", value: "Unfortunately, This feature is not added yet."})
        .setFooter({ text: "Credit to: [MrJAwesome](https://www.youtube.com/@MrJAwesomeYT)"})
        .setTimestamp()

        const button = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
            .setCustomId(`page1`)
            .setLabel(`Page 1`)
            .setStyle(ButtonStyle.Success),
            
            new ButtonBuilder()
            .setCustomId(`page2`)
            .setLabel(`Page 2`)
            .setStyle(ButtonStyle.Success),
            
            new ButtonBuilder()
            .setCustomId(`page3`)
            .setLabel(`Page 3`)
            .setStyle(ButtonStyle.Success),
        )

        const message = await interaction.reply({ embeds: [embed], components: [button] });
        const collector = await message.createMessageComponentCollector();

        collector.on('collect', async i => {

            if (i.customId === 'page1') {

                if (i.user.id !== interaction.user.id) {
                    return await i.reply({ content: `Only ${interaction.user.tag} can use these buttons!` })
                }
                await i.update({ embeds: [embed], components: [button] })
            }
            
            if (i.customId === 'page2') {

                if (i.user.id !== interaction.user.id) {
                    return await i.reply({ content: `Only ${interaction.user.tag} can use these buttons!` })
                }
                await i.update({ embeds: [embed2], components: [button] })
            }
            
            if (i.customId === 'page3') {

                if (i.user.id !== interaction.user.id) {
                    return await i.reply({ content: `Only ${interaction.user.tag} can use these buttons!` })
                }
                await i.update({ embeds: [embed3], components: [button] })
            }

        })
    }
}