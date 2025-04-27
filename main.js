// Revade, an open-source Discord.JS based Node.JS bot!
// main code + internals by davidlao
// part of the code + design by Akridiki

// As of the 24th of April 2025,
// Revade is now licensed under Apache 2.0 License

// Revade comes with NO WARRANTY.
// Any issues with the project should be filed to the
// page of said distributor's project
// (for the official Revade, see akripent organization @ GitHub)

// Requires ////
const { ActivityType, EmbedBuilder, PresenceUpdateStatus } = require('discord.js');

// REQUIRED External Revade Modules
const revade = require("./revade.cjs"); // IMPORTANT: Initialization and misc.
const syst = require("./system.cjs"); //Token and some const variables
const path = require('path');
const fs = require('fs'); // Filesystem stuff from Node.JS

//
// -------------------------------

// Initialize Revade //
revade.start(); // Initializes Revade

//----------------------------

setInterval(function () {
    var date = new Date();
    var hour = date.getHours();
    var tchosen;

    if (hour == 6 || hour == 7 || hour == 8 || hour == 9 || hour == 10 || hour == 11) { tchosen = PresenceUpdateStatus.Online; }
    if (hour == 12 || hour == 13 || hour == 14 || hour == 15 || hour == 16 || hour == 17) { tchosen = PresenceUpdateStatus.DoNotDisturb; }
    if (hour == 18 || hour == 19 || hour == 20 || hour == 21 || hour == 22 || hour == 23 || hour == 24 || hour == 0 || hour == 1 || hour == 2 || hour == 3 || hour == 4 || hour == 5) { tchosen = PresenceUpdateStatus.Idle; }

    try {
        revade.client.user.setPresence({ activities: [{ name: syst.StatusText }], status: tchosen });
        revade.client.user.setActivity(syst.StatusText, { type: ActivityType.Listening });
    } catch (error) {
        console.log(error);
    }
}, 60000);

//----------------------------

var chosencol, tchosencol; // "Time based embed" variables
var lastCountingNumber;

//---------------------------
// MAIN FUNCTION FOR COMMANDS BELOW!
//---------------------------

revade.client.on('messageCreate', async message => {
    if (message.author.bot || message.guild === null) return

    if (syst.enableSpamSystem === true) {
        revade.spamSystem(message);
    }

    if (!message.content.startsWith(syst.prefix)) return
    var args = message.content.slice(syst.prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    // User module processing function //
    // Loop through all the loaded modules and run `UseModule` if it exists
    Object.keys(revade.modules).forEach((moduleName) => {
        const module = revade.modules[moduleName];

        if (typeof module.useModule === 'function') {
            module.useModule(message, command);  // Execute the function for module if it exists
        }
    });

    //----------------------------

    /// DEVELOPER EMBED

    if (command === 'developers') {

        var date = new Date();
        var hour = date.getHours();

        if (hour == 6 || hour == 7 || hour == 8 || hour == 9 || hour == 10 || hour == 11) { tchosen = syst.mor; tchosencol = '#96cf89'; }
        if (hour == 12 || hour == 13 || hour == 14 || hour == 15 || hour == 16 || hour == 17) { tchosen = syst.aft; tchosencol = '#ff5858'; }
        if (hour == 18 || hour == 19 || hour == 20 || hour == 21 || hour == 22 || hour == 23 || hour == 24 || hour == 0 || hour == 1 || hour == 2 || hour == 3 || hour == 4 || hour == 5) { tchosen = syst.eve; tchosencol = '#7b54b5'; }

        // DEVELOPER EMBED

        const devEmbed = new EmbedBuilder()
            .setColor(tchosencol)
            .setTitle('The Revade Developers')
            .setAuthor({ name: syst.botName, iconURL: syst.botIcon })
            .setDescription('These are the developers and all the people who helped and/or supported this project!')
            .setImage(tchosen)
            .addFields(
                { name: '`Althruist`', value: '**__Designer and Side Programmer:__** Learning how to code but I still suck, customizer.' },
                { name: '`davidlao`', value: '**__Main Programmer:__** Made this project possible with his projects, research and coding!' },
                { name: '`Contributors/Community`', value: '**__Thank you:__** to anyone who has ever helped shape Revade, directly/indirectly! :)' },
            )

            .setFooter({ text: syst.botName + ' - a ' + syst.serverOwner + ' bot', iconURL: syst.botIcon })

        // DEVELOPER EMBED

        //----------------------------

        message.channel.send({ embeds: [devEmbed] })

    }

    /// DEVELOPER EMBED

    //----------------------------

    /// HELP EMBED

    if (command === 'help') {
        var date = new Date();
        var hour = date.getHours();
        var tchosen;

        if (hour == 6 || hour == 7 || hour == 8 || hour == 9 || hour == 10 || hour == 11) { tchosen = syst.mor; tchosencol = '#96cf89'; }
        if (hour == 12 || hour == 13 || hour == 14 || hour == 15 || hour == 16 || hour == 17) { tchosen = syst.aft; tchosencol = '#ff5858'; }
        if (hour == 18 || hour == 19 || hour == 20 || hour == 21 || hour == 22 || hour == 23 || hour == 24 || hour == 0 || hour == 1 || hour == 2 || hour == 3 || hour == 4 || hour == 5) { tchosen = syst.eve; tchosencol = '#7b54b5'; }

        // HELP EMBED

        const helpEmbed = new EmbedBuilder()
            .setColor(tchosencol)
            .setTitle('Commands for ' + syst.botName)
            .setAuthor({ name: syst.botName, iconURL: syst.botIcon })
            .setDescription('**PREFIX:** `' + syst.prefix + '` \n List of available commands:')
            .setImage(tchosen)
            .addFields(
                { name: '`help`', value: 'Gives list of commands', inline: true },
                { name: '`developers`', value: 'Shows the list of developers', inline: true },
                { name: '`who`', value: 'Shows status of a user', inline: true },
                { name: '`rules`', value: 'Shows rules channel', inline: true },
                { name: '`members`', value: 'Shows how many members are on the server', inline: true },
                { name: '`version`', value: 'Shows current bot codename', inline: true },
                { name: '`mod/list`', value: 'Lists modules installed' },
                { name: '`mod/update`', value: 'Runs modules update check. WARNING: If an update does proceed, ' + syst.botName + ' shuts down, so you will need to either manually start it again or setup a service that auto-starts again once it detects a shutdown' }
            )
            .setFooter({ text: syst.botName + ' - a ' + syst.serverOwner + ' bot', iconURL: syst.botIcon })

        // Here go exposes from modules' config.json:
        revade.modules_config.forEach(({ name, config }) => {
            const exposes = config.exposes;

            Object.entries(exposes).forEach(([command, helpText]) => {
                helpEmbed.addFields({
                    name: "`" + command + "`",
                    value: helpText,
                    inline: true
                });
            });
        });

        // HELP EMBED

        //----------------------------

        message.channel.send({ embeds: [helpEmbed] })

    }

    //----------------------------

    if (command === 'who') {
        var date = new Date();
        var hour = date.getHours();

        if (hour == 6 || hour == 7 || hour == 8 || hour == 9 || hour == 10 || hour == 11) { tchosen = syst.mor; tchosencol = '#96cf89'; }
        if (hour == 12 || hour == 13 || hour == 14 || hour == 15 || hour == 16 || hour == 17) { tchosen = syst.aft; tchosencol = '#ff5858'; }
        if (hour == 18 || hour == 19 || hour == 20 || hour == 21 || hour == 22 || hour == 23 || hour == 24 || hour == 0 || hour == 1 || hour == 2 || hour == 3 || hour == 4 || hour == 5) { tchosen = syst.eve; tchosencol = '#7b54b5'; }

        try {
            const member = message.mentions.members.first() || message.member; // mentioned or whoever sent the msg
            const filteredRoles = member.roles.cache.filter(role => role.id != message.guild.id);
            const listedRoles = filteredRoles.sort((a, b) => b.position - a.position).map(role => role.toString());

            const embed = new EmbedBuilder()
                .setColor(tchosencol)
                .setTitle('Who is this?')
                .setDescription('About them:')
                .setImage(tchosen)

                .addFields([
                    { name: 'Tag', value: `${member.user.tag}`, inline: true },
                    { name: 'ID:', value: `${member.id}`, inline: true },
                    { name: 'Nickname:', value: `${member.nickname !== null ? `${member.nickname}` : 'None'}`, inline: true },
                    {
                        name: 'Joined on:', value: member.joinedAt.toLocaleDateString('en-US', {
                            weekday: 'long',
                            month: 'long',
                            day: 'numeric',
                            year: 'numeric'
                        }), inline: true
                    },

                    {
                        name: 'Account Creation Date:', value: member.user.createdAt.toLocaleDateString('en-US', {
                            weekday: 'long',
                            month: 'long',
                            day: 'numeric',
                            year: 'numeric'
                        }), inline: true
                    },

                    { name: 'Roles:', value: " ` ` " + listedRoles.join(" ` ` ") + " ` ` ", inline: false }
                ])

                .setAuthor({ name: syst.botName, iconURL: syst.botIcon })
                .setFooter({ text: syst.botName + ' - a ' + syst.serverOwner + ' bot', iconURL: syst.botIcon })

            message.channel.send({ embeds: [embed] })
        } catch (error) {
            //this prob will never happen but who knows! better safe than sorry.
            message.channel.send("Something went wrong and I could not do that :(");
            console.log(error);
        }
    }

    //----------------------------

    // RULES

    else if (command === 'rules') {
        const sayMessage = message.content.split(' ').slice(1).join(' ');

        const rulesEmbed = new EmbedBuilder()
            .setColor('#b4ace7')
            .setAuthor({ name: syst.botName, iconURL: syst.botIcon })
            .setDescription('To see the rules, go to <#' + syst.rulesChannelId + '>!')
        message.channel.send({ embeds: [rulesEmbed] })
    }

    else if (command === 'ver' || command == 'version') {
        message.reply('You are speaking to `' + syst.codename + '`')
    }

    else if (command === 'members') {
        var memberAmount = message.guild.memberCount
        message.reply('There are ' + memberAmount + ' members in the server (users and bots).')
    }

    else if (command === 'eggsofeaster') {
        message.reply('you think ur smart?\n....')

        setTimeout(() => {
            message.reply('well, u are :D'),
                setTimeout(() => {
                    message.reply('for your honest work:\n🥁*drum rolls*🥁'),
                        setTimeout(() => {
                            message.reply({
                                files: [{
                                    attachment: './stareasteregg.png',
                                    name: 'goldstar.png'
                                }],
                            });
                            message.reply('gold star <3')
                        }, 4000);
                }, 2000);
        }, 2000);
    }

    else if (command === 'mod/list') {
        var date = new Date();
        var hour = date.getHours();
        var tchosen;

        if (hour == 6 || hour == 7 || hour == 8 || hour == 9 || hour == 10 || hour == 11) { tchosen = syst.mor; tchosencol = '#96cf89'; }
        if (hour == 12 || hour == 13 || hour == 14 || hour == 15 || hour == 16 || hour == 17) { tchosen = syst.aft; tchosencol = '#ff5858'; }
        if (hour == 18 || hour == 19 || hour == 20 || hour == 21 || hour == 22 || hour == 23 || hour == 24 || hour == 0 || hour == 1 || hour == 2 || hour == 3 || hour == 4 || hour == 5) { tchosen = syst.eve; tchosencol = '#7b54b5'; }

        const modsEmbed = new EmbedBuilder()
            .setColor(tchosencol)
            .setTitle('Installed modules')
            .setAuthor({ name: syst.botName, iconURL: syst.botIcon })
            .setDescription('You have installed the following modules:')
            .setImage(tchosen)
            .setFooter({ text: syst.botName + ' - a ' + syst.serverOwner + ' bot', iconURL: syst.botIcon })

        // Here go modules by name and conf:
        revade.modules_config.forEach(({ name, config }) => {
            const exposes = config.exposes;

            modsEmbed.addFields({
                name: "`" + name + "` (" + config.version + ")",
                value: config.description + "\n\n*This module exposes " + Object.keys(config.exposes).map(key => "**" + syst.prefix + key + "**").join(', ') + "*",
                inline: true
            });
        });

        message.channel.send({ embeds: [modsEmbed] })
    }

    else if (command === 'mod/update') {
        message.channel.send("Checking for module updates...")

        const modulesUpdated = await revade.checkModuleUpdates(revade.modules_config);

        if (modulesUpdated) {
            message.channel.send("Some modules were updated. Shutting down.")
            process.exit();
        } else {
            message.channel.send("No available updates - you are up to date :)")
        }
    }
});

process.on('uncaughtException', (error, source) => { console.log('Error caught: \u001b[' + 31 + 'm' + error + '\u001b[0m'); });
