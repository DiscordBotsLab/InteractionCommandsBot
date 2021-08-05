import * as Discord from 'discord.js'
import * as Data from '../database.js'
let data = Data.default.data

export default {
    run: async (interaction = new Discord.CommandInteraction()) => {
        if (!interaction.guild.members.cache.get(interaction.member.user.id).permissions.has('MANAGE_GUILD')) return interaction.reply({
            content: 'You need the Manage Guild permission',
            ephemeral: true
        })

        let command = (await interaction.guild.commands.fetch()).find(command => command.name == option(interaction, 'name'))
        if (!command) return interaction.reply({content: `Interaction Command ${option(interaction, 'name')} does not exist`, ephemeral: true})
        if (interaction.options.data.length < 2) return interaction.reply({content: 'Please select some data to patch', ephemeral: true})
        if (!/^[\w-]{1,32}$/.test(option(interaction, 'new_name', command.name))) return interaction.reply({content: 'Interaction Command name must be under 32 characters and must not contain spaces', ephemeral: true})
        if (option(interaction, 'description', command.description).length > 100) return interaction.reply({content: 'Interaction Command description must be under 100 characters', ephemeral: true})
        if (option(interaction, 'content', 'thisimpliestothepoplewhodontreaddoc').length > 2000) return interaction.reply('Interaction Command content must be under 2000 characters')

        await interaction.defer()

        let error = false
        command.edit({
            name: option(interaction, 'new_name', command.name),
            description: option(interaction, 'description', command.description)
        }).catch(e => error = true)

        if (error == true) return interaction.editReply({content: 'We encountered an error'})
        else {
            interaction.editReply({content: `Interaction Command ${option(interaction, 'name')} was patched as ${option(interaction, 'new_name', option(interaction, 'name'))}`})
            await data.set(`${interaction.guildId}.${command.id}`, {
                content: option(interaction, 'content', await data.get(`${interaction.guildId}.${command.id}.content`)),
                ephemeral: option(interaction, 'ephemeral', await data.get(`${interaction.guildId}.${command.id}.ephemeral`))
            })
        }
    }
}

//we can still give default values to js params, kinda like assigning types
function option(interaction = new Discord.CommandInteraction(), name, placeholder) {
    return interaction.options?.get(name)?.value || placeholder
}