const { SlashCommandBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('tira')
		.setDescription('Fai un tiro'),
	async execute(interaction) {
		var chosenWhites, chosenBlacks, chosenGreys, chosenUscita;
		const Interaction = interaction;

		if (interaction.commandName && interaction.commandName === "tira") {
			chosenWhites = "0";
			chosenBlacks = "0";
			chosenGreys = "0";
			chosenUscita = "0";
		}

		const normalRollButton = new ButtonBuilder()
			.setCustomId('normalRollButton')
			.setLabel('Normale')
			.setStyle(ButtonStyle.Primary);
		const confusionRollButton = new ButtonBuilder()
			.setCustomId('confusionRollButton')
			.setLabel('Confusione')
			.setStyle(ButtonStyle.Secondary);
		const uscitaRollButton = new ButtonBuilder()
			.setCustomId('uscitaRollButton')
			.setLabel('Uscita')
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
			.setLabel('+')
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
		const uscitaPlusButton = new ButtonBuilder()
			.setCustomId('uscitaPlusButton')
			.setLabel('+')
			.setStyle(ButtonStyle.Success);
		const uscitaMinusButton = new ButtonBuilder()
			.setCustomId('uscitaMinusButton')
			.setLabel('-')
			.setStyle(ButtonStyle.Danger);
		const uscitaCounterFakeButton = new ButtonBuilder()
			.setCustomId('uscitaCounterFakeButton')
			.setLabel("Uscita: " + chosenUscita)
			.setStyle(ButtonStyle.Secondary)
			.setDisabled(true);
		const tiraButton = new ButtonBuilder()
			.setCustomId('tiraButton')
			.setLabel("Estrai")
			.setStyle(ButtonStyle.Primary);

		const rollTypeRow = new ActionRowBuilder()
			.addComponents(confusionRollButton, normalRollButton, uscitaRollButton, tiraButton);
		const whiteRow = new ActionRowBuilder()
			.addComponents(whiteMinusButton, whiteCounterFakeButton, whitePlusButton);
		const blackRow = new ActionRowBuilder()
			.addComponents(blackMinusButton, blackCounterFakeButton, blackPlusButton);
		const greyRow = new ActionRowBuilder()
			.addComponents(greyMinusButton, greyCounterFakeButton, greyPlusButton);
		const uscitaRow = new ActionRowBuilder()
			.addComponents(uscitaMinusButton, uscitaCounterFakeButton, uscitaPlusButton);
		//DA AGGIUNGERE PULSANTI PER ANNULLARE ED EFFETTUARE IL TIPO. IMPLEMENTARE LE LOGICHE SUL CLICK DI OGNI PULSANTE
		//PER LE LOGICHE DI CLICK UTILIZZARE LE COLLEZIONI DI RISPOSTE
		//OGNI CLICK A QUALSIASI PULSANTE DEVE EDITARE LO STESSO MESSAGGIO DI CUI FA PARTE IL BOTTONE
		//OGNI CLICK A QUALSIASI PULSANTE DEVE EDITARE LO STESSO MESSAGGIO DI CUI FA PARTE IL BOTTONE
		//IL CLICK A QUALSIASI PULSANTE DEVE ESSERE ACCETTATO SOLO SE L'UTENTE CHE HA CLICCATO E' LO STESSO DEL TIRO
		/*if (interaction.commandName && interaction.commandName === "tira") {
			const response = await interaction.reply({
				content: "",
				components: [whiteRow, blackRow, rollTypeRow],
			});
			
		}*/

		const response = await interaction.reply({
			content: "",
			components: [whiteRow, blackRow, rollTypeRow],
		});

		const collector = interaction.channel.createMessageComponentCollector({ time: 3500000 });

		collector.on('collect', async i => {
			// check if the author triggered the interaction


			if (i.member.id != interaction.user.id) {
				await i.deferUpdate();
			}

			if (i.customId == 'whitePlusButton') {
				var whiteLabel = i.message.components[0].components[1].data.label;
				chosenWhites = "" + (Number(whiteLabel.split(" ")[1]) + 1);
				chosenGreys = "0";
				whiteCounterFakeButton.setLabel("Bianchi: " + chosenWhites);
				if (uscitaRollButton.data.style === 1) {
					await Interaction.editReply({ content: "", components: [whiteRow, blackRow, uscitaRow, rollTypeRow] });
					await i.deferUpdate();
				}
				else if (uscitaRollButton.data.style === 2) {
					await Interaction.editReply({ content: "", components: [whiteRow, blackRow, rollTypeRow] });
					await i.deferUpdate();
				}
			}

			else if (i.customId == 'whiteMinusButton') {
				var whiteLabel = i.message.components[0].components[1].data.label;
				chosenWhites = "" + (Number(whiteLabel.split(" ")[1]) - 1);
				chosenGreys = "0";
				whiteCounterFakeButton.setLabel("Bianchi: " + chosenWhites);
				if (uscitaRollButton.data.style === 1) {
					await Interaction.editReply({ content: "", components: [whiteRow, blackRow, uscitaRow, rollTypeRow] });
					await i.deferUpdate();
				}
				else if (uscitaRollButton.data.style === 2) {
					await Interaction.editReply({ content: "", components: [whiteRow, blackRow, rollTypeRow] });
					await i.deferUpdate();
				}
			}

			else if (i.customId == 'greyPlusButton') {
				var greyLabel = i.message.components[0].components[1].data.label;
				chosenGreys = "" + (Number(greyLabel.split(" ")[1]) + 1);
				chosenWhites = "0";
				greyCounterFakeButton.setLabel("Grigi: " + chosenGreys);
				if (uscitaRollButton.data.style === 1) {
					await Interaction.editReply({ content: "", components: [greyRow, blackRow, uscitaRow, rollTypeRow] });
					await i.deferUpdate();
				}
				else if (uscitaRollButton.data.style === 2) {
					await Interaction.editReply({ content: "", components: [greyRow, blackRow, rollTypeRow] });
					await i.deferUpdate();
				}
			}

			else if (i.customId == 'greyMinusButton') {
				var greyLabel = i.message.components[0].components[1].data.label;
				chosenGreys = "" + (Number(greyLabel.split(" ")[1]) - 1);
				chosenWhites = "0";
				greyCounterFakeButton.setLabel("Grigi: " + chosenGreys);
				if (uscitaRollButton.data.style === 1) {
					await Interaction.editReply({ content: "", components: [greyRow, blackRow, uscitaRow, rollTypeRow] });
					await i.deferUpdate();
				}
				else if (uscitaRollButton.data.style === 2) {
					await Interaction.editReply({ content: "", components: [greyRow, blackRow, rollTypeRow] });
					await i.deferUpdate();
				}
			}

			else if (i.customId == 'blackPlusButton') {
				var blackLabel = i.message.components[1].components[1].data.label;
				chosenBlacks = "" + (Number(blackLabel.split(" ")[1]) + 1);
				blackCounterFakeButton.setLabel("Neri: " + chosenBlacks);
				if (uscitaRollButton.data.style === 1 && normalRollButton.data.style === 1 && confusionRollButton.data.style === 2) {
					await Interaction.editReply({ content: "", components: [whiteRow, blackRow, uscitaRow, rollTypeRow] });
					await i.deferUpdate();
				}
				else if (uscitaRollButton.data.style === 1 && normalRollButton.data.style === 2 && confusionRollButton.data.style === 1) {
					await Interaction.editReply({ content: "", components: [greyRow, blackRow, uscitaRow, rollTypeRow] });
					await i.deferUpdate();
				}
				else if (uscitaRollButton.data.style === 2 && normalRollButton.data.style === 1 && confusionRollButton.data.style === 2) {
					await Interaction.editReply({ content: "", components: [whiteRow, blackRow, rollTypeRow] });
					await i.deferUpdate();
				}
				else if (uscitaRollButton.data.style === 2 && normalRollButton.data.style === 2 && confusionRollButton.data.style === 1) {
					await Interaction.editReply({ content: "", components: [greyRow, blackRow, rollTypeRow] });
					await i.deferUpdate();
				}
			}

			else if (i.customId == 'blackMinusButton') {
				var blackLabel = i.message.components[1].components[1].data.label;
				chosenBlacks = "" + (Number(blackLabel.split(" ")[1]) - 1);
				blackCounterFakeButton.setLabel("Neri: " + chosenBlacks);
				if (uscitaRollButton.data.style === 1 && normalRollButton.data.style === 1 && confusionRollButton.data.style === 2) {
					await Interaction.editReply({ content: "", components: [whiteRow, blackRow, uscitaRow, rollTypeRow] });
					await i.deferUpdate();
				}
				else if (uscitaRollButton.data.style === 1 && normalRollButton.data.style === 2 && confusionRollButton.data.style === 1) {
					await Interaction.editReply({ content: "", components: [greyRow, blackRow, uscitaRow, rollTypeRow] });
					await i.deferUpdate();
				}
				else if (uscitaRollButton.data.style === 2 && normalRollButton.data.style === 1 && confusionRollButton.data.style === 2) {
					await Interaction.editReply({ content: "", components: [whiteRow, blackRow, rollTypeRow] });
					await i.deferUpdate();
				}
				else if (uscitaRollButton.data.style === 2 && normalRollButton.data.style === 2 && confusionRollButton.data.style === 1) {
					await Interaction.editReply({ content: "", components: [greyRow, blackRow, rollTypeRow] });
					await i.deferUpdate();
				}

			}

			else if (i.customId == 'uscitaPlusButton') {
				var uscitaLabel = i.message.components[2].components[1].data.label;
				chosenUscita = "" + (Number(uscitaLabel.split(" ")[1]) + 1);
				uscitaCounterFakeButton.setLabel("Uscita: " + chosenUscita);
				if (normalRollButton.data.style === 1 && confusionRollButton.data.style === 2) {
					await Interaction.editReply({ content: "", components: [whiteRow, blackRow, uscitaRow, rollTypeRow] });
					await i.deferUpdate();
				}
				else if (normalRollButton.data.style === 2 && confusionRollButton.data.style === 1) {
					await Interaction.editReply({ content: "", components: [greyRow, blackRow, uscitaRow, rollTypeRow] });
					await i.deferUpdate();
				}
			}

			else if (i.customId == 'uscitaMinusButton') {
				var uscitaLabel = i.message.components[2].components[1].data.label;
				chosenUscita = "" + (Number(uscitaLabel.split(" ")[1]) - 1);
				uscitaCounterFakeButton.setLabel("Uscita: " + chosenUscita);
				if (normalRollButton.data.style === 1 && confusionRollButton.data.style === 2) {
					await Interaction.editReply({ content: "", components: [whiteRow, blackRow, uscitaRow, rollTypeRow] });
					await i.deferUpdate();
				}
				else if (normalRollButton.data.style === 2 && confusionRollButton.data.style === 1) {
					await Interaction.editReply({ content: "", components: [greyRow, blackRow, uscitaRow, rollTypeRow] });
					await i.deferUpdate();
				}
			}

			else if (i.customId == 'normalRollButton') {
				if (normalRollButton.data.style === 1 && confusionRollButton.data.style === 2) {
					if (uscitaRollButton.data.style === 1) {
						await Interaction.editReply({ content: "", components: [whiteRow, blackRow, uscitaRow, rollTypeRow] });
						await i.deferUpdate();
					}
					else if (uscitaRollButton.data.style === 2) {
						await Interaction.editReply({ content: "", components: [whiteRow, blackRow, rollTypeRow] });
						await i.deferUpdate();
					}
				}
				else if (normalRollButton.data.style === 2 && confusionRollButton.data.style === 1) {
					chosenWhites = "0";
					normalRollButton.setStyle(ButtonStyle.Primary);
					whiteCounterFakeButton.setLabel("Bianchi: " + chosenWhites);
					confusionRollButton.setStyle(ButtonStyle.Secondary);
					if (uscitaRollButton.data.style === 1) {
						await Interaction.editReply({ content: "", components: [whiteRow, blackRow, uscitaRow, rollTypeRow] });
						await i.deferUpdate();
					}
					else if (uscitaRollButton.data.style === 2) {
						await Interaction.editReply({ content: "", components: [whiteRow, blackRow, rollTypeRow] });
						await i.deferUpdate();
					}
				}
			}

			else if (i.customId == 'confusionRollButton') {
				if (confusionRollButton.data.style === 1 && normalRollButton.data.style === 2) {
					if (uscitaRollButton.data.style === 1) {
						await Interaction.editReply({ content: "", components: [greyRow, blackRow, uscitaRow, rollTypeRow] });
						await i.deferUpdate();
					}
					else if (uscitaRollButton.data.style === 2) {
						await Interaction.editReply({ content: "", components: [greyRow, blackRow, rollTypeRow] });
						await i.deferUpdate();
					}
				}
				else if (confusionRollButton.data.style === 2 && normalRollButton.data.style === 1) {
					chosenGreys = "0";
					confusionRollButton.setStyle(ButtonStyle.Primary);
					greyCounterFakeButton.setLabel("Grigi: " + chosenGreys)
					normalRollButton.setStyle(ButtonStyle.Secondary);
					if (uscitaRollButton.data.style === 1) {
						await Interaction.editReply({ content: "", components: [greyRow, blackRow, uscitaRow, rollTypeRow] });
						await i.deferUpdate();
					}
					else if (uscitaRollButton.data.style === 2) {
						await Interaction.editReply({ content: "", components: [greyRow, blackRow, rollTypeRow] });
						await i.deferUpdate();
					}
				}
			}

			else if (i.customId == 'uscitaRollButton') {
				if (uscitaRollButton.data.style === 1) {
					uscitaRollButton.setStyle(ButtonStyle.Secondary);
					if (normalRollButton.data.style === 1 && confusionRollButton.data.style === 2) {
						await Interaction.editReply({ content: "", components: [whiteRow, blackRow, rollTypeRow] });
					}
					else if (normalRollButton.data.style === 2 && confusionRollButton.data.style === 1) {
						await Interaction.editReply({ content: "", components: [greyRow, blackRow, rollTypeRow] });
					}
					await i.deferUpdate();
				}
				else if (uscitaRollButton.data.style === 2) {
					chosenUscita = "0";
					uscitaRollButton.setStyle(ButtonStyle.Primary);
					uscitaCounterFakeButton.setLabel("Uscita: " + chosenUscita)
					if (normalRollButton.data.style === 1 && confusionRollButton.data.style === 2) {
						await Interaction.editReply({ content: "", components: [whiteRow, blackRow, uscitaRow, rollTypeRow] });
					}
					else if (normalRollButton.data.style === 2 && confusionRollButton.data.style === 1) {
						await Interaction.editReply({ content: "", components: [greyRow, blackRow, uscitaRow, rollTypeRow] });
					}
					await i.deferUpdate();
				}
			}

			else if (i.customId == 'tiraButton') {
				var blackLabel = i.message.components[1].components[1].data.label;
				chosenBlacks = "" + (Number(blackLabel.split(" ")[1]));
				if (normalRollButton.data.style === 1) {
					var whiteLabel = i.message.components[0].components[1].data.label;
					chosenWhites = "" + (Number(whiteLabel.split(" ")[1]));
					chosenGreys = "0";
				}
				if (confusionRollButton.data.style === 1) {
					var greyLabel = i.message.components[0].components[1].data.label;
					chosenGreys = "" + (Number(greyLabel.split(" ")[1]));
					chosenWhites = "0";
				}
				if (uscitaRollButton.data.style === 1) {
					var uscitaLabel = i.message.components[2].components[1].data.label;
					chosenUscita = "" + (Number(uscitaLabel.split(" ")[1]));
				}
				var result = eseguiEstrazione(Number(chosenWhites), Number(chosenGreys), Number(chosenBlacks), Number(chosenUscita));
			}
		});

		function shuffle(array) {
			let currentIndex = array.length;

			// While there remain elements to shuffle...
			while (currentIndex != 0) {

				// Pick a remaining element...
				let randomIndex = Math.floor(Math.random() * currentIndex);
				currentIndex--;

				// And swap it with the current element.
				[array[currentIndex], array[randomIndex]] = [
					array[randomIndex], array[currentIndex]];
			}
		}

		function eseguiEstrazione(whites, greys, blacks, uscita) {
			var confusione = false;
			var uscita = false;
			var annulla = false;
			var sacchetto = [];
			var estrazione = [];

			if (whites === 0 && greys === 0 && blacks === 0) {
				annulla = true;
			}

			if (greys > 0) {
				confusione = true;
			}

			if (uscita > 0) {
				uscita = true;
			}


			if (!confusione) {
				for (var i = 0; i < whites; i++) {
					for (var j = 0; j < sacchetto.length; j++) {
						if (sacchetto[j] === undefined) {
							sacchetto[j] = 1;
						}
					}
				}
			}

			else if (confusione) {
				for (var i = 0; i < whites; i++) {
					for (var j = 0; j < sacchetto.length; j++) {
						if (sacchetto[j] === undefined) {
							var result = Math.random() < 0.5;
							if (result) {
								sacchetto[j] = 1;
							}
							else if (!result) {
								sacchetto[j] = 0;
							}
						}
					}
				}
			}

			for (var i = 0; i < blacks; i++) {
				for (var j = 0; j < sacchetto.length; j++) {
					if (sacchetto[j] === undefined) {
						sacchetto[j] = 0;
					}
				}
			}


			for(var i = 0; i < 5; i++) {
				shuffle(sacchetto);
			}

		}

	},


};