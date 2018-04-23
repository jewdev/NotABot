const Discord = require("discord.js");
const settings = require("./settings.json");
const moment = require("moment");

var client = new Discord.Client();
var embed = new Discord.RichEmbed();

// Fortunes for 8ball command
var fortunes = [
    "`Yes`",
    "`No`",
    "`Maybe`",
    "`Ask again`",
    "`Sometimes`",
    "`Okay`",
    "`HELL NO`",
    "`FUCK YEAH`",
    "`no no no`"
];

// Functions when the bot is online
client.on("ready", function() {
    var clientonmessage = `
------------------------------------------------------
> Logging in...
------------------------------------------------------
Logged in as ${client.user.tag}
Working on ${client.guilds.size} servers!
${client.channels.size} channels and ${client.users.size} users cached!
I am logged in and ready to roll!
LET'S GO!
------------------------------------------------------
----------Bot created by Blue Malgeran#3106-----------
------------------------------------------------------
-----------------Bot's commands logs------------------`

    console.log(clientonmessage);
    client.user.setActivity(`${client.guilds.size} servers | ${settings.botPREFIX}help`, { type: settings.statusTYPE });
});

// Logs of the bot joined a server and changed the game of the bot
client.on("guildCreate", guild => {
    const logsServerJoin = client.channels.get(settings.logsChannelID);
    console.log(`The bot just joined to ${guild.name}, Owned by ${guild.owner.user.tag}`);
    logsServerJoin.send(`The bot just joined to ${guild.name}, Owned by ${guild.owner.user.tag}`);

    client.user.setActivity(`${client.guilds.size} servers | ${settings.botPREFIX}help`, { type: settings.statusTYPE });

    var guildMSG = guild.channels.find('name', 'general');

    if (guildMSG) {
        guildMSG.send(`
Hello there! My original name is \`NotABot\`!\n\
This bot created by **Blue Malgeran#3106**\n\
For more info type \`${settings.botPREFIX}help\`!\n\
\`NotABot - Official Server:\` https://discord.gg/KugMg6K`);
    } else {
        return;
    }
});

// Logs of the bot leaves a server and changed the game of the bot
client.on("guildDelete", guild => {
    const logsServerLeave = client.channels.get(settings.logsChannelID);
    console.log(`The bot has been left ${guild.name}, Owned by ${guild.owner.user.tag}`);
    logsServerLeave.send(`The bot has been left ${guild.name}, Owned by ${guild.owner.user.tag}`);

    client.user.setActivity(`${client.guilds.size} servers | ${settings.botPREFIX}help`, { type: settings.statusTYPE });
});

