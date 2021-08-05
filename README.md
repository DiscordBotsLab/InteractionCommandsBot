# InteractionCommandsBot
A basic Interaction Commands bot which personalizes Interaction Commands for a server,
allows users with `MANAGE_GUILD` permission to create, edit and delete interaction commands for their server

```
Use /create to create an Interaction Command
Use /patch to path an Interaction Command
Use /delete to delete an Interaction Command
All global Interaction Commands are labeled it with 'System'
```

Requirements:
- Node version 14 or above
- npm
- discord.js, express and quick.db

# Getting the bot up and running
Clone the repository onto your system

```sh
git clone 'https://github.com/DiscordBotsLab/InteractionCommandsBot'
```
Open your code editor (eg: Webstorm, Visual Studio Code) and locate to `src/client.js`
```js
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
```
Locate to line 10 and replace 'someCrazyToken' from your Discord Application token ([click here](https://discord.com/developers/applications))<br><br>
Finally run the `start` script using `npm run start` or run `node .` in your shell

# Contributing
We are currently not allowing any new colaborators, however you can create a Pull Request!

**Original by advaith1 - [Slashtags](https://github.com/advaith1/slashtags)**
