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

        await interaction.defer()

        let error = false
        await data.delete(`${interaction.guildId}.${command.id}`)
        command.delete().catch(e => error = true)

        if (error == true) return interaction.editReply({content: 'We encountered an error'})
        else {
            interaction.editReply({content: `Interaction Command ${option(interaction, 'name')} deleted`})
        }
    }
}

//we can still give default values to js params, kinda like assigning types
function option(interaction = new Discord.CommandInteraction(), name, placeholder) {
    return interaction.options?.get(name)?.value || placeholder
}