const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('info')
		.setDescription('Informazioni su Pescatoken'),
	async execute(interaction) {
        let infoMessage = "";
        infoMessage += "Ecco i comandi per Pescatoken:\n"
        infoMessage += "- /info per avere informazioni su Pescatoken\n"
        infoMessage += "- /tira per fare un tiro\n"
        infoMessage += "- /soprasotto per fare un 50/50\n"
		infoMessage += "Pescatoken 2.0 by Harvay"
		await interaction.reply(infoMessage);
	},
};