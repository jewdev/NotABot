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
    console.log("Bot connected to: " + client.user.username + "#" + client.user.discriminator);
      client.user.setGame(
        "NotABot | BETA | http://BlueMalgeran.tk",
        "https://www.twitch.tv/BlueMalgeran"
      );  
});

// Message function
client.on("message", function(message) {
    if (message.author.equals(client.user)) return;

    if (!message.content.startsWith(settings.botPREFIX)) return;

    var args = message.content.substring(settings.botPREFIX.length).split(" ");
    // Bot's commands from here.
    switch (args[0]) {
        case "ping":
            message.reply("Pong!");
        break;

        case "botinfo":
        message.channel.send({embed: {
            color: 3447003,
            title: "Info:",
            description: "This is the info about the bot",
            fields: [{
                name: "Created by:",
                value: "This bot created by [Blue Malgeran](http://BlueMalgeran.tk)"
              },
              {
                name: "Made with:",
                value: "This bot made with [Discord.JS](http://discord.js.org)"
              },
              {
                name: "Contact me:",
                value: "_**Blue Malgeran#5546**_"
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
            value: `**My Prediction:** ${fortunes[~~(Math.random() * fortunes.length)]}`
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
        let apiKey = settings.weatherAPI;
        const fetch = require('node-fetch');
        let arg = message.content.split(' ').join(' ').slice(8);
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
              .addField('Information:', `**Temp:** ${json.main.temp}°C\n**WindSpeed:** ${json.wind.speed}m/s\n**Humidity:** ${json.main.humidity}%\n**Sunrise:** ${timestr}\n**Sunset:** ${timesstr}`);
                message.channel.send({embed})
              .catch(console.error);
            }).catch(err => {
                if (err) {
                    message.channel.send('Something went wrong while checking the query!');
                }
            });
        break;

        case "invitebot":
        message.reply("Okay, you can invite me here: https://discordapp.com/oauth2/authorize?client_id=" + client.user.id + "&scope=bot&permissions=0");
        break;
        
        // Makes a radomize answer
        case "coinflip":
        let answers = [
            'heads',
            'tails',
            'heads',
            'tails',
            'heads',
            'tails',
            'heads',
            'tails',
            'heads',
            'tails'
        ];
        message.channel.send({embed: {
            color: 3447003,
            title: "Coinflip:",
            fields: [{
                name: "Result",
                value: "`" + `${answers[~~(Math.random() * answers.length)]}` + "`"
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
            value: `**name:** ${user.username}#${user.discriminator}\n**JoinedDiscord:** ${joineddiscord}\n**LastMessage:** ${messag}\n**Playing:** ${game}\n**Status:** ${status}\n**Bot?** ${user.bot}`
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
        if(message.mentions.users.first()) { //Check if the message has a mention in it.
            let user = message.mentions.users.first(); //Since message.mentions.users returns a collection; we must use the first() method to get the first in the collection.
            let output = user.username + "#" + user.discriminator /*Username and Discriminator*/ +
            "\nAvatar URL: " + user.avatarURL; /*The Avatar URL*/
            message.channel.sendMessage(output); //We send the output in the current channel.
      } else {
            message.reply("Please mention someone :thinking:"); //Reply with a mention saying "Invalid user."
      }
        break;

        case "uptime":
        let ms = client.uptime;
        let cd = 24 * 60 * 60 * 1000; // Calc days
        let ch = 60 * 60 * 1000; // Calc hours
        let cm = 60 * 1000; // Calc minutes
        let cs = 1000; // Calc seconds
        let days = Math.floor(ms / cd);
        let dms = days * cd; // Days, in ms
        let hours = Math.floor((ms - dms) / ch);
        let hms = hours * ch; // Hours, in ms
        let minutes = Math.floor((ms - dms - hms) / cm);
        let mms = minutes * cm; // Minutes, in ms
        let seconds = Math.round((ms - dms - hms - mms) / cs);
        if (seconds === 60) {
            minutes++; // Increase by 1
            seconds = 0;
        }
        if (minutes === 60) {
            hours++; // Inc by 1
            minutes = 0;
        }
        if (hours === 24) {
            days++; // Increase by 1
            hours = 0;
        }
        let dateStrings = [];
    
        if (days === 1) {
            dateStrings.push('**1** day');
        } else if (days > 1) {
            dateStrings.push('**' + String(days) + '** days');
        }
    
        if (hours === 1) {
            dateStrings.push('**1** hour');
        } else if (hours > 1) {
            dateStrings.push('**' + String(hours) + '** hours');
        }
    
        if (minutes === 1) {
            dateStrings.push('**1** minute');
        } else if (minutes > 1) {
            dateStrings.push('**' + String(minutes) + '** minutes');
        }
    
        if (seconds === 1) {
            dateStrings.push('**1** second');
        } else if (seconds > 1) {
            dateStrings.push('**' + String(seconds) + '** seconds');
        }
    
        let dateString = '';
        for (let i = 0; i < dateStrings.length - 1; i++) {
            dateString += dateStrings[i];
            dateString += ', ';
        }
        if (dateStrings.length >= 2) {
            dateString = dateString.slice(0, dateString.length - 2) + dateString.slice(dateString.length - 1);
            dateString += 'and ';
        }
        dateString += dateStrings[dateStrings.length - 1];

      message.channel.send({embed: {
        color: 3447003,
        fields: [{
            name: ':clock: Uptime',
            value: 'Bot\'s uptime'
          },
          {
            name: ":runner: Working in:",
            value: `**${client.guilds.size}** servers`
          },
          {
            name: ":white_check_mark: Online for:",
            value: dateString
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

        case "serverinfo":
        let guildmessage = message.guild;
        let name = guild.name;
        let createdAt = moment(guild.createdAt).format('MMMM Do YYYY, h:mm:ss a');
        let channels = guild.channels.size;
        let owner = guild.owner.user.tag;
        let memberCount = guild.memberCount;
        let large = guild.large;
        let iconUrl = guild.iconURL;
        let region = guild.region;
        let afk = message.guild.channels.get(guild.afkChannelID) === undefined ? 'None' : message.guild.channels.get(guild.afkChannelID).name;

            message.channel.send({embed: {
                color: 3447003,
                author: {
                  name: guild.name,
                  icon_url: guild.displayAvatarURL
                },
                title: "Server Information",
                fields: [{
                    name: "Channels",
                    value: `**Channel Count:** ${channels}\n**AFK Channel:** ${afk}`
                  },
                  {
                    name: "Members",
                    value: `**Member Count:** ${memberCount}\n**Owner:** ${owner}\n**Owner ID:** ${guild.owner.id}`
                  },
                  {
                    name: "More",
                    value: `**Created at:** ${createdAt}\n**Large Guild?:** ${large ? 'Yes' : 'No'}\n**Region:** ${region}`
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
        message.reply({embed: {
            color: 3447003,
            author: {
              name: client.user.username,
              icon_url: client.user.avatarURL
            },
            fields: [{
                name: "Bot's ping:",
                value: client.ping
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
        const mmss = require('ms');
        let reason = message.content.split(' ').slice(3).join(' ');
        let time = message.content.split(' ')[2];
        let guild = message.guild;
        let modlog = message.guild.channels.find('name', 'mod-log');
        let usermention = message.mentions.users.first();
    
        if (!message.guild.member(message.author).hasPermission('BAN_MEMBERS')) {
            return message.reply(':lock: **You** need `BAN_MEMBERS` Permissions to execute `mute`')
        }

        if (!message.guild.member(client.user).hasPermission('BAN_MEMBERS')) {
            return message.reply(':lock: **I** need `BAN_MEMBERS` Permissions to execute `mute`')
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
            return message.reply('I need a valid time ! look at the Usage! right here: **Usage:**`~mute [@mention] [1m] [example]`')
        }

        if (!reason) {
            return message.reply(`You must give me a reason for the ban **Usage:**\`~ban [@mention] [1d] [example]\``)
        }
    
        if (!message.guild.member(usermention).bannable) {
            return message.reply('This member is above me in the `role chain` Can\'t ban them')
        }

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
        if (!message.guild.member(message.author).hasPermission('KICK_MEMBERS')) {
            return message.reply(':lock: You dont have permissions for that').catch(e => logger.error(e));
        }
        if (!message.guild.member(client.user).hasPermission('KICK_MEMBERS')) {
            return message.reply(':lock: **I** need `KICK_MEMBERS` Permissions to execute `mute`').catch(e => logger.error(e));
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
            return message.reply('You must give me a reason for mute **Usage:**`~kick [@mention] [example]`');
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

        case "help":
        message.reply("Please check your direct messages :inbox_tray:");

    message.author.send({embed: {
        color: 3447003,
        author: {
          name: client.user.username,
          icon_url: client.user.avatarURL
        },
        title: "Bot's commands",
        fields: [{
            name: "Commands",
            value: `**${settings.botPREFIX}ping** - The bot will reply you with P O N G.\n\
**${settings.botPREFIX}botinfo** - Give you info about the bot.\n\
**${settings.botPREFIX}8ball** - Ask the bot a (yes / no) question.\n\
**${settings.botPREFIX}weather** - Send a place in the world... x_x\n\
**${settings.botPREFIX}invitebot** - The bot will reply with his invite URL.\n\
**${settings.botPREFIX}coinflip** - Flips a coin! (50/50)\n\
**${settings.botPREFIX}userinfo** - Mention someone to get information about him. (TOP SECRET)\n\
**${settings.botPREFIX}avatar** - Mention someone to get his avatar.\n\
**${settings.botPREFIX}uptime** - See the bot's stats.\n\
**${settings.botPREFIX}serverinfo** - See a server stats.\n\
**${settings.botPREFIX}botservers** - See which server the bot is in.\n\
**${settings.botPREFIX}botping** - How much ping the bot has?\n\
**${settings.botPREFIX}ban** - Bans a user from your server! (Moderators only!) don't even try :(\n\
**${settings.botPREFIX}kick** - Kicks a user out of the server! (Mederation only!) don't even try :( 2.0`
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

        default:
            message.channel.send("Invalid command.");
    }
});

// Bot's token
client.login(settings.botTOKEN);