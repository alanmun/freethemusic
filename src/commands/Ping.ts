/*
At a minimum, the definition of a slash command must have a name and a description. 
Slash command names must be between 1-32 characters and contain no capital letters, 
spaces, or symbols other than - and _. Using the builder, a simple ping command 
definition would look like this:
*/

const { SlashCommandBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
	    .setName('ping')
	    .setDescription('Replies with Pong!'),
    async execute(interaction: any) {
        await interaction.reply('Pong!')
    },
};