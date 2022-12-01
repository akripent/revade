// Revade for Akripent Plaza
// main code + internals by davidlao
// part of the code + design by Akridiki

// As of the 29th of November 2022,
// Revade is now licensed under CC Zero (Public Domain)

// Enable both Import and Require //
import { createRequire } from "module";
const require = createRequire(import.meta.url);

// Imports //
import { createAudioResource, generateDependencyReport, createAudioPlayer, NoSubscriberBehavior, joinVoiceChannel } from "@discordjs/voice";

// Requires //
const { ButtonBuilder, ButtonStyle, ActivityType, EmbedBuilder, ActionRowBuilder, MessageButton, MessageAttachment, SelectMenuBuilder } = require('discord.js');
const Twit = require('twit'); // Twitter Library
const moment = require('moment'); // Time Library
const fs = require("fs"); // Filesystem Library 

// External Revade Modules
const revade = require("./revade.cjs"); // IMPORTANT: Initialization and misc.
const syst = require("./system.cjs"); //Token and some const variables
const compliments = require("./compliments.cjs"); //Compliments list
const embeds = require("./embeds.cjs"); //Static embeds (doesnt work with dynamic ones but could make it so it works)

// Initialize Revade //
revade.start(); // Initializes Revade

//----------------------------

var T = new Twit({
    consumer_key: syst.consumer_key,
    consumer_secret: syst.consumer_secret,
    access_token: syst.access_token,
    access_token_secret: syst.access_token_secret,
    timeout_ms: 60 * 1000,  // optional HTTP request timeout to apply to all requests.
    strictSSL: true,     // optional - requires SSL certificates to be valid.
})

var stream = T.stream('statuses/filter', { follow: ["1341850122460798976"] })
stream.on('tweet', function (tweet) {

    // console.log(tweet)
    var url = "https://twitter.com/" + tweet.user.screen_name + "/status/" + tweet.id_str;
    
    var colorrr = "#1db0ff"; var extra = "";
    var mentionnn = "<@&889097512101756958> ";
    var happened = false;

    if (tweet.text.startsWith("RT @akridiki:"))
        colorrr = "#55ff55"; extra = " retweeted"; mentionnn = ""; happened = true;

    try {
        let channel = revade.client.channels.fetch("796861147054604308").then(channel => {

            const embedTweet = new EmbedBuilder()
                .setColor(colorrr)
                .setAuthor({ name: tweet.user.name + extra, iconURL: tweet.user.profile_image_url_https })
                .addFields(
                    { name: 'Date', value: tweet.created_at },
                )

            if (happened) {
                embedTweet.setDescription(tweet.text.replace("RT @akridiki:", ""))
            } else {
                embedTweet.setDescription(tweet.text)
            }

            const row = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setLabel('Go to Tweet')
                        .setStyle(ButtonStyle.Link)
                        .setURL(url)
                );

            channel.send({ content: mentionnn, embeds: [embedTweet], components: [row] })

        }).catch(err => {
            console.log(err)
            //channel.send({ embeds: [embeds.failedEmbed] })
        })
    } catch (error) {
        console.error(error);
    }
})

//----------------------------

setInterval(function () {
    var date = new Date();
    var hour = date.getHours();
    var tchosen;

    if (hour == 6 || hour == 7 || hour == 8 || hour == 9 || hour == 10 || hour == 11) { tchosen = 'online'; }
    if (hour == 12 || hour == 13 || hour == 14 || hour == 15 || hour == 16 || hour == 17) { tchosen = 'dnd'; }
    if (hour == 18 || hour == 19 || hour == 20 || hour == 21 || hour == 22 || hour == 23 || hour == 24 || hour == 0 || hour == 1 || hour == 2 || hour == 3 || hour == 4 || hour == 5) { tchosen = 'idle'; }

    try {
        revade.client.user.setPresence({ status: tchosen, activity: { name: syst.StatusText, type: syst.StatusType } });
    } catch (error) {
        console.log(error);
    }
}, 10000);

//----------------------------

async function UseItem(authormsg, item) {
    // Execute
    fs.readFile('storesystem/data/' + item + '.txt', 'utf8', async (err, itemdata) => {
        if (err) {
            console.error(err);
            return;
        }

        var itemlines = itemdata.split("\n")
        itemlines.forEach(async line => {
            // Roles
            if (line.startsWith("role: ")) {
                var roleid = line.split("role: ")[1]
                authormsg.member.roles.add(roleid);
            }

            // Send message (channel)
            else if (line.startsWith("say: ")) {
                var what = line.split("say: ")[1]
                authormsg.channel.send(what)
            }

            // Claim ticket
            else if (line.startsWith("ticket: ")) {
                var what = line.split("ticket: ")[1]

                let aki = await (await revade.client.guilds.cache.get("529936878128988160").members.fetch("330398877645537282")).user
                aki.send("Hello,\n<@" + authormsg.author.id + "> has used a ticket.\n\nHere's what it does:\n" + what)
            }

            // Get Perks
            else if (line.startsWith("perks: ")) {
                var what = line.split("perks: ")[1].split(",")[0]
                var typee = line.split("perks: ")[1].split(",")[1]

                if (what == "1") {
                    let purchaser = await (await revade.client.guilds.cache.get("529936878128988160").members.fetch(authormsg.author.id)).user
                    purchaser.send("Hello,\nYou have started your **\n\n1 " + typee + " \n`Perks - Level " + what + "` subscription** \n -------------------")

                    // Give perks role for: Custom Emojis & Voice TTS
                    authormsg.member.roles.add("1008790915323809802")
                }

                if (what == "2") {
                    let purchaser = await (await revade.client.guilds.cache.get("529936878128988160").members.fetch(authormsg.author.id)).user
                    purchaser.send("Hello,\nYou have started your **\n\n1 " + typee + " \n`Perks - Level " + what + "` subscription** \n -------------------")

                    // Give perks role for: Custom Emojis & Voice TTS
                    authormsg.member.roles.add("1008794156111507527");
                }

                if (what == "3") {
                    let purchaser = await (await revade.client.guilds.cache.get("529936878128988160").members.fetch(authormsg.author.id)).user
                    purchaser.send("Hello,\nYou have started your **\n\n1 " + typee + " \n`Perks - Level " + what + "` subscription** \n -------------------")

                    // Give perks role for: Custom Emojis & Voice TTS
                    authormsg.member.roles.add("1008794276097966091");
                }

                if (what == "4") {
                    let purchaser = await (await revade.client.guilds.cache.get("529936878128988160").members.fetch(authormsg.author.id)).user
                    purchaser.send("Hello,\nYou have started your **\n\n1 " + typee + " \n`Perks - Level " + what + "` subscription** \n -------------------")

                    // Give perks role for: Custom Emojis & Voice TTS
                    authormsg.member.roles.add("1008794366334226574");
                }

                if (what == "5") {
                    let purchaser = await (await revade.client.guilds.cache.get("529936878128988160").members.fetch(authormsg.author.id)).user
                    purchaser.send("Hello,\nYou have started your **\n\n1 " + typee + " \n`Perks - Level " + what + "` subscription** \n -------------------")

                    // Give perks role for: Custom Emojis & Voice TTS
                    authormsg.member.roles.add("1008794484802326679");
                }

                // Get date
                var date = new Date();
                var hour = date.getHours();
                var minutes = date.getMinutes();
                var day = ("0" + date.getDate()).slice(-2);
                var year = date.getFullYear();
                var month = ("0" + (date.getMonth() + 1)).slice(-2);

                if (typee == "month") { // Set expiry to next month
                    if (month != "12") {
                        if (month > 9) {
                            month = (Number(month) + 1).toString()
                        } else {
                            month = "0" + (Number(month) + 1).toString()
                        }
                    } else {
                        year += (Number(year) + 1).toString()
                        month = "01"
                    }
                } else if (typee == "year") { // Set expiry to next year
                    year += (Number(year) + 1).toString()
                }

                var contae = day + "/" + month + "/" + year + "\n" + authormsg.author.id + "\n" + "stop_perk" + "\n" + what

                fs.writeFile('events/general-perks' + authormsg.author.id + what + '.txt', contae, err => {
                    if (err) {
                        console.error(err);
                    }
                });
            }
        });
    });


    // Delete from inventory (+ delete inventory.txt if its the only one)
    fs.readFile('reputationsystem/' + authormsg.author.id + '/inventory.txt', 'utf8', async (err, inventory) => {
        if (err) {
            console.error(err);
        }

        var items = inventory.split(",");
        var count = 0;

        items.forEach(item => {
            if (item != "") {
                count += 1;
            }
        });

        if (count == 1) {
            try {
                fs.unlinkSync('reputationsystem/' + authormsg.author.id + '/inventory.txt')
            } catch (err) {
                console.error(err)
            }
        } else {
            var after = ""
            items.forEach(itemy => {
                if (item != "" && itemy != item) {
                    after += itemy + ",";
                }
            });

            fs.writeFile('reputationsystem/' + authormsg.author.id + '/inventory.txt', after, err => {
                if (err) {
                    console.error(err);
                }
                // file written successfully
            });
        }
    });
}

var chosencol, tchosencol; // "Time based embed" variables
var lastCountingNumber;

//---------------------------

revade.client.on('messageCreate', async message => {
    if (message.author.bot || message.guild === null) return

    revade.spamSystem(message);
    revade.linkChatRep(message);

    if (message.channel.id == "1024246528807804979") {
        fs.readFile('lastnumber.txt', 'utf8', (err, data) => {
            if (err) {
              console.error(err);
              return;
            }

            fs.readFile('lastauthor.txt', 'utf8', (err, audata) => {
                if (err) {
                  console.error(err);
                  return;
                }

            if (!isNaN(message.content) && Number(data) < Number(message.content) && message.author.id != Number(audata) ) {
                fs.writeFile('lastnumber.txt', message.content, err => {
                    if (err) {
                      console.error(err);
                    }

                    fs.writeFile('lastauthor.txt', message.author.id, err => {
                        if (err) {
                          console.error(err);
                        }
                    });
                    
                    message.react("✅");
                });
            } else {
                message.channel.send("You broke the chain! :frowning2:")
                message.react("❌");

                fs.writeFile('lastnumber.txt', '0', err => {
                    if (err) {
                      console.error(err);
                    }
                });

                fs.writeFile('lastauthor.txt', '0', err => {
                    if (err) {
                      console.error(err);
                    }
                });
            }
        });

        });
    } 

    if (!message.content.startsWith(syst.prefix)) return
    var args = message.content.slice(syst.prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

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
                { name: '`Akridiki`', value: '**__Owner:__** I am learning how to code but I still suck, customizer.' },
                { name: '`davidlao`', value: '**__Main Programmer:__** Made this project possible with his projects, research and coding!' },
            )

            .setFooter({ text: 'Revade - An Akripent Plaza Bot', iconURL: 'https://raw.githubusercontent.com/Akridiki/Revade/main/Logo.png' })

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
                //{ name: '`roles`', value: 'Prompts you with a decision for managing your roles', inline: true },
                { name: '`info / schedule`', value: 'Shows necessary information', inline: true },
                { name: '`rules`', value: 'Shows rules channel', inline: true },
                { name: '`members / membercount`', value: 'Shows how many members are on the server', inline: true },
                { name: '`compliment`', value: 'Gives you a random compliment', inline: true },
                { name: 'Help pages', value: 'Other help pages' },
                //{ name: '`voicehelp`', value: 'Gives list of voice commands', inline: true },
                { name: '`modhelp`', value: 'Gives list of moderator commands', inline: true },
                { name: '`rephelp`', value: 'Gives you your current reputation stats', inline: true },
                { name: 'Note - ', value: 'If you need help, go to <#1007677814352396348> \n If you need to report, go to <#1003653159903842458>' }
            )
            .setFooter({ text: 'Revade - An Akripent Plaza Bot', iconURL: 'https://raw.githubusercontent.com/Akridiki/Revade/main/Logo.png' })

        // HELP EMBED

        //----------------------------

        message.channel.send({ embeds: [helpEmbed] })

    }

    //----------------------------

    /// INFO EMBED

    if (command === 'info' || command === 'information' || command === 'socials' || command === 'ip' || command === 'schedule') {
        var date = new Date();
        var hour = date.getHours();

        if (hour == 6 || hour == 7 || hour == 8 || hour == 9 || hour == 10 || hour == 11) { tchosen = syst.mor; tchosencol = '#96cf89'; }
        if (hour == 12 || hour == 13 || hour == 14 || hour == 15 || hour == 16 || hour == 17) { tchosen = syst.aft; tchosencol = '#ff5858'; }
        if (hour == 18 || hour == 19 || hour == 20 || hour == 21 || hour == 22 || hour == 23 || hour == 24 || hour == 0 || hour == 1 || hour == 2 || hour == 3 || hour == 4 || hour == 5) { tchosen = syst.eve; tchosencol = '#7b54b5'; }

        // INFO EMBED

        const usefulInfoEmbed = new EmbedBuilder()
            .setColor(tchosencol)
            .setTitle('Information')
            .setAuthor({ name: 'Revade', iconURL: 'https://raw.githubusercontent.com/Akridiki/Revade/main/Logo.png' })
            .setDescription('Our Socials:')
            .setImage('https://raw.githubusercontent.com/Akridiki/Revade/main/schedule.png')
            .addFields(
                { name: '`Minecraft Server`', value: 'bloxsandmines.us.to' },
                { name: '`YouTube`', value: 'https://www.youtube.com/channel/UC2gkU8UCPaMapLZN0rDF2Aw' },
                { name: '`Twitch`', value: 'http://twitch.tv/akridiki' },
                { name: '`Twitter`', value: 'https://twitter.com/akridiki' },
                { name: '`Discord`', value: 'https://discord.gg/hkdfXQmGhh' },
                { name: '`ROBLOX Group`', value: 'https://www.roblox.com/groups/8263794' }
            )
            .setFooter({ text: 'Revade - An Akripent Plaza Bot', iconURL: 'https://raw.githubusercontent.com/Akridiki/Revade/main/Logo.png' })

        // INFO EMBED

        //----------------------------

        message.channel.send({ embeds: [usefulInfoEmbed] })
    }

    /// INFO EMBED


    /// MOD HELP EMBED
    if (command === 'modhelp') {
        var date = new Date();
        var hour = date.getHours();

        if (hour == 6 || hour == 7 || hour == 8 || hour == 9 || hour == 10 || hour == 11) { tchosen = syst.mor; tchosencol = '#96cf89'; }
        if (hour == 12 || hour == 13 || hour == 14 || hour == 15 || hour == 16 || hour == 17) { tchosen = syst.aft; tchosencol = '#ff5858'; }
        if (hour == 18 || hour == 19 || hour == 20 || hour == 21 || hour == 22 || hour == 23 || hour == 24 || hour == 0 || hour == 1 || hour == 2 || hour == 3 || hour == 4 || hour == 5) { tchosen = syst.eve; tchosencol = '#7b54b5'; }

        // MOD HELP

        const mhelpEmbed = new EmbedBuilder()
            .setColor(tchosencol)
            .setTitle('Commands for Revade')
            .setAuthor({ name: 'Revade', iconURL: 'https://raw.githubusercontent.com/Akridiki/Revade/main/Logo.png' })
            .setDescription('**PREFIX:** `' + syst.prefix + '` \n List of available commands:')
            .setImage(tchosen)
            .addFields(
                { name: '`kick`', value: 'Kicks the first mention in the message. No reason can be provided.', inline: true },
                { name: '`purge`', value: 'Removes a bulk of messages.', inline: true },
                { name: '`ban`', value: 'Bans the first mention in the message. No reason can be provided.', inline: true },
                { name: '`timeout`', value: 'Times out the first mention in the message: ' + syst.prefix + 'timeout @who (minutes)', inline: true },
            )
            .setFooter({ text: 'Revade - An Akripent Plaza Bot', iconURL: 'https://raw.githubusercontent.com/Akridiki/Revade/main/Logo.png' })

        message.channel.send({ embeds: [mhelpEmbed] })

        // MOD HELP

        //----------------------------
    }

    if (command === 'rephelp') {
        var date = new Date();
        var hour = date.getHours();

        if (hour == 6 || hour == 7 || hour == 8 || hour == 9 || hour == 10 || hour == 11) { tchosen = syst.mor; tchosencol = '#96cf89'; }
        if (hour == 12 || hour == 13 || hour == 14 || hour == 15 || hour == 16 || hour == 17) { tchosen = syst.aft; tchosencol = '#ff5858'; }
        if (hour == 18 || hour == 19 || hour == 20 || hour == 21 || hour == 22 || hour == 23 || hour == 24 || hour == 0 || hour == 1 || hour == 2 || hour == 3 || hour == 4 || hour == 5) { tchosen = syst.eve; tchosencol = '#7b54b5'; }

        // REP HELP

        const rhelpEmbed = new EmbedBuilder()
            .setColor(tchosencol)
            .setTitle('Commands for Revade')
            .setAuthor({ name: 'Revade', iconURL: 'https://raw.githubusercontent.com/Akridiki/Revade/main/Logo.png' })
            .setDescription('**PREFIX:** `' + syst.prefix + '` \n List of available commands:')
            .setImage(tchosen)
            .addFields(
                { name: '`inventory`', value: 'Shows your inventory', inline: true },
                { name: '`purchase`', value: 'Buy an item from the store (ri-purchase item)', inline: true },
                { name: '`store`', value: 'Shows purchasable items', inline: true },
                { name: '`stats`', value: 'Gives you your current reputation stats', inline: true },
                { name: '`use`', value: 'Use an item from your inventory (ri-use item)', inline: true },
            )
            .setFooter({ text: 'Revade - An Akripent Plaza Bot', iconURL: 'https://raw.githubusercontent.com/Akridiki/Revade/main/Logo.png' })

        message.channel.send({ embeds: [rhelpEmbed] })
    }


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
                    { name: 'Joined on:', value: `${moment.utc(member.joinedAt).format("dddd, MMMM Do YYYY")}`, inline: true },
                    { name: 'Account Creation Date:', value: `${moment.utc(member.user.createdAt).format("dddd, MMMM Do YYYY")}`, inline: true },
                    { name: 'Roles:', value: " ` ` " + listedRoles.join(" ` ` ") + " ` ` ", inline: false },
                ])

                .setAuthor({ name: 'Revade', iconURL: 'https://raw.githubusercontent.com/Akridiki/Revade/main/Logo.png' })
                .setFooter({ text: 'Revade - An Akripent Plaza Bot', iconURL: 'https://raw.githubusercontent.com/Akridiki/Revade/main/Logo.png' })

            message.channel.send({ embeds: [embed] })
        } catch (error) {
            //this prob will never happen but who knows! better safe than sorry.
            message.channel.send("Something went wrong and I could not do that :(");
            console.log(error);
        }
    }


    /// YOU COMMAND + EMBED

    //----------------------------

    if (command === 'purge') {
        try {
            let deleteamount = message.content.split(syst.prefix + "purge")[1];
            if (message.member.permissions.has(["KickMembers"])) {
                if (parseInt(deleteamount <= 0)) return message.reply({ embeds: [embeds.failedEmbed] })

                if (parseInt(deleteamount) > 250) return message.reply("You're purging too much at once! **(Max 250)**")

                await message.channel.bulkDelete(parseInt(deleteamount) + 1, true);
            }
            await message.channel.send("Success!").then(m => {
                setTimeout(() => {
                    m.delete()
                }, 5000)
            })
        } catch (error) {
            message.reply({ embeds: [embeds.failedEmbed] })
        }
    }
    //----------------------------

    //KICK COMMAND

    if (command === 'kick') {
        try {
            var msgtmp = message.mentions.members.first() || "nobody";
            var msguser = "<@" + msgtmp + ">";

            if (message.member.permissions.has(["KickMembers"])) {
                if (message.mentions.members.first()) {
                    message.channel.send("Attempting kick.");

                    message.mentions.members.first().kick().catch((error) => {
                        message.reply("I do not have permissions to kick " + msguser + "\n\n" + error);
                    });
                } else {
                    message.reply({ embeds: [embeds.failedEmbed] });
                }
            }
        } catch (error) {

            message.channel.send({ embeds: [embeds.failedEmbed] });
            console.log(error);
        }
    }
    //KICK COMMAND

    //----------------------------

    //BAN COMMAND

    if (command === 'ban') {
        try {
            var msgtmp = message.mentions.members.first() || "nobody";
            var msguser = "<@" + msgtmp + ">";

            if (message.member.permissions.has("BanMembers")) {
                if (message.mentions.members.first()) {
                    message.mentions.members.first().ban().then(yay => {
                        message.reply("Banned successfully!")
                    }).catch((error) => {
                        message.reply("I do not have permissions to ban " + msguser);
                    });
                } else if (!message.member.permissions.has("BanMembers")){
                    message.reply("You do not have permissions to ban!");
                } else if (msgtmp == "nobody"){
                    message.reply("You didn't specify who you want to ban. Make sure you @ the user to ban them!")
                }
            }
        } catch (error) {
            message.channel.send("Could not run that command :(");
            console.log(error);
        }
    }

    if (command.startsWith('timeout')) {
        try {
            var msgtime = message.content.split(" ")[2] || 1
            var msgtmp = message.mentions.members.first() || "nobody";
            var msguser = "<@" + msgtmp + ">";

            if (message.member.permissions.has(["KickMembers"])) {
                if (message.mentions.members.first()) {                
                    message.mentions.members.first().timeout(1000 * 60 * msgtime).then(yay => {
                        message.reply("Timed out successfully!")
                    }).catch((error) => {
                        message.reply("I do not have permissions to timeout" + msguser + "\n\n" + error);
                    });
                } else if (msgtmp == "nobody"){
                    message.reply("You didn't specify who you want to timeout. Make sure you @ the user to timeout them!")
                }
            } else { 
                message.reply("You do not have permissions to timeout!");
            }
        } catch (error) {
            //cant ban? uhhh not sure
            message.channel.send("Could not run that command :(");
            console.log(error);
        }
    }

    //BAN COMMAND

    //----------------------------

    /// POLL COMMANDS

    if (command === 'pollad') {
        var pdate = new Date();
        var phour = pdate.getHours();
        var pcochosen;
        var tmp1;
        var announcement;

        tmp1 = message.content.split(syst.prefix + "pollad")[1]

        try {
            announcement = tmp1.split("\"");
        } catch (error) {
            return message.reply("u dummy or me dummy? error.");
        }

        if (phour == 6 || phour == 7 || phour == 8 || phour == 9 || phour == 10 || phour == 11) { pcochosen = '#96cf89' }
        if (phour == 12 || phour == 13 || phour == 14 || phour == 15 || phour == 16 || phour == 17) { pcochosen = '#ff5858' }
        if (phour == 18 || phour == 19 || phour == 20 || phour == 21 || phour == 22 || phour == 23 || phour == 24 || phour == 0 || phour == 1 || phour == 2 || phour == 3 || phour == 4 || phour == 5) { pcochosen = '#7b54b5' }

        const dOSann = new EmbedBuilder()
            .setColor(pcochosen)
            .setTitle(announcement[1])
            .setDescription(announcement[3])
            .setTimestamp()

        revade.client.channels.fetch(syst.announcementsChannelID).then(channel => {
            channel.send("<@&889097809356267570>")
            channel.send({ embeds: [dOSann] }).then(async message => {
                await message.react('👍');
                await message.react('👎');
            });
        }).catch(err => {
            console.log(err);
        })

        message.delete();
    }

    if (command === 'poll2') {
        var pdate = new Date();
        var phour = pdate.getHours();
        var pcochosen;
        var tmp1;
        var announcement;

        tmp1 = message.content.split(syst.prefix + "pollad")[1]

        var announcement = tmp1.split("\"");

        if (phour == 6 || phour == 7 || phour == 8 || phour == 9 || phour == 10 || phour == 11) { pcochosen = '#96cf89' }
        if (phour == 12 || phour == 13 || phour == 14 || phour == 15 || phour == 16 || phour == 17) { pcochosen = '#ff5858' }
        if (phour == 18 || phour == 19 || phour == 20 || phour == 21 || phour == 22 || phour == 23 || phour == 24 || phour == 0 || phour == 1 || phour == 2 || phour == 3 || phour == 4 || phour == 5) { pcochosen = '#7b54b5' }

        const dOSann = new EmbedBuilder()
            .setColor(pcochosen)
            .setTitle(announcement[1])
            .setDescription(announcement[3])
            .setTimestamp()

        revade.client.channels.fetch(syst.announcementsChannelID).then(channel => {
            channel.send("<@&889097809356267570>")
            channel.send({ embeds: [dOSann] }).then(async message => {
                await message.react('🔴');
                await message.react('🟠');
            });
        }).catch(err => {
            console.log(err);
        })

        message.delete();
    }

    if (command === 'poll3') {
        var pdate = new Date();
        var phour = pdate.getHours();
        var pcochosen;
        var tmp1;
        var announcement;

        tmp1 = message.content.split(syst.prefix + "pollad")[1]

        var announcement = tmp1.split("\"");

        if (phour == 6 || phour == 7 || phour == 8 || phour == 9 || phour == 10 || phour == 11) { pcochosen = '#96cf89' }
        if (phour == 12 || phour == 13 || phour == 14 || phour == 15 || phour == 16 || phour == 17) { pcochosen = '#ff5858' }
        if (phour == 18 || phour == 19 || phour == 20 || phour == 21 || phour == 22 || phour == 23 || phour == 24 || phour == 0 || phour == 1 || phour == 2 || phour == 3 || phour == 4 || phour == 5) { pcochosen = '#7b54b5' }

        const dOSann = new EmbedBuilder()
            .setColor(pcochosen)
            .setTitle(announcement[1])
            .setDescription(announcement[3])
            .setTimestamp()

        revade.client.channels.fetch(syst.announcementsChannelID).then(channel => {
            channel.send("<@&889097809356267570>")
            channel.send({ embeds: [dOSann] }).then(async message => {
                await message.react('🔴');
                await message.react('🟠');
                await message.react('🟡');
            });
        }).catch(err => {
            console.log(err);
        })

        message.delete();
    }

    if (command === 'poll4') {
        var pdate = new Date();
        var phour = pdate.getHours();
        var pcochosen;
        var tmp1;
        var announcement;

        tmp1 = message.content.split(syst.prefix + "pollad")[1]

        var announcement = tmp1.split("\"");

        if (phour == 6 || phour == 7 || phour == 8 || phour == 9 || phour == 10 || phour == 11) { pcochosen = '#96cf89' }
        if (phour == 12 || phour == 13 || phour == 14 || phour == 15 || phour == 16 || phour == 17) { pcochosen = '#ff5858' }
        if (phour == 18 || phour == 19 || phour == 20 || phour == 21 || phour == 22 || phour == 23 || phour == 24 || phour == 0 || phour == 1 || phour == 2 || phour == 3 || phour == 4 || phour == 5) { pcochosen = '#7b54b5' }

        const dOSann = new EmbedBuilder()
            .setColor(pcochosen)
            .setTitle(announcement[1])
            .setDescription(announcement[3])
            .setTimestamp()

        revade.client.channels.fetch(syst.announcementsChannelID).then(channel => {
            channel.send("<@&889097809356267570>")
            channel.send({ embeds: [dOSann] }).then(async message => {
                await message.react('🔴');
                await message.react('🟠');
                await message.react('🟡');
                await message.react('🟢');
            });
        }).catch(err => {
            console.log(err);
        })

        message.delete();
    }

    /// POLL COMMANDS END

    //----------------------------

    // COMPLIMENTS

    else if (command === 'rulesccc1001') {
        const sayMessage = message.content.split(' ').slice(1).join(' ');

        const rulesEmbed = new EmbedBuilder()
            .setColor('#b4ace7')
            .setDescription("The **Akripent Plaza** Discord Server is a safe place for people who are __13 or older__. We would like to thank you for visiting our rule page as this helps our server to stay clean.\n\n If you notice someone who is violating the rules, please contact us by pinging one of our Discord Moderators. We appreciate your contribution!\n\n Here are the rules:")
            .addFields(
                { name: '😎 Rule 1', value: 'Be cool! Treat everyone equally and be free to express yourself with good manners.' },
                { name: '🔤 Rule 2', value: 'English only. This way, we can all communicate together in a better way! It does not hurt to speak some facts about languages though!' },
                { name: '⚠️ Rule 3', value: 'No Offensive, NSFW Content, Piracy or other topics that can be of a bad influence. Or else...' },
                { name: '🛑 Rule 4', value: 'Do not spread any hate towards communities. It is okay to criticize a community but as stated before, do not spread hate.' },
                { name: '😵 Rule 5', value: 'No Spamming. This rule explains itself.' },
                { name: '😰 Rule 6', value: 'Harm or content that has a harmful background is not tolerated' },
                { name: '🖥️ Rule 7', value: 'Do not @mention staff members for no reason.' },
                { name: '🖼️ Rule 8', value: 'No Unusual Hyperlinks, Unusual files (like .cia, .exe, etc) and Advertisements. You are free to DM Akridiki to check your file though!' },
                { name: '🤐 Rule 9', value: 'Do NOT encourage people to say anything against their will.' },
                { name: '🤬 Rule 10', value: 'Minimize the usage of profanity as much as you can. It is somewhat allowed but only at a certain limit. This also includes nicknames, usernames, etc.' }

            )
        message.channel.send({ embeds: [rulesEmbed] })
        message.delete();
    }

    else if (command === 'rulesbbb1002') {
        const sayMessage = message.content.split(' ').slice(1).join(' ');

        const rules2Embed = new EmbedBuilder()
            .setColor('#b4ace7')
            .setDescription("Final Verdict lies with the Akripent Plaza Team 24/7! Please follow Discord ToS so we can keep this platform safe! https://discord.com/terms")
        message.channel.send({ embeds: [rules2Embed] })
        message.delete();
    }

    else if (command === 'rulesaaa1003') {
        const sayMessage = message.content.split(' ').slice(1).join(' ');

        const rules3Embed = new EmbedBuilder()
            .setColor('#b4ace7')
            .addFields(
                { name: '👓', value: 'This is the Official Akripent Plaza Discord Server! Cool right?' },
                { name: '🖌️', value: 'Feel free to invite your friends using this link: https://discord.gg/hkdfXQmGhh' },
                { name: 'Our rules are ONLY applicable on THIS server. Anything outside this server is not our responsibility.', value: 'Have fun! 💛' }
            )
        message.channel.send({ embeds: [rules3Embed] })
        message.delete();
    }

    else if (command === 'rules') {
        const sayMessage = message.content.split(' ').slice(1).join(' ');

        const rulesEmbed = new EmbedBuilder()
            .setColor('#b4ace7')
            .setAuthor({ name: 'Revade', iconURL: 'https://raw.githubusercontent.com/Akridiki/Revade/main/Logo.png' })
            .setDescription('To see the rules, go to <#632615154571411456>!')
        message.channel.send({ embeds: [rulesEmbed] })
    }

    //roles var

    else if (command === 'compliment') {
        const sayMessage = message.content.split(' ').slice(1).join(' ');
        var chosenbtw = Math.floor(Math.random() * ((compliments.list.length - 1) - 0) + 0);

        const compliEmbed = new EmbedBuilder()
            .setColor('#deecf5')
            .setAuthor({ name: 'Revade', iconURL: 'https://raw.githubusercontent.com/Akridiki/Revade/main/Logo.png' })
            .setDescription(compliments.list[chosenbtw])
        message.channel.send({ embeds: [compliEmbed] })
    }

    // COMPLIMENTS

    // TEST AREA //
    // if (command === 'roles') {
    //     try {
    //         const rowy = new ActionRowBuilder()
    //             .addComponents(
    //                 new SelectMenuBuilder()
    //                     .setCustomId('select')
    //                     .setPlaceholder('Click me!')
    //                     .addOptions([
    //                         {
    //                             label: 'Roblox',
    //                             description: 'Get notified for new Roblox feeds',
    //                             value: 'first_option',
    //                         },

    //                         {
    //                             label: 'Twitter',
    //                             description: 'Get notified for new Twitter feeds from Aki',
    //                             value: 'second_option',
    //                         },

    //                         {
    //                             label: 'Twitch',
    //                             description: 'Get notified for upcoming streams',
    //                             value: 'third_option',
    //                         },

    //                         {
    //                             label: 'YouTube',
    //                             description: 'Get notified for new YouTube videos',
    //                             value: 'fourth_option',
    //                         },

    //                         {
    //                             label: 'Announcements',
    //                             description: 'Get notified for new information',
    //                             value: 'fifth_option',
    //                         },

    //                         {
    //                             label: 'Art',
    //                             description: 'Splish, splash, your drawing is a work of art!',
    //                             value: 'sixth_option',
    //                         },

    //                         {
    //                             label: 'Minecraft',
    //                             description: 'Get notified for new Minecraft feeds',
    //                             value: 'seventh_option',
    //                         }
    //                     ]),
    //             );

    //         message.channel.send({ content: '**Choose the role you would like to modify below:**', components: [rowy] });
    //     } catch (error) {

    //     }
    // }

    else if (command == 'fakejoin') { // fake boost func as...
        if (message.author.id == 991392397160349766 || message.author.id == 330398877645537282) {
            try {
                const welcomeEmbed = new EmbedBuilder()
                    .setColor('#f6f4c6')
                    .setTitle(message.author.tag + ' joined the plazakins!💛')
                    .setAuthor({ name: 'A message from Revadee', iconURL: 'https://raw.githubusercontent.com/Akridiki/Revade/main/Logo.png' })
                    .setDescription('We are all happy to see you!')

                var msg = message.guild.channels.cache.get('956255050169221190').send({ embeds: [welcomeEmbed] });
            } catch (error) {
                console.log(error)
            }
        }
    }

    else if (command == 'report/embed') { // only aki and david can run it
        if (message.author.id == 991392397160349766 || message.author.id == 330398877645537282) {
            const row = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setCustomId('report/report')
                        .setLabel('Report')
                        .setStyle(ButtonStyle.Success),
                );

            await message.channel.send({ embeds: [embeds.embedReportChannel] });
            await message.channel.send({ content: '`Select:`', components: [row] });
        }
    }

    else if (command == 'suggestions/embed') { // only aki and david can run it
        if (message.author.id == 991392397160349766 || message.author.id == 330398877645537282) {
            const row = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setCustomId('suggestions/open')
                        .setLabel('Suggest')
                        .setStyle(ButtonStyle.Success),
                );

            await message.channel.send({ embeds: [embeds.embedSuggestionsChannel] });
            await message.channel.send({ content: '`Select:`', components: [row] });
        }
    }

    else if (command == 'help/embed') { // only aki and david can run it
        if (message.author.id == 991392397160349766 || message.author.id == 330398877645537282) {
            const row = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setCustomId('help/maketicket')
                        .setLabel('Make Ticket')
                        .setStyle(ButtonStyle.Success),

                    new ButtonBuilder()
                        .setCustomId('help/become')
                        .setLabel('Join Helpers')
                        .setStyle(ButtonStyle.Primary),

                    new ButtonBuilder()
                        .setCustomId('help/leave')
                        .setLabel('Leave Helpers')
                        .setStyle(ButtonStyle.Primary),
                );

            await message.channel.send({ embeds: [embeds.embedHelpChannel] });
            await message.channel.send({ content: '`Select:`', components: [row] });
        }
    }

    else if (command === '16112007') {
        message.reply("https://www.youtube.com/watch?v=se7qSdKED74")
    }

    else if (command === '27032007') {
        message.reply('https://www.youtube.com/watch?v=2roJ2L5ITYM')
    }

    else if (command === 'sus') {
        message.reply('https://raw.githubusercontent.com/Akridiki/Revade/main/meme.jpg')
    }

    else if (command === 'deez') {
        message.reply('ur not funny.')
    }

    else if (command === 'exit(-1);') {
        message.reply('Did you really just try to exit?')
        message.reply('**There is no escape. :)**')
    }

    else if (command === 'revade') {
        message.reply('yes what do u want just type in `ri-help` you hippie')
    }

    else if (command === 'google') {
        message.reply('do i look like a search engine to you?\nhttps://google.com')
    }

    else if (command === 'discord.js') {
        message.reply('Currently on `discord.js v14`')
    }

    else if (command === 'ver' || command == 'version') {
        message.reply('Currently on `Revade 9 NiX`')
    }

    else if (command === 'members' || command === 'membercount') {
        var memberAmount = message.guild.memberCount
        message.reply('There are ' + memberAmount + ' members.')
    }

    else if (command === 'easteregg') {
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
                        }, 5000);
                }, 3000);
        }, 3000);
    }

    if (command === 'stats' || command === 'statistics') {
        var whois;
        var who;

        if (message.mentions.members.first()) {
            whois = message.mentions.members.first().id
            who = message.mentions.members.first().user.tag
        } else {
            whois = message.author.id;
            who = message.author.tag
        }

        // Has no folder, never got reputation :(
        if (!fs.existsSync('reputationsystem/' + whois)) {
            var statsEmbed = new EmbedBuilder()
                .setColor('#55ff55')
                .setTitle('Statistics')
                .setDescription("These are the statistics of " + who)
                .addFields(
                    { name: '`Reputation`', value: '0', inline: true },
                    { name: '`Points`', value: '0', inline: true }
                )

            message.channel.send({ embeds: [statsEmbed] });
            return;
        }

        // Exists on the database! Got reputation :D
        // * This assumes the data.txt was created, which should
        fs.readFile('reputationsystem/' + whois + '/data.txt', 'utf8', (err, data) => {
            if (err) {
                console.error(err);
                return;
            }

            // Succeeded reading //
            var tmpdata = data.split(',')

            const statsEmbed = new EmbedBuilder()
                .setColor('#55ff55')
                .setTitle('Statistics')
                .setDescription("These are the statistics of " + who)
                .addFields(
                    { name: '`Reputation`', value: tmpdata[0], inline: true },
                    { name: '`Points`', value: tmpdata[1], inline: true },
                )

            message.channel.send({ embeds: [statsEmbed] })
        });
    }

    else if (command === 'giveaway') {
        if (message.author.id == 991392397160349766 || message.author.id == 330398877645537282) {
            var msg = await message.author.send("Welcome to the **Giveaway Creator Wizard**\nYou will be asked 4 unskippable questions.")

            message.author.send("**Please specify the title:**")
            const msg_filter = (m) => m.author.id === message.member.id;
            const collected = await msg.channel.awaitMessages({ filter: msg_filter, max: 1 });
            var title = collected.first().content

            var theSent = await message.member.send("**Now, type the description:**")
            const collected2 = await msg.channel.awaitMessages({ filter: msg_filter, max: 1 });
            var desc = collected2.first().content

            var theSent = await message.member.send("**Due date? DD/MM/YY (starts today)**")
            const collected3 = await msg.channel.awaitMessages({ filter: msg_filter, max: 1 });
            var dueDate = collected3.first().content

            var theSent = await message.member.send("**Due time? HH:MM**")
            const collected4 = await msg.channel.awaitMessages({ filter: msg_filter, max: 1 });
            var dueTime = collected4.first().content

            var theSent = await message.member.send("**What store item would you like to award? (identifier only!)**")
            const collected5 = await msg.channel.awaitMessages({ filter: msg_filter, max: 1 });
            var itemToAward = collected5.first().content

            //var splitDate = dueDate.split("/")
            //var splitTime = dueTime.split(":")

            var composed = dueDate + "\n" + dueTime + "\n" + itemToAward + "\n" + title + "\n"

            // Setup the giveaway
            fs.writeFile('events/' + title + '.txt', composed, err => {
                if (err) {
                    console.error(err);
                }
            });

            let channel = revade.client.channels.fetch(syst.giveawayChannelID).then(channel => {
                const giveawayParticipationEmbed = new EmbedBuilder()
                    .setColor('#5555ff')
                    .setTitle(title)
                    .setAuthor({ name: 'Revade', iconURL: 'https://raw.githubusercontent.com/Akridiki/Revade/main/Logo.png' })
                    .setDescription(desc + '\n\nEnds: ' + dueDate + " (DD/MM/YYYY) at " + dueTime)
                    .setFooter({ text: 'Revade - An Akripent Plaza Bot', iconURL: 'https://raw.githubusercontent.com/Akridiki/Revade/main/Logo.png' });

                const row = new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                            .setCustomId('participate/' + title)
                            .setLabel('Participate')
                            .setStyle(ButtonStyle.Success),
                    );

                message.channel.send({ embeds: [giveawayParticipationEmbed], components: [row] });
            }).catch(err => {
                console.log(err)
                channel.send({ embeds: [embeds.failedEmbed] })
            })

            message.member.send("Giveaway created!")
        }
    }

    else if (command.startsWith('store')) {
        var thing = message.content.split(syst.prefix + "store ")[1]

        // Show embed for both items'/perks' help //
        if (thing == undefined) {
            message.channel.send({ embeds: [embeds.storeMainEmbed] })

            // Return to do nothing more //
            return
        }
        
        if (thing.startsWith("items")) {
        fs.readFile('storesystem/items.txt', 'utf8', (err, data) => {
            if (err) {
                console.error(err);
                return;
            }

            fs.readFile('storesystem/itemdesc.txt', 'utf8', (err, dataB) => {
                if (err) {
                    console.error(err);
                    return;
                }

                // Succeeded reading //
                var lines = data.split('\n')
                var page = message.content.split(syst.prefix + "store ")[2]
                var pagedata;
                var pageh;

                if (page != undefined && page >= 1) {
                    pagedata = lines[page - 1]
                    pageh = parseInt(page)
                } else {
                    pagedata = lines[0]
                    page = "1"
                    pageh = 1
                }
                if (data.split('\n')[pageh - 1] == undefined && dataB.split('\n')[pageh - 1] == undefined) {
                    return message.reply("That page does not exist.")
                }

                // Success reading //
                var splitline = pagedata.split(",")

                fs.readFile('storesystem/itemprices.txt', 'utf8', (err, dataC) => {
                    if (err) {
                        console.error(err);
                        return;
                    }

                    var priceline = dataC.split('\n')[pageh - 1].split(",")
                    var descline = dataB.split('\n')[pageh - 1].split(",")

                    var storeEmbed = new EmbedBuilder()
                        .setColor('#55ff55')
                        .setTitle('Store Page ' + pageh)

                    var atLeastOneItem = false;

                    for (let i = 0; i < splitline.length; i++) {
                        if (splitline[i] != "" && priceline[i] != -1 && !(priceline[i].includes('-2')) && priceline[i] != undefined) {
                            atLeastOneItem = true;
                            var thingy = splitline[i] + " (" + priceline[i] + " points)";

                            storeEmbed.addFields(
                                { name: thingy, value: descline[i] }
                            )
                        }
                    }

                    if (atLeastOneItem == false) {
                        return message.channel.send("There are no items at the store right now... :thinking:");
                    }

                    message.channel.send({ embeds: [storeEmbed] })
                });
            });
        });

        } else if (thing.startsWith("perks")) {
            // show fake perks embed
            message.reply({embeds: [embeds.fakePerksEmbed]})
        }
    }

    else if (command === 'inventory') {
        var whois = message.author.id;

        // Has no folder, never got reputation :(
        if (!fs.existsSync('reputationsystem/' + whois) || !fs.existsSync('reputationsystem/' + whois + "/inventory.txt")) {
            var invEmbed = new EmbedBuilder()
                .setColor('#55ff55')
                .setTitle('Inventory')
                .setDescription("Oops!")
                .addFields(
                    { name: '`Your inventory is empty!`', value: 'You can purchase items with `ri-store` or get items via giveaways', inline: true }
                )

            message.channel.send({ embeds: [invEmbed] });
            return;
        }

        // Exists on the database! Got reputation :D
        // * This assumes the data.txt was created, which should
        fs.readFile('reputationsystem/' + whois + '/inventory.txt', 'utf8', (err, data) => {
            if (err) {
                console.error(err);
                return;
            }

            // Succeeded reading //
            var tmpdata = data.split(',')

            fs.readFile('storesystem/items.txt', 'utf8', (err, itemstxt) => {
                if (err) {
                    console.error(err);
                    return;
                }

                var splititems = itemstxt.split(",")

                fs.readFile('storesystem/itemdesc.txt', 'utf8', (err, itemsdesctxt) => {
                    if (err) {
                        console.error(err);
                        return;
                    }

                    var splititemdescs = itemsdesctxt.split(",")

                    const invEmbed = new EmbedBuilder()
                        .setColor('#55ff55')
                        .setTitle('Inventory')
                        .setDescription("This is what you have:")

                    tmpdata.forEach(item => {
                        if (item != "") {
                            for (let i = 0; i < splititems.length; i++) {
                                if (item == splititems[i]) {
                                    invEmbed.addFields(
                                        { name: '`' + item + '`', value: splititemdescs[i], inline: true }
                                    )
                                }
                            }
                        }
                    });

                    message.channel.send({ embeds: [invEmbed] })
                });
            });
        });
    }

    else if (message.content.startsWith(syst.prefix + 'use')) {
        if (message.content.split(syst.prefix + "use ")[1] == undefined) {
            return message.reply("Please specify an item.")
        }

        if (!fs.existsSync('reputationsystem/' + message.member.id) || !fs.existsSync('reputationsystem/' + message.member.id + "/inventory.txt")) {
            message.reply("You don't have any item in your `ri-inventory` that you can use yet.")
        } else {
            fs.readFile('reputationsystem/' + message.member.id + "/inventory.txt", 'utf8', (err, invdata) => {
                if (err) {
                    console.error(err);
                    return;
                }

                var invitems = invdata.split(",")
                var triggered = false

                invitems.forEach(item => {
                    if (item != "") {
                        if (item.includes(message.content.split(syst.prefix + "use ")[1])) {
                            UseItem(message, item);
                        }
                    }
                });

                triggered = false


            });
        }
    }

    else if (message.content.startsWith(syst.prefix + 'purchase')) {
        if (message.content.split(syst.prefix + "purchase ")[1] == undefined) {
            return message.reply("Please specify an item.")
        }

        if (!fs.existsSync('reputationsystem/' + message.member.id)) {
            message.reply("You don't have any `reputation points` that you can use!")
        } else {
            if (!fs.existsSync('reputationsystem/' + message.member.id + "/data.txt")) { return message.reply("You don't have any `reputation points` that you can use!") }

            fs.readFile('reputationsystem/' + message.member.id + "/data.txt", 'utf8', (err, userdata) => {
                if (err) {
                    console.error(err);
                    return;
                }

                var points = userdata.split(",")[1]

                if (!fs.existsSync('storesystem/data/' + message.content.split(syst.prefix + "purchase ")[1] + ".txt")) {
                    return message.reply("That store product does not exist! **404**")
                } else {
                    fs.readFile('storesystem/items.txt', 'utf8', (err, itemdata) => {
                        itemdata.split("\n").forEach(line => {
                            line.split(",").forEach(item => {
                                if (item == message.content.split(syst.prefix + "purchase ")[1]) {
                                    fs.readFile('storesystem/itemprices.txt', 'utf8', (err, pridata) => {
                                        pridata.split("\n").forEach(line2 => {
                                            if (line2 != "") {
                                                var arr = line2.split(",")

                                                for (let i = 0; i < arr.length; i++) {
                                                    itemdata.split("\n").forEach(lineB => {
                                                        if (lineB.split(",")[i] != "") {
                                                            if (lineB.split(",")[i] == message.content.split(syst.prefix + "purchase ")[1]) {
                                                                if (Number(arr[i].split("/")[1]) > Number(points)) {
                                                                    return message.reply("You don't have enough `reputation points` to purchase this item!")
                                                                } else {
                                                                    if (arr[i] == "-1") {
                                                                        return message.reply("This item exists; but is unavailable.\nYou cannot purchase this item.")
                                                                    } else {
                                                                        // Purchase the item
                                                                        try {
                                                                            if (fs.existsSync('reputationsystem/' + message.author.id + '/inventory.txt')) {
                                                                                fs.readFile('reputationsystem/' + message.author.id + '/inventory.txt', 'utf8', (err, inventory) => {
                                                                                    var tmp = message.content.split(syst.prefix + "purchase ")[1] + ","
                                                                                    inventory.split(",").forEach(item => {
                                                                                        tmp += item + ","
                                                                                    });

                                                                                    fs.writeFile('reputationsystem/' + message.author.id + '/inventory.txt', tmp, (err) => {
                                                                                        if (err) {
                                                                                            console.error(err);
                                                                                            return;
                                                                                        }

                                                                                        fs.writeFile('reputationsystem/' + message.member.id + "/data.txt", userdata.split(",")[0] + "," + (Number(userdata.split(",")[1]) - Number(arr[i].split("/")[1])).toString(), (err) => {
                                                                                            if (err) {
                                                                                                console.error(err);
                                                                                                return;
                                                                                            }

                                                                                            message.reply("Your purchase of the item **" + message.content.split(syst.prefix + "purchase ")[1] + "** was successful!")
                                                                                        });
                                                                                    });
                                                                                });
                                                                            } else {
                                                                                fs.writeFile('reputationsystem/' + message.author.id + '/inventory.txt', ',', err => {
                                                                                    if (err) {
                                                                                        console.error(err);
                                                                                    }

                                                                                    fs.readFile('reputationsystem/' + message.author.id + '/inventory.txt', 'utf8', (err, inventory) => {
                                                                                        var tmp = message.content.split(syst.prefix + "purchase ")[1]
                                                                                        inventory.split(",").forEach(item => {
                                                                                            tmp += item + ","
                                                                                        });

                                                                                        fs.writeFile('reputationsystem/' + message.author.id + '/inventory.txt', tmp, (err) => {
                                                                                            if (err) {
                                                                                                console.error(err);
                                                                                                return;
                                                                                            }

                                                                                            fs.writeFile('reputationsystem/' + message.member.id + "/data.txt", userdata.split(",")[0] + "," + (Number(userdata.split(",")[1]) - Number(arr[i])).toString(), (err) => {
                                                                                                if (err) {
                                                                                                    console.error(err);
                                                                                                    return;
                                                                                                }

                                                                                                message.reply("Your purchase of the item **" + message.content.split(syst.prefix + "purchase ")[1] + "** was successful!")
                                                                                            });
                                                                                        });
                                                                                    });
                                                                                });
                                                                            }
                                                                        } catch (err) {
                                                                            console.error(err)
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    });
                                                }
                                            }
                                        });
                                    });
                                }
                            });
                        });
                    });
                }
            });
        }
    }

    else if (message.content.startsWith(syst.prefix + 'item')) {
        if (message.author.id != "991392397160349766" && message.author.id != "330398877645537282") {
            return message.channel.send("You are not allowed to run this command due to security issues.")
        }

        var arg = message.content.split(syst.prefix + "item ")[1]
        var price;
        var iname;
        var actualprice;

        if (arg == undefined) { return message.channel.send("Please specify an option") } else {
            arg = arg.split(" ")
        }

        if (arg[0] == "create") {
            if (arg[1] != undefined) {
                price = arg[1].split("/")[0];
                actualprice = arg[1].split("/")[1];
            } else {
                return message.channel.send("Please specify the price: `" + syst.prefix + "item create (price)`\n**Note:** -1 means Unpurchasable & Hidden, -2/Price means Only Hidden")
            }

            if (arg[2] != undefined) {
                iname = arg[2]
            } else {
                return message.channel.send("Please specify the item name (identifier): `" + syst.prefix + "item create (price) (name)`")
            }

            fs.readFile('storesystem/items.txt', 'utf8', (err, store_items) => {
                if (err) {
                    console.error(err);
                    return;
                }

                var sp_items = store_items.split("\n")

                fs.readFile('storesystem/itemdesc.txt', 'utf8', (err, store_itemdesc) => {
                    if (err) {
                        console.error(err);
                        return;
                    }

                    var sp_itemDs = store_itemdesc.split("\n")

                    fs.readFile('storesystem/itemprices.txt', 'utf8', async (err, store_itempric) => {
                        if (err) {
                            console.error(err);
                            return;
                        }

                        var sp_itemPs = store_itempric.split("\n")
                        const msg_filter = (m) => m.author.id === message.author.id;

                        message.channel.send("**Please specify the item's description (NO COMMAS)**")
                        const collected = await message.channel.awaitMessages({ filter: msg_filter, max: 1 });
                        var desc = collected.first().content

                        message.channel.send("**Writing...**")

                        var lengths = []
                        sp_items.forEach(line => {
                            if (line != "") {
                                lengths.push(line.split(',').length - 1)
                            }
                        });

                        var newline = false
                        if (lengths[lengths.length] == 10) { // last line is full
                            newline = true
                        }

                        if (newline == false) {
                            fs.writeFile('storesystem/items.txt', store_items + arg[2] + ",", err => {
                                if (err) {
                                    console.error(err);
                                }

                                fs.writeFile('storesystem/itemprices.txt', store_itempric + price + "/" + actualprice + ",", err => {
                                    if (err) {
                                        console.error(err);
                                    }

                                    fs.writeFile('storesystem/itemdesc.txt', store_itemdesc + desc + ",", err => {
                                        if (err) {
                                            console.error(err);
                                        }

                                        fs.writeFile('storesystem/itemdesc.txt', store_itemdesc + desc + ",", err => {
                                            if (err) {
                                                console.error(err);
                                            }

                                            fs.writeFile('storesystem/data/' + arg[2] + '.txt', "say: This item does not do anything yet.", err => {
                                                if (err) {
                                                    console.error(err);
                                                }

                                                message.channel.send("**Item created!**\nYou can edit it at: " + 'storesystem/data/' + arg[2] + '.txt')
                                            });
                                        });
                                    });
                                });
                            });
                        } else {
                            fs.writeFile('storesystem/items.txt', store_items + "\n" + arg[2] + ",", err => {
                                if (err) {
                                    console.error(err);
                                }

                                fs.writeFile('storesystem/itemprices.txt', store_itempric + "\n" + price + ",", err => {
                                    if (err) {
                                        console.error(err);
                                    }

                                    fs.writeFile('storesystem/itemdesc.txt', store_itemdesc + "\n" + desc + ",", err => {
                                        if (err) {
                                            console.error(err);
                                        }

                                        fs.writeFile('storesystem/itemdesc.txt', store_itemdesc + "\n" + desc + ",", err => {
                                            if (err) {
                                                console.error(err);
                                            }

                                            fs.writeFile('storesystem/data/' + arg[2] + '.txt', "say: This item does not do anything yet.", err => {
                                                if (err) {
                                                    console.error(err);
                                                }

                                                message.channel.send("**Item created!**\nYou can edit it at: " + 'storesystem/data/' + arg[2] + '.txt')
                                            });
                                        });
                                    });
                                });
                            });
                        }
                    });
                });
            });
        } else if (arg[0] == "delete") {
            fs.readFile('storesystem/items.txt', 'utf8', (err, store_items) => {
                if (err) {
                    console.log(err)
                }

                var tofind;
                if (arg[1] != undefined) {
                    tofind = arg[1]
                } else {
                    return message.channel.send("Please specify the item to delete: `" + syst.prefix + "item delete (identifier)`")
                }

                var splitlines = store_items.split("\n")
                var indexed;
                var indexedp;

                for (let i = 0; i < splitlines.length; i++) {
                    if (splitlines[i].includes(tofind)) {
                        indexed = i
                    }
                }

                for (let i = 0; i < splitlines[indexed].split(',').length; i++) {
                    if (splitlines[indexed].split(',')[i].startsWith(tofind)) {
                        indexedp = i
                    }
                }

                var tmp = splitlines[indexed].split(',')
                tmp[indexedp] = ""

                var newitems = tmp.toString()

                fs.readFile('storesystem/itemprices.txt', 'utf8', (err, store_itemprics) => {
                    if (err) {
                        console.log(err)
                    }

                    var splitprics = store_itemprics.split("\n")
                    var tmp3 = splitprics[indexed].split(',')
                    tmp3[indexedp] = ""

                    var newprics = tmp3.toString()

                    fs.readFile('storesystem/itemdesc.txt', 'utf8', (err, store_itemdescs) => {
                        if (err) {
                            console.log(err)
                        }

                        var splitdescs = store_itemdescs.split("\n")
                        var tmp2 = splitdescs[indexed].split(',')
                        tmp2[indexedp] = ""

                        var newdescs = tmp2.toString()

                        // Rewrite blanked //
                        fs.writeFile('storesystem/items.txt', newitems, err => {
                            if (err) {
                                console.error(err);
                            }

                            fs.writeFile('storesystem/itemprices.txt', newprics, err2 => {
                                if (err2) {
                                    console.error(err2);
                                }

                                fs.writeFile('storesystem/itemdesc.txt', newdescs, err3 => {
                                    if (err3) {
                                        console.error(err3);
                                    }

                                    // Finally, delete the purchase datafile //
                                    try {
                                        fs.unlinkSync('storesystem/data/' + tofind + ".txt")
                                        message.channel.send("**Deleted successfully.**")
                                    } catch (err4) {
                                        console.error(err4)
                                    }
                                });
                            });
                        });
                    });
                });
            });
        } else {
            message.channel.send("The only options available are `ri-item create` and `ri-item delete`")
        }
    }

    else if (command == 'rep') {
        if (message.mentions.users.first() != undefined) {

            if (message.mentions.users.first().id == message.author.id) {
                return message.channel.send("You cannot `ri-rep` yourself!")
            }

            try {
                // Rep-ed one or more members
                if (fs.existsSync('reputationsystem/' + message.author.id + '/upvotes.txt')) {
                    fs.readFile('reputationsystem/' + message.author.id + '/upvotes.txt', 'utf8', (err, data) => {
                        if (err) {
                          console.error(err);
                          return;
                        }
                        
                        if (data.includes(message.mentions.users.first().id)) {
                            return message.channel.send("You already did `ri-rep` on that user!")
                        }
        
                        fs.writeFile('reputationsystem/' + message.author.id + '/upvotes.txt', data + message.mentions.users.first().id + ",", (err) => {
                            if (err) {
                                console.log(err);
                                return
                            }
    
                            // 2/2 Award reputation to the mentioned
                            if (fs.existsSync('reputationsystem/' + message.mentions.users.first().id + '/data.txt')) {

                                // Read and write
                                fs.readFile('reputationsystem/' + message.mentions.users.first().id + '/data.txt', 'utf8', (err, dataU) => {
                                    if (err) {
                                        console.error(err);
                                        return;
                                    }

                                    var rep = (Number(dataU.split(",")[0]) + 3).toString()
                                    var poi = dataU.split(",")[1]
                                    var fixedrecomposed = rep + "," + poi

                                    fs.writeFile('reputationsystem/' + message.mentions.users.first().id + '/data.txt', fixedrecomposed, (err) => {
                                        if (err) {
                                            console.log(err);
                                            return
                                        }

                                        message.channel.send("Succesfully `ri-rep`ed <@" + message.mentions.users.first().id + ">")
                                    });
                                });

                            } else {
                                // Write
                                fs.writeFile('reputationsystem/' + message.author.id + '/data.txt', "3,0", (err) => {
                                    if (err) {
                                        console.log(err);
                                        return
                                    }

                                    message.channel.send("Succesfully `ri-rep`ed <@" + message.mentions.users.first().id + ">")
                                });
                            }
                        });
                    });
                } else { // Never rep-ed anyone, write directly
                    fs.writeFile('reputationsystem/' + message.author.id + '/upvotes.txt', message.mentions.users.first().id + ",", (err) => {
                        if (err) {
                            console.log(err);
                            return
                        }

                        if (!fs.existsSync('reputationsystem/' + message.mentions.users.first().id)){
                            fs.mkdirSync('reputationsystem/' + message.mentions.users.first().id);
                        }

                        if (!fs.existsSync('reputationsystem/' + message.mentions.users.first().id + '/data.txt')) {
                            fs.writeFile('reputationsystem/' + message.mentions.users.first().id + '/data.txt', "3,0", (err) => {
                                if (err) {
                                    console.log(err);
                                    return
                                }
    
                                message.channel.send("Succesfully `ri-rep`ed <@" + message.mentions.users.first().id + ">")
                            });
                        } else {
                            fs.readFile('reputationsystem/' + message.mentions.users.first().id + '/data.txt', 'utf8', (err, dataU2) => {
                                if (err) {
                                    console.error(err);
                                    return;
                                }

                                var rep = (Number(dataU2.split(",")[0]) + 3).toString()
                                var poi = dataU2.split(",")[1]
                                var fixedrecomposed = rep + "," + poi

                                fs.writeFile('reputationsystem/' + message.mentions.users.first().id + '/data.txt', fixedrecomposed, (err) => {
                                    if (err) {
                                        console.log(err);
                                        return
                                    }
        
                                    message.channel.send("Succesfully `ri-rep`ed <@" + message.mentions.users.first().id + ">")
                                });
                            });
                        }
                    });
                }
            } catch(err) {
                console.error(err)
            }

        } else if (message.mentions.users.first() == undefined) {
            return message.channel.send("Invalid syntax. Do `ri-rep (mention)`")
        }

        
    }
});

process.on('uncaughtException', (error, source) => { console.log('Error has been successfully caught!\n  Caught: \u001b[' + 31 + 'm' + error + '\u001b[0m'); });