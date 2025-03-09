// Revade, an open-source Discord.JS based Node.JS bot!
// main code + internals by davidlao
// part of the code + design by Akridiki

// As of the 29th of November 2022,
// Revade is now licensed under CC Zero (Public Domain)

// Revade comes with NO WARRANTY.
// Any issues with the project should be filed to the
// page of said distributor's project
// (for the official Revade, see akripent@GitHub's revade)

// Requires ////
const { ActivityType, EmbedBuilder, PresenceUpdateStatus } = require('discord.js');

// REQUIRED External Revade Modules
const revade = require("./revade.cjs"); // IMPORTANT: Initialization and misc.
const syst = require("./system.cjs"); //Token and some const variables

// -------------------------------
// User-generated Revade modules
// Usually modules are just 1. insert as require & 2. Add line to ... client.on('messageCreate'
// Additionally, 1. some may require you to install npm libraries & 2. modules may not always follow all these points
// !!! --- ALWAYS check a module's code before using it to avoid MALICIOUS CODE --- !!!
const compliments = require("./compliments.cjs"); // Official Compliments Module. Have a happy day!
const moderation = require("./moderation.cjs"); // Official Moderation Module
const socialstore = require("./socialstore.cjs"); // Official Socialize & Store Module (Speak to earn server items)
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

    revade.spamSystem(message);
    revade.linkChatRep(message);

    if (!message.content.startsWith(syst.prefix)) return
    var args = message.content.slice(syst.prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();
    
    // User module processing functions //
    compliments.useModule(message, command);
    moderation.useModule(message, command);
    socialstore.useModule(message, command);

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
            .setAuthor({ name: 'Revade', iconURL: 'https://raw.githubusercontent.com/Akridiki/Revade/main/Logo.png' })
            .setDescription('These are the developers and all the people who helped and/or supported this project!')
            .setImage(tchosen)
            .addFields(
                { name: '`Althruist`', value: '**__Designer and Side Programmer:__** Learning how to code but I still suck, customizer.' },
                { name: '`davidlao`', value: '**__Main Programmer:__** Made this project possible with his projects, research and coding!' },
                { name: '`Contributors/Community`', value: '**__Thank you:__** to anyone who has ever helped shape Revade, directly/indirectly! :)' },
            )

            .setFooter({ text: 'Revade - a ' + syst.serverOwner + ' bot', iconURL: 'https://raw.githubusercontent.com/Akridiki/Revade/main/Logo.png' })

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
            .setTitle('Commands for Revade')
            .setAuthor({ name: 'Revade', iconURL: 'https://raw.githubusercontent.com/Akridiki/Revade/main/Logo.png' })
            .setDescription('**PREFIX:** `' + syst.prefix + '` \n List of available commands:')
            .setImage(tchosen)
            .addFields(
                { name: '`help`', value: 'Gives list of commands', inline: true },
                { name: '`developers`', value: 'Shows the list of developers', inline: true },
                { name: '`who`', value: 'Shows status of a user', inline: true },
                { name: '`rules`', value: 'Shows rules channel', inline: true },
                { name: '`members`', value: 'Shows how many members are on the server', inline: true },
                { name: 'Help pages', value: 'For additional external modules please refer to their command list or help command' }
            )
            .setFooter({ text: 'Revade - a ' + syst.serverOwner + ' bot', iconURL: 'https://raw.githubusercontent.com/Akridiki/Revade/main/Logo.png' })

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
                    { name: 'Joined on:', value: member.joinedAt.toLocaleDateString('en-US', { 
                        weekday: 'long', 
                        month: 'long', 
                        day: 'numeric', 
                        year: 'numeric' 
                    }), inline: true },

                    { name: 'Account Creation Date:', value: member.user.createdAt.toLocaleDateString('en-US', { 
                        weekday: 'long', 
                        month: 'long', 
                        day: 'numeric', 
                        year: 'numeric' 
                    }), inline: true },
                    
                    { name: 'Roles:', value: " ` ` " + listedRoles.join(" ` ` ") + " ` ` ", inline: false }
                ])

                .setAuthor({ name: 'Revade', iconURL: 'https://raw.githubusercontent.com/Akridiki/Revade/main/Logo.png' })
                .setFooter({ text: 'Revade - a ' + syst.serverOwner + ' bot', iconURL: 'https://raw.githubusercontent.com/Akridiki/Revade/main/Logo.png' })

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
            .setAuthor({ name: 'Revade', iconURL: 'https://raw.githubusercontent.com/Akridiki/Revade/main/Logo.png' })
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
});

process.on('uncaughtException', (error, source) => { console.log('Error caught: \u001b[' + 31 + 'm' + error + '\u001b[0m'); });
