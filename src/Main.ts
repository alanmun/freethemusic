const fs = require('node:fs');
const path = require('node:path');
import { BeebloClient } from './BeebloClient';
const { Events, GatewayIntentBits } = require('discord.js');
const { token } = require('../config.json');

// Create a new client instance
const client = new BeebloClient({ intents: [GatewayIntentBits.Guilds] }); //guild = internal name for discord server
console.log(client);

//Create this property so that we can access commands in other modules of the codebase
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter((file: any) => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);

	// Set a new item in the Collection with the key as the command name and the value as the exported module
	if ('data' in command && 'execute' in command) {
		client.commands.set(command.data.name, command);
	} else {
		console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
	}
}

// When the client is ready, run this code (only once)
// I call it clientInEvent for the event parameter to keep it separate from the already defined 'client'
client.once(Events.ClientReady, (clientInEvent: BeebloClient) => {
	console.log(`Ready! Logged in as ${clientInEvent.user.tag}`);
});

// Log in to Discord with your client's token
client.login(token);