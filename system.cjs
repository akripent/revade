function showVersion() {
console.log("You are running Revade 10.1.1 (9th March 2025)")
}

// Revade Dev Bot Token
token = "YOUR_TOKEN"

// Prefix used to type commands
// eg: "ri-" does ri-help
prefix = "ri-"

// serverOwner: what will the bot call your server?
// eg: Revade, a (serverOwner) bot.
serverOwner = "Revade Development & News"

// Admins: what user IDs will be able to manage privileged commands? (CAUTION!)
admins = []

// rulesChannelId: what is the Channel ID for your rules?
// eg: "1318657272079192125" (You can right click a channel to Copy Channel ID as long as you have Developer Mode)
rulesChannelId = "1318657272079192125"

// Codename: Basically tells you current Revade revision
codename = "Revade 10 Valletta"

module.exports = {showVersion: showVersion, token: token, prefix: prefix, serverOwner: serverOwner, StatusText: prefix + "help", codename: codename, rulesChannelId: rulesChannelId, admins: admins };
