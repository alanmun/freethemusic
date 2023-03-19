//This script registers commands with Discord so that they can be deployed and actually show up in Discord for users in a server.
const { REST, Routes } = require('discord.js');
const { applicationId, token } = require('../config.json');
const { getCommandRequires } = require('../src/Utils');

const commands = [];
// Grab the SlashCommandBuilder#toJSON() output of each command's data for deployment
for (const require of getCommandRequires()) {
	commands.push(require.data.toJSON());
}

// Construct and prepare an instance of the REST module
const rest = new REST({ version: '10' }).setToken(token);

// and deploy your commands!
(async () => {
	try {
		console.log(`Started refreshing ${commands.length} application (/) commands.`);

		// The put method is used to fully refresh all commands in the guild with the current set
		const data = await rest.put(
			Routes.applicationGuildCommands(applicationId, guildId),
			{ body: commands },
		);

		console.log(`Successfully reloaded ${data.length} application (/) commands.`);
	} catch (error) {
		// And of course, make sure you catch and log any errors!
		console.error(error);
	}
})();