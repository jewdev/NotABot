const Discord = require("discord.js");
const settings = require("./settings.json")

var bot = new Discord.Client();

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
        `${settings.botTOKEN}help`,
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
        var embed = new Discord.RichEmbed()
            .addField("NotABot info:", "Developed in JavaScript\n\Created by Blue Malgeran\n\If you want to contact my owner check this website http://BlueMalgeran.tk")
            .setColor(0x00FFFF)
            .setFooter("My owner is Blue Malgeran")
            .setThumbnail(bot.user.avatarURL)
        message.channel.send(embed);
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

        case "help":
        message.reply("Please check your direct messages :inbox_tray:");
        message.author.send(`**NotABot's commands:**
    **${settings.botPREFIX}ping** - The bot will reply you with P O N G.
    **${settings.botPREFIX}botinfo** - Give you info about the bot.
    **${settings.botPREFIX}8ball** - Ask the bot yes / no question.
    **${settings.botPREFIX}weather** - Send a place in the world... x_x
    **${settings.botPREFIX}invitebot** - The bot will reply with his invite URL`);
        break;

        default:
            message.channel.send("Invalid command.");
    }
});

// Bot's token
bot.login(settings.botTOKEN);