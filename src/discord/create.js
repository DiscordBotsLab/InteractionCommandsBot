import * as Discord from 'discord.js'
import * as Data from '../database.js'
let data = Data.default.data

export default {
    run: async (interaction = new Discord.CommandInteraction()) => {
        if (!interaction.member.permissions.has('MANAGE_GUILD')) return interaction.reply({
            content: 'You need the Manage Guild permission',
            ephemeral: true
        })

        if ((await interaction.guild.commands.fetch()).find(command => command.name == option(interaction, 'name'))) return interaction.reply({content: `Interaction Command with the name ${option(interaction, 'name')} already exists`, ephemeral: true})
        if (!/^[\w-]{1,32}$/.test(`${option(interaction, 'name')}`)) return interaction.reply({content: 'Interaction Command name must be under 32 characters and must not contain spaces', ephemeral: true})
        if (option(interaction, 'description').length > 100) return interaction.reply({content: 'Interaction Command description must be under 100 characters', ephemeral: true})
        if (option(interaction, 'content').length > 2000) return interaction.reply('Interaction Command content must be under 2000 characters')

        await interaction.defer()

        let error = false
        let command = await interaction.guild.commands.create({
            name: option(interaction, 'name'),
            description: option(interaction, 'description')
        }).catch(e => error = true)

        if (error == true) return interaction.editReply({content: 'We encountered an error'})
        else {
            interaction.editReply({content: `Interaction Command ${option(interaction, 'name')} was created`})
            await data.set(`${interaction.guildId}.${command.id}`, {
                content: option(interaction, 'content'),
                ephemeral: option(interaction, 'ephemeral', false)
            })
        }
    }
}

//we can still give default values to js params, kinda like assigning types
function option(interaction = new Discord.CommandInteraction(), name, placeholder) {
    return interaction.options?.get(name)?.value || placeholder
}