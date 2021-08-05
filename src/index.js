/**
 * Since Javascript does not support static typing and type errors,
 * we are going to take advatage of it to deploy our new bot
 * - wise words from Valt
*/
import Client from './client.js'
let client = new Client({
    intents: [
        'GUILDS',
        'GUILD_MEMBERS'
    ]
})

client.on('ready', async () => {
    console.log('Ready Client ' + client.user.username)
    await client.slashInit()
})

client.on('interactionCreate', async interaction => {
    if (interaction.isCommand() && interaction.inGuild()) {
        if ((await client.application.commands.fetch()).get(interaction.commandId)) {
            if (interaction.commandName == 'create') return (await import('./discord/create.js')).default.run(interaction)
            if (interaction.commandName == 'patch') return (await import('./discord/patch.js')).default.run(interaction)
            if (interaction.commandName == 'delete') return (await import('./discord/delete.js')).default.run(interaction)
            if (interaction.commandName == 'help') return (await import('./discord/help.js')).default.run(interaction)
        } else return (await import('./discord/guilds/guildCommand.js')).default.run(interaction)
    }
})

client.start()

export default client