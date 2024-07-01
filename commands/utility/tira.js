const { SlashCommandBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('tira')
		.setDescription('Fai un tiro'),
	async execute(interaction) {
		var chosenWhites = "0";
		var chosenBlacks = "0";
		var chosenGreys = "0";
		var killCounter = "0";
		var confusion = false;
		var uscitaDiScena = false;
		var rollChoiceMessage = "Scegli il tipo di tiro"
		const normalRollButton = new ButtonBuilder()
			.setCustomId('normalRollButton')
			.setLabel('Normale')
			.setStyle(ButtonStyle.Secondary);
		const confusionRollButton = new ButtonBuilder()
			.setCustomId('confusionRollButton')
			.setLabel('Con Confusione')
			.setStyle(ButtonStyle.Secondary);
		const uscitaRollButton = new ButtonBuilder()
			.setCustomId('uscitaRollButton')
			.setLabel('Con Uscita')
			.setStyle(ButtonStyle.Secondary);
		const whitePlusButton = new ButtonBuilder()
			.setCustomId('whitePlusButton')
			.setLabel('+')
			.setStyle(ButtonStyle.Success);
		const whiteMinusButton = new ButtonBuilder()
			.setCustomId('whiteMinusButton')
			.setLabel('-')
			.setStyle(ButtonStyle.Danger);
		const whiteCounterFakeButton = new ButtonBuilder()
			.setCustomId('whiteCounterFakeButton')
			.setLabel("Bianchi: " + chosenWhites)
			.setStyle(ButtonStyle.Secondary)
			.setDisabled(true);
		const blackPlusButton = new ButtonBuilder()
			.setCustomId('blackPlusButton')
			.setLabel('+')
			.setStyle(ButtonStyle.Success);
		const blackMinusButton = new ButtonBuilder()
			.setCustomId('blackMinusButton')
			.setLabel('-')
			.setStyle(ButtonStyle.Danger);
		const blackCounterFakeButton = new ButtonBuilder()
			.setCustomId('blackCounterFakeButton')
			.setLabel("Neri:    " + chosenBlacks)
			.setStyle(ButtonStyle.Secondary)
			.setDisabled(true);
		const greyPlusButton = new ButtonBuilder()
			.setCustomId('greyPlusButton')
			.setLabel('-')
			.setStyle(ButtonStyle.Success);
		const greyMinusButton = new ButtonBuilder()
			.setCustomId('greyMinusButton')
			.setLabel('-')
			.setStyle(ButtonStyle.Danger);
		const greyCounterFakeButton = new ButtonBuilder()
			.setCustomId('greyCounterFakeButton')
			.setLabel("Grigi: " + chosenGreys)
			.setStyle(ButtonStyle.Secondary)
			.setDisabled(true);

		const rollTypeRow = new ActionRowBuilder()
			.addComponents(confusionRollButton, normalRollButton, uscitaRollButton);
		const whiteRow = new ActionRowBuilder()
			.addComponents(whiteMinusButton, whiteCounterFakeButton, whitePlusButton);
		const blackRow = new ActionRowBuilder()
			.addComponents(blackMinusButton, blackCounterFakeButton, blackPlusButton);
		const greyRow = new ActionRowBuilder()
			.addComponents(greyMinusButton, greyCounterFakeButton, greyPlusButton);
//DA AGGIUNGERE PULSANTI PER ANNULLARE ED EFFETTUARE IL TIPO. IMPLEMENTARE LE LOGICHE SUL CLICK DI OGNI PULSANTE
//PER LE LOGICHE DI CLICK UTILIZZARE LE COLLEZIONI DI RISPOSTE
//OGNI CLICK A QUALSIASI PULSANTE DEVE EDITARE LO STESSO MESSAGGIO DI CUI FA PARTE IL BOTTONE
//OGNI CLICK A QUALSIASI PULSANTE DEVE EDITARE LO STESSO MESSAGGIO DI CUI FA PARTE IL BOTTONE
//IL CLICK A QUALSIASI PULSANTE DEVE ESSERE ACCETTATO SOLO SE L'UTENTE CHE HA CLICCATO E' LO STESSO DEL TIRO
		const response = await interaction.reply({
			content: "",
			components: [whiteRow, blackRow],
		});
	},
};