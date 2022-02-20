require('dotenv').config()
const { Client, Intents } = require('discord.js')
const token = process.env.DISCORD_TOKEN
const axios = require('axios').default

const client = new Client({ intents: [Intents.FLAGS.GUILDS] })

client.once('ready', () => {
	console.log('Ready!')
})

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return

	const { commandName } = interaction
	let accessToken = ''
	let followerList = []

	if (commandName === 'get-random-follower') {
		await axios({
			method: 'post',
			url: `https://id.twitch.tv/oauth2/token?client_id=${process.env.TWITCH_CLIENT_ID}&client_secret=${process.env.TWITCH_CLIENT_SECRET}&grant_type=client_credentials`
		}).then(res => {
			accessToken = res.data.access_token
		})

		await axios({
			method: 'get',
			url: `https://api.twitch.tv/helix/users/follows?to_id=${process.env.TWITCH_USER_ID}`,
			headers: {
				'Authorization': `Bearer ${accessToken}`,
				'Client-Id': process.env.TWITCH_CLIENT_ID
			}
		}).then(res => {
			followerList = res.data.data
		})

		var randomFollower = followerList[Math.floor(Math.random()*followerList.length)]
		await interaction.reply(`Random follower: ${randomFollower.from_name}`)
	}
})

client.login(token)
