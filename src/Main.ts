const fs = require('node:fs');
const path = require('node:path');
import { BeebloClient } from './BeebloClient';
const { getCommandRequires } = require('./Utils');
const { Events, GatewayIntentBits } = require('discord.js');
const { token } = require('../config.json');

// Create a new client instance
const client = new BeebloClient({ intents: [GatewayIntentBits.Guilds] }); //guild = internal name for discord server

//Assign commands to the bot client
for (const command of getCommandRequires()) {

	// Set a new item in the Collection with the key as the command name and the value as the exported module
	if ('data' in command && 'execute' in command) {
		client.commands.set(command.data.name, command);
	} else {
		console.log(`[WARNING] The command: ${command} is missing a required "data" or "execute" property.`);
	}
}

// When the client is ready, run this code (only once)
// I call it clientInEvent for the event parameter to keep it separate from the already defined 'client'
client.once(Events.ClientReady, (clientInEvent: BeebloClient) => {
	console.log(`Ready! Logged in as ${clientInEvent.user.tag}`);
});

// Log in to Discord with your client's token
client.login(token);

//Listen for created interactions with users via chat (slash commands)
client.on(Events.InteractionCreate, async (interaction: any) => {
	if (!interaction.isChatInputCommand()) return;
	console.log(interaction);

	const command = interaction.client.commands.get(interaction.commandName);
	if(!command){
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}

	//At this point we have a valid command we can execute on. Do it in a try/catch in case something goes wrong:
	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		if (interaction.replied || interaction.deferred) {
			await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
		} else {
			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
	}
});