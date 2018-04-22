# NotABot

<p align=center>
  <a  href="http://discordserver.bluemalgeran.com" target="_blank">
    <img src="https://discordapp.com/api/guilds/424202281001680897/widget.png?style=banner4">
  </a><br>
</p>
<p align=center>
You can invite NotABot by clicking
<a href="https://discordapp.com/oauth2/authorize?client_id=392860635035074572&scope=bot&permissions=805314622" target="_blank">this link</a>
</p>

# How to install (Windows)
1. Download the files in the repository 
2. Download Node.JS here: https://nodejs.org/en/
3. Open cmd and type `npm install`
4. Setup `settings.json`
5. Open `startbot.bat` to make the bot online.
# 24/7 host (Windows)
1. Open cmd in the folder and type `npm install pm2`
2. Type in the cmd `pm2 start index.js` abd the bot will be online 24/7!
# How to install (Ubuntu)
1. `$ git clone https://github.com/BlueMalgeran/NotABot`
2. Download node.js `$ sudo apt-get install -y nodejs`
3. Type `npm install` and it'll install the whole `package.json` dependencies
4. Setup `settings.json`
5. Type `node index.js` in the terminal
# 24/7 host (Ubuntu)
1. If you want to host it 24/7 type `npm install forever -g` or `npm install pm2`
2. Type in the terminal `forever start index.js` or `pm2 start index.js` and the bot will be online 24/7!
# Known bugs:
+ No images in the `dog` and `anime` commands!
+ `botservers` sometimes not working :/
# Note:
This bot is BETA so the bot don't have too many commands, just the cool commands.
And there is a copyright on this bot, so if someone takes credit on this bot I can prosecute him.
# Changelog
### Added:
+ Added `coinflip` command. (50/50)
+ Added `userinfo` command.
+ Added `avatar` command.
+ Added `uptime` command.
+ Added new moderation command! `ban` command.
+ Added new moderation command! `kick` command.
+ Added new command! `bugreport` send me a message of a bug or something... (DON'T TOUCH THE COMMAND!!!!!!)
+ Added new command! `mute` mutes a user in the chat by role.
+ Added new command!`unmute` unmutes a user in the chat by removed the muted role.
+ Added new command! `serverinfo` shows some cool info about the server.
+ Added new command! `quote` sends a quote made by smart guys. (No fortunes included.)
+ Added new (useless) command! `notice` the bot will hug you.
+ Added new setting to `settings.json`! Setting: `OwnerID` has been created for some future commands.
+ Added new moderation command! `softban` kicks a user and removes his messages.
+ Added new help commands! `help, modhelp, ownerhelp and bluehelp` It shows some commands for some people
+ Added new owner commands! `botname and botavatar` Changed the avatar and the name of the bot
+ Added new command for me! `todo` Shows my to do list.
+ Added new command! `issue` report a bug.
+ Added new command! `request` request something like music ¯\_(ツ)_/¯
+ New command! `dick` size user's dick size
+ Another command! `dog` sends a random picture of a dog
+ Another one! `roll` roll a number! (Good for giveaways)
+ New command for the owner! `say` the bot repeats your message.
+ Another new command for the owner! `shutdown` closes the bot.
+ I've added logs for every command and if the bot joins or leaves a server it will be logged!
+ Added a blacklist in the code but you don't need to change it... (I want the blacklists be in json files)
+ Added a message when the bot joins a server!
+ Added new command! `translate` if you want to translate a text 
+ Added new command! `animepic` if you want a random anime picture
+ Added new command! `caps` ranDom CAps LocK FoR Your Text
+ Added new command! `advice` the bot will give you an advice!
+ Added all of these new commands to the `help` command!
+ Added new command! `server` sends NotABot's Discord server!
+ Added another message to the help commands. ;)
+ Added new command! `stats` is like `uptime` (which remomved) but with more information! (Added to the `help` command)
+ Added logs in a text channel for bot's commands
+ Added `logsChannelID` to `settings.json` log commands and some more shit
+ Added `statusTYPE` to `settings.json` Set the bot's status aka game to `PLAYING, WATCHING and LISTENING (I don't think that STREAMING is working...)`
+ Added reaction to messages that users can't / can use, for example: `ownerhelp, bluehelp, todo ETC.`
+ ↑ Added check mark reaction to the help messages that regular users can use to the `help and modhelp` commands!
+ Now you can use the `say` command.
### Changed:
+ The bot's token was the game that he's playing instead the bot's prefix... lol
+ Changed the `botinfo` command for an embed message.
+ The command `botinfo` now have more information.
+ Changed the `bot` const to `client`, same shit
+ `8ball` command has been changed to embed message.
+ I've changed the bot's game to some good new shit :)
+ The `8ball` command has been changed to a embed message.
+ Improved the `8ball` command.
+ Made the code more cleaner!
+ Changed the text when the bot comes online!
+ Changed the bot's status... AGAIN
+ Changed the message when the bot joins a server!
+ Fixed logs.
+ Changed the reply messages.
+ Improved the `botping` command.
+ The bot deletes message when someone tries to use command that he can't.
+ Changed `invitebot` to `invite`
+ I don't know why but the `client.login` has been changed so I fixed it
+ Improved the bot's game! When the bot leaves / joins a server, the bot's game will be changed.
+ Typos :/
+ Changed the bot's game / stream
+ Improved the `dick` command.
+ Changed the server link in the command `server`
+ Changed the shitty `setGame` to `setActivity` with new setting! GO TO ADDED CATEGORY TO SEE!
+ Improved the `guildMSG` function.
+ MORE TYPOS!!!!!
### Removed:
- The spammy messages that was in the `help` command
- Permanently removed `bugreport` because you can report bugs [here](https://github.com/BlueMalgeran/NotABot/issues)
- Removed the `uptime` command and made another command with more informmation!
- Removed the `warn` commmand
### TODO:
- [x] watch porn
- [ ] Unban command.
- [ ] Blacklist from .json file
- [x] Mute command.
- [x] Unmute command.
- [x] Server info.
- [x] Softban command.
- [x] Bot's owner commands. (Avatar, username ETC.)
- [x] Some fun commands!
- [ ] MUSIC? **( ͡° ͜ʖ ͡°)**
