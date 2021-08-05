import * as Discord from 'discord.js'
import * as cleanContent from './cleanContent.js'
import * as setVariables from './setVariables.js'
import * as Data from '../../database.js'
let data = Data.default.data

export default {
    run: async (interaction = new Discord.CommandInteraction()) => {
        let commandData = await data.get(interaction.guildId + '.' + interaction.commandId)
        if (!commandData) return interaction.reply({content: 'This Interaction Command is not functional', ephemeral: true})
        else return interaction.reply({content: cleanContent.default(interaction, await setVariables.default(commandData.content, interaction.guildId)), ephemeral: commandData.ephemeral || false})
    }
}