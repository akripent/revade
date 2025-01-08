function showVersion() {
console.log("You are running Revade 10.1.1 (8 Jan. 2025)")
}

// Revade Dev Bot Token
token = "YOUR_TOKEN"

// Prefix used to type commands
// eg: "ri-" does ri-help
prefix = "ri-"

// serverOwner: what will the bot call your server?
// eg: Revade, a (serverOwner) bot.
serverOwner = "Revade Development & News"

module.exports = {showVersion: showVersion, token: token, prefix: prefix, serverOwner: serverOwner, StatusText: prefix };
