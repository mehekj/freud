require('dotenv').config();

const Discord = require('discord.js');
const client = new Discord.Client();

const fs = require("fs");

var str = "q|a\nping|pong\neveryone does it|their mom\ngay|or european\ntrader joes|trader hoes\nteam gabby|mega boof\nchristmas|michael boobgay\nfire emblem|gay houses\ncreeper|awwwwwwwwww man\nghostbusters|_THE FEMINISTS ARE TAKING OVER_\nfuck|LANGUAGE\nbitch|LANGUAGE\nshit|LANGUAGE\ndick|LANGUAGE\nwho's joe|joe mama\nall women are queens|if she breathes she’s a THOT\nthanks|i hate it\nwhat's up|the ceiling\nmarco|polo\nnumber 15|burger king foot lettuce";
var obj;


function updatePhrases() {
    var cells = str.split('\n').map(function (el) { return el.split('|'); });
    var headings = cells.shift();
    obj = cells.map(function (el) {
        var obj = {};
        for (var i = 0; i < el.length; i++) {
            obj[headings[i]] = el[i];
        }
        return obj;
    });
}



client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    updatePhrases();
});

client.login(process.env.DISCORD_TOKEN);


client.on('message', msg => {
    if (msg.author.id != client.user.id) {
        if (msg.content.startsWith('f!help')) {
            msg.channel.send('Use `f!add` to add new phrases for Freud to respond to. Make sure you separate user prompts and Freud responses with `|`.\nFor example `f!add who\'s joe|joe mama` will cause Freud to respond to any message containing \"who\'s joe\" with \"joe mama\"\n\nUse `f!phrases` to check what Freud\'s current vocabulary is.');
        }
    
        else if (msg.content.startsWith('f!add')) {
            var addedq = msg.content.split('f!add ')[1].split('|')[0];
            var addeda = msg.content.split('f!add ')[1].split('|')[1];

            str += "\n" + addedq + "|" + addeda;
            updatePhrases();

            msg.channel.send(`Freud will now respond to \"${addedq}\" with \"${addeda}\"`)
        }

        else if (msg.content.startsWith('f!phrases')) {
            var phrases = ""
            
            for (var i = 0; i < obj.length; i++) {
                phrases += i + ' ' + obj[i]['q'] + ' --> ' + obj[i]['a'] + '\n';
            }

            msg.channel.send(phrases);
        }

        else {
            var resp = "";

            for (var i = 0; i < obj.length; i++) {
                if (msg.content.toLowerCase().includes(obj[i]['q'])) {
                    resp = obj[i]['a']
                }
            }
            
            if (resp != "") {
                msg.channel.send(resp);
            }
        }
    }
});