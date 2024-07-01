const { SlashCommandBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('soprasotto')
		.setDescription('Estrai un 50/50'),
	async execute(interaction) {
		const result = Math.random() < 0.5;
		const sopraButton = new ButtonBuilder()
			.setCustomId('sopraButton')
			.setLabel('Sopra!')
			.setStyle(ButtonStyle.Primary);
		const sottoButton = new ButtonBuilder()
			.setCustomId('sottoButton')
			.setLabel('Sotto!')
			.setStyle(ButtonStyle.Secondary);

		const row = new ActionRowBuilder()
			.addComponents(sopraButton, sottoButton);
		const response = await interaction.reply({
			content: "Sopra o Sotto?",
			components: [row],
		});

		const collectorFilter = i => i.user.id === interaction.user.id;

		try {
			const confirmation = await response.awaitMessageComponent({ filter: collectorFilter, time: 60_000 });
			if (confirmation.customId && confirmation.customId === "sopraButton") {
				if (result) {
					let resultMessage = "Hai scelto Sopra ed è stato estratto Sopra";
					await interaction.editReply({ content: resultMessage, components: [] });
				}
				else {
					let resultMessage = "Hai scelto Sopra ed è stato estratto Sotto";
					await interaction.editReply({ content: resultMessage, components: [] });
				}
			}
			else if (confirmation.customId && confirmation.customId === "sottoButton") {
				if (result) {
					let resultMessage = "Hai scelto Sotto ed è stato estratto Sopra";
					await interaction.editReply({ content: resultMessage, components: [] });
				}
				else {
					let resultMessage = "Hai scelto Sotto ed è stato estratto Sotto";
					await interaction.editReply({ content: resultMessage, components: [] });
				}
			}
			else {
				let resultMessage = "Qualcosa è andato storto ...";
				await interaction.editReply({ content: resultMessage, components: [] });
			}
		} catch (e) {
			await interaction.editReply({ content: resultMessage, components: [] });
		}
	},
};