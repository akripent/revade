function showVersion() {
console.log("You are running Revade 11.1.0 (27th April 2025)")
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
codename = "Revade 11 Canary"

// botName: what will revade reference "Revade" as?
// eg: "Not Revade" will show "Not Revade - a (serverOwner) bot"
botName = "Revade"

// botIcon: what image will Revade use as logo in embeds?
botIcon = "https://raw.githubusercontent.com/Akridiki/Revade/main/Logo.png"

// Various ANSI colors: mostly for the CLI part
botTheme = "[32m" // [0m is green
versionTheme = "[33m" // yellow

// Admins: what user IDs will be able to manage privileged commands? (CAUTION!)
admins = []

// Enable internal functions
enableSpamSystem = true; // Use Revade's Spam Detection System?

// rulesChannelId: what is the Channel ID for your rules?
// eg: "1318657272079192125" (You can right click a channel to Copy Channel ID as long as you have Developer Mode)
rulesChannelId = "1318657272079192125"

// welcomeChannel: what is the Channel ID for new user joins?
// Also used for server boosts!
welcomeChannel = "1318656940884234322"
module.exports = {showVersion: showVersion, token: token, prefix: prefix, serverOwner: serverOwner, botName: botName, botIcon: botIcon, StatusText: prefix + "help", codename: codename, botTheme: botTheme, versionTheme: versionTheme, rulesChannelId: rulesChannelId, admins: admins, enableSpamSystem: enableSpamSystem };
