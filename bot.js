require('dotenv').config();
const db = require('./models/index.js');

const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.login(process.env.DISCORD_TOKEN);

function createPhrase(prompt, answer) {
    db.Phrase.findOrCreate({where: {prompt: prompt, answer: answer}});
}

async function retrievePhrases() {
    let phrases = await db.Phrase.findAll({ raw: true });
    return phrases;
}

client.on('message', msg => {
    if (msg.author.id != client.user.id) {
        var msgContent = msg.content.toLowerCase();
        if (msgContent.startsWith('f!help')) {
            msg.channel.send('Use `f!add` to add new phrases for Freud to respond to. Make sure you separate user prompts and Freud responses with `|`.\nFor example `f!add who\'s joe|joe mama` will cause Freud to respond to any message containing \"who\'s joe\" with \"joe mama\"\n\nUse `f!phrases` to check what Freud\'s current vocabulary is.');
        }
    
        else if (msgContent.startsWith('f!add')) {
            var addedq = msgContent.split('f!add ')[1].split('|')[0].toLowerCase();
            var addeda = msgContent.split('f!add ')[1].split('|')[1].toLowerCase();

            createPhrase(addedq, addeda);

            msg.channel.send(`Freud will now respond to \"${addedq}\" with \"${addeda}\"`);
        }

        else if (msgContent.startsWith('f!phrases')) {
            var output = ""
            retrievePhrases().then(phrases => {
                for (var i = 0; i < phrases.length; i++) {
                    output += phrases[i]['id'] + ' | ' + phrases[i]['prompt'] + ' ---> ' + phrases[i]['answer'] + '\n';
                }
                msg.channel.send(output);
            });
        }

        else if (msgContent.startsWith('f!remove')) {
            remove_id = parseInt(msgContent.split(' ')[1]);
            db.Phrase.destroy({where: {id: remove_id}});
        }

        else {
            retrievePhrases().then(phrases => {
                for (var i = 0; i < phrases.length; i++) {
                    if (msgContent.includes(phrases[i]['prompt'])) {
                        msg.channel.send(phrases[i]['answer']);
                    }
                }
            });
        }
    }
});