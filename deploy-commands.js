require('dotenv').config()
const { SlashCommandBuilder } = require('@discordjs/builders')
const { REST } = require('@discordjs/rest')
const { Routes } = require('discord-api-types/v9')

const commands = [
	new SlashCommandBuilder().setName('get-random-follower').setDescription('Fetches a random follower from Glitchposts followers list')
]
	.map(command => command.toJSON())
console.log(process.env.DISCORD_TOKEN)
const rest = new REST({ version: '9' }).setToken(process.env.DISCORD_TOKEN)

rest.put(Routes.applicationGuildCommands(process.env.DISCORD_CLIENT_ID, process.env.DISCORD_GUILD_ID), { body: commands })
	.then(() => console.log('Successfully registered application commands.'))
	.catch(console.error)