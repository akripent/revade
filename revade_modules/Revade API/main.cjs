const { EmbedBuilder } = require('discord.js');
const syst = require("../../system.cjs"); //Token and some const variables
const express = require('express')
const path = require('path'); // File management

function useModule(message, command) {
    // Nup, not yet ty
}

// Runs upon Revade launch
function moduleStartup(modules_config) {
    apiConf = modules_config.find(({ name }) => name === "Revade API").config
    const app = express()
    const port = apiConf.port

    app.listen(port, () => {
        console.log(`Revade API listening at :${port}`)
    })

    app.get('/details', (req, res) => {
        res.header("Content-Type",'application/json');
        res.json({
            instance: syst.codename,
            name: syst.botName,
            uptime: Math.round(process.uptime()),
            admins: syst.admins,
        })
    })

    app.get('/modules/list', (req, res) => {
        res.header("Content-Type",'application/json');
        res.json({modules_config})
    })
}

module.exports = {
    useModule: useModule,
    moduleStartup: moduleStartup
};
