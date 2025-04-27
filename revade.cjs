const fs = require("fs"); const path = require('path'); // File management
const decompress = require("decompress"); // Unzipping and all that
const https = require('https'); // In order to download files

const syst = require("./system.cjs"); //Token and some const variables
const { Client, GatewayIntentBits, IntentsBitField, Partials, EmbedBuilder, PresenceUpdateStatus, ActivityType } = require('discord.js');
const { moduleStartup } = require("./revade_modules/Revade API/main.cjs");

const myIntents = new IntentsBitField();
myIntents.add(GatewayIntentBits.DirectMessages, GatewayIntentBits.Guilds, GatewayIntentBits.GuildVoiceStates, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildBans, GatewayIntentBits.MessageContent, IntentsBitField.Flags.GuildMembers, GatewayIntentBits.GuildMessageReactions);

const client = new Client({
    intents: myIntents,
    partials: [Partials.Message, Partials.Channel, Partials.Reaction],
});

function loadModules(baseDir) {
    const modules = {};

    // Read the base directory
    const folders = fs.readdirSync(baseDir, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory()) // Get only directories
        .map(dirent => dirent.name);

    // Loop through each folder
    folders.forEach(folder => {
        const modulePath = path.join(baseDir, folder, 'main.cjs');

        // Check if main.cjs exists inside the folder
        if (fs.existsSync(modulePath)) {
            modules[folder] = require(modulePath);
        }
    });

    return modules;
}

function loadModuleConfigs(baseDir) {
    const configs = [];

    // Read the base directory for folders
    const folders = fs.readdirSync(baseDir, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name);

    // Loop through each folder
    folders.forEach(folder => {
        const configPath = path.join(baseDir, folder, 'config.json');
        if (fs.existsSync(configPath)) {
            const raw = fs.readFileSync(configPath, 'utf8');
            const config = JSON.parse(raw);
            configs.push({ name: folder, config });
        }
    });

    return configs;
}

function proceedToUpdate(name, updateURL) {
    // First, we download the zip to the tmp folder
    const file = fs.createWriteStream("tmp/module.zip");
    const request = https.get(updateURL, async function (response) {
        response.pipe(file);

        // after download completed close filestream
        await file.on("finish", async () => {
            file.close();

            // Next, we unzip the file, overwriting the old module files
            await decompress("tmp/module.zip", "revade_modules/" + name)
                .catch((error) => {
                    console.log(error);
                });

            // Finally, delete the temporary file
            await fs.unlink("tmp/module.zip",
                (err => {
                    if (err) console.log(err);
                }));

            await console.log(`Module ${name} late-loaded! (updated!)`);
        });
    });
}

async function checkModuleUpdates(modules_config) {
    let hasUpdates = 0; // Start with 0 (no updates)

    // Use Promise.all to wait for all checks to complete
    await Promise.all(modules_config.map(async ({ name, config }) => {
        console.log(`Module ${name} \x1b` + syst.versionTheme + `(${config.version})\x1b[0m loading`);

        try {
            let responseReq = await fetch(config.updateUrl.replace("module.zip", "hashfile.txt"));
            let response = await responseReq.text();

            if (config.hashVersion.trim() == response.trim()) {
                // Up to date
                console.log(`Module ${name}` + '\x1b' + syst.versionTheme + ` (${config.version})\x1b[0m` + ' loaded! (up to date)');
            } else {
                // Outdated
                console.log(`Module ${name} on hold (updating)`);
                hasUpdates = 1; // Set to 1 if any module has updates

                await proceedToUpdate(name, config.updateUrl)
            }
        } catch (error) {
            console.error(`Error checking updates for ${name}:`, error);
        }
    }));

    return hasUpdates;
}

// -------------------------------
// User-generated Revade modules
// Usually modules are just 1. insert as require & 2. Add line to ... client.on('messageCreate'
// Additionally, 1. some may require you to install npm libraries & 2. modules may not always follow all these points
// !!! --- ALWAYS check a module's code before using it to avoid MALICIOUS CODE --- !!!

// Load the modules from the 'revade_modules' folder
const modules = loadModules(path.join(__dirname, 'revade_modules'));

// Load the config.json of the modules
const modules_config = loadModuleConfigs(path.join(__dirname, 'revade_modules'));

