require('dotenv').config();
const db = require('./models/index.js');

const cron = require('cron');

const Discord = require('discord.js');
const client = new Discord.Client();

var insults = [
    "You are a prime example of an Oedipus complex",
    "I wouldn’t even fuck you and we all know my track record",
    "Yeah? Little bitch baby? Youre too pussy to even eat lettuce aren’t you",
    "Whore.",
    "You never left the oral stage and it shows",
    "I don’t do this shit for free fuck off",
    "Mwah",
    "Have an absolutely terrible day. Just complete and utter shit. I hope your funerals tomorrow, asshole",
    "Your teeth are subpar",
    "Ladies, ladies, absolutely NONE of you are valid",
    "Get therapy babe",
    "Why do you want me to insult you? I’m a robot. What am I gonna call you, gay? We already know",
    "Baby u are built like an empty can of black beans"
]

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.login(process.env.DISCORD_TOKEN);

function createPhrase(prompt, answer) {
    db.Phrase.findOrCreate({where: {prompt: prompt, answer: answer}});
}

async function retrievePhrases() {
    try {
        let phrases = await db.Phrase.findAll({ raw: true });
        return phrases;
    }
    catch(error) {
        console.error(error);
        throw error;
    }
}

client.on('message', msg => {
    if (msg.author.id != client.user.id) {
        var msgContent = msg.content.toLowerCase();
        if (msgContent.startsWith('f!help')) {
            msg.channel.send('Use `f!add` to add new phrases for Freud to respond to. Make sure you separate user prompts and Freud responses with `|`.\nFor example `f!add who\'s joe|joe mama` will cause Freud to respond to any message containing \"who\'s joe\" with \"joe mama\"\n\nUse `f!phrases` to check what Freud\'s current vocabulary is.\n\nUse `f!remove ID_NUMBER_OF_PHRASE` to remove unwanted phrases.\nFor example `f!remove 3` will remove the prompt and response set assigned an ID number of 3 in the list of phrases.\n\nUse `f!insult` if you want your self worth to be destroyed.');
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

        else if (msgContent.startsWith('f!insult')) {
            msg.channel.send(insults[Math.floor(Math.random() * insults.length)]);
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



morningMessages =  [
    "Get up sluts it’s 8 am",
    "AAAAAAAA FUCK THERESA FUCKIGNG FROOT LOOPS™️ BIRD ON MY BED",
    "HEY EVERYPONY!",
    "Good morning! Let\'s make today a great day! Here\'s your daily reminder that you are loved. Not by me. But by someone else here probably."
];

nightMessages = [
    "ssssssssssssssssssssssssssssssssshhhhhhhhhhhhhhhhhhhhhhhhhh............ close your eyes my sweet............. the fear of the present day will soon become the nightmare of days past...... rest while you still have the lungs to do it.",
    "All good bitches go to bed before daddy freud gets angry...",
    "Good night friends! If you\'re still awake go to sleep soon or else I will come find you and do it myself! :)",
    "every minute you stay awake pass this point you stray farther from gods light"
];


var morningMessage = new cron.CronJob('00 08 * * *', function() {
    client.channels.cache.get('689160581336531058').send(morningMessages[Math.floor(Math.random() * morningMessages.length)]);
}, null, true, 'America/New_York');
morningMessage.start();

var nightMessage = new cron.CronJob('30 23 * * *', function() {
    client.channels.cache.get('689160581336531058').send(nightMessages[Math.floor(Math.random() * nightMessages.length)]);
}, null, true, 'America/New_York');
nightMessage.start();

var pianoMan = new cron.CronJob('0 21 * * 6', function() {
    client.channels.cache.get('689160581336531058').send('https://youtu.be/gxEPV4kolz0');
}, null, true, 'America/New_York');
pianoMan.start();