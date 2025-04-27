const syst = require("../../system.cjs"); //Token and some const variables
const { EmbedBuilder } = require('discord.js');

async function useModule(message, command) {
	if (command === 'purge') {
        try {
            let deleteamount = message.content.split(syst.prefix + "purge")[1];
            if (message.member.permissions.has(["KickMembers"])) {
                if (parseInt(deleteamount <= 0)) return message.reply({ embeds: [embeds.failedEmbed] })

                if (parseInt(deleteamount) > 250) return message.reply("You're purging too much at once! **(Max. 250)**")

                await message.channel.bulkDelete(parseInt(deleteamount) + 1, true);
            }
            await message.channel.send("Success!").then(m => {
                setTimeout(() => {
                    m.delete()
                }, 5000)
            })
        } catch (error) {}
    }

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
                    message.reply("You didn't specify who you want to kick. Make sure you @ the user to kick them!");
                }
            }
        } catch (error) {
            console.log(error);
        }
    }
    
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
    
    if (command === 'modhelp') {
    	var date = new Date();
        var hour = date.getHours();

        if (hour == 6 || hour == 7 || hour == 8 || hour == 9 || hour == 10 || hour == 11) { tchosen = syst.mor; tchosencol = '#96cf89'; }
        if (hour == 12 || hour == 13 || hour == 14 || hour == 15 || hour == 16 || hour == 17) { tchosen = syst.aft; tchosencol = '#ff5858'; }
        if (hour == 18 || hour == 19 || hour == 20 || hour == 21 || hour == 22 || hour == 23 || hour == 24 || hour == 0 || hour == 1 || hour == 2 || hour == 3 || hour == 4 || hour == 5) { tchosen = syst.eve; tchosencol = '#7b54b5'; }

        // MOD HELP

        const mhelpEmbed = new EmbedBuilder()
            .setColor(tchosencol)
            .setTitle('Commands for ' + syst.botName)
            .setAuthor({ name: syst.botName, iconURL: syst.botIcon })
            .setDescription('**PREFIX:** `' + syst.prefix + '` \n List of available commands:')
            .setImage(tchosen)
            .addFields(
                { name: '`kick`', value: 'Kicks the first mention in the message. No reason can be provided.', inline: true },
                { name: '`purge`', value: 'Removes a bulk of messages.', inline: true },
                { name: '`ban`', value: 'Bans the first mention in the message. No reason can be provided.', inline: true },
                { name: '`timeout`', value: 'Times out the first mention in the message: ' + syst.prefix + 'timeout @who (minutes)', inline: true },
            )
            .setFooter({ text: syst.botName + ' - a ' + syst.serverOwner + ' bot', iconURL: syst.botIcon })

        message.channel.send({ embeds: [mhelpEmbed] })
    }
}

module.exports = {
    useModule: useModule
};
