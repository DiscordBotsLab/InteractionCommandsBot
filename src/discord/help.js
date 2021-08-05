import * as Discord from 'discord.js'

export default {
    run: async (interaction = new Discord.CommandInteraction()) => {
        interaction.reply({
            content: `${interaction.guild.me.user.username} is a simple Interaction Commands bot\n\nUse \`/create\` to create an Interaction Command\nUse \`patch\` to patch an Interaction Command\nUse \`/delete\` to delete an Interaction Command\n\n[Invite](https://discord.com/api/oauth2/authorize?client_id=${interaction.applicationId}&permissions=0&scope=bot%20applications.commands) - [Repo](https://buzz-development.github.io) - Made by Valt`
        })
    }
}