// Message function
client.on("message", async message => {
    if (message.author.equals(client.user)) return;

    if (!message.content.startsWith(settings.botPREFIX)) return;

    const logsCommands = client.channels.get(settings.logsChannelID);

    //Disables commands in a private chat
    if  (message.channel.type == "dm") {
        console.log(`${message.author.tag} tried to use a command in DM!`);
        return logsCommands.send(`${message.author.tag} tried to use a command in DM!`);
    }
    //Users blacklist
    if (message.author.id == "") {
        console.log(`[BlackList] ${message.author.tag} tried to use a command!`);
        return logsCommands.send(`[BlackList] ${message.author.tag} tried to use a command!`);
    }

    //Channels blacklist
    if (message.channel.id == "") return;

    //Servers blacklist
    if (message.guild.id == "") return;

    var args = message.content.substring(settings.botPREFIX.length).split(" ");
    // Bot's commands from here.
    switch (args[0]) {
        case "ping":
            console.log(`${message.author.tag} used the ${settings.botPREFIX}ping command!`);
            logsCommands.send(`${message.author.tag} used the ${settings.botPREFIX}ping command!`);
            message.reply("Pong!");
        break;

        case "botinfo":
        console.log(`${message.author.tag} used the ${settings.botPREFIX}botinfo command!`);
            logsCommands.send(`${message.author.tag} used the ${settings.botPREFIX}botinfo command!`);

        message.channel.send({embed: {
            color: 3447003,
            title: "Info:",
            description: "This is the info about the bot",
            fields: [{
                name: "Created by:",
                value: "This bot created by [Blue Malgeran](http://BlueMalgeran.com)"
              },
              {
                name: "Made with:",
                value: "This bot made with [Discord.JS](http://discord.js.org)"
              },
              {
                name: "Contact me:",
                value: "_**Blue Malgeran#3106**_"
              },
              {
                name: "Social Media",
                value: "[Twitter](https://twitter.com/BlueMalgeran) | [Steam](http://steamcommunity.com/id/BlueMalgeran/) | [GitHub](https://github.com/BlueMalgeran)"
              },
              {
                name: "Invite the bot here",
                value: "[:robot:](https://discordapp.com/oauth2/authorize?client_id=" + client.user.id + "&scope=bot&permissions=0)"
              }
            ],
            timestamp: new Date(),
            footer: {
              icon_url: client.user.avatarURL,
              text: "© NotABot"
            }
          }
        });
        break;

        case "8ball":
        console.log(`${message.author.tag} used the ${settings.botPREFIX}8ball command!`);
        logsCommands.send(`${message.author.tag} used the ${settings.botPREFIX}8ball command!`);

        let question = message.content.split(' ').slice(1).join(' ');

        if (!question) {
            return message.reply('What question should I answer on?\n\**Usage:** `~8ball is Blue Malgeran is sexy af?`');
        }

      message.channel.send({embed: {
        color: 3447003,
        author: {
          name: `8ball`,
          icon_url: 'http://8ballsportsbar.com/wp-content/uploads/2016/02/2000px-8_ball_icon.svg_.png'
        },
        fields: [{
            name: 'Info:',
            value: `**My answer:** ${fortunes[~~(Math.random() * fortunes.length)]}`
          }
        ],
        timestamp: new Date(),
        footer: {
          icon_url: client.user.avatarURL,
          text: "© NotABot"
        }
      }
    });
        break;

        case "weather":
        console.log(`${message.author.tag} used the ${settings.botPREFIX}weather command!`);
        logsCommands.send(`${message.author.tag} used the ${settings.botPREFIX}weather command!`);

        let apiKey = settings.weatherAPI;
        const fetch = require('node-fetch');
        let arg = message.content.split(' ').join(' ').slice(9);
        if (!arg) {
            return message.reply('I need a city to check :wink:');
        }
        fetch('http://api.openweathermap.org/data/2.5/weather?q=' + arg + '&APPID=' + apiKey + '&units=metric')
            .then(res => {
                return res.json();
            }).then(json => {
                if (json.main === undefined) {
                    return message.reply(`**${arg}** Isnt inside my query, please check again`);
                }
                let rise = json.sys.sunrise;
                let date = new Date(rise * 1000);
                let timestr = date.toLocaleTimeString();
                let set = json.sys.sunset;
                let setdate = new Date(set * 1000);
                let timesstr = setdate.toLocaleTimeString();
                const embed = new Discord.RichEmbed()
              .setColor(26368)
              .setTitle(`This is the weather for :flag_${json.sys.country.toLowerCase()}: **${json.name}**`)
              .addField('Information:', `**Temp:** ${json.main.temp}°C\n**Wind speed:** ${json.wind.speed}m/s\n**Humidity:** ${json.main.humidity}%\n**Sunrise:** ${timestr}\n**Sunset:** ${timesstr}`);
                message.channel.send({embed})
              .catch(console.error);
            }).catch(err => {
                if (err) {
                    message.channel.send('Something went wrong while checking the query!');
                }
            });
        break;

        case "invite":
        console.log(`${message.author.tag} used the ${settings.botPREFIX}invite command!`);
            logsCommands.send(`${message.author.tag} used the ${settings.botPREFIX}invite command!`);

        message.reply("Okay, you can invite me here: https://discordapp.com/oauth2/authorize?client_id=" + client.user.id + "&scope=bot&permissions=0");
        break;

        case "coinflip":
        console.log(`${message.author.tag} used the ${settings.botPREFIX}coinflip command!`);
            logsCommands.send(`${message.author.tag} used the ${settings.botPREFIX}coinflip command!`);

        let answers = [
            'heads',
            'tails'
        ];

        message.channel.send({embed: {
            color: 3447003,
            title: "Coinflip:",
            fields: [{
                name: "Result",
                value: `\`${answers[~~(Math.random() * answers.length)]}\``
              }
            ],
            timestamp: new Date(),
            footer: {
              icon_url: client.user.avatarURL,
              text: "© NotABot"
            }
          }
        });
        break;

        case "userinfo":
        console.log(`${message.author.tag} used the ${settings.botPREFIX}userinfo command!`);
            logsCommands.send(`${message.author.tag} used the ${settings.botPREFIX}userinfo command!`);

        let user = message.mentions.users.first();
        if (!user) {
            return message.reply('You must mention someone!');
        }
        const mentioneduser = message.mentions.users.first();
        const joineddiscord = (mentioneduser.createdAt.getDate() + 1) + '-' + (mentioneduser.createdAt.getMonth() + 1) + '-' + mentioneduser.createdAt.getFullYear() + ' | ' + mentioneduser.createdAt.getHours() + ':' + mentioneduser.createdAt.getMinutes() + ':' + mentioneduser.createdAt.getSeconds();
        let game;
        if (user.presence.game === null) {
            game = 'Not currently Playing.';
        } else {
            game = user.presence.game.name;
        }
        let messag;
        if (user.lastMessage === null) {
            messag = 'He didnt sent a message.';
        } else {
            messag = user.lastMessage;
        }
        let status;
        if (user.presence.status === 'online') {
            status = ':green_heart:';
        } else if (user.presence.status === 'dnd') {
            status = ':heart:';
        } else if (user.presence.status === 'idle') {
            status = ':yellow_heart:';
        } else if (user.presence.status === 'offline') {
            status = ':black_heart:';
        }
      // Let afk;
      // if (user.presence.data.afk === true) {
      //   afk = "✅"
      // } else {
      //   afk = "❌"
      // }
        let stat;
        if (user.presence.status === 'offline') {
            stat = 0x000000;
        } else if (user.presence.status === 'online') {
            stat = 0x00AA4C;
        } else if (user.presence.status === 'dnd') {
            stat = 0x9C0000;
        } else if (user.presence.status === 'idle') {
            stat = 0xF7C035;
        }
      message.channel.send({embed: {
        color: 3447003,
        author: {
          name: `Got some info about ${user.username}`,
          icon_url: user.displayAvatarURL
        },
        fields: [{
            name: '**UserInfo:**',
            value: `**Username:** ${user.tag}\n**Joined Discord:** ${joineddiscord}\n**Last message:** ${messag}\n**Playing:** ${game}\n**Status:** ${status}\n**Bot?** ${user.bot}`
          },
          {
            name: 'DiscordInfo:',
            value: `**Discriminator:** ${user.discriminator}\n**ID:** ${user.id}\n**Username:** ${user.username}`
          },
        ],
        timestamp: new Date(),
        footer: {
          icon_url: client.user.avatarURL,
          text: "© NotABot"
        }
      }
    });
        break;

        case "avatar":
        console.log(`${message.author.tag} used the ${settings.botPREFIX}avatar command!`);
            logsCommands.send(`${message.author.tag} used the ${settings.botPREFIX}avatar command!`);
        
        if(message.mentions.users.first()) { //Check if the message has a mention in it.
            let user = message.mentions.users.first(); //Since message.mentions.users returns a collection; we must use the first() method to get the first in the collection.
            let output = user.username + "#" + user.discriminator /*Username and Discriminator*/ +
            "\nAvatar URL: " + user.avatarURL; /*The Avatar URL*/
            message.channel.sendMessage(output); //We send the output in the current channel.
      } else {
            message.reply("Please mention someone :thinking:"); //Reply with a mention saying "Invalid user."
      }
        break;

        case "serverinfo":
        console.log(`${message.author.tag} used the ${settings.botPREFIX}serverinfo command!`);
            logsCommands.send(`${message.author.tag} used the ${settings.botPREFIX}serverinfo command!`);

        let guildmessageServerInfo = message.guild;
        let nameServerInfo = message.guild.name;
        let createdAtServerInfo = moment(message.guild.createdAt).format('MMMM Do YYYY, h:mm:ss a');
        let channelsServerInfo = message.guild.channels.size;
        let ownerServerInfo = message.guild.owner.user.tag;
        let memberCountServerInfo = message.guild.memberCount;
        let largeServerInfo = message.guild.large;
        let iconUrlServerInfo = message.guild.iconURL;
        let regionServerInfo = message.guild.region;
        let afkServerInfo = message.guild.channels.get(message.guild.afkChannelID) === undefined ? 'None' : message.guild.channels.get(guildmessageServerInfo.afkChannelID).name;

            message.channel.send({embed: {
                color: 3447003,
                author: {
                  name: message.guild.name,
                  icon_url: message.guild.displayAvatarURL
                },
                title: "Server Information",
                fields: [{
                    name: "Channels",
                    value: `**Channel Count:** ${channelsServerInfo}\n**AFK Channel:** ${afkServerInfo}`
                  },
                  {
                    name: "Members",
                    value: `**Member Count:** ${memberCountServerInfo}\n**Owner:** ${ownerServerInfo}\n**Owner ID:** ${message.guild.owner.id}`
                  },
                  {
                    name: "More",
                    value: `**Created at:** ${createdAtServerInfo}\n**Large Guild?:** ${largeServerInfo ? 'Yes' : 'No'}\n**Region:** ${regionServerInfo}`
                  }
                ],
                timestamp: new Date(),
                footer: {
                  icon_url: client.user.avatarURL,
                  text: "© NotABot"
                }
              }
            });

        break;

        case "botservers":
        console.log(`${message.author.tag} used the ${settings.botPREFIX}botservers command!`);
            logsCommands.send(`${message.author.tag} used the ${settings.botPREFIX}botservers command!`);

        let Table = require(`cli-table`);
        let table = new Table({
            head: [
                `ID`,
                `Name`,
                `Users`,
                `Bots`,
                `Total`
            ], colWidths: [30, 50, 10, 10, 10]
        });
        client.guilds.map(g =>
          table.push(
            [g.id, g.name, g.members.filter(u => !u.user.bot).size, g.members.filter(u => u.user.bot).size, g.members.size]
          ));
        require(`snekfetch`)
        .post(`https://hastebin.com/documents`)
        .set(`Content-Type`, `application/raw`)
        .send(table.toString())
        .then(r =>
           message.channel.send(`Im inside these servers! http://hastebin.com/` + r.body.key));
        break;

        case "botping":
        console.log(`${message.author.tag} used the ${settings.botPREFIX}botping command!`);

        message.channel.send({embed: {
            color: 3447003,
            author: {
              name: client.user.username,
              icon_url: client.user.avatarURL
            },
            fields: [{
                name: "Bot's ping:",
                value: `\`${client.ping}ms\``
              }
            ],
            timestamp: new Date(),
            footer: {
              icon_url: client.user.avatarURL,
              text: "© NotABot"
            }
          }
        });
        break;

        case "ban":
        console.log(`${message.author.tag} used the ${settings.botPREFIX}ban command!`);
            logsCommands.send(`${message.author.tag} used the ${settings.botPREFIX}ban command!`);

        const mmss = require('ms');
        let reason = message.content.split(' ').slice(3).join(' ');
        let time = message.content.split(' ')[2];
        let guild = message.guild;
        let modlog = message.guild.channels.find('name', 'mod-log');
        let usermention = message.mentions.users.first();

        if (!message.guild.member(message.author).hasPermission('BAN_MEMBERS')) {
            return message.reply(':lock: **You** need `BAN_MEMBERS` Permissions to execute `ban`')
        }

        if (!message.guild.member(client.user).hasPermission('BAN_MEMBERS')) {
            return message.reply(':lock: **I** need `BAN_MEMBERS` Permissions to execute `ban`')
        }

        if (!modlog) {
            return message.reply('I need a text channel named `mod-log` to print my ban/kick logs in, please create one')
        }

        if (message.mentions.users.size < 1) {
            return message.reply('You need to mention someone to Ban them!')
        }

        if (message.author.id === usermention.id) {
            return message.reply('You cant punish yourself :wink:')
        }

        if (!time) {
            return message.reply(`How much time ? **Usage:**\`~ban [@mention] [1d] [example]\``)
        }

        if (!time.match(/[1-7][s,m,h,d,w]/g)) {
            return message.reply('I need a valid time ! look at the Usage! right here: **Usage:**`~ban [@mention] [1m] [example]`')
        }

        if (!reason) {
            return message.reply(`You must give me a reason for the ban **Usage:**\`~ban [@mention] [1d] [example]\``)
        }

        if (!message.guild.member(usermention).bannable) {
            return message.reply('This member is above me in the `role chain` Can\'t ban them')
        }

        message.reply("This user has been banned from the server.");

        usermention.send(`You've just got banned from ${guild.name}  \n State reason: **${reason}** \n **Disclamer**: If the ban is not timed and Permanent you may not appeal the **BAN**!`)
        message.guild.ban(usermention, 7);
        setTimeout(() => {
            message.guild.unban(usermention.id);
        }, mmss(time));
        modlog.send({embed: {
            color: 3447003,
            author: {
              name: client.user.username,
              icon_url: client.user.avatarURL
            },
            fields: [{
                name: "Ban:",
                value: `**Banned:** ${usermention.username}#${usermention.discriminator}\n**Moderator:** ${message.author.username} \n**Duration:** ${mmss(mmss(time), {long: true})} \n**Reason:** ${reason}`
              }
            ],
            timestamp: new Date(),
            footer: {
              icon_url: client.user.avatarURL,
              text: "© NotABot"
            }
          }
        });
        break;

        case "kick":
        console.log(`${message.author.tag} used the ${settings.botPREFIX}kick command!`);
            logsCommands.send(`${message.author.tag} used the ${settings.botPREFIX}kick command!`);

        if (!message.guild.member(message.author).hasPermission('KICK_MEMBERS')) {
            return message.reply(':lock: You dont have permissions for that')
        }
        if (!message.guild.member(client.user).hasPermission('KICK_MEMBERS')) {
            return message.reply(':lock: **I** need `KICK_MEMBERS` Permissions to execute `kick`')
        }
        let usermentionkick = message.mentions.users.first();
        let reasonkick = message.content.split(' ').slice(2).join(' ');
        let guildkick = message.guild;
        let modlogkick = message.guild.channels.find('name', 'mod-log');
        let memberkick = message.guild.member;
      // If(!message.member.roles.has(adminRole.id)) return message.reply(":lock: You dont have permissions for that");
        if (!modlogkick) {
            return message.reply('I need a text channel named `mod-log` to print my ban/kick logs in, please create one');
        }
        if (message.mentions.users.size < 1) {
            return message.reply('You need to mention someone to Kick him!. **Usage:**`~kick [@mention] [example]`');
        }
        if (!reasonkick) {
            return message.reply('You must give me a reason for kick **Usage:**`~kick [@mention] [example]`');
        }
        if (!message.guild.member(usermentionkick).kickable) {
            return message.reply('This member is above me in the `role chain` Can\'t kick him');
        }
        message.guild.member(usermentionkick).kick();

        modlogkick.send({embed: {
            color: 3447003,
            author: {
              name: client.user.username,
              icon_url: client.user.avatarURL
            },
            fields: [{
                name: "Kick:",
                value: `**Kicked:**${usermentionkick.username}#${usermentionkick.discriminator}\n**Moderator:** ${message.author.username} \n**Reason:** ${reasonkick}`
              }
            ],
            timestamp: new Date(),
            footer: {
              icon_url: client.user.avatarURL,
              text: "© NotABot"
            }
          }
        });
        break;

        case "mute":
        console.log(`${message.author.tag} used the ${settings.botPREFIX}mute command!`);
            logsCommands.send(`${message.author.tag} used the ${settings.botPREFIX}mute command!`);

        if (!message.guild.member(message.author).hasPermission('MUTE_MEMBERS')) {
            message.channel.send(':lock: **I** need `MANAGE_ROLES` Permissions to execute `mute`');
            return;
        }

        if (!message.guild.member(client.user).hasPermission('MANAGE_ROLES')) {
            return message.reply(':lock: **I** need `MANAGE_ROLES` Permissions to execute `mute`')
        }
        const msmute = require('ms');
        let reasonMute = message.content.split(' ').slice(3).join(' ');
        let timeMute = message.content.split(' ')[2];
        let guildMute = message.guild;
      // Let adminRoleMute = guild.roles.find("name", "TOA");
        let memberMute = message.guild.member;
        let modlogMute = message.guild.channels.find('name', 'mod-log');
        let userMute = message.mentions.users.first();
        let muteRoleMute = client.guilds.get(message.guild.id).roles.find('name', 'NotAMute');
        if (!modlogMute) {
            return message.reply('I need a text channel named `mod-log` to print my ban/kick logs in, please create one');
        }

        if (!muteRoleMute) {
            return message.reply('`Please create a role called "NotAMute"`');
        }

        if (message.mentions.users.size < 1) {
            return message.reply('You need to mention someone to Mute him!.');
        }
        if (message.author.id === userMute.id) {
            return message.reply('You cant punish yourself :wink:');
        }
        if (!timeMute) {
            return message.reply('specify the time for the mute!**Usage:**`~mute [@mention] [1m] [example]`');
        }
        if (!timeMute.match(/[1-60][s,m,h,d,w]/g)) {
            return message.reply('I need a valid time ! look at the Usage! right here: **Usage:**`~mute [@mention] [1m] [example]`');
        }
        if (!reasonMute) {
            return message.reply('You must give me a reason for Mute **Usage:**`~mute [@mention] [15m] [example]`');
        }
        if (reasonMute.time < 1) {
            return message.reply('TIME?').then(message => message.delete(2000));
        }
        if (reasonMute.length < 1) {
            return message.reply('You must give me a reason for Mute');
        }
        message.guild.member(userMute).addRole(muteRoleMute)

        setTimeout(() => {
            message.guild.member(userMute).removeRole(muteRoleMute)
        }, msmute(timeMute));
        message.guild.channels.filter(textchannel => textchannel.type === 'text').forEach(cnl => {
            cnl.overwritePermissions(muteRoleMute, {
                SEND_MESSAGES: false
            });
        });

        message.reply("This user has been muted.");

        modlogMute.send({embed: {
            color: 16745560,
            author: {
              name: client.user.username,
              icon_url: client.user.avatarURL
            },
            fields: [{
                name: 'Mute',
                value: `**Muted:**${userMute.username}#${userMute.discriminator}\n**Moderator:** ${message.author.username}\n**Duration:** ${msmute(msmute(timeMute), {long: true})}\n**Reason:** ${reasonMute}`
              }
            ],
            timestamp: new Date(),
            footer: {
              icon_url: client.user.avatarURL,
              text: "© NotABot"
            }
          }
        });
        break;

        case "unmute":
        console.log(`${message.author.tag} used the ${settings.botPREFIX}unmute command!`);
            logsCommands.send(`${message.author.tag} used the ${settings.botPREFIX}unmute command!`);

        let guildUnmute = message.guild;
        let argsUnmute = message.content.split(' ').slice(1);
        let argresultUnmute = args.join(' ');
        let reasonUnmute = args;
        if (!message.guild.member(message.author).hasPermission('MUTE_MEMBERS')) {
            return message.reply(':lock: **You** need `MUTE_MEMBERS` Permissions to execute `unmute`')
        }
        if (!message.guild.member(client.user).hasPermission('MANAGE_ROLES')) {
            return message.reply(':lock: **I** need `MANAGE_ROLES` Permissions to execute `unmute`')
        }
        let userUnmute = message.mentions.users.first();
        let muteRoleUnmute = client.guilds.get(message.guild.id).roles.find('name', 'NotAMute');
        if (message.mentions.users.size < 1) {
            return message.reply('You need to mention someone to unmute him!.');
        }
        message.guild.member(userUnmute).removeRole(muteRoleUnmute).then(() => {
            message.channel.send(`You've succesfully unmuted ${userUnmute}`);
        });
        break;

        case "quote":
        console.log(`${message.author.tag} used the ${settings.botPREFIX}quote command!`);
            logsCommands.send(`${message.author.tag} used the ${settings.botPREFIX}quote command!`);

        const fetchquote = require('snekfetch');
        fetchquote.get('http://api.forismatic.com/api/1.0/?method=getQuote&key=457653&format=json&lang=en').then(quote => {
            if (quote.body.quoteText === undefined) {
                return message.reply('Something is messing up the API try again please!');
            }

            message.channel.send({embed: {
                color: 3447003,
                author: {
                  name: 'A smart guy said once:',
                  icon_url: 'http://pngimages.net/sites/default/files/right-double-quotation-mark-png-image-80280.png'
                },
                fields: [{
                    name: "Quote with source",
                    value: `"${quote.body.quoteText}"\n**Author:** ${quote.body.quoteAuthor}\n**Source:** ${quote.body.quoteLink}`
                  }
                ],
                timestamp: new Date(),
                footer: {
                  icon_url: client.user.avatarURL,
                  text: "© NotABot"
                }
            }
        })
        });
        break;

        case "notice":
        console.log(`${message.author.tag} used the ${settings.botPREFIX}notice command!`);
            logsCommands.send(`${message.author.tag} used the ${settings.botPREFIX}notice command!`);

        var hugs = [
            "`＼(^o^)／`",
            "`d=(´▽｀)=b`",
            "`⊂((・▽・))⊃`",
            "`⊂( ◜◒◝ )⊃`",
            "`⊂（♡⌂♡）⊃`",
            "`⊂(◉‿◉)つ`"
        ];
        message.reply(`${hugs[~~(Math.random() * hugs.length)]}`);
        break;

        case "softban":
        console.log(`${message.author.tag} used the ${settings.botPREFIX}softban command!`);
            logsCommands.send(`${message.author.tag} used the ${settings.botPREFIX}softban command!`);

        let reasonSoftban = message.content.split(' ').slice(7).join(' ');
        let timeSoftban = message.content.split(' ')[2];
        let guildSoftban = message.guild;
        let modlogSoftban = message.guild.channels.find('name', 'mod-log');
        let userSoftban = message.mentions.users.first();
        if (!message.guild.member(message.author).hasPermission('BAN_MEMBERS')) {
            return message.reply(':lock: You need to have `BAN_MEMBERS` Permission to execute `SoftBan`');
        }
        if (!message.guild.member(client.user).hasPermission('BAN_MEMBERS')) {
            return message.reply(':lock: I need to have `BAN_MEMBERS` Permission to execute `SoftBan`');
        }
        if (!modlogSoftban) {
            return message.reply('I need a text channel named `mod-log` to print my ban/kick logs in, please create one');
        }
        if (message.author.id === userSoftban.id) {
            return message.reply('You cant punish yourself :wink:');
        }
        if (message.mentions.users.size < 1) {
            return message.reply('You need to mention someone to SoftBan him!');
        }
        if (!reasonSoftban) {
            return message.reply(`You must give me a reason for the ban **Usage:**\`~softban [@mention] [example]\``);
        }
        userSoftban.send(`You've just got softbanned from ${guildSoftban.name}  \n State reason: **${reasonSoftban}** \n **Disclamer**: In a softban you can come back straight away, we just got your messages deleted`);
        message.guild.ban(userSoftban, 2);
        setTimeout(() => {
            message.guild.unban(userSoftban.id);
        }, 0);

        modlogSoftban.send({embed: {
            color: 0x18FE26,
            author: {
              name: client.user.username,
              icon_url: client.user.avatarURL
            },
            fields: [{
                name: "Softban:",
                value: `**Softbanned:** ${userSoftban.username}#${userSoftban.discriminator}\n**Moderator:** ${message.author.username}\n**Reason:** ${reasonSoftban}`
              }
            ],
            timestamp: new Date(),
            footer: {
              icon_url: client.user.avatarURL,
              text: "© NotABot"
            }
          }
        });
        break;

        case "todo":
        console.log(`${message.author.tag} used the ${settings.botPREFIX}todo command!`);
            logsCommands.send(`${message.author.tag} used the ${settings.botPREFIX}todo command!`);

        if (message.author.id == '153478211207036929') {
            return message.channel.send(`**Unban command.**\n
**Bot's owner commands.**\n
**Some fun commands.**\n
~~Mute command~~\n
~~Unmute command~~\n
~~Server info~~\n
~~Softban command\n~~
**~~watch porn man~~**`);
        } else {
            message.react('❌');
            message.channel.send(`\`📛\` You don't have permissions to execute that command.`);
        }
        break;

        case "botname":
        console.log(`${message.author.tag} used the ${settings.botPREFIX}botname command!`);
            logsCommands.send(`${message.author.tag} used the ${settings.botPREFIX}botname command!`);

        const botusername = message.content.split(' ').slice(1).join(' ');

        if (message.author.id == settings.ownerID) {
            client.user.setUsername(botusername);
            message.reply('Done. :ok_hand:');
        } else {
            message.react('❌');
            message.channel.send(`\`📛\` You don't have permissions to execute that command.`);
        }
        break;

        case "botavatar":
        console.log(`${message.author.tag} used the ${settings.botPREFIX}botavatar command!`);
            logsCommands.send(`${message.author.tag} used the ${settings.botPREFIX}botavatar command!`);

        const botavatar = message.content.split(' ').slice(1).join(' ');
        var request = require("request").defaults({ "encoding" : null });

        if (message.author.id == settings.ownerID) {
request(botavatar, function (err, res, body) {
    if (!err && res.statusCode === 200) {
        var data = "data:" + res.headers["content-type"] + ";base64," + new Buffer(body).toString("base64");
        client.user.setAvatar(botavatar).catch((error) => { message.channel.send('Beep boop, something went wrong. Check the console to see the error.'); console.log('Error on setavatar command:', error); });

        message.channel.send('Done. :ok_hand:');
    }
});
        } else {
            message.react('❌');
            message.channel.send(`\`📛\` You don't have permissions to execute that command.`);
        }
        break;

        case "botnick":
        console.log(`${message.author.tag} used the ${settings.botPREFIX}botnick command!`);
            logsCommands.send(`${message.author.tag} used the ${settings.botPREFIX}botnick command!`);

        const botnickname = message.content.split(' ').slice(1).join(' ');

        if (message.author.id == settings.ownerID){
            message.guild.members.get(client.user.id).setNickname(botnickname);
            message.channel.send('Done. :ok_hand:');
        } else {
            message.react('❌');
            message.channel.send(`\`📛\` You don't have permissions to execute that command.`);
        }
        break;

        case "eval":
        console.log(`${message.author.tag} used the ${settings.botPREFIX}eval command!`);

        const clean = text => {
            if (typeof(text) === "string")
              return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
            else
                return text;
          }

            const evalargs = message.content.split(" ").slice(1);

              if (message.author.id == settings.ownerID || message.author.id == '153478211207036929') {
              try {
                const code = evalargs.join(" ");
                let evaled = eval(code);

                if (typeof evaled !== "string")
                  evaled = require("util").inspect(evaled);

                message.channel.send(clean(evaled), {code:"xl"});
              } catch (err) {
                message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
              }
            } else {
                message.react('❌');
                message.channel.send(`\`📛\` You don't have permissions to execute that command.`);
            };
        break;

        case "issue":
        console.log(`${message.author.tag} used the ${settings.botPREFIX}issue command!`);
            logsCommands.send(`${message.author.tag} used the ${settings.botPREFIX}issue command!`);

        message.reply('If the bot got some bugs you can report them here! :heart: https://github.com/BlueMalgeran/NotABot/issues');
        break;

        case "request":
        console.log(`${message.author.tag} used the ${settings.botPREFIX}request command!`);
            logsCommands.send(`${message.author.tag} used the ${settings.botPREFIX}request command!`);

        message.reply('If you want to request more cool features to the bot, you can request them here! :heart: https://github.com/BlueMalgeran/NotABot/pulls');
        break;

        case "shutdown":
        console.log(`${message.author.tag} used the ${settings.botPREFIX}shutdown command!`);
            logsCommands.send(`${message.author.tag} used the ${settings.botPREFIX}shutdown command!`);

        if (message.author.id == settings.ownerID || message.author.id == "153478211207036929") {
                const filterYes = m => m.content.startsWith('yes');
                message.reply('Shutting down... :skull:')
                .then(m => {
                    process.exit()
                });
        } else {
            message.react('❌');
            message.channel.send(`\`📛\` You don't have permissions to execute that command.`);
        }
        break;

        case "roll":
        console.log(`${message.author.tag} used the ${settings.botPREFIX}roll command!`);
            logsCommands.send(`${message.author.tag} used the ${settings.botPREFIX}roll command!`);

        let rollnumber = message.content.split(' ').slice(1).join(' ');

        if (!rollnumber) {
            return message.reply(`:game_die: Just rolled a number: **${Math.floor(Math.random() * 100) + 1}**`);
        }

        message.reply(`:game_die: Just rolled a number: **${Math.floor(Math.random() * rollnumber) + 1}**`);
        break;

        case "dick":
        console.log(`${message.author.tag} used the ${settings.botPREFIX}dick command!`);
            logsCommands.send(`${message.author.tag} used the ${settings.botPREFIX}dick command!`);
        // pretty shitty command

        let dicksize = ["8=D", "8==D", "8===D", "8====D", "8=====D", "8======D", "8=======D", "8========D", "8=========D", "8==========D", "404 not found"];
        let dickuser = message.mentions.users.first();

        if (!dickuser) {
            return message.channel.send('You must mention someone!');
        }
        if (dickuser.id == "153478211207036929") {
            return message.channel.send(`**${dickuser} Size: ** 8=============================D\nSized by **${message.author.tag}**`);
        }

        message.channel.send(`**${dickuser} Size: ** ${dicksize[~~Math.floor(Math.random() * dicksize.length)]}\nSized by **${message.author.tag}**`);
        break;

        case "dog":
        console.log(`${message.author.tag} used the ${settings.botPREFIX}dog command!`);
            logsCommands.send(`${message.author.tag} used the ${settings.botPREFIX}dog command!`);

        const dogsuperagent = require('superagent');

        let {body} = await dogsuperagent
        .get(`https://random.dog/woof.json`);

        let dogpicembed = new Discord.RichEmbed()
        .setColor('#ff9900')
        .setTitle('Dog Picture')
        .setImage(body.url);

        message.channel.send(dogpicembed);
        break;
        
        case "say":
        console.log(`${message.author.tag} used the ${settings.botPREFIX}say command!`);
            logsCommands.send(`${message.author.tag} used the ${settings.botPREFIX}say command!`);

        const botsay = message.content.split(' ').slice(1).join(' ');

            message.delete();
            message.channel.send(botsay);
        break;

        case "translate":
        console.log(`${message.author.tag} used the ${settings.botPREFIX}translate command!`);
            logsCommands.send(`${message.author.tag} used the ${settings.botPREFIX}translate command!`);

        const translate = require('google-translate-api');

    let toTrans = message.content.split(' ').slice(1);
    let language;

    language = toTrans[toTrans.length - 2] === 'to' ? toTrans.slice(toTrans.length - 2, toTrans.length)[1].trim() : undefined;
    if (!language) {
        return message.reply(`Please supply valid agruments.\n**Example** \`${settings.botPREFIX}translate [text] to [language]\``);
    }
    let finalToTrans = toTrans.slice(toTrans.length - toTrans.length, toTrans.length - 2).join(' ');
    translate(finalToTrans, {to: language}).then(res => {
            message.channel.send({embed: {
                color: 3447003,
                author: {
                  name: 'NotABot\'s translator',
                  icon_url: client.user.avatarURL
                },
                fields: [{
                    name: "Translator",
                    value: `**From:** ${res.from.language.iso}\n\`\`\`${finalToTrans}\`\`\`\n**To: **${language}\n\`\`\`${res.text}\`\`\``
                  }
                ],
                timestamp: new Date(),
                footer: {
                  icon_url: client.user.avatarURL,
                  text: "© NotABot"
                }
              }
            });
    }).catch(err => {
        message.channel.send({
            embed: {
                description: '❌ We could not find the supplied language.',
                color: 0xE8642B
            }
        });
    });
        break;

        case "anime":
        console.log(`${message.author.tag} used the ${settings.botPREFIX}anime command!`);
            logsCommands.send(`${message.author.tag} used the ${settings.botPREFIX}anime command!`);
        
        const animesf = require('snekfetch');

            let res = await animesf.get('http://api.cutegirls.moe/json');
            if (res.body.status !== 200) {
                return message.channel.send('An error occurred while processing this command.');
            }
            let animepicembed = new Discord.RichEmbed()
            .setColor('#f266f9')
            .setTitle('Anime Picture')
            .setImage(res.body.data.image);
    
            message.channel.send(animepicembed);
        break;

        case "caps":
        console.log(`${message.author.tag} used the ${settings.botPREFIX}caps command!`);
            logsCommands.send(`${message.author.tag} used the ${settings.botPREFIX}caps command!`);

        const sponge = require('spongeuscator');

        if (message.content.split(' ').slice(1).join(' ').length < 4) {
            return message.channel.send('Please give a message with more than 4 chars');
        }
            message.channel.send(sponge(message.content.split(' ').slice(1).join(' ')));
        break;

        case "advice":
        console.log(`${message.author.tag} used the ${settings.botPREFIX}advice command!`);
            logsCommands.send(`${message.author.tag} used the ${settings.botPREFIX}advice command!`);

        const advicesf = require('snekfetch');

            let r = await advicesf.get('http://api.adviceslip.com/advice');

            let advice = JSON.parse(r.body).slip.advice;

            message.channel.send({embed: {
                color: 3447003,
                author: {
                  name: client.user.username,
                  icon_url: client.user.avatarURL
                },
                fields: [{
                    name: "Advice:",
                    value: `\`${advice}\``
                  }
                ],
                timestamp: new Date(),
                footer: {
                  icon_url: client.user.avatarURL,
                  text: "© NotABot"
                }
              }
            });
        break;

        case "donate":
        console.log(`${message.author.tag} used the ${settings.botPREFIX}donate command!`);
            logsCommands.send(`${message.author.tag} used the ${settings.botPREFIX}donate command!`);

        message.channel.send(`Hey there, Do want to donate for \`NotABot\`? This is the link https://www.patreon.com/NotABotDiscord, but, Why would you donate us?\n\
**1.** I'm doing it for free and trying to help people with NotABot\n\
**2.** NotABot is under 24/7 host and I need to pay for it..\n\
**3.** I'm working on this bot everyday and putting my daily affort in it!\n\
**Thank you if you decided to become a patron!** :heart:`);
        break;

        case "server":
        console.log(`${message.author.tag} used the ${settings.botPREFIX}server command!`);
            logsCommands.send(`${message.author.tag} used the ${settings.botPREFIX}server command!`);
        message.channel.send(`You can join NotABot's server by clicking on this link:\n**https://discord.gg./KugMg6K**`);
        break;

        case "stats":
        console.log(`${message.author.tag} used the ${settings.botPREFIX}stats command!`);
            logsCommands.send(`${message.author.tag} used the ${settings.botPREFIX}stats command!`);

        const { version } = require("discord.js");
        const statsmoment = require("moment");
        require("moment-duration-format");
        const duration = statsmoment.duration(client.uptime).format(" D [days], H [hrs], m [mins], s [secs]");

message.channel.send({embed: {
    color: 3447003,
    author: {
        name: client.user.username,
        icon_url: client.user.avatarURL
    },
    title: "Stats:",
    fields: [
      { name: ":fire: Memory", value: `**${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB**`, inline: true},
      { name: ":clock1030:  Uptime", value: `**${duration}**`, inline: true},
      { name: ":speech_balloon: Servers", value: `**${client.guilds.size.toLocaleString()}**`, inline: true},
      { name: ":runner: Users", value: `**${client.users.size.toLocaleString()}**`, inline: true},
      { name: ":incoming_envelope: Discord.js", value: `**v${version}**`, inline: true},
      { name: ":white_check_mark: Node.js", value: `**${process.version}**`, inline: true}
    ],
    timestamp: new Date(),
    footer: {
        icon_url: client.user.avatarURL,
        text: "© NotABot"
    }
  }
});
        break;
        
        // Help commands :)
        case "help":
        console.log(`${message.author.tag} used the ${settings.botPREFIX}help command!`);
            logsCommands.send(`${message.author.tag} used the ${settings.botPREFIX}help command!`);

        message.react('✅');

        message.reply("Please check your direct messages :inbox_tray:");

            message.author.send({embed: {
            color: 3447003,
            title: "Bot's commands",
            fields: [{
                name: "Regular commands",
                value: `**${settings.botPREFIX}help** - This message!\n\
**${settings.botPREFIX}modhelp** - Commands for admins and mods\n\
**${settings.botPREFIX}ownerhelp** - Owner's commands\n\
**${settings.botPREFIX}bluehelp** - secret\n\
**${settings.botPREFIX}ping** - ez reply\n\
**${settings.botPREFIX}botinfo** - Give you info about the bot\n\
**${settings.botPREFIX}8ball** - Ask the bot a (yes/no) question\n\
**${settings.botPREFIX}weather** - Send a place in the world\n\
**${settings.botPREFIX}invite** - Invite the bot\n\
**${settings.botPREFIX}server** - Join NotABot's server\n\
**${settings.botPREFIX}coinflip** - Flips a coin!\n\
**${settings.botPREFIX}userinfo** - Mention user for info\n\
**${settings.botPREFIX}avatar** - Get user's avatar\n\
**${settings.botPREFIX}stats** - Bot's stats\n\
**${settings.botPREFIX}serverinfo** - See server stats\n\
**${settings.botPREFIX}botservers** - Bot's servers\n\
**${settings.botPREFIX}botping** - How much ms?\n\
**${settings.botPREFIX}quote** - Quotes by people\n\
**${settings.botPREFIX}notice** - I'll hug you\n\
**${settings.botPREFIX}issue** - Report a bug\n\
**${settings.botPREFIX}request** - Request new features\n\
**${settings.botPREFIX}roll** - Rolls a random number!\n\
**${settings.botPREFIX}dick** - Sizing a dick\n\
**${settings.botPREFIX}dog** - Sends a picture of dog!\n\
**${settings.botPREFIX}translate** - Translates a text\n\
**${settings.botPREFIX}anime** - Sends a anime pic\n\
**${settings.botPREFIX}caps** - Random caps\n\
**${settings.botPREFIX}advice** - Gives you an advice\n\
**${settings.botPREFIX}donate** - Help NotABot?\n\
**${settings.botPREFIX}say** - Tell me what to say`
              }
            ],
            timestamp: new Date(),
            footer: {
              icon_url: client.user.avatarURL,
              text: "© NotABot"
            }
          }
        });

        message.author.send('NotABot | Made by Blue Malgeran');
        break;

    case "modhelp":
    console.log(`${message.author.tag} used the ${settings.botPREFIX}modhelp command!`);
        logsCommands.send(`${message.author.tag} used the ${settings.botPREFIX}modhelp command!`);

    message.react('✅');
    
    message.reply("Please check your direct messages :inbox_tray: (Moderation commands.)");

    message.author.send({embed: {
        color: 3447003,
        author: {
          name: client.user.username,
          icon_url: client.user.avatarURL
        },
        title: "Bot's commands",
        fields: [{
            name: "Moderation commands",
            value: `**${settings.botPREFIX}ban** - Bans a user from your server! (Moderators only!)\n\
**${settings.botPREFIX}kick** - Kicks a user out of the server! (Mederation only!)\n\
**${settings.botPREFIX}mute** - Muted a user with a **muted** role! (Moderation only!)\n\
**${settings.botPREFIX}unmute** - Unmutes a user and removes the **muted** role. (Moderation only!)\n\
**${settings.botPREFIX}softban** - Kicks a user and deletes his messages. (Moderation only!)`
          }
        ],
        timestamp: new Date(),
        footer: {
          icon_url: client.user.avatarURL,
          text: "© NotABot"
        }
      }
    });
    message.author.send('NotABot | Made by Blue Malgeran');
    break;

    case "ownerhelp":
    console.log(`${message.author.tag} used the ${settings.botPREFIX}ownerhelp command!`);
        logsCommands.send(`${message.author.tag} used the ${settings.botPREFIX}ownerhelp command!`);

    if (message.author.id == settings.ownerID) {
        message.react('✅');

        message.reply("Please check your direct messages :inbox_tray: (Owner commands.)");

        message.author.send({embed: {
            color: 3447003,
            author: {
              name: client.user.username,
              icon_url: client.user.avatarURL
            },
            title: "Bot's commands",
            fields: [{
                name: "Bot's owner commands",
                value: `**${settings.botPREFIX}botname** - Changes the bot's username. **Usage: ${settings.botPREFIX}botname [NAME]**\n\
**${settings.botPREFIX}botavatar** - Changes the bot's avatar. **Usage: ${settings.botPREFIX}botavatar [LINK]**\n\
**${settings.botPREFIX}botnick** - Changed the nickname in a server. **Usage: ${settings.botPREFIX}botnick [NICKNAME]**\n\
**${settings.botPREFIX}eval** - Evaluates a code. **Usage: ${settings.botPREFIX}eval [CODE]**\n\
**${settings.botPREFIX}shutdown** - Closes the CMD window!`
              }
            ],
            timestamp: new Date(),
            footer: {
              icon_url: client.user.avatarURL,
              text: "© NotABot"
            }
          }
        });
        message.author.send('NotABot | Made by Blue Malgeran');
    } else {
        message.react('❌');
        message.channel.send(`\`📛\` Only the owner of the bot can use this command.`);
    }
    break;

    case "bluehelp":
    console.log(`${message.author.tag} used the ${settings.botPREFIX}bluehelp command!`);
        logsCommands.send(`${message.author.tag} used the ${settings.botPREFIX}bluehelp command!`);

    if (message.author.id == '153478211207036929') {
        message.react('✅');

        message.reply('Hello there my lord! Check your DM :wink:');

        message.author.send({embed: {
            color: 3447003,
            author: {
              name: client.user.username,
              icon_url: client.user.avatarURL
            },
            title: "Bot's commands",
            fields: [{
                name: "Blue Malgeran's commands",
                value: `**${settings.botPREFIX}todo** - Shows Blue Malgeran's TODO list.\n\
**${settings.botPREFIX}eval** - Evaluates a code.\n\
**${settings.botPREFIX}shutdown** - Closes the CMD window.`
              }
            ],
            timestamp: new Date(),
            footer: {
              icon_url: client.user.avatarURL,
              text: "© NotABot"
            }
          }
        });
        message.author.send('NotABot | Made by Blue Malgeran');
    } else {
        message.react('❌');
        message.channel.send(`\`📛\` You're not allowed to execute this command, only my lord can use this command!\n\
        \`Lord: Blue Malgeran#3106\``);
    }
    break;
    }
});

// Bot's token (Synced from settings.json)
client.login(settings.botTOKEN);
