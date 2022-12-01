const ms = require('ms'); const moment = require('moment'); // Wait libs
const fs = require("fs"); // File management 

const syst = require("./system.cjs"); //Token and some const variables
const { Client, GatewayIntentBits, IntentsBitField, Partials, EmbedBuilder } = require('discord.js');

const myIntents = new IntentsBitField();
myIntents.add(GatewayIntentBits.DirectMessages, GatewayIntentBits.Guilds, GatewayIntentBits.GuildVoiceStates, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildBans, GatewayIntentBits.MessageContent, IntentsBitField.Flags.GuildMembers, GatewayIntentBits.GuildMessageReactions);

const client = new Client({
    intents: myIntents,
    partials: [Partials.Message, Partials.Channel, Partials.Reaction],
});

function start() {
    console.log('Loading...');
    syst.showVersion()

    // Get current time
    var pdate = new Date(); var phour = pdate.getHours(); var pchosen;
    if (phour == 6 || phour == 7 || phour == 8 || phour == 9 || phour == 10 || phour == 11) { pchosen = 'online'; }
    if (phour == 12 || phour == 13 || phour == 14 || phour == 15 || phour == 16 || phour == 17) { pchosen = 'dnd'; }
    if (phour == 18 || phour == 19 || phour == 20 || phour == 21 || phour == 22 || phour == 23 || phour == 24 || phour == 0 || phour == 1 || phour == 2 || phour == 3 || phour == 4 || phour == 5) { pchosen = 'idle'; }

    client.once('ready', () => {
        console.log('\u001b[' + 32 + 'm' + 'Revade' + '\u001b[0m' + ' is ready!');
    
        client.user.setPresence({
            activities: [{ name: syst.StatusText, type: syst.StatusType }],
            status: pchosen,
        });
    
        //     distube
    
        //         .on('addSong', (queue, song) => {
        //             const addSongEmbed = new EmbedBuilder()
        //                 .setColor('#facc95')
        //                 .setTitle('Song added on the list✅')
        // .setAuthor({ name: 'Revade', iconURL: 'https://raw.githubusercontent.com/Akridiki/Revade/main/Logo.png' })
        //                 .setDescription('You successfully added: **' + song.name + '** to the queue!')
    
        //             queue.textChannel?.send(
    
        //                 { embeds: [addSongEmbed] }
        //                 //`Added ${song.name} - \`${song.formattedDuration}\` to the queue by ${song.user}`,
        //             )
        //         }
        //         )
        //         .on('addList', (queue, playlist) => {
        //             const addSongEmbed = new EmbedBuilder()
        //                 .setColor('#facc95')
        //                 .setTitle('Playlist added to the list! ✅')
        // .setAuthor({ name: 'Revade', iconURL: 'https://raw.githubusercontent.com/Akridiki/Revade/main/Logo.png' })
        //                 .setDescription('You successfully added the playlist: ' + playlist.name + ' to the queue ' + playlist.user + '!')
    
        //             queue.textChannel?.send(
    
        //                 { embeds: [addSongEmbed] }
        //                 //`Added ${song.name} - \`${song.formattedDuration}\` to the queue by ${song.user}`,
        //             )
        //         })
    
        //         .on('error', (textChannel, e) => {
        //             console.error(e)
        //             textChannel.send({ embeds: [embeds.errorVoiceEmbed] })
        //         })
        //         .on('finishSong', queue =>
        //             queue.textChannel?.send({ embeds: [embeds.finishVoiceEmbed] }),
        //         )
        //         .on('disconnect', queue =>
        //             queue.textChannel?.send({ embeds: [embeds.stopAudioEmbed] }),
        //         )
        //         .on('empty', queue =>
        //             queue.textChannel?.send({ embeds: [embeds.errorEmptyVoiceEmbed] }),
        //         )
        // });
    
        //----------------------------

        client.on('messageReactionAdd', async (reaction, user) => {
            // When a reaction is received, check if the structure is partial
            if (reaction.partial) {
                // If the message this reaction belongs to was removed, the fetching might result in an API error which should be handled
                try {
                    await reaction.fetch();
                } catch (error) {
                    console.error('Something went wrong when fetching the message:', error);
                    // Return as `reaction.message.author` may be undefined/null
                    return;
                }
            }
        
            // Now the message has been cached and is fully available
            if (reaction.message.channel.name.includes("📘")) {
                if (reaction.emoji.name == '✅') {
                    if (reaction.message.channel.topic.includes(user.id) && !reaction.message.author.bot) {
                        // You are the ticket creator
                        // Close the ticket and do nothing else
                        user.send("You just closed a ticket that you created.\nSince you were the one who closed it, you will be awarded no reputation.\nHowever, note that you can contact the team if you accidentally reacted to the wrong message.")
                        reaction.message.channel.delete('user closed their own ticket');
                    } else {
                        // You're not the ticket creator
                        // Check if you're a team member
                        if (await (await client.guilds.cache.get("529936878128988160").members.fetch(user.id)).roles.cache.some(role => role.id === '1005421747585175612')) {
                            // You are indeed a team member
                            // Award the lovely expected reputation
                            reaction.message.author.send("One of your tickets was closed by a team member! :tada:\nYou will be awarded 5 rep and 10 rep points for your help.");
                            
                            // Award rep stuff //


                        // Make sure user reputation directory exists
                        if (!fs.existsSync('reputationsystem/' + reaction.message.author.id)) {
                            fs.mkdirSync('reputationsystem/' + reaction.message.author.id);
                        }
        
                        // Award Reputation //
                        if (fs.existsSync('reputationsystem/' + reaction.message.author.id + '/data.txt')) {
                            // Existing user - read reputation first
        
                            fs.readFile('reputationsystem/' + reaction.message.author.id + '/data.txt', 'utf8', (err, data) => {
                                if (err) {
                                    console.error(err);
                                    return;
                                }
        
                                // Succeeded reading //
                                var splitdata = data.split(",");
                                var rep = Number(splitdata[0]);
                                var poi = Number(splitdata[1]);
                                fs.writeFile('reputationsystem/' + reaction.message.author.id + '/data.txt', (rep + 5).toString() + "," + (poi + 10).toString(), err => {
                                    if (err) {
                                        console.error(err);
                                    }
                                });
                            });
                        } else {
                            // New reputation user - award 5 accordingly
                            fs.writeFile('reputationsystem/' + reaction.message.author.id + '/data.txt', "5,10", err => {
                                if (err) {
                                    console.error(err);
                                }
                            });
                        }



                            reaction.message.channel.delete('team member closer user ticket');
                        }
                    }
                }
            }

            if (reaction.message.channel.name.includes("📋")) {
                if (reaction.emoji.name == '✅') {
                    if (reaction.message.channel.topic.includes(user.id) && reaction.message.author.id != user.id && !reaction.message.author.bot) {
        
                        if (!reaction.message.author.bot) {
                            reaction.message.author.send("Your reply was marked as answer by <@" + user + ">\nTicket: **" + reaction.message.channel.name + "**\n\nYou will be awarded 10 reputation points for helping our community. :D")
                        }
        
                        user.send("You marked a reply from <@" + reaction.message.author + "> as answer!\n\nYou will be awarded 5 reputation points for asking for help! I hope your issue got resolved!")
        
                        // Make sure user reputation directories exist
                        if (!fs.existsSync('reputationsystem/' + user.id)) {
                            fs.mkdirSync('reputationsystem/' + user.id);
                        }
        
                        if (!fs.existsSync('reputationsystem/' + reaction.message.author.id)) {
                            fs.mkdirSync('reputationsystem/' + reaction.message.author.id);
                        }
        
                        // Award Reputation 1/2 //
                        if (fs.existsSync('reputationsystem/' + user.id + '/data.txt')) {
                            // Existing user - read reputation first
        
                            fs.readFile('reputationsystem/' + user.id + '/data.txt', 'utf8', (err, data) => {
                                if (err) {
                                    console.error(err);
                                    return;
                                }
        
                                // Succeeded reading //
                                var splitdata = data.split(",");
                                var rep = Number(splitdata[0]);
                                var poi = Number(splitdata[1]);
                                fs.writeFile('reputationsystem/' + user.id + '/data.txt', (rep + 5).toString() + "," + (poi + 5).toString(), err => {
                                    if (err) {
                                        console.error(err);
                                    }
                                });
                            });
                        } else {
                            // New reputation user - award 5 accordingly
                            fs.writeFile('reputationsystem/' + user.id + '/data.txt', "5,5", err => {
                                if (err) {
                                    console.error(err);
                                }
                            });
                        }
        
                        // Award Reputation 2/2 //
                        if (fs.existsSync('reputationsystem/' + reaction.message.author.id + '/data.txt')) {
                            // Existing user - read reputation first
        
                            fs.readFile('reputationsystem/' + reaction.message.author.id + '/data.txt', 'utf8', (err, data) => {
                                if (err) {
                                    console.error(err);
                                    return;
                                }
        
                                // Succeeded reading //
                                var splitdata = data.split(",");
                                var rep = Number(splitdata[0]);
                                var poi = Number(splitdata[1]);
        
                                fs.writeFile('reputationsystem/' + reaction.message.author.id + '/data.txt', (rep + 10).toString() + "," + (poi + 10).toString(), err => {
                                    if (err) {
                                        console.error(err);
                                    }
                                });
                            });
                        } else {
                            // New reputation user - award 5 accordingly
                            fs.writeFile('reputationsystem/' + reaction.message.author.id + '/data.txt', "10,10", err => {
                                if (err) {
                                    console.error(err);
                                }
                            });
                        }
        
                        // Continue //
                        reaction.message.channel.delete('ticket was answered');
                    }
                }
            }
        });
    });

    client.on('interactionCreate', async interaction => {
        if (!interaction.isButton()) return;
        var whoint = interaction.member;

        //Addrole
        if (interaction.customId === 'youtube-role') {

            await interaction.deferUpdate();
            let givenRolea = interaction.guild.roles.cache.find(role => role.name === "YouTube");

            whoint.roles.add(givenRolea).catch((error) => {
                message.reply({ embeds: [failedEmbed] });
            });

            await interaction.editReply({ content: 'You chose the **YouTube** role.', components: [], embeds: [] });
        } else if (interaction.customId === 'art-role') {

            await interaction.deferUpdate();
            let givenRoleb = interaction.guild.roles.cache.find(role => role.name === "Art");

            whoint.roles.add(givenRoleb).catch((error) => {
                message.reply({ embeds: [failedEmbed] });
            });

            await interaction.editReply({ content: 'You chose the **Art** role.', components: [], embeds: [] });

        } else if (interaction.customId === 'twitter-role') {

            await interaction.deferUpdate();
            let givenRolec = interaction.guild.roles.cache.find(role => role.name === "Twitter");

            whoint.roles.add(givenRolec).catch((error) => {
                message.reply({ embeds: [failedEmbed] });
            });

            await interaction.editReply({ content: 'You chose the **Twitter** role.', components: [], embeds: [] });

        } else if (interaction.customId === 'minecraft-role') {

            await interaction.deferUpdate();
            let givenRoled = interaction.guild.roles.cache.find(role => role.name === "Minecraft");

            whoint.roles.add(givenRoled).catch((error) => {
                message.reply({ embeds: [failedEmbed] });
            });

            await interaction.editReply({ content: 'You chose the **Minecraft** role.', components: [], embeds: [] });

        } else if (interaction.customId === 'twitch-role') {

            await interaction.deferUpdate();
            let givenRolee = interaction.guild.roles.cache.find(role => role.name === "Twitch");

            whoint.roles.add(givenRolee).catch((error) => {
                message.reply({ embeds: [failedEmbed] });
            });

            await interaction.editReply({ content: 'You chose the **Twitch** role.', components: [], embeds: [] });
        }

        //Delrole
        if (interaction.customId === 'delyoutube-role') {

            await interaction.deferUpdate();
            let givenRolea = interaction.guild.roles.cache.find(role => role.name === "YouTube");

            whoint.roles.remove(givenRolea).catch((error) => {
                message.reply({ embeds: [failedEmbed] });
            });

            await interaction.editReply({ content: 'You removed your **YouTube** role.', components: [], embeds: [] });

        } else if (interaction.customId === 'delart-role') {

            await interaction.deferUpdate();
            let givenRoleb = interaction.guild.roles.cache.find(role => role.name === "Art");

            whoint.roles.remove(givenRoleb).catch((error) => {
                message.reply({ embeds: [failedEmbed] });
            });

            await interaction.editReply({ content: 'You removed your **Art** role.', components: [], embeds: [] });

        } else if (interaction.customId === 'deltwitter-role') {

            await interaction.deferUpdate();
            let givenRolec = interaction.guild.roles.cache.find(role => role.name === "Twitter");

            whoint.roles.remove(givenRolec).catch((error) => {
                message.reply({ embeds: [failedEmbed] });
            });

            await interaction.editReply({ content: 'You removed your **Twitter** role.', components: [], embeds: [] });

        } else if (interaction.customId === 'delminecraft-role') {

            await interaction.deferUpdate();
            let givenRoled = interaction.guild.roles.cache.find(role => role.name === "Minecraft");

            whoint.roles.remove(givenRoled).catch((error) => {
                message.reply({ embeds: [failedEmbed] });
            });

            await interaction.editReply({ content: 'You removed your **Minecraft** role.', components: [], embeds: [] });

        } else if (interaction.customId === 'deltwitch-role') {

            await interaction.deferUpdate();
            let givenRolee = interaction.guild.roles.cache.find(role => role.name === "Twitch");

            whoint.roles.remove(givenRolee).catch((error) => {
                message.reply({ embeds: [failedEmbed] });
            });

            await interaction.editReply({ content: 'You removed your **Twitch** role.', components: [], embeds: [] });
        }

        // Report button of ri-report/embed
        if (interaction.customId === 'report/report') {
            // Begin the wizard
            await whoint.send("Welcome to the **Report Wizard!**\nIf you\'re seeing this, that means you clicked the Report button on the embed.")
            var theSent = await whoint.send("**(1/3) Please type the report cause next to this message:**")

            const msg_filter = (m) => m.author.id === whoint.id;
            const collected = await theSent.channel.awaitMessages({ filter: msg_filter, max: 1 });
            var cause = collected.first().content
            var theSent = await whoint.send("**Who is the person in question?**")
            const collected2 = await theSent.channel.awaitMessages({ filter: msg_filter, max: 1 });
            var usersinquest = collected2.first().content
            var theSent = await whoint.send("**Do you have any extra information?**")
            const collected3 = await theSent.channel.awaitMessages({ filter: msg_filter, max: 1 });
            var extra = collected3.first().content

            await whoint.send("Okay! Please hold while we send this to the Moderation Team...")

            var moderation = client.channels.cache.get("689576966377963520");
            moderation.send("A Moderation Report was sent by <@" + whoint.user.id + ">\n\n**[Cause]**\n" + cause + "\n\n**[Users in Question]**\n" + usersinquest + "\n\n**[Extra]**\n" + extra)

            await whoint.send("Sent! Thank you for helping our server stay santized! Your report is being reviewed. We will not update you if we take any action though.")
        }

        // Help Ticketing Embed
        if (interaction.customId === 'help/maketicket') {
            // Begin the wizard
            await whoint.send("Welcome to the **Help Ticketing Wizard!**\nIf you\'re seeing this, that means you clicked the **Make Ticket** button on the embed.")
            var theSent = await whoint.send("**Please type the title of the ticket (a very brief description of your issue):**")
            const msg_filter = (m) => m.author.id === whoint.id;

            const collected = await theSent.channel.awaitMessages({ filter: msg_filter, max: 1 });
            var cause = collected.first().content

            var theSent = await whoint.send("**Now, type the number of the category that fits you best:**\n1. General Help\n2. ROBLOX\n3. Minecraft\n4. 2D Art\n5. 3D Art")
            const collected2 = await theSent.channel.awaitMessages({ filter: msg_filter, max: 1 });
            var categorything;
            var chosencateg;

            if (collected2.first().content.startsWith("1")) {
                categorything = "General Help"
                chosencateg = "1002238462562406450"
            } else if (collected2.first().content.startsWith("2")) {
                categorything = "ROBLOX Help"
                chosencateg = "1002235544056639580"
            } else if (collected2.first().content.startsWith("3")) {
                categorything = "Minecraft Help"
                chosencateg = "1002235672624648273"
            } else if (collected2.first().content.startsWith("4")) {
                categorything = "2D Art Help"
                chosencateg = "1002235784243454062"
            } else if (collected2.first().content.startsWith("5")) {
                categorything = "3D Art Help"
                chosencateg = "1002235784243454062"
            }

            client.guilds.cache.get("529936878128988160").channels.create({ name: "📋" + cause, reason: 'Ticketing System' }).then(async channel => {
                await channel.setParent("1007679117925306452", { lockPermissions: false }).catch(console.error);

                await channel.permissionOverwrites.create(whoint, { ViewChannel: true });
                await channel.permissionOverwrites.create(client.guilds.cache.get("529936878128988160").roles.cache.find(r => r.id === "889932834905661440"), { ViewChannel: false });
                await channel.permissionOverwrites.create(client.guilds.cache.get("529936878128988160").roles.cache.find(r => r.id === chosencateg), { ViewChannel: true });
                await channel.permissionOverwrites.create(client.guilds.cache.get("529936878128988160").roles.cache.find(r => r.id === "942442316063440916"), { ViewChannel: true });
                channel.setTopic('Identifier: ' + whoint.id + ' | Remember to react to the answer with a ✅').catch(console.error);

                var msg = await channel.send('Feel free to type the description of your post here! <@' + whoint.user.id + '>\n**Ticket category:** ' + categorything)
                msg.pin()

                await whoint.send("Please go to <#" + channel.id + "> to continue the wizard.")
            })
        }

        if (interaction.customId === 'help/become') {
            // Begin the wizard
            await whoint.send("Welcome to the **Helper Wizard**\nIf you\'re seeing this, that means you clicked the **Become Helper** button on the embed.")
            const msg_filter = (m) => m.author.id === whoint.id;

            var theSent = await whoint.send("**Type the number of the category that fits your help best:**\n1. General Help\n2. ROBLOX\n3. Minecraft\n4. 2D/3D Art")
            const collected2 = await theSent.channel.awaitMessages({ filter: msg_filter, max: 1 });
            var categorything;

            if (collected2.first().content.startsWith("1")) {
                categorything = "1002238462562406450"
            } else if (collected2.first().content.startsWith("2")) {
                categorything = "1002235544056639580"
            } else if (collected2.first().content.startsWith("3")) {
                categorything = "1002235672624648273"
            } else if (collected2.first().content.startsWith("4")) {
                categorything = "1002235784243454062"
            }

            try {
                await whoint.roles.add(categorything);
                await whoint.send("**Thank you for becoming a helper!**\nHere\'s what you can do now:\n\n1. See tickets on the help category you chose.\n2. Answer tickets to gain reputation and points.")
            } catch (error) {
                console.log(error)
            }
        }

        if (interaction.customId === 'help/leave') {
            // Begin the wizard
            await whoint.send("Welcome to the **Leave Wizard**\nIf you\'re seeing this, that means you wanted to cease helping a category.")
            const msg_filter = (m) => m.author.id === whoint.id;

            var theSent = await whoint.send("**Type the number of the category that you don\'t want to help on anymore:**\n1. General Help\n2. ROBLOX\n3. Minecraft\n4. 2D/3D Art")
            const collected2 = await theSent.channel.awaitMessages({ filter: msg_filter, max: 1 });
            var categorything;

            if (collected2.first().content.startsWith("1")) {
                categorything = "1002238462562406450"
            } else if (collected2.first().content.startsWith("2")) {
                categorything = "1002235544056639580"
            } else if (collected2.first().content.startsWith("3")) {
                categorything = "1002235672624648273"
            } else if (collected2.first().content.startsWith("4")) {
                categorything = "1002235784243454062"
            }

            try {
                await whoint.roles.remove(categorything);
                await whoint.send("**Thank you for your previous help!**\nEnjoy your time at Akripent Plaza! :D")
            } catch (error) {
                console.log(error)
            }
        }

        if (interaction.customId.startsWith('participate')) {
            var where = interaction.customId.split('participate/')[1]

            fs.readFile('events/' + where + '.txt', 'utf8', (err, data) => {
                if (err) {
                    console.error(err);
                    return;
                }

                // Success Reading //
                if (data.includes(whoint.id)) {
                    whoint.send("You are already participating on the giveaway **" + where + "**")
                } else {
                    fs.appendFileSync('events/' + where + '.txt', whoint.id + ",");
                    whoint.send("You are now participating on the giveaway **" + where + "**")
                }
            });
        }

        if (interaction.commandName == 'roles') {
            const row = new ActionRowBuilder()
                .addComponents(
                    new SelectMenuBuilder()
                        .setCustomId('roles')
                        .setPlaceholder('Select a role or multiple')
                        .addOptions([
                            {
                                label: 'Roblox',
                                description: 'Take this role by clicking me ',
                                value: 'first_option',
                            },
                            {
                                label: 'Twitter',
                                description: 'Take this role by clicking me ',
                                value: 'second_option',
                            },
                            {
                                label: 'Twitch',
                                description: 'Take this role by clicking me ',
                                value: 'third_option',
                            },
                            {
                                label: 'YouTube',
                                description: 'Take this role by clicking me ',
                                value: 'fourth_option',
                            },
                            {
                                label: 'Announcements',
                                description: 'Take this role by clicking me ',
                                value: 'fifth_option',
                            },
                            {
                                label: 'Art',
                                description: 'Take this role by clicking me ',
                                value: 'sixth_option',
                            },
                            {
                                label: 'Minecraft',
                                description: 'Take this role by clicking me ',
                                value: 'seventh_option',
                            },
                        ]),
                );

            await interaction.reply({ content: "Choose roles", ephemeral: true, components: [row] })//edit the content here
            //this sends it as empheral so that the chat does not get choked with these 
        }

        // 
        if (interaction.customId === 'suggestions/open') {
            // Begin the wizard
            await whoint.send("Welcome to the **Suggestion Wizard!**")
            var theSent = await whoint.send("**Please type the title of the ticket (a very brief description of your suggestions):**")
            const msg_filter = (m) => m.author.id === whoint.id;

            const collected = await theSent.channel.awaitMessages({ filter: msg_filter, max: 1 });
            var cause = collected.first().content

            var theSent = await whoint.send("**Type the number of the category that fits it the best:**\n1. Server Ticket\n2. Content Ticket")
            const collected2 = await theSent.channel.awaitMessages({ filter: msg_filter, max: 1 });
            var categorything;

            if (collected2.first().content.startsWith("1")) {
                categorything = "Server Suggestion"
            } else if (collected2.first().content.startsWith("2")) {
                categorything = "Content Suggestion"
            }

            client.guilds.cache.get("529936878128988160").channels.create({ name: "📘" + cause, reason: 'Suggestion Ticket System' }).then(async channel => {
                await channel.setParent("1011696706691268703", { lockPermissions: false }).catch(console.error);

                channel.setTopic('Identifier: ' + whoint.id + ' | Use ✅ to close ticket (either as ticket creator or Team member)').catch(console.error);

                var msg = await channel.send('Feel free to type the description of your suggestion here! <@' + whoint.user.id + '>\n**Ticket category:** ' + categorything)
                msg.pin()

                await whoint.send("Please go to <#" + channel.id + "> to continue the wizard.")
            })
        }

        //if the interaction is select menu then reply
        if (interaction.isSelectMenu()) {

            let choice = interaction.values[0]
            const member = interaction.member
            if (choice == 'first_option') {
                if (member.roles.cache.some(role => role.id == '889097422364606475')) {
                    interaction.reply({ content: "Modified successfully", ephemeral: true })
                    member.roles.remove('889097422364606475')
                }
                else {
                    member.roles.add('889097422364606475')
                    await interaction.reply({ content: "Modified successfully", ephemeral: true })
                }
            }

            else if (choice == 'second_option') {
                if (member.roles.cache.some(role => role.id == '889097512101756958')) {
                    interaction.reply({ content: "Modified successfully", ephemeral: true })
                    member.roles.remove('889097512101756958')
                }
                else {
                    member.roles.add('889097512101756958')
                    await interaction.reply({ content: "Modified successfully", ephemeral: true })
                }
            }


            else if (choice == 'third_option') {
                if (member.roles.cache.some(role => role.id == '905562817913040916')) {
                    interaction.reply({ content: "Modified successfully", ephemeral: true })
                    member.roles.remove('905562817913040916')
                }
                else {
                    member.roles.add('905562817913040916')
                    await interaction.reply({ content: "Modified successfully", ephemeral: true })
                }
            }



            else if (choice == 'fourth_option') {
                if (member.roles.cache.some(role => role.id == '889097545270317076')) {
                    interaction.reply({ content: "Modified successfully!", ephemeral: true })
                    member.roles.remove('889097545270317076')
                }
                else {
                    member.roles.add('889097545270317076')
                    await interaction.reply({ content: "Modified successfully", ephemeral: true })
                }
            }


            else if (choice == 'fifth_option') {
                if (member.roles.cache.some(role => role.id == '889097809356267570')) {
                    interaction.reply({ content: "Modified successfully", ephemeral: true })
                    member.roles.remove('889097809356267570')
                }
                else {
                    member.roles.add('889097809356267570')
                    await interaction.reply({ content: "Modified successfully", ephemeral: true })
                }
            }


            else if (choice == 'sixth_option') {
                if (member.roles.cache.some(role => role.id == '889098125426425886')) {
                    interaction.reply({ content: "Modified successfully", ephemeral: true })
                    member.roles.remove('889098125426425886')
                }
                else {
                    member.roles.add('889098125426425886')
                    await interaction.reply({ content: "Modified successfully", ephemeral: true })
                }
            }


            else if (choice == 'seventh_option') {
                if (member.roles.cache.some(role => role.id == '889099655458193479')) {
                    interaction.reply({ content: "Modified successfully", ephemeral: true })
                    member.roles.remove('889099655458193479')
                }
                else {
                    member.roles.add('889099655458193479')
                    await interaction.reply({ content: "Modified successfully", ephemeral: true })
                }
            }
        }
    });

//----------------------------

    initEventCheck(); // Initializes Revade Events
    initJoinCheck(); // Initializes the Join Detector
    initBoostCheck(); // Initializes the Boost Detector
    client.login(syst.token); // Login
}

function initEventCheck() {
    setInterval(() => {
        var date = new Date();

        var hour = date.getHours();
        var minutes = date.getMinutes();
        var day = ("0" + date.getDate()).slice(-2);
        var month = ("0" + (date.getMonth() + 1)).slice(-2);
        var year = date.getFullYear();
        //console.log(hour + ":" + minutes + " " + day + "/" + month + "/" + year)

        fs.readdir("./events/", async (err, files) => {
            files.forEach(async filename => {
                fs.readFile('events/' + filename, 'utf8', async (err, data) => {
                    if (err) {
                        console.error(err);
                        return;
                    }

                    if (filename.includes("general") == false) {
                        // Success Reading //
                    var tmp = data.split("\n")
                    var filehour = tmp[1].split(":")[0]
                    var fileminutes = tmp[1].split(":")[1]
                    var fileday = tmp[0].split("/")[0]
                    var filemonth = tmp[0].split("/")[1]
                    var fileyear = tmp[0].split("/")[2]
                    var thing = tmp[3] // title
                    var item = tmp[2] // prize
                    var partusers = tmp[4] // user ids participating

                    // Do stuff //
                    if (day >= fileday) {
                        if (month >= filemonth) {
                            if (year >= fileyear) {
                                // The giveaway has passed (in which case it will fire past FILEHOUR:FILEMINUTES)
                                // or simply the date is RIGHT NOW.

                                if (hour >= filehour) {
                                    if (minutes >= fileminutes) {
                                        // The giveaway triggers now
                                        var splitusers = partusers.split(",")
                                        var liste = [];

                                        splitusers.forEach(user => {
                                            if (user != "") {
                                                liste.push(user);
                                            }
                                        });

                                        const shuffled = [...liste].sort(() => 0.5 - Math.random());
                                        var result = shuffled.slice(0, 3);

                                        //member.user.tag
                                        var first;
                                        var second;
                                        var third;

                                        if (result[0] == undefined) {
                                            first = "No one"
                                        } else {
                                            first = await (await client.guilds.cache.get("529936878128988160").members.fetch(result[0])).user.tag
                                        }

                                        if (result[1] == undefined) {
                                            second = "No one"
                                        } else {
                                            second = await (await client.guilds.cache.get("529936878128988160").members.fetch(result[1])).user.tag
                                        }

                                        if (result[2] == undefined) {
                                            third = "No one"
                                        } else {
                                            third = await (await client.guilds.cache.get("529936878128988160").members.fetch(result[2])).user.tag
                                        }

                                        client.channels.fetch(syst.giveawayChannelID).then(channel => {
                                            var endGiveawayEmbed = new EmbedBuilder()
                                                .setColor('#5555ff')
                                                .setTitle(`The giveaway for **${thing}** has ended!`)
                                                .setDescription("Here is the **Top 3:**")
                                                .addFields(
                                                    { name: first, value: 'First Place' },
                                                    { name: second, value: 'Second Place' },
                                                    { name: third, value: 'Third Place' }
                                                )

                                            channel.send({ embeds: [endGiveawayEmbed] })

                                            // Give prizes //

                                            splitusers.forEach(user => {
                                                if (user != "") {
                                                    if (user == result[0]) {
                                                        // Prize + 20 points (5 rep)

                                                        // Make sure user reputation directories exist
                                                        if (!fs.existsSync('reputationsystem/' + user)) {
                                                            fs.mkdirSync('reputationsystem/' + user);
                                                        }

                                                        if (fs.existsSync('reputationsystem/' + user + '/data.txt')) {
                                                            // Existing user - read reputation first

                                                            fs.readFile('reputationsystem/' + user + '/data.txt', 'utf8', (err, data) => {
                                                                if (err) {
                                                                    console.error(err);
                                                                    return;
                                                                }

                                                                // Succeeded reading //
                                                                var splitdata = data.split(",");
                                                                var rep = Number(splitdata[0]);
                                                                var poi = Number(splitdata[1]);
                                                                fs.writeFile('reputationsystem/' + user + '/data.txt', (rep + 5).toString() + "," + (poi + 20).toString(), err => {
                                                                    if (err) {
                                                                        console.error(err);
                                                                    }
                                                                });
                                                            });
                                                        } else {
                                                            // New reputation user - award 5 accordingly
                                                            fs.writeFile('reputationsystem/' + user + '/data.txt', "5,20", err => {
                                                                if (err) {
                                                                    console.error(err);
                                                                }
                                                            });
                                                        }

                                                        // Award Prize to Inventory //
                                                        try {
                                                            if (fs.existsSync('reputationsystem/' + user + '/inventory.txt')) {
                                                                fs.appendFile('message.txt', item + ",", function (err) {
                                                                    if (err) console.error(err);
                                                                });
                                                            } else {
                                                                fs.writeFile('reputationsystem/' + user + '/inventory.txt', item + ",", err => {
                                                                    if (err) {
                                                                        console.error(err);
                                                                    }
                                                                });
                                                            }
                                                        } catch(err) {
                                                            console.error(err)
                                                        }
                                                    }

                                                    else if (user == result[1] || user == result[2]) {
                                                        // 10 rep points (5 rep)

                                                        // Make sure user reputation directories exist
                                                        if (!fs.existsSync('reputationsystem/' + user)) {
                                                            fs.mkdirSync('reputationsystem/' + user);
                                                        }

                                                        if (fs.existsSync('reputationsystem/' + user + '/data.txt')) {
                                                            // Existing user - read reputation first

                                                            fs.readFile('reputationsystem/' + user + '/data.txt', 'utf8', (err, data) => {
                                                                if (err) {
                                                                    console.error(err);
                                                                    return;
                                                                }

                                                                // Succeeded reading //
                                                                var splitdata = data.split(",");
                                                                var rep = Number(splitdata[0]);
                                                                var poi = Number(splitdata[1]);
                                                                fs.writeFile('reputationsystem/' + user + '/data.txt', (rep + 5).toString() + "," + (poi + 10).toString(), err => {
                                                                    if (err) {
                                                                        console.error(err);
                                                                    }
                                                                });
                                                            });
                                                        } else {
                                                            // New reputation user - award 5 accordingly
                                                            fs.writeFile('reputationsystem/' + user + '/data.txt', "5,10", err => {
                                                                if (err) {
                                                                    console.error(err);
                                                                }
                                                            });
                                                        }
                                                    }

                                                    else {
                                                        // 5 rep points (5 rep)

                                                        // Make sure user reputation directories exist
                                                        if (!fs.existsSync('reputationsystem/' + user)) {
                                                            fs.mkdirSync('reputationsystem/' + user);
                                                        }

                                                        if (fs.existsSync('reputationsystem/' + user + '/data.txt')) {
                                                            // Existing user - read reputation first

                                                            fs.readFile('reputationsystem/' + user + '/data.txt', 'utf8', (err, data) => {
                                                                if (err) {
                                                                    console.error(err);
                                                                    return;
                                                                }

                                                                // Succeeded reading //
                                                                var splitdata = data.split(",");
                                                                var rep = Number(splitdata[0]);
                                                                var poi = Number(splitdata[1]);
                                                                fs.writeFile('reputationsystem/' + user + '/data.txt', (rep + 5).toString() + "," + (poi + 5).toString(), err => {
                                                                    if (err) {
                                                                        console.error(err);
                                                                    }
                                                                });
                                                            });
                                                        } else {
                                                            // New reputation user - award 5 accordingly
                                                            fs.writeFile('reputationsystem/' + user + '/data.txt', "5,5", err => {
                                                                if (err) {
                                                                    console.error(err);
                                                                }
                                                            });
                                                        }
                                                    }
                                                }
                                            });

                                            // Delete Giveaway Internal File //
                                            try {
                                                fs.unlinkSync('events/' + filename)
                                            } catch (err) {
                                                console.error(err)
                                            }
                                        }).catch(err => {
                                            console.log(err);
                                        })
                                    }
                                }
                            }
                        }
                    }
                    } else { // its not a giveaway
                        var tmp = data.split("\n")
                        var fileday = tmp[0].split("/")[0]
                        var filemonth = tmp[0].split("/")[1]
                        var fileyear = tmp[0].split("/")[2]
                        var extra = tmp[3] // any extra info like arguments
                        var action = tmp[2] // stop a subscription? remove a role?
                        var partusers = tmp[1] // user ID responsible for the event

                        // Do stuff //
                        if (day >= fileday) {
                            if (month >= filemonth) {
                                if (year >= fileyear) {
                                    // The event has passed
                                    // or simply the date is RIGHT NOW.

                                    if (action == "stop_perk") {
                                        var user = await (await client.guilds.cache.get("529936878128988160").members.fetch(partusers))
                                        await user.user.send("Hello,\nYou subscription for \n\n**Perks - `Level " + extra + "`**\n\n has ended.")

                                        var remroleid = ""
                                        if (extra == "1") {
                                            remroleid = "1008790915323809802"
                                        }

                                        if (extra == "2") {
                                            remroleid = "1008794156111507527"
                                        }

                                        if (extra == "3") {
                                            remroleid = "1008794276097966091"
                                        }

                                        if (extra == "4") {
                                            remroleid = "1008794366334226574"
                                        }

                                        if (extra == "5") {
                                            remroleid = "1008794484802326679"
                                        }

                                        await user.roles.remove(remroleid)

                                        // Delete general event
                                        try {
                                            fs.unlinkSync('events/' + filename)
                                        } catch(err) {
                                            console.error(err)
                                        }
                                    }

                                    if (action == "video_release") { 
                                        console.log(data)

                                        // Delete general event
                                        try {
                                            fs.unlinkSync('events/' + filename)
                                        } catch(err) {
                                            console.error(err)
                                        }
                                    }
                                }
                            }
                        }
                    } 
                });
            });
        });
    }, 5000);
}

function initJoinCheck() {
    // New member
    client.on('guildMemberAdd', member => {
        member.roles.add('889932834905661440');

        try {
            const welcomeEmbed = new EmbedBuilder()
                .setColor('#f6f4c6')
                .setTitle(member.user.tag + ' joined the plazakins!💛')
                .setAuthor({ name: 'A message from Revadee', iconURL: 'https://raw.githubusercontent.com/Akridiki/Revade/main/Logo.png' })
                .setDescription('We are all happy to see you!')

            member.guild.channels.cache.get('956255050169221190').send({ embeds: [welcomeEmbed] });
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
                    .setTitle(newMember.user.tag + ' Boosted the server! Thank you so much! 💛')
                    .setAuthor({ name: 'A message from Revadee', iconURL: 'https://raw.githubusercontent.com/Akridiki/Revade/main/Logo.png' })
                    .setDescription('Check your cool perks in the Boosters category!')

                newMember.roles.add('1002229242723049585');
                newMember.guild.channels.cache.get('1001601669685067966').send({ embeds: [boostEmbed] });
            } catch (error) {
                console.log(error)
            }
        }
    });
}

//----------------------------
var ids = []; // ID of chatters
//----------------------------

function linkChatRep(message) {
    if (!ids.includes(message.author.id)) {
        ids.push(message.author.id);
    } else {
        for (let i = 0; i < ids.length; i++) {
            if(ids[i] == message.author.id) {
                var calc_rep = ((message.content.split(" ").length / 10) * 2);

                if (calc_rep > 0.49) {
                    // Check if data.txt exists first
                    if (!fs.existsSync('reputationsystem/' + message.author.id)) {
                        fs.mkdirSync('reputationsystem/' + message.author.id);
                    }

                    if (!fs.existsSync('reputationsystem/' + message.author.id + "/data.txt")) {
                        fs.writeFile('reputationsystem/' + message.author.id + "/data.txt", '1,1', err => {
                            if (err) {
                              console.error(err);
                            }
                            
                            // Finished creating and giving rep //
                            // Just because the user is brand new, it's that easy! //
                            // Simply return as we need no more. //
                            return
                          });                          
                    }

                    // File exists, we have to read and write... pfff BOOORINGGG
                    fs.readFile('reputationsystem/' + message.author.id + '/data.txt', 'utf8', (err, data) => {
                        if (err) {
                            console.error(err);
                            return;
                        }
            
                        // Succeeded reading //
                        var rep = data.split(',')[0]
                        var poi = data.split(',')[1]
    
                        fs.writeFile('reputationsystem/' + message.author.id + "/data.txt", (Number(rep) + 1).toString() + "," + (Number(poi) + 1).toString(), (err) => {
                            if (err) {
                                console.error(err);
                                return;
                            }
                        });
                    });
                }
            }
        }
    }
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
    start, initEventCheck, initJoinCheck, initBoostCheck, // functions
    linkChatRep, spamSystem // behind the scene systems
};