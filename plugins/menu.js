const { cmd, commands } = require('../command');
const config = require('../config');
const { runtime } = require('../lib/functions');
const axios = require('axios');
const fs = require('fs');

// List of voices for random selection
const voiceList = [
    'https://github.com/mrdinesh595/Mssadu/raw/refs/heads/main/database/alive.mp3',
    'https://github.com/mrdinesh595/Mssadu/raw/refs/heads/main/database/bs.mp3',
    'https://github.com/mrdinesh595/Mssadu/raw/refs/heads/main/database/adobe%201.mp3'
    // Add voices as needed
];

cmd({
    pattern: "menu2",
    react: "🛸",
    alias: ["panel", "commands"],
    desc: "Get bot's command list.",
    category: "main",
    use: '.menu',
    filename: __filename
}, async (conn, mek, m, { from, pushname, reply }) => {
    try {
        // Randomly select a voice file
        const randomVoice = voiceList[Math.floor(Math.random() * voiceList.length)];

        // Send the selected random voice message
        await conn.sendMessage(from, { audio: { url: randomVoice }, ptt: true });

        // Create a short menu text
        let madeMenu = `*HELLO WELCOME TO QUEEN SADU MD WHATSAPP BOT* 
        *ᴡᴇʟᴄᴏᴍᴇ ${pushname}*
        *ᴏɴʟɪɴᴇ ᴠᴇʀsɪᴏɴ*: *2.0.0*
        
        ᴇxᴇᴄᴜᴛᴇ ᴄᴏᴍᴍᴀɴᴅs:
        update comming 
       
        `;

        // Send the image and menu text after voice
        await conn.sendMessage(from, { image: { url: config.ALIVE_IMG }, caption: madeMenu }, { quoted: mek });

    } catch (e) {
        console.log(e);
        reply(`${e}`);
    }
});
