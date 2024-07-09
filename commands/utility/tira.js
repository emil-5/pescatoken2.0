const { SlashCommandBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('tira')
		.setDescription('Fai un tiro'),
	async execute(interaction) {
		var chosenWhites, chosenBlacks, chosenGreys, chosenUscita, chosenEstratti;
		const Interaction = interaction;

		if (interaction.commandName && interaction.commandName === "tira") {
			chosenWhites = "0";
			chosenBlacks = "0";
			chosenGreys = "0";
			chosenUscita = "0";
			chosenEstratti = "0"
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
		const estrattiPlusButton = new ButtonBuilder()
			.setCustomId('estrattiPlusButton')
			.setLabel('+')
			.setStyle(ButtonStyle.Success);
		const estrattiMinusButton = new ButtonBuilder()
			.setCustomId('estrattiMinusButton')
			.setLabel('-')
			.setStyle(ButtonStyle.Danger);
		const estrattiCounterFakeButton = new ButtonBuilder()
			.setCustomId('estrattiCounterFakeButton')
			.setLabel("Estratti: " + chosenEstratti)
			.setStyle(ButtonStyle.Secondary)
			.setDisabled(true);
		const tiraButton = new ButtonBuilder()
			.setCustomId('tiraButton')
			.setLabel("Estrai")
			.setStyle(ButtonStyle.Primary);
		const rischiaButton = new ButtonBuilder()
			.setCustomId('rischiaButton')
			.setLabel("Rischia")
			.setStyle(ButtonStyle.Primary);
		const chiudiButton = new ButtonBuilder()
			.setCustomId('chiudiButton')
			.setLabel("Chiudi")
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
		const estrattiRow = new ActionRowBuilder()
			.addComponents(estrattiMinusButton, estrattiCounterFakeButton, estrattiPlusButton);
		const rischiaChiudiRow = new ActionRowBuilder()
			.addComponents(rischiaButton, chiudiButton);
		const chiudiRow = new ActionRowBuilder()
			.addComponents(chiudiButton);
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
			components: [whiteRow, blackRow, estrattiRow, rollTypeRow],
		});

		const collector = interaction.channel.createMessageComponentCollector({ time: 3500000 });

		collector.on('collect', async i => {
			// check if the author triggered the interaction

			try {
				if (i.message.interaction.id != interaction.id) {

				}

				if (i.member.id != interaction.user.id && i.message.interaction.id == interaction.id) {
					await i.deferUpdate();
				}

				if (i.customId == 'whitePlusButton' && i.message.interaction.id == interaction.id) {
					var whiteLabel = i.message.components[0].components[1].data.label;
					chosenWhites = "" + (Number(whiteLabel.split(" ")[1]) + 1);
					chosenGreys = "0";
					whiteCounterFakeButton.setLabel("Bianchi: " + chosenWhites);
					if (uscitaRollButton.data.style === 1) {
						await Interaction.editReply({ content: "", components: [whiteRow, blackRow, uscitaRow, estrattiRow, rollTypeRow] });
						await i.deferUpdate();
					}
					else if (uscitaRollButton.data.style === 2) {
						await Interaction.editReply({ content: "", components: [whiteRow, blackRow, estrattiRow, rollTypeRow] });
						await i.deferUpdate();
					}
				}

				else if (i.customId == 'whiteMinusButton' && i.message.interaction.id == interaction.id) {
					var whiteLabel = i.message.components[0].components[1].data.label;
					chosenWhites = "" + (Number(whiteLabel.split(" ")[1]) - 1);
					chosenGreys = "0";
					whiteCounterFakeButton.setLabel("Bianchi: " + chosenWhites);
					if (uscitaRollButton.data.style === 1) {
						await Interaction.editReply({ content: "", components: [whiteRow, blackRow, uscitaRow, estrattiRow, rollTypeRow] });
						await i.deferUpdate();
					}
					else if (uscitaRollButton.data.style === 2) {
						await Interaction.editReply({ content: "", components: [whiteRow, blackRow, estrattiRow, rollTypeRow] });
						await i.deferUpdate();
					}
				}

				else if (i.customId == 'greyPlusButton' && i.message.interaction.id == interaction.id) {
					var greyLabel = i.message.components[0].components[1].data.label;
					chosenGreys = "" + (Number(greyLabel.split(" ")[1]) + 1);
					chosenWhites = "0";
					greyCounterFakeButton.setLabel("Grigi: " + chosenGreys);
					if (uscitaRollButton.data.style === 1) {
						await Interaction.editReply({ content: "", components: [greyRow, blackRow, uscitaRow, estrattiRow, rollTypeRow] });
						await i.deferUpdate();
					}
					else if (uscitaRollButton.data.style === 2) {
						await Interaction.editReply({ content: "", components: [greyRow, blackRow, estrattiRow, rollTypeRow] });
						await i.deferUpdate();
					}
				}

				else if (i.customId == 'greyMinusButton' && i.message.interaction.id == interaction.id) {
					var greyLabel = i.message.components[0].components[1].data.label;
					chosenGreys = "" + (Number(greyLabel.split(" ")[1]) - 1);
					chosenWhites = "0";
					greyCounterFakeButton.setLabel("Grigi: " + chosenGreys);
					if (uscitaRollButton.data.style === 1) {
						await Interaction.editReply({ content: "", components: [greyRow, blackRow, uscitaRow, estrattiRow, rollTypeRow] });
						await i.deferUpdate();
					}
					else if (uscitaRollButton.data.style === 2) {
						await Interaction.editReply({ content: "", components: [greyRow, blackRow, estrattiRow, rollTypeRow] });
						await i.deferUpdate();
					}
				}

				else if (i.customId == 'blackPlusButton' && i.message.interaction.id == interaction.id) {
					var blackLabel = i.message.components[1].components[1].data.label;
					chosenBlacks = "" + (Number(blackLabel.split(" ")[1]) + 1);
					blackCounterFakeButton.setLabel("Neri: " + chosenBlacks);
					if (uscitaRollButton.data.style === 1 && normalRollButton.data.style === 1 && confusionRollButton.data.style === 2) {
						await Interaction.editReply({ content: "", components: [whiteRow, blackRow, uscitaRow, estrattiRow, rollTypeRow] });
						await i.deferUpdate();
					}
					else if (uscitaRollButton.data.style === 1 && normalRollButton.data.style === 2 && confusionRollButton.data.style === 1) {
						await Interaction.editReply({ content: "", components: [greyRow, blackRow, uscitaRow, estrattiRow, rollTypeRow] });
						await i.deferUpdate();
					}
					else if (uscitaRollButton.data.style === 2 && normalRollButton.data.style === 1 && confusionRollButton.data.style === 2) {
						await Interaction.editReply({ content: "", components: [whiteRow, blackRow, estrattiRow, rollTypeRow] });
						await i.deferUpdate();
					}
					else if (uscitaRollButton.data.style === 2 && normalRollButton.data.style === 2 && confusionRollButton.data.style === 1) {
						await Interaction.editReply({ content: "", components: [greyRow, blackRow, estrattiRow, rollTypeRow] });
						await i.deferUpdate();
					}
				}

				else if (i.customId == 'blackMinusButton' && i.message.interaction.id == interaction.id) {
					var blackLabel = i.message.components[1].components[1].data.label;
					chosenBlacks = "" + (Number(blackLabel.split(" ")[1]) - 1);
					blackCounterFakeButton.setLabel("Neri: " + chosenBlacks);
					if (uscitaRollButton.data.style === 1 && normalRollButton.data.style === 1 && confusionRollButton.data.style === 2) {
						await Interaction.editReply({ content: "", components: [whiteRow, blackRow, uscitaRow, estrattiRow, rollTypeRow] });
						await i.deferUpdate();
					}
					else if (uscitaRollButton.data.style === 1 && normalRollButton.data.style === 2 && confusionRollButton.data.style === 1) {
						await Interaction.editReply({ content: "", components: [greyRow, blackRow, uscitaRow, estrattiRow, rollTypeRow] });
						await i.deferUpdate();
					}
					else if (uscitaRollButton.data.style === 2 && normalRollButton.data.style === 1 && confusionRollButton.data.style === 2) {
						await Interaction.editReply({ content: "", components: [whiteRow, blackRow, estrattiRow, rollTypeRow] });
						await i.deferUpdate();
					}
					else if (uscitaRollButton.data.style === 2 && normalRollButton.data.style === 2 && confusionRollButton.data.style === 1) {
						await Interaction.editReply({ content: "", components: [greyRow, blackRow, estrattiRow, rollTypeRow] });
						await i.deferUpdate();
					}

				}

				else if (i.customId == 'estrattiPlusButton' && i.message.interaction.id == interaction.id) {
					if (uscitaRollButton.data.style === 1 && normalRollButton.data.style === 1 && confusionRollButton.data.style === 2) {
						var estrattiLabel = i.message.components[3].components[1].data.label;
						chosenEstratti = "" + (Number(estrattiLabel.split(" ")[1]) + 1);
						estrattiCounterFakeButton.setLabel("Estratti: " + chosenEstratti);
						await Interaction.editReply({ content: "", components: [whiteRow, blackRow, uscitaRow, estrattiRow, rollTypeRow] });
						await i.deferUpdate();
					}
					else if (uscitaRollButton.data.style === 1 && normalRollButton.data.style === 2 && confusionRollButton.data.style === 1) {
						var estrattiLabel = i.message.components[3].components[1].data.label;
						chosenEstratti = "" + (Number(estrattiLabel.split(" ")[1]) + 1);
						estrattiCounterFakeButton.setLabel("Estratti: " + chosenEstratti);
						await Interaction.editReply({ content: "", components: [greyRow, blackRow, uscitaRow, estrattiRow, rollTypeRow] });
						await i.deferUpdate();
					}
					else if (uscitaRollButton.data.style === 2 && normalRollButton.data.style === 1 && confusionRollButton.data.style === 2) {
						var estrattiLabel = i.message.components[2].components[1].data.label;
						chosenEstratti = "" + (Number(estrattiLabel.split(" ")[1]) + 1);
						estrattiCounterFakeButton.setLabel("Estratti: " + chosenEstratti);
						await Interaction.editReply({ content: "", components: [whiteRow, blackRow, estrattiRow, rollTypeRow] });
						await i.deferUpdate();
					}
					else if (uscitaRollButton.data.style === 2 && normalRollButton.data.style === 2 && confusionRollButton.data.style === 1) {
						var estrattiLabel = i.message.components[2].components[1].data.label;
						chosenEstratti = "" + (Number(estrattiLabel.split(" ")[1]) + 1);
						estrattiCounterFakeButton.setLabel("Estratti: " + chosenEstratti);
						await Interaction.editReply({ content: "", components: [greyRow, blackRow, estrattiRow, rollTypeRow] });
						await i.deferUpdate();
					}
				}

				else if (i.customId == 'estrattiMinusButton' && i.message.interaction.id == interaction.id) {
					if (uscitaRollButton.data.style === 1 && normalRollButton.data.style === 1 && confusionRollButton.data.style === 2) {
						var estrattiLabel = i.message.components[3].components[1].data.label;
						chosenEstratti = "" + (Number(estrattiLabel.split(" ")[1]) - 1);
						estrattiCounterFakeButton.setLabel("Estratti: " + chosenEstratti);
						await Interaction.editReply({ content: "", components: [whiteRow, blackRow, uscitaRow, estrattiRow, rollTypeRow] });
						await i.deferUpdate();
					}
					else if (uscitaRollButton.data.style === 1 && normalRollButton.data.style === 2 && confusionRollButton.data.style === 1) {
						var estrattiLabel = i.message.components[3].components[1].data.label;
						chosenEstratti = "" + (Number(estrattiLabel.split(" ")[1]) - 1);
						estrattiCounterFakeButton.setLabel("Estratti: " + chosenEstratti);
						await Interaction.editReply({ content: "", components: [greyRow, blackRow, uscitaRow, estrattiRow, rollTypeRow] });
						await i.deferUpdate();
					}
					else if (uscitaRollButton.data.style === 2 && normalRollButton.data.style === 1 && confusionRollButton.data.style === 2) {
						var estrattiLabel = i.message.components[2].components[1].data.label;
						chosenEstratti = "" + (Number(estrattiLabel.split(" ")[1]) - 1);
						estrattiCounterFakeButton.setLabel("Estratti: " + chosenEstratti);
						await Interaction.editReply({ content: "", components: [whiteRow, blackRow, estrattiRow, rollTypeRow] });
						await i.deferUpdate();
					}
					else if (uscitaRollButton.data.style === 2 && normalRollButton.data.style === 2 && confusionRollButton.data.style === 1) {
						var estrattiLabel = i.message.components[2].components[1].data.label;
						chosenEstratti = "" + (Number(estrattiLabel.split(" ")[1]) - 1);
						estrattiCounterFakeButton.setLabel("Estratti: " + chosenEstratti);
						await Interaction.editReply({ content: "", components: [greyRow, blackRow, estrattiRow, rollTypeRow] });
						await i.deferUpdate();
					}
				}

				else if (i.customId == 'uscitaPlusButton' && i.message.interaction.id == interaction.id) {
					var uscitaLabel = i.message.components[2].components[1].data.label;
					chosenUscita = "" + (Number(uscitaLabel.split(" ")[1]) + 1);
					uscitaCounterFakeButton.setLabel("Uscita: " + chosenUscita);
					if (normalRollButton.data.style === 1 && confusionRollButton.data.style === 2) {
						await Interaction.editReply({ content: "", components: [whiteRow, blackRow, uscitaRow, estrattiRow, rollTypeRow] });
						await i.deferUpdate();
					}
					else if (normalRollButton.data.style === 2 && confusionRollButton.data.style === 1) {
						await Interaction.editReply({ content: "", components: [greyRow, blackRow, uscitaRow, estrattiRow, rollTypeRow] });
						await i.deferUpdate();
					}
				}

				else if (i.customId == 'uscitaMinusButton' && i.message.interaction.id == interaction.id) {
					var uscitaLabel = i.message.components[2].components[1].data.label;
					chosenUscita = "" + (Number(uscitaLabel.split(" ")[1]) - 1);
					uscitaCounterFakeButton.setLabel("Uscita: " + chosenUscita);
					if (normalRollButton.data.style === 1 && confusionRollButton.data.style === 2) {
						await Interaction.editReply({ content: "", components: [whiteRow, blackRow, uscitaRow, estrattiRow, rollTypeRow] });
						await i.deferUpdate();
					}
					else if (normalRollButton.data.style === 2 && confusionRollButton.data.style === 1) {
						await Interaction.editReply({ content: "", components: [greyRow, blackRow, uscitaRow, estrattiRow, rollTypeRow] });
						await i.deferUpdate();
					}
				}

				else if (i.customId == 'normalRollButton' && i.message.interaction.id == interaction.id) {
					if (normalRollButton.data.style === 1 && confusionRollButton.data.style === 2) {
						if (uscitaRollButton.data.style === 1) {
							await Interaction.editReply({ content: "", components: [whiteRow, blackRow, uscitaRow, estrattiRow, rollTypeRow] });
							await i.deferUpdate();
						}
						else if (uscitaRollButton.data.style === 2) {
							await Interaction.editReply({ content: "", components: [whiteRow, blackRow, estrattiRow, rollTypeRow] });
							await i.deferUpdate();
						}
					}
					else if (normalRollButton.data.style === 2 && confusionRollButton.data.style === 1) {
						chosenWhites = "0";
						normalRollButton.setStyle(ButtonStyle.Primary);
						whiteCounterFakeButton.setLabel("Bianchi: " + chosenWhites);
						confusionRollButton.setStyle(ButtonStyle.Secondary);
						if (uscitaRollButton.data.style === 1) {
							await Interaction.editReply({ content: "", components: [whiteRow, blackRow, uscitaRow, estrattiRow, rollTypeRow] });
							await i.deferUpdate();
						}
						else if (uscitaRollButton.data.style === 2) {
							await Interaction.editReply({ content: "", components: [whiteRow, blackRow, estrattiRow, rollTypeRow] });
							await i.deferUpdate();
						}
					}
				}

				else if (i.customId == 'confusionRollButton' && i.message.interaction.id == interaction.id) {
					if (confusionRollButton.data.style === 1 && normalRollButton.data.style === 2) {
						if (uscitaRollButton.data.style === 1) {
							await Interaction.editReply({ content: "", components: [greyRow, blackRow, uscitaRow, estrattiRow, rollTypeRow] });
							await i.deferUpdate();
						}
						else if (uscitaRollButton.data.style === 2) {
							await Interaction.editReply({ content: "", components: [greyRow, blackRow, estrattiRow, rollTypeRow] });
							await i.deferUpdate();
						}
					}
					else if (confusionRollButton.data.style === 2 && normalRollButton.data.style === 1) {
						chosenGreys = "0";
						confusionRollButton.setStyle(ButtonStyle.Primary);
						greyCounterFakeButton.setLabel("Grigi: " + chosenGreys)
						normalRollButton.setStyle(ButtonStyle.Secondary);
						if (uscitaRollButton.data.style === 1) {
							await Interaction.editReply({ content: "", components: [greyRow, blackRow, uscitaRow, estrattiRow, rollTypeRow] });
							await i.deferUpdate();
						}
						else if (uscitaRollButton.data.style === 2) {
							await Interaction.editReply({ content: "", components: [greyRow, blackRow, estrattiRow, rollTypeRow] });
							await i.deferUpdate();
						}
					}
				}

				else if (i.customId == 'uscitaRollButton' && i.message.interaction.id == interaction.id) {
					if (uscitaRollButton.data.style === 1) {
						uscitaRollButton.setStyle(ButtonStyle.Secondary);
						if (normalRollButton.data.style === 1 && confusionRollButton.data.style === 2) {
							await Interaction.editReply({ content: "", components: [whiteRow, blackRow, estrattiRow, rollTypeRow] });
						}
						else if (normalRollButton.data.style === 2 && confusionRollButton.data.style === 1) {
							await Interaction.editReply({ content: "", components: [greyRow, blackRow, estrattiRow, rollTypeRow] });
						}
						await i.deferUpdate();
					}
					else if (uscitaRollButton.data.style === 2) {
						chosenUscita = "0";
						uscitaRollButton.setStyle(ButtonStyle.Primary);
						uscitaCounterFakeButton.setLabel("Uscita: " + chosenUscita)
						if (normalRollButton.data.style === 1 && confusionRollButton.data.style === 2) {
							await Interaction.editReply({ content: "", components: [whiteRow, blackRow, uscitaRow, estrattiRow, rollTypeRow] });
						}
						else if (normalRollButton.data.style === 2 && confusionRollButton.data.style === 1) {
							await Interaction.editReply({ content: "", components: [greyRow, blackRow, uscitaRow, estrattiRow, rollTypeRow] });
						}
						await i.deferUpdate();
					}
				}

				else if (i.customId == 'tiraButton' && i.message.interaction.id == interaction.id) {
					var blackLabel = i.message.components[1].components[1].data.label;
					chosenBlacks = "" + (Number(blackLabel.split(" ")[1]));
					if (normalRollButton.data.style === 1) {
						var whiteLabel = i.message.components[0].components[1].data.label;
						chosenWhites = "" + (Number(whiteLabel.split(" ")[1]));
						chosenGreys = "0";
						var estrattiLabel = i.message.components[2].components[1].data.label;
						chosenEstratti = "" + (Number(estrattiLabel.split(" ")[1]));
					}
					if (confusionRollButton.data.style === 1) {
						var greyLabel = i.message.components[0].components[1].data.label;
						chosenGreys = "" + (Number(greyLabel.split(" ")[1]));
						chosenWhites = "0";
						var estrattiLabel = i.message.components[2].components[1].data.label;
						chosenEstratti = "" + (Number(estrattiLabel.split(" ")[1]));
					}
					if (uscitaRollButton.data.style === 1) {
						var uscitaLabel = i.message.components[2].components[1].data.label;
						chosenUscita = "" + (Number(uscitaLabel.split(" ")[1]));
						var estrattiLabel = i.message.components[3].components[1].data.label;
						chosenEstratti = "" + (Number(estrattiLabel.split(" ")[1]));
					}
					var risultato = eseguiEstrazione(Number(chosenWhites), Number(chosenGreys), Number(chosenBlacks), Number(chosenUscita), Number(chosenEstratti));
					if (risultato[0]) {
						await Interaction.editReply({ content: risultato[1], components: [rischiaChiudiRow] });
						await i.deferUpdate();
					}
					else {
						await Interaction.editReply({ content: risultato[1], components: [] });
						await i.deferUpdate();
					}
				}

				else if (i.customId == 'chiudiButton' && i.message.interaction.id == interaction.id) {
					await Interaction.editReply({ content: i.message.content, components: [] });
					i.deferUpdate();
					Interaction.deferUpdate()
				}

				else if (i.customId == 'rischiaButton' && i.message.interaction.id == interaction.id) {
					var message = i.message.content;
					var estratti = message.split("\n")[0];
					var bianchiEstratti = Number(estratti.split(" ")[2].replace(",", ""));
					var neriEstratti = Number(estratti.split(" ")[4].replace(")", ""));
					var sacchetto = message.split("\n")[1];
					var bianchiSacchetto = Number(sacchetto.split(" ")[2].replace(",", ""));
					var neriSacchetto = Number(sacchetto.split(" ")[4].replace(")", ""));
					var risultatoRischiaText = rischia(bianchiEstratti, neriEstratti, bianchiSacchetto, neriSacchetto);
					await Interaction.editReply({ content: risultatoRischiaText, components: [] });
					await i.deferUpdate();
				}
			}
			catch (error) {
				i.deferUpdate();
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

		function eseguiEstrazione(whites, greys, blacks, uscita, estratti) {
			var confusione = false;
			var uscita = false;
			var annulla = false;
			var sacchetto = [];
			var estrazione = [];
			var uscitaTesti = [];
			uscitaTesti[0] = "Uscita di scena: insegna agli angeli ad abbracciare il pavimento...";
			uscitaTesti[1] = "Uscita di scena: si era solo scordato di andare in bagno...";
			uscitaTesti[2] = "Uscita di scena: se nel mondo esistesse un pò di bene e ognuno si considerasse suo fratello...";
			uscitaTesti[3] = "Uscita di scena: si è preso una freccia nel ginocchio...";
			uscitaTesti[4] = "Uscita di scena: non deve pagare più le tasse...";
			uscitaTesti[5] = "Uscina di scena: è l'umidità che te ammazza...";
			var risultatoEstrazioneText = "";

			if (whites === 0 && greys === 0 && blacks === 0) {
				annulla = true;
			}

			if (!annulla) {

				if (greys > 0) {
					confusione = true;
				}

				if (uscita > 0) {
					uscita = true;
				}


				if (!confusione) {
					for (var i = 0; i < whites; i++) {
						sacchetto.push(1);
					}
				}

				else if (confusione) {
					for (var i = 0; i < whites; i++) {
						var result = Math.random() < 0.5;
						if (result) {
							sacchetto.push(1)
						}
						else if (!result) {
							sacchetto.push(0)
						}
					}
				}

				for (var i = 0; i < blacks; i++) {
					sacchetto.push(0);
				}


				for (var i = 0; i < 5; i++) {
					shuffle(sacchetto);
				}

				var tokenRandomIndex = [];
				for (var i = 0; i < estratti; i++) {
					min = Math.ceil(0);
					max = Math.floor(sacchetto.length - 1);
					tokenRandomIndex[i] = Math.floor(Math.random() * (max - min + 1)) + min;
					estrazione.push(sacchetto[tokenRandomIndex[i]]);
				}

				for (var i = 0; i < tokenRandomIndex.length; i++) {
					sacchetto.splice(tokenRandomIndex[i], 1);
				}

				var bianchiEstratti = 0;
				var neriEstratti = 0;
				for (var i = 0; i < estrazione.length; i++) {
					if (estrazione[i] === 1) {
						bianchiEstratti++;
					}
					else if (estrazione[i] === 0) {
						neriEstratti++;
					}
				}

				var bianchiRimasti = 0;
				var neriRimasti = 0;
				for (var i = 0; i < sacchetto.length; i++) {
					if (sacchetto[i] === 1) {
						bianchiRimasti++;
					}
					else if (sacchetto[i] === 0) {
						neriRimasti++;
					}
				}

				if (uscita) {
					if (neriEstratti >= uscita) {
						var uscitaRandomIndex = Math.floor(Math.random() * uscitaTesti.length);
						var uscitaTesto = uscitaTesti[uscitaRandomIndex];
						risultatoEstrazioneText += "Estratti: (Bianchi: " + bianchiEstratti + ", Neri: " + neriEstratti + ")";
						risultatoEstrazioneText += "\n";
						risultatoEstrazioneText += "Sacchetto: (Bianchi: " + bianchiRimasti + ", Neri: " + neriRimasti + ")";
						risultatoEstrazioneText += "\n";
						risultatoEstrazioneText += uscitaTesto;
					}
					else {
						risultatoEstrazioneText += "Estratti: (Bianchi: " + bianchiEstratti + ", Neri: " + neriEstratti + ")";
						risultatoEstrazioneText += "\n";
						risultatoEstrazioneText += "Sacchetto: (Bianchi: " + bianchiRimasti + ", Neri: " + neriRimasti + ")";
					}
				}
				else {
					risultatoEstrazioneText += "Estratti: (Bianchi: " + bianchiEstratti + ", Neri: " + neriEstratti + ")";
					risultatoEstrazioneText += "\n";
					risultatoEstrazioneText += "Sacchetto: (Bianchi: " + bianchiRimasti + ", Neri: " + neriRimasti + ")";
				}


				var risultato = [];
				if (estratti >= 5) {
					risultato[0] = false;
				}
				else {
					risultato[0] = true;
				}
				risultato[1] = risultatoEstrazioneText;

				return risultato;
			}

		}

		function rischia(bianchiEstratti, neriEstratti, bianchiSacchetto, neriSacchetto) {
			var estratti = bianchiEstratti + neriEstratti;
			var daEstrarre = 5 - estratti;
			var risultatoRischiaText = "";
			for (var i = 0; i < daEstrarre; i++) {
				var random = Math.random() < 0.5;

				if (bianchiSacchetto === 0 && neriSacchetto === 0) {

				}
				else if (bianchiSacchetto === 0 && neriSacchetto !== 0) {
					neriSacchetto--;
					neriEstratti++;
				}
				else if (bianchiSacchetto !== 0 && neriSacchetto === 0) {
					bianchiSacchetto--;
					bianchiEstratti++;
				}
				else if (bianchiSacchetto !== 0 && neriSacchetto !== 0 && random) {
					bianchiSacchetto--;
					bianchiEstratti++;
				}
				else if (bianchiSacchetto !== 0 && neriSacchetto !== 0 && !random) {
					neriSacchetto--;
					neriEstratti++;
				}
			}

			risultatoRischiaText += "Estratti: (Bianchi: " + bianchiEstratti + ", Neri: " + neriEstratti + ")";
			risultatoRischiaText += "\n";
			risultatoRischiaText += "Sacchetto: (Bianchi: " + bianchiSacchetto + ", Neri: " + neriSacchetto + ")";
			return risultatoRischiaText;
		}

	},


};