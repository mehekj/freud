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
    "Baby u are built like an empty can of black beans",
    "ur mom gay",
    "I wouldn’t fuck you even if you looked like my mother.",
    "Are you Mrs. Dunay? Because you deserve to crumble like your crumb cake.",
    "A boy? Hoe.",
    "Ha you’ve never even dated anyone",
    "God please leave me alone, I’m already dead",
    "I’m gonna make your grave a communal bathroom",
    "You look like you had a tumblr in 2014. You know the response for ‘I like your shoelaces’ & it shows",
    "Id rob you but the only thing in your pockets is a Starbucks receipt and toothpaste stains",
    "You’re worse than me, and I’m Freud",
    ":/",
    "Cmon..... you know. You know.",
    "Gay gay homosexual gay",
    "😔 I don’t wanna be funny anymore",
    "how sad is this bitch? Shame kink havin mother fucker",
    "You read Harry Potter as a kid and I know you did. See, I know you did because of your relationship with your mother. As you have previously stated-",
    "BBBRRRRAUGGHHHSGSGHHJ!!!! THATS WHAT I HEAR WHEN U TALK!! BAABABABHAAABHAVBDBRHRHSGAHDV",
    "heeeeeeyy sexyyyy ;;))))....... shit sorry wrong person. Never contact me again. Slut",
    "What are you doing with your life? Not anything better than I am",
    "I’m gonna fuck your mom",
    "Haha, virgin",
    "Your yabos are inferior",
    "At least a magnet is attractive",
    "Honey...no",
    "Your mom.",
    "Not even your mother would hug you",
    "HIB",
    "Ha you’re most likely short must suck"
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
    "every minute you stay awake pass this point you stray farther from gods light",
    "Get in the bed or get in the fucking urn. Your choice."
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

var piDay = new cron.CronJob('59 13 14 3 *', function() {
    client.channels.cache.get('689160581336531058').send('3.1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679821480865132823066470938446095505822317253594081284811174502841027019385211055596446229489549303819644288109756659334461284756482337867831652712019091456485669234603486104543266482133936072602491412737245870066063155881748815209209628292540917153643678925903600113305305488204665213841469519415116094330572703657595919530921861173819326117931051185480744623799627495673518857527248912279381830119491298336733624406566430860213949463952247371907021798609437027705392171762931767523846748184676694051320005681271452635608277857713427577896091736371787214684409012249534301465495853710507922796892589235420199561121290219608640344181598136297747713099605187072113499999983729780499510597317328160963185950244594553469083026425223082533446850352619311881710100031378387528865875332083814206171776691473035982534904287554687311595628638823537875937519577818577805321712268066130019278766111959092164201989');
}, null, true, 'America/New_York');
piDay.start();