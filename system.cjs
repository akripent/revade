function showVersion() {
console.log("You are running Revade 11.0.0 (27th April 2025)")
}

// Revade Dev Bot Token
token = "YOUR_TOKEN"

// Prefix used to type commands
// eg: "ri-" does ri-help
prefix = "ri-"

// serverOwner: what will the bot call your server?
// eg: Revade, a (serverOwner) bot.
serverOwner = "Revade Development & News"

// Codename: Basically tells you current Revade revision
codename = "Revade 11 Valletta"

// botName: what will revade reference "Revade" as?
// eg: "Not Revade" will show "Not Revade - a (serverOwner) bot"
botName = "Revade"

// botIcon: what image will Revade use as logo in embeds?
botIcon = "https://raw.githubusercontent.com/Akridiki/Revade/main/Logo.png"

// Admins: what user IDs will be able to manage privileged commands? (CAUTION!)
admins = []

// Enable internal functions
enableSpamSystem = true; // Use Revade's Spam Detection System?

// rulesChannelId: what is the Channel ID for your rules?
// eg: "1318657272079192125" (You can right click a channel to Copy Channel ID as long as you have Developer Mode)
rulesChannelId = "1318657272079192125"

module.exports = {showVersion: showVersion, token: token, prefix: prefix, serverOwner: serverOwner, botName: botName, botIcon: botIcon, StatusText: prefix + "help", codename: codename, rulesChannelId: rulesChannelId, admins: admins, enableSpamSystem: enableSpamSystem };