async function start() {
    console.log('Loading...');
    syst.showVersion()
    await checkModuleUpdates(modules_config)

    // Get current time
    var pdate = new Date(); var phour = pdate.getHours(); var pchosen;
    if (phour == 6 || phour == 7 || phour == 8 || phour == 9 || phour == 10 || phour == 11) { pchosen = PresenceUpdateStatus.Online; }
    if (phour == 12 || phour == 13 || phour == 14 || phour == 15 || phour == 16 || phour == 17) { pchosen = PresenceUpdateStatus.DoNotDisturb; }
    if (phour == 18 || phour == 19 || phour == 20 || phour == 21 || phour == 22 || phour == 23 || phour == 24 || phour == 0 || phour == 1 || phour == 2 || phour == 3 || phour == 4 || phour == 5) { pchosen = PresenceUpdateStatus.Idle; }

    client.once('ready', async () => {
        console.log('\x1b' + syst.botTheme + 'Revade\x1b[0m is ready!');
    
        await client.user.setPresence({ activities: [{ name: syst.StatusText }], status: pchosen });
	    await client.user.setActivity(syst.StatusText, { type: ActivityType.Listening });

        // Upon startup, run startup func if it exists
        // for each module installed
        Object.keys(modules).forEach((moduleName) => {
            const module = modules[moduleName];
        
            if (typeof module.moduleStartup === 'function') {
                module.moduleStartup(modules_config);
            }
        });
    });

//----------------------------

    await initJoinCheck(); // Initializes the Join Detector
    await initBoostCheck(); // Initializes the Boost Detector
    client.login(syst.token); // Login
}

function initJoinCheck() {
    // New member
    client.on('guildMemberAdd', member => {
        try {
            const welcomeEmbed = new EmbedBuilder()
                .setColor('#f6f4c6')
                .setTitle(member.user.tag + ' joined the server!')
                .setAuthor({ name: 'A message from Revadee', iconURL: 'https://raw.githubusercontent.com/Akridiki/Revade/main/Logo.png' })
                .setDescription('We are all happy to see you!')

            member.guild.channels.cache.get(syst.welcomeChannel).send({ embeds: [welcomeEmbed] });
        } catch (error) {
            console.log(error)
        }
    });
}

function initBoostCheck() {
    // Improved boost check - uses roles instead
    client.on('guildMemberUpdate', async (oldMember, newMember) => {
        const hadRole = oldMember.roles.cache.find(role => role.name === 'Nitro Booster');
        const hasRole = newMember.roles.cache.find(role => role.name === 'Nitro Booster');

        if (!hadRole && hasRole) {
            try {
                const boostEmbed = new EmbedBuilder()
                    .setColor('#f8d9f5')
                    .setTitle(newMember.user.tag + ' Boosted the server! Thank you so much!')
                    .setAuthor({ name: 'A message from ' + syst.botName, iconURL: syst.botIcon })
                    .setDescription('Check your cool perks in the Boosters category!')

                newMember.guild.channels.cache.get(syst.welcomeChannel).send({ embeds: [boostEmbed] });
            } catch (error) {
                console.log(error)
            }
        }
    });
}

// ---- Spam System --------------- //

const usersMap = new Map();
const LIMIT = 3; // Messages per MSGDIFF milliseconds
const DIFF = 1000; // Time between messages in milliseconds

function spamSystem(message) {
    if(usersMap.has(message.author.id)) {
        const userData = usersMap.get(message.author.id);
        const { lastMessage, timer } = userData;
        const difference = message.createdTimestamp - lastMessage.createdTimestamp;
        let msgCount = userData.msgCount;

        if(difference > DIFF) {
            clearTimeout(timer);
            userData.msgCount = 1;
            userData.lastMessage = message;
            userData.timer = setTimeout(() => {
                usersMap.delete(message.author.id);
            }, DIFF);
            usersMap.set(message.author.id, userData)
        }
        else {
            ++msgCount;
            if(parseInt(msgCount) === LIMIT) {
               message.reply("Spam is not allowed, <@" + message.member.id + ">!\nYou will be timed out for a minute as a penalty.");
               message.member.timeout(1000 * 60, 'Spam on ' + message.channel.id).then((value) => {
                    message.delete();
               });

               return // IMPORTANT
            } else {
                userData.msgCount = msgCount;
                usersMap.set(message.author.id, userData);
            }
        }
    }
    else {
        let fn = setTimeout(() => {
            usersMap.delete(message.author.id);
        }, DIFF);
        usersMap.set(message.author.id, {
            msgCount: 1,
            lastMessage : message,
            timer : fn
        });
    }
}
// ---- END of Spam System --------------- //

module.exports = {
    client, // extern variables
    start, initJoinCheck, initBoostCheck, // General functions
    spamSystem, // behind the scene systems
    checkModuleUpdates, modules_config, modules, loadModuleConfigs // Module system updates
};
