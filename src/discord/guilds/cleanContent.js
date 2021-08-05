import * as Discord from 'discord.js'

export default function cleanContent(interaction = new Discord.CommandInteraction(), content) {
    let stringContent = `${content}`

    let syntax = {
        '#commandID': interaction.commandId,
        '#commandName': interaction.commandName,
        '#userID': interaction.member.user.id,
        '#username': interaction.member.user.username,
        '#channelID': interaction.channelId,
        '#channelName': interaction.channel.name,
        '#guildID': interaction.guildId,
        '#guildName': interaction.guild.name,
        '#guildMemberCount': interaction.guild.memberCount,
        '#suppressErrors': stringContent.replace('\`❌\`', '')
    }

    stringContent = stringContent.replace(/(#commandID|#commandName|#userID|#username|#channelID|#channelName|#guildID|#guildName|#guildMemberCount|#suppressErrors)/gi, matched => syntax[matched])

    return stringContent.slice(0, 2000)
}