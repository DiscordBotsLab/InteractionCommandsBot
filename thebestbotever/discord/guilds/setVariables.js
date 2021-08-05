import Database from '../../database.js'
let data = Database.data

export default async function setVariables(content, guildID) {
    let stringContent = `${content}`
    let guildData = await data.get(guildID)

    stringContent.split(' ').forEach(char => {
        if (char.startsWith('#var[') && char.endsWith(']')) {
            let variable = guildData[char.slice(5, char.length - 1)] || '\`❌\`'
            stringContent = stringContent.replace(char, variable)
        }
    })

    return stringContent.slice(0, 2000)
}