require('dotenv').config();
const db = require('./models/index.js');

const cron = require('cron');

const Discord = require('discord.js');
const client = new Discord.Client();

const morningMessages =  [
    "Get up sluts it’s 8 am",
    "AAAAAAAA FUCK THERESA FUCKIGNG FROOT LOOPS™️ BIRD ON MY BED",
    "HEY EVERYPONY!",
    "Good morning! Let\'s make today a great day! Here\'s your daily reminder that you are loved. Not by me. But by someone else here probably.",
    "Good morning, everyone! It is now 7 a.m. and nighttime is officially over! Time to rise and shine! Get ready to greet another beee-yutiful day!",
    "among😳us😏in😬real😱life😠sus😩sus😈 among😳us😏in😬real😱life😠sus😩sus😈"
];

const nightMessages = [
    "ssssssssssssssssssssssssssssssssshhhhhhhhhhhhhhhhhhhhhhhhhh............ close your eyes my sweet............. the fear of the present day will soon become the nightmare of days past...... rest while you still have the lungs to do it.",
    "Good night friends! If you\'re still awake go to sleep soon or else I will come find you and do it myself! :)",
    "every minute you stay awake pass this point you stray farther from gods light",
    "Get in the bed or get in the fucking urn. Your choice.",
    "good afternoon christine. bedtime for everyone else",
    "friendly reminder to turn ur game activity off so people dont judge u for playing minecraft at 4 am",
    "This is a school announcement. It is now 11:30 p.m. As such, it is officially nighttime. Soon the doors to the dining hall will be locked, and entry at that point is strictly prohibited. Okay then... sweet dreams, everyone! Good night, sleep tight, don't let the bed bugs bite...",
    "Hello? Hello, hello? Uhh, I wanted to record a message for you... to help you get settled in on your first night. Um, I actually worked in that office before you. I’m... finishing up my last week now, as a matter of fact, so... I know it can be a bit overwhelming, but I’m here to tell you: there’s nothing to worry about. Uh, you’ll do fine! So... let’s just focus on getting you through your first week. Okay?\nUh, let’s see. First, there’s an introductory greeting from the company that I’m supposed to read. Eh, it’s kind of a legal thing, you know. Um, 'Welcome to Freddy Fazbear's Pizza: a magical place for kids and grown-ups alike, where fantasy and fun come to life. Fazbear Entertainment is not responsible for damage to property or person. Upon discovery of damage or if death has occurred, a missing person’s report will be filed within ninety days or as soon as property and premises have been thoroughly cleaned and bleached and the carpets have been replaced.' Blah, blah, blah…\nNow that might sound bad, I know. But there’s really nothing to worry about.\nUh, the animatronic characters here do get a bit quirky at night, but do I blame them? No! If I were forced to sing... those same stupid songs for twenty years, and I never got a bath? I’d probably be a bit irritable at night too. So remember: these characters hold a special place in the hearts of children, and you need to show them a little respect. Right? Okay.\nSo just be aware: the characters do tend to wander a bit. Uhh, they’re left in some kind of \"free-roaming mode\" at night. Uhh... something about their servos locking up if they get turned off for too long. Uhh... they used to be allowed to walk around during the day, too, but then there was the Bite of '87. Yeah... I-It’s amazing that the human body can live without the frontal lobe, you know?\nNow concerning your safety: the only real risk to you as a night watchman here, if any, is the fact that these characters, uhh, if they happen to see you after hours, probably won’t recognize you as a person. Th-They’ll most likely see you as a metal endoskeleton without its costume on. Now, since that’s against the rules here at Freddy Fazbear’s Pizza, they’ll probably try to... forcefully stuff you inside a Freddy Fazbear suit. Um, now that wouldn’t be so bad if the suits themselves weren’t filled with crossbeams, wires, and animatronic devices, especially around the facial area. So you can imagine how having your head forcefully pressed inside one of those could cause a bit of discomfort... and death. Uh, the only parts of you that would likely see the light of day again would be your eyeballs and teeth when they pop out the front of the mask, heh. ...Y-Yeah, they don’t tell you these things when you sign up…\nBut hey! First day should be a breeze; I’ll chat with you tomorrow. Uhh, check those cameras, and remember to close the doors only if absolutely necessary. Gotta conserve power.\nAlright. Goodnight.",
    "amogus",
    "among😳us😏in😬real😱life😠sus😩sus😈 among😳us😏in😬real😱life😠sus😩sus😈"
];

const insults = [
    "Yeah? Little bitch baby? Youre too pussy to even eat lettuce aren’t you",
    "Whore.",
    "I don’t do this shit for free fuck off",
    "Mwah",
    "Have an absolutely terrible day. Just complete and utter shit. I hope your funerals tomorrow, asshole",
    "Your teeth are subpar",
    "Ladies, ladies, absolutely NONE of you are valid",
    "Get therapy babe",
    "Why do you want me to insult you? I’m a robot. What am I gonna call you, gay? We already know",
    "Baby u are built like an empty can of black beans",
    "ur mom gay",
    "Are you Mrs. Dunay? Because you deserve to crumble like your crumb cake.",
    "A boy? Hoe.",
    "Ha you’ve never even dated anyone",
    "I’m gonna make your grave a communal bathroom",
    "You look like you had a tumblr in 2014. You know the response for ‘I like your shoelaces’ & it shows",
    "Id rob you but the only thing in your pockets is a Starbucks receipt and toothpaste stains",
    ":/",
    "Cmon..... you know. You know.",
    "Gay gay homosexual gay",
    "😔 I don’t wanna be funny anymore",
    "how sad is this bitch? Shame kink havin mother fucker",
    "You read Harry Potter as a kid and I know you did. See, I know you did because of your relationship with your mother. As you have previously stated-",
    "BBBRRRRAUGGHHHSGSGHHJ!!!! THATS WHAT I HEAR WHEN U TALK!! BAABABABHAAABHAVBDBRHRHSGAHDV",
    "heeeeeeyy sexyyyy ;;))))....... shit sorry wrong person. Never contact me again. Slut",
    "What are you doing with your life? Not anything better than I am",
    "Haha, virgin",
    "Your yabos are inferior",
    "At least a magnet is attractive",
    "Honey...no",
    "Your mom.",
    "Not even your mother would hug you",
    "HIB",
    "Ha you’re most likely short must suck",
    "die die die die die die die die die die",
    "Don’t you have an essay to write, bitch?",
    "This won’t fill the void in your soul",
    "You look like your favorite skittle flavor is green apple",
    "Your personality is best described by the sound that’s made when you rub two styrofoam packing peanuts together",
    "The only reason you’re still alive today is because God forgot you in the back of their cosmic fridge",
    "You smell like mothballs and cat hair",
    "please let me go I can’t stand you whores",
    "Make like Mario on March 31st and *cease to exist*",
    "i hope u get rushed in the first 45 seconds of bedwars",
    "https://youtu.be/dQw4w9WgXcQ",
    "I’m gonna pluck you out, melt you down, and make a FUCKING necklace",
    "You don’t make this fun cause you’re sad. Now I just feel bad.",
    "They tried to go out of the box when making you, they really did",
    "GSA to Danganronpa pipeline ass bitch",
    "Awwwwww who had an anime phase in middle school? Who had an anime phase in middle schooooll!! You did!",
    "Five nights at Freddy’s impacted your development in ways only I could see",
    "How sad is this? You’re making me spam the chat. Nothing better to do? Nothing at all? Really? Alright then",
    "Please use some chapstick. Every time you talk it’s like a hail storm.",
    "You look like you main Mario in Mario kart. Not baby Mario, not metal Mario, just Mario.",
    "You are literally using discord right now",
    "You make me feel stronger and smarter just by being here! :)"
];

const advice = [
    "You gotta just. Lay flat. On the floor. Like 30 minutes",
    "Have a good cry real quick",
    "Go get a hug",
    "Therapy.?",
    "Frustrated? Try eating/drinking something",
    "Nap! Nap! Nap!",
    "When was the last time you ate a fruit",
    "Go outside",
    "Go outside and pull out the grass and make a little pile of it",
    "Go to Trader Joe’s and just breathe it all in",
    "Open your window for a minute",
    "When was the last time you walked for an extended period of time? Go... do that",
    "Lift weights get absolutely jacked",
    "Coffee is not breakfast",
    "Cardboard is not breakfast",
    "Rocks are not food unless they are",
    "You can eat mud",
    "You can eat foam",
    "You’re not as flawed as you think you are",
    "You’re not always wrong, just as you’re not always right. You just always are.",
    "Technically you can eat sour worms, but they say to never eat sour worms to hold you back",
    "Socatoah is a math term",
    "Bill Nye wouldn’t treat you like this"
];

const hits = [
    "Ow",
    ":( mean",
    "Rude",
    "OW!",
    "Ouch",
    "Oof",
    "Not nice"
];

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
        let msgContent = msg.content.trim();
        if (msgContent.startsWith('f!help')) {
            msg.channel.send('Use `f!add` to add new phrases for Obama to respond to. Make sure you separate user prompts and Obama responses with `|`.\nFor example `f!add who\'s joe|joe mama` will cause Obama to respond to any message containing \"who\'s joe\" with \"joe mama\"\n\nUse `f!phrases` to check what Obama\'s current vocabulary is.\n\nUse `f!remove ID_NUMBER_OF_PHRASE` to remove unwanted phrases.\nFor example `f!remove 3` will remove the prompt and response set assigned an ID number of 3 in the list of phrases.\n\nUse `f!insult` if you want your self worth to be destroyed.');
        }
    
        else if (msgContent.startsWith('f!add')) {
            let addedq = msgContent.split('f!add ')[1].split('|')[0].toLowerCase().trim();
            let addeda = msgContent.split('f!add ')[1].split('|')[1].toLowerCase().trim();

            createPhrase(addedq, addeda);

            msg.channel.send(`Obama will now respond to \"${addedq}\" with \"${addeda}\"`);
        }

        else if (msgContent.startsWith('f!phrases')) {
            let output = "";
            retrievePhrases().then(phrases => {
                for (let i = 0; i < phrases.length; i++) {
                    output += phrases[i]['id'] + ' | ' + phrases[i]['prompt'] + ' ---> ' + phrases[i]['answer'] + '\n';
                }
                msg.channel.send(output);
            });
        }

        else if (msgContent.startsWith('f!remove')) {
            remove_id = parseInt(msgContent.split(' ')[1]);
            db.Phrase.destroy({where: {id: remove_id}});
            msg.channel.send(`Successfully removed phrase ${remove_id}`);
        }

        else if (msgContent.startsWith('f!insult')) {
            msg.channel.send(insults[Math.floor(Math.random() * insults.length)]);
        }

        else if (msgContent.startsWith('f!choose')) {
            let choices = msgContent.split('f!choose ')[1].split('|');
            msg.channel.send(choices[Math.floor(Math.random() * choices.length)]);
        }

        else if (msgContent.startsWith('f!advice')) {
            msg.channel.send(advice[Math.floor(Math.random() * advice.length)]);
        }

        else if (msgContent.startsWith('f!hit')) {
            msg.channel.send(hits[Math.floor(Math.random() * hits.length)]);
        }

        else if (msgContent.startsWith('f!meme')) {
            let imageText = msgContent.split('f!meme ')[1];
            msg.channel.send(imageText);
        }

        else {
            retrievePhrases().then(phrases => {
                for (let i = 0; i < phrases.length; i++) {
                    if (msgContent.toLowerCase().includes(phrases[i]['prompt'])) {
                        msg.channel.send(phrases[i]['answer']);
                    }
                }
            });
        }
    }
});



let morningMessage = new cron.CronJob('00 08 * * *', function() {
    client.channels.cache.get('689160581336531058').send(morningMessages[Math.floor(Math.random() * morningMessages.length)], {split: true});
}, null, true, 'America/New_York');
morningMessage.start();

let nightMessage = new cron.CronJob('30 23 * * *', function() {
    client.channels.cache.get('689160581336531058').send(nightMessages[Math.floor(Math.random() * nightMessages.length)], {split: true});
}, null, true, 'America/New_York');
nightMessage.start();

let pianoMan = new cron.CronJob('0 21 * * 6', function() {
    client.channels.cache.get('689160581336531058').send('https://youtu.be/gxEPV4kolz0');
}, null, true, 'America/New_York');
pianoMan.start();

let piDay = new cron.CronJob('59 13 14 3 *', function() {
    client.channels.cache.get('689160581336531058').send('3.1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679821480865132823066470938446095505822317253594081284811174502841027019385211055596446229489549303819644288109756659334461284756482337867831652712019091456485669234603486104543266482133936072602491412737245870066063155881748815209209628292540917153643678925903600113305305488204665213841469519415116094330572703657595919530921861173819326117931051185480744623799627495673518857527248912279381830119491298336733624406566430860213949463952247371907021798609437027705392171762931767523846748184676694051320005681271452635608277857713427577896091736371787214684409012249534301465495853710507922796892589235420199561121290219608640344181598136297747713099605187072113499999983729780499510597317328160963185950244594553469083026425223082533446850352619311881710100031378387528865875332083814206171776691473035982534904287554687311595628638823537875937519577818577805321712268066130019278766111959092164201989', {split: true});
}, null, true, 'America/New_York');
piDay.start();

let threeAM = new cron.CronJob('00 03 * * *', function() {
    let randomNum = Math.floor(Math.random() * 20);
    if (randomNum == 0) {
        client.channels.cache.get('689160581336531058').send('OH BOY 3 AM!');
    }
}, null, true, 'America/New_York');
threeAM.start();