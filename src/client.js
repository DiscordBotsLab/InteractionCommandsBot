import * as Discord from 'discord.js'
import express from 'express'
import cors from 'cors'

export default class Client extends Discord.Client {
    server = express()
    port = 50009

    start() {
        this.login('someCrazyToken')

        this.server.listen(this.port, () => console.log('Server Ready at ' + this.port))
        this.server.use(cors())
    }

    async slashInit() {
        let cmd1 = await import('./discord/create.map.js')
        let cmd2 = await import('./discord/patch.map.js')
        let cmd3 = await import('./discord/delete.map.js')
        let cmd4 = await import('./discord/help.map.js')

        this.application.commands.create(cmd1.default())
        this.application.commands.create(cmd2.default())
        this.application.commands.create(cmd3.default())
        this.application.commands.create(cmd4.default())
    }
}