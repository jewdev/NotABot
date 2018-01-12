const Discord = require("discord.js");
const settings = require("./settings.json")

var bot = new Discord.Client();
var embed = new Discord.RichEmbed();

// Fortunes for 8ball command
var fortunes = [
    "Yes",
    "No",
    "Maybe",
    "Ask again",
    "Sometimes",
    "Okay",
    "HELL NO",
    "FUCK YEAH",
    "no no no"
];

// Functions when the bot is online
bot.on("ready", function() {
    console.log("NotABot is ready!");

    var answers = [
        `${bot.guilds.size} Servers`,
        `${bot.users.size} Users`,
        `${settings.botPREFIX}help`,
        `http://BlueMalgeran.tk`
      ];
      bot.user.setGame(
        `${answers[~~(Math.random() * answers.length)]}`,
        "https://www.twitch.tv/BlueMalgeran"
      );  
});

// Message function
bot.on("message", function(message) {
    if (message.author.equals(bot.user)) return;

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
                value: "[:robot:](https://discordapp.com/oauth2/authorize?client_id=" + bot.user.id + "&scope=bot&permissions=0)"
              }
            ],
            timestamp: new Date(),
            footer: {
              icon_url: bot.user.avatarURL,
              text: "© NotABot"
            }
          }
        });
        break;

        case "8ball":
            if (args[1]) {
                message.channel.send(fortunes[Math.floor(Math.random() * fortunes.length)]);
            } else {
                message.reply("Please ask something...");
            }
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
        message.reply("Okay, you can invite me here: https://discordapp.com/oauth2/authorize?client_id=" + bot.user.id + "&scope=bot&permissions=0");
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
              icon_url: bot.user.avatarURL,
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
          icon_url: bot.user.avatarURL,
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
          name: bot.user.username,
          icon_url: bot.user.avatarURL
        },
        title: "Bot's commands",
        fields: [{
            name: "Commands",
            value: `**${settings.botPREFIX}ping** - The bot will reply you with P O N G.\n\
**${settings.botPREFIX}botinfo** - Give you info about the bot.\n\
**${settings.botPREFIX}8ball** - Ask the bot yes / no question.\n\
**${settings.botPREFIX}weather** - Send a place in the world... x_x\n\
**${settings.botPREFIX}invitebot** - The bot will reply with his invite URL\n\
**${settings.botPREFIX}coinflip** - Flips a coin! (50/50)\n\
**${settings.botPREFIX}userinfo** - Mention someone to get information about him. (TOP SECRET)`
          }
        ],
        timestamp: new Date(),
        footer: {
          icon_url: bot.user.avatarURL,
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
bot.login(settings.botTOKEN);