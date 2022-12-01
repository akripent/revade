const { EmbedBuilder } = require('discord.js');
const syst = require("./system.cjs");
// SKIP MESSAGE

const skipEmbed = new EmbedBuilder()
    .setColor('#facc95')
    .setTitle('Song skipped ⏩')
    .setAuthor({ name: 'Revade', iconURL: 'https://raw.githubusercontent.com/Akridiki/Revade/main/Logo.png' })
    .setDescription('You have successfully skipped the song!')
    .setFooter({ text: 'Revade - An Akripent Plaza Bot', iconURL: 'https://raw.githubusercontent.com/Akridiki/Revade/main/Logo.png'});
// SKIP MESSAGE

//----------------------------

// START TWITCH MESSAGE

const startStreamEmbed = new EmbedBuilder()
    .setColor('#ffc2ad')
    .setTitle('Twitch Notification 📽️')
    .setAuthor({ name: 'Revade', iconURL: 'https://raw.githubusercontent.com/Akridiki/Revade/main/Logo.png' })
    .setDescription('Akridiki is now streaming on <@&905562817913040916>!')
    .setImage('https://raw.githubusercontent.com/Akridiki/Revade/main/StreamStartedTwitchnew.png')
    .addFields(
        { name: 'Link to the fun!', value: 'https://twitch.tv/akridiki' }
    )
    .setFooter({ text: 'Stream Started!', iconURL: 'https://raw.githubusercontent.com/Akridiki/Revade/main/Logo.png'})

// START TWITCH MESSAGE

//----------------------------

// END TWITCH MESSAGE

const endStreamEmbed = new EmbedBuilder()
    .setColor('#52447e')
    .setTitle('Twitch Notification 📽️')
    .setAuthor({ name: 'Revade', iconURL: 'https://raw.githubusercontent.com/Akridiki/Revade/main/Logo.png' })
    .setFooter({ text: 'Stream Ended!', iconURL: 'https://raw.githubusercontent.com/Akridiki/Revade/main/Logo.png'})
    .setImage('https://raw.githubusercontent.com/Akridiki/Revade/main/StreamEndedTwitchnew.png')
    .setDescription('Hope you had a fun stay, VIVA PLAZA and GOD BLESS! 💖' + "<:flag_ap:931998104616579115>")

// END TWITCH MESSAGE

//----------------------------

const stopAudioEmbed = new EmbedBuilder()
.setColor('#97ed8d')
.setTitle('Action performed')
.setAuthor({ name: 'Revade', iconURL: 'https://raw.githubusercontent.com/Akridiki/Revade/main/Logo.png' })
.setDescription('Disconnected!✅')
.setFooter({ text: 'Revade - An Akripent Plaza Bot', iconURL: 'https://raw.githubusercontent.com/Akridiki/Revade/main/Logo.png'});

    // STOP EMBED

    //----------------------------

    // FAILED EMBED

const failedEmbed = new EmbedBuilder()
.setColor("#ff0000")
.setTitle('Action aborted')
.setAuthor({ name: 'Revade', iconURL: 'https://raw.githubusercontent.com/Akridiki/Revade/main/Logo.png' })
.setDescription('Something went wrong! Do you have permissions? ⛔')
.setFooter({ text: 'Revade - An Akripent Plaza Bot', iconURL: 'https://raw.githubusercontent.com/Akridiki/Revade/main/Logo.png'});

    // FAILED EMBED

    //----------------------------

    // JOINVOICEWARNING EMBED

const joinVoiceWarningEmbed = new EmbedBuilder()
.setColor("#c6ad1e")
.setTitle('Action aborted')
.setAuthor({ name: 'Revade', iconURL: 'https://raw.githubusercontent.com/Akridiki/Revade/main/Logo.png' })
.setDescription('You did not join a voice channel! Please join one before proceeding using this command⚠️')
.setFooter({ text: 'Revade - An Akripent Plaza Bot', iconURL: 'https://raw.githubusercontent.com/Akridiki/Revade/main/Logo.png'});

    // JOINVOICEWARNING

    //-----------------------------

    // NOTHINGVOICEWARNING EMBED

const nothingPlayingEmbed = new EmbedBuilder()
.setColor("#c6ad1e")
.setTitle('Nothing is on the list! Try using rialpha-play (song) to play something!')
.setAuthor({ name: 'Revade', iconURL: 'https://raw.githubusercontent.com/Akridiki/Revade/main/Logo.png' })
.setFooter({ text: 'Revade - An Akripent Plaza Bot', iconURL: 'https://raw.githubusercontent.com/Akridiki/Revade/main/Logo.png'});

    // NOTHINGVOICEWARNING EMBED

    //----------------------------

    // EMPTYMSGVOICE EMBED

const errorEmptyMsgVoiceEmbed = new EmbedBuilder()
.setColor("#c6ad1e")
.setTitle('Unable to handle action')
.setAuthor({ name: 'Revade', iconURL: 'https://raw.githubusercontent.com/Akridiki/Revade/main/Logo.png' })
.setDescription('Please specify a song!')
.setFooter({ text: 'Revade - An Akripent Plaza Bot', iconURL: 'https://raw.githubusercontent.com/Akridiki/Revade/main/Logo.png'});

    // EMPTYMSGVOICE EMBED

    //----------------------------

    // ERRORVOICE EMBED

const errorVoiceEmbed = new EmbedBuilder()
.setColor("#ff0000")
.setTitle('Action aborted')
.setAuthor({ name: 'Revade', iconURL: 'https://raw.githubusercontent.com/Akridiki/Revade/main/Logo.png' })
.setDescription('Something went wrong; Sent error to console.')
.setFooter({ text: 'Revade - An Akripent Plaza Bot', iconURL: 'https://raw.githubusercontent.com/Akridiki/Revade/main/Logo.png'});

    // ERRORVOICE EMBED

    //----------------------------

    // EMPTYERRORVOICE EMBED

const errorEmptyVoiceEmbed = new EmbedBuilder()
.setColor("#ff0000")
.setTitle('Disconnected🔈')
.setAuthor({ name: 'Revade', iconURL: 'https://raw.githubusercontent.com/Akridiki/Revade/main/Logo.png' })
.setDescription('The voice channel went quiet! Disconnecting to save bandwith...')
.setFooter({ text: 'Revade - An Akripent Plaza Bot', iconURL: 'https://raw.githubusercontent.com/Akridiki/Revade/main/Logo.png'});
    // EMPTYERRORVOICE EMBED

    //----------------------------

    // EMPTYQUEUE EMBED

    const emptyQueueEmbed = new EmbedBuilder()
    .setColor("#ff0000")
    .setTitle('Action aborted')
    .setAuthor({ name: 'Revade', iconURL: 'https://raw.githubusercontent.com/Akridiki/Revade/main/Logo.png' })
    .setDescription('There are no songs on the queue! Please play a song to add to the queue.')
    .setFooter({ text: 'Revade - An Akripent Plaza Bot', iconURL: 'https://raw.githubusercontent.com/Akridiki/Revade/main/Logo.png'});
    // EMPTYQUEUE EMBED
    
    //----------------------------

    // FINISHVOICE EMBED

const finishVoiceEmbed = new EmbedBuilder()
.setColor("#00ff00")
.setTitle('Song finished!')
.setAuthor({ name: 'Revade', iconURL: 'https://raw.githubusercontent.com/Akridiki/Revade/main/Logo.png' })
.setImage(syst.chosen)
.setFooter({ text: 'Revade - An Akripent Plaza Bot', iconURL: 'https://raw.githubusercontent.com/Akridiki/Revade/main/Logo.png'});

    // FINISHVOICE EMBED

const embedReportChannel = new EmbedBuilder()
.setColor("#e4a25d")
.setTitle('Report Information')
.setAuthor({ name: 'Revade', iconURL: 'https://raw.githubusercontent.com/Akridiki/Revade/main/Logo.png' })
.setDescription('Have you seen anyone misbehaving on the server? \nFollow these rules below and submit a report:')
.addFields(
    {name: 'Rule 1.', value: 'Be descriptive. We need as much information as possible to help you.'},
    {name: 'Rule 2.', value: 'If any, attach evidence or any type of proof you might find necessary by right clicking the image and pressing the `Copy Link`.'},
    {name: 'Rule 3.', value: 'The report must be about situations that happen INSIDE the server. Anything outside the server is not our responsibility, hence, we won\'t take action.'},
    {name: 'Rule 4.', value: 'Do not abuse the system (spamming, spreading misinformation, etc).'},
    {name: 'Extra information', value: 'Our moderators will attempt you reach to you as quick as possible! Be patient.'}
)
.setFooter({ text: 'Revade - An Akripent Plaza Bot', iconURL: 'https://raw.githubusercontent.com/Akridiki/Revade/main/Logo.png'});

const embedHelpChannel = new EmbedBuilder()
.setColor("#e4a25d")
.setTitle('Help Tickets')
.setAuthor({ name: 'Revade', iconURL: 'https://raw.githubusercontent.com/Akridiki/Revade/main/Logo.png' })
.setDescription('Are you in need of help? Welcome to the help channel! \nFollow these rules below and submit a ticket:')
.addFields(
    {name: 'Rule 1.', value: 'Be descriptive. We need as much information as possible to help you.'},
    {name: 'Rule 2.', value: 'Tag your ticket correctly so that helpers can reach you easier and quicker.'},
    {name: 'Rule 3.', value: 'Do not abuse the system and abide with the server\'s rules!'},
    {name: 'Notice:', value: 'Our moderators will attempt you reach to you as quick as possible! Remember to be patient.'}
)
.setFooter({ text: 'Revade - An Akripent Plaza Bot', iconURL: 'https://raw.githubusercontent.com/Akridiki/Revade/main/Logo.png'});

const embedSuggestionsChannel = new EmbedBuilder()
.setColor("#e4a25d")
.setTitle('Suggestion Information')
.setAuthor({ name: 'Revade', iconURL: 'https://raw.githubusercontent.com/Akridiki/Revade/main/Logo.png' })
.setDescription('Do you feel like suggesting a server feature? Or maybe you want to suggest content ideas? \nFollow these tips below and submit a ticket:')
.addFields(
    {name: 'Tip 1.', value: 'Be clear: if your idea does not finish making sense, we probably won\'t consider it'},
    {name: 'Tip 2.', value: 'If any, attach visual references that may help when it comes to understanding your suggestion.'},
    {name: 'Tip 3.', value: 'Suggestions that **aren\'t** about **the server** or **content**; will be removed.'},
    {name: 'Tip 4.', value: 'Do not abuse the system (misusage, spam, excess of suggestions...).'},
    {name: 'Extra information', value: 'The Akripent Team will attempt you reach to you as quick as possible! Remember to be patient.'}
)
.setFooter({ text: 'Revade - An Akripent Plaza Bot', iconURL: 'https://raw.githubusercontent.com/Akridiki/Revade/main/Logo.png'});

const storeMainEmbed = new EmbedBuilder()
    .setColor("#e4a25d")
    .setTitle('Store Commands')
    .setAuthor({ name: 'Revade', iconURL: 'https://raw.githubusercontent.com/Akridiki/Revade/main/Logo.png' })
    .setDescription('Here are the store subcommands:')
    .addFields(
        { name: '`' + syst.prefix + 'store perks`', value: 'Gives list of purchasable perk items', inline: true },
        { name: '`' + syst.prefix + 'store items`', value: 'Gives list of all purchasable items (except perks)', inline: true },
    )
    .setFooter({ text: 'Revade - An Akripent Plaza Bot', iconURL: 'https://raw.githubusercontent.com/Akridiki/Revade/main/Logo.png' })


    const fakePerksEmbed = new EmbedBuilder()
    .setColor("#e4a25d")
    .setTitle('Perks')
    .setAuthor({ name: 'Revade', iconURL: 'https://raw.githubusercontent.com/Akridiki/Revade/main/Logo.png' })
    .setDescription('Here are the store subcommands:')
    .addFields(
        { name: '**Monthly**', value: 'Subscriptions', inline: true },
        { name: '**Yearly**', value: 'Subscriptions', inline: true },

        { name: '\u200b', value: 'Level 1' },

        { name: 'perks-1', value: 'Level 1 Subscription', inline: true },
        { name: 'perks-1y', value: 'Level 1 Subscription', inline: true },

        { name: '\u200b', value: 'Level 2' },

        { name: 'perks-2', value: 'Level 2 Subscription', inline: true },
        { name: 'perks-2y', value: 'Level 2 Subscription', inline: true },

        { name: '\u200b', value: 'Level 3' },

        { name: 'perks-3', value: 'Level 3 Subscription', inline: true },
        { name: 'perks-3y', value: 'Level 3 Subscription', inline: true },

        { name: '\u200b', value: 'Level 4' },

        { name: 'perks-4', value: 'Level 4 Subscription', inline: true },
        { name: 'perks-4y', value: 'Level 4 Subscription', inline: true },

        { name: '\u200b', value: 'Level 5' },

        { name: 'perks-5', value: 'Level 5 Subscription', inline: true },
        { name: 'perks-5y', value: 'Level 5 Subscription', inline: true },
    )
    .setFooter({ text: 'Revade - An Akripent Plaza Bot', iconURL: 'https://raw.githubusercontent.com/Akridiki/Revade/main/Logo.png' })

module.exports = { startStreamEmbed, skipEmbed, endStreamEmbed, stopAudioEmbed, failedEmbed, joinVoiceWarningEmbed, nothingPlayingEmbed, errorVoiceEmbed, errorEmptyVoiceEmbed, finishVoiceEmbed, emptyQueueEmbed, errorEmptyMsgVoiceEmbed, embedReportChannel, embedHelpChannel, embedSuggestionsChannel, storeMainEmbed, fakePerksEmbed};