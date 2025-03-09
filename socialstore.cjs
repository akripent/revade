const syst = require("./system.cjs"); //Token and some const variables
const { EmbedBuilder } = require('discord.js');
const fs = require("fs"); // Filesystem Library

const storeMainEmbed = new EmbedBuilder()
    .setColor("#e4a25d")
    .setTitle('Store Commands')
    .setAuthor({ name: 'Revade', iconURL: 'https://raw.githubusercontent.com/Akridiki/Revade/main/Logo.png' })
    .setDescription('Here are the store subcommands:')
    .addFields(
        { name: '`' + syst.prefix + 'store items`', value: 'Gives list of all purchasable items (except perks)', inline: true },
    )
    .setFooter({ text: 'Revade - an ' + syst.serverOwner + ' bot', iconURL: 'https://raw.githubusercontent.com/Akridiki/Revade/main/Logo.png' })

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
            var after = "";
            items.forEach(itemy => {
                if (item != "" && itemy != item) {
                    after += itemy + ",";
					// Always remove the stupid last ","
					// + newlines
					after = after.slice(0, -1).replace("\n","");
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

function useModule(message, command) {
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
                { name: '`purchase`', value: 'Buy an item from the store (' + syst.prefix + 'purchase item)', inline: true },
                { name: '`store`', value: 'Shows purchasable items', inline: true },
                { name: '`stats`', value: 'Gives you your current reputation stats', inline: true },
                { name: '`use`', value: 'Use an item from your inventory (' + syst.prefix + 'use item)', inline: true },
            )
            .setFooter({ text: 'Revade - a ' + syst.serverOwner + ' bot', iconURL: 'https://raw.githubusercontent.com/Akridiki/Revade/main/Logo.png' })

        message.channel.send({ embeds: [rhelpEmbed] })
    }
    
    if (command === 'stats') {
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

    else if (command.startsWith('store')) {
        var thing = message.content.split(syst.prefix + "store ")[1]

        // Show embed for both items'/perks' help //
        if (thing == undefined) {
            message.channel.send({ embeds: [storeMainEmbed] })

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
                    { name: '`Your inventory is empty!`', value: 'You can purchase items with `' + syst.prefix + 'store` or get items via giveaways', inline: true }
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
            message.reply("You don't have any item in your `" + syst.prefix + "inventory` that you can use yet.")
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
        if (!syst.admins.includes(message.author.id)) {
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
            message.channel.send("The only options available are `" + syst.prefix + "item create` and `" + syst.prefix + "item delete`")
        }
    }
    
}

module.exports = {
    useModule: useModule,
    UseItem: UseItem
};
