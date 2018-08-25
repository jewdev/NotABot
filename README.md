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

Table of contents
=================

<!--ts-->
   * [Windows](#windows-instructions)
      * [How to install](#how-to-install)
      * [24/7 host](#24-7-host)
   * [Ubuntu](#ubuntu-instructions)
      * [How to install](#how-to-install)
      * [24/7 host](#24-7-host)
   * [Known bugs](#known-bugs)
   * [Requirements](#requirements)
   * [Note](#note)
   * [License](#license)
   * [Changelog](#changelog)
   * [Commands](#commands)
      * [Regular commands](#regular-commands)
      * [Moderation commands](#moderation-commands)
      * [Bot's owner commands](#bots-owner-commands)
   * [TODO](#todo)
<!--te-->


# Windows instructions
### How to install
1. Download the files in the repository 
2. Download Node.JS here: https://nodejs.org/en/
3. Open cmd and type `npm install`
4. Setup `settings.json`
5. Open `startbot.bat` to make the bot online.
### 24 7 host
1. Open cmd in the folder and type `npm install pm2`
2. Type in the cmd `pm2 start index.js` abd the bot will be online 24/7!

# Ubuntu instructions
### How to install
1. `$ git clone https://github.com/BlueMalgeran/NotABot`
2. Download node.js `$ sudo apt-get install -y nodejs`
3. Type `npm install` and it'll install the whole `package.json` dependencies
4. Setup `settings.json`
5. Type `node index.js` in the terminal
### 24 7 host
1. If you want to host it 24/7 type `npm install forever -g` or `npm install pm2`
2. Type in the terminal `forever start index.js` or `pm2 start index.js` and the bot will be online 24/7!

# Known bugs
+ No images in the `dog` and `anime` commands!
+ `botservers` sometimes not working :/
+ `SyntaxError: missing ) after argument list` a bug on Linux (Ubuntu)... You need to remove commands that require the async function. Example: weather, anime and dog. and change `client.on("message", async message => {` to `client.on("message", function() {` and it will fix the issue.
# Requirements
+ Node.js
+ NPM
+ The dependencies
+ (Optional) npm install forever (24/7 host on Linux)
+ (Optional) npm install pm2 (24/7 host on Windows)
# Note
This bot is BETA so the bot don't have too many commands, just the cool commands.
And there is a copyright on this bot, so if someone takes credit on this bot I can prosecute him.
# License
The MIT License (MIT)

Copyright (c) 2018 Blue Malgeran

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
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
+ Added reaction to messages! Go find it out!
+ Now you can use the `say` command.
+ Added `clear` commmand which will delete messages.
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
+ Changed the `ping` reply to `client.ping` and improved it :/
+ Changed the `botinfo` command's name to `info`
+ Fixed the `serverinfo` command.
### Removed:
- The spammy messages that was in the `help` command
- Permanently removed `bugreport` because you can report bugs [here](https://github.com/BlueMalgeran/NotABot/issues)
- Removed the `uptime` command and made another command with more informmation!
- Removed the `warn` commmand
# Commands
### Regular commands
Command|Description|Example
---|---|---
help|Sends the bot's commands.|~help
modhelp|Commands for admins and mods.|~modhelp
ownerhelp|Owner's commands.|~ownerhelp
bluehelp|secret.|~bluehelp
ping|Bot's ping (ms).|~ping
info|Give you info about the bot.|~info
8ball|Ask the bot a (yes/no) question.|~8ball [question]
weather|The weather in a city.|~weather [city]
invite|Invite the bot.|~invite
server|Join NotABot's server.|~server
coinflip|Flips a coin! (50/50 chance)|~coinflip
userinfo|Info about a user.|~userinfo [@mention]
avatar|Gets the avatar of the user.|~avatar [@mention]
stats|Bot's stats.|~stats
serverinfo|Info about the server.|~serverinfo
botservers|The servers the bot is in.|~botservers
quote|Quotes by smart people.|~quote
notice|The bot will hug you!|~notice
issue|Report bugs!|~issue
request|Request new features for the bot.|~request
roll|Rolls a random number.|~roll [number]
dick|Sizing a dick|~dick [@mention]
dog|Sends a picture of a dog!|~dog
translate|Translates text from language to another language|~translate [text] to [language]
anime|Sends a anime picture.|~anime
caps|Random caps.|~caps [text]
advice|Gives you an advice.|~advice
donate|Help NotABot live!|~donate
say|Tell NotABot something to say!|~say [text]
calc|Calculates the math question|~calc [number + number]
osu|Player stats on osu!|~osu [username]
gif|Random gif search|~gif [text]
cat|Random cat pic|~cat
hastebin|Upload text to hastebin.com|~hastebin [text]
trump|What does trump think?|~trump
btc|Bitcoin stats|~btc

### Moderation commands
Command|Description|Example
---|---|---
ban|Bans a user from your server!|~ban [@mention] [time - 2h - 2 hours] [reason]
kick|Kicks a user out of the server!|~kick [@mention] [reason]
mute|Mutes a user with a NotAMuted role!|~mute [@mention] [time - 2w - 2 weeks]
unmute|Unmutes a user and removes the NotAMuted role.|~unmute [@mention]
softban|Kicks a user and deletes his messages.|~softban [@mention] [reason]
clear|Remove messages / user's messages|~clear [number] or ~clear [@mention] [number]
lock|Locks a channel|~lock [#channel]
unlock|Unlocks a channel|~unlock [#channel]

### Bots owner commands
Command|Description|Example
---|---|---
botname|Changes the bot's username.|~botname [text]
botavatar|Changes the bot's avatar.|~botavatar [URL]
botnick|Changes the nickname in a server.|~botnick [text]
eval|Evaluates a code.|~eval [code]
shutdown|Closes the CMD window|~shutdown
botstatus|Changes the bot's status|~botstatus [text]
# TODO
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
