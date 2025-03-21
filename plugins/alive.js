const { cmd } = require('../command');
const os = require("os");
const { runtime } = require('../lib/functions');

cmd({
    pattern: "alive",
    alias: ["status", "runtime", "uptime"],
    react: "📟",
    desc: "Check uptime and system status",
    category: "main",
    filename: __filename
}, async (conn, mek, m, { from, reply }) => {
    try {
        // 🔹 Random Voice (PTT) URLs
        const voiceLinks = [
            "https://github.com/mrdinesh595/Mssadu/raw/refs/heads/main/database/alive.mp3",
            "https://github.com/mrdinesh595/Mssadu/raw/refs/heads/main/database/sadualive2.mp3"
        ];
        
        // 🔹 Select a Random Voice Clip
        const voiceUrl = voiceLinks[Math.floor(Math.random() * voiceLinks.length)];

        // 📝 Status Message
        const status = `╭━━〔 *QUEEN-SADU-MD* 〕━━┈⊷
┃◈╭─────────────·๏
┃◈┃• *⏳ Uptime:*  ${runtime(process.uptime())} 
┃◈┃• *📟 RAM Usage:* ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${(os.totalmem() / 1024 / 1024).toFixed(2)}MB
┃◈┃• *⚙️ HostName:* ${os.hostname()}
┃◈┃• *👨‍💻 Owner:* ᴍʀ ᴅɪɴᴇꜱʜ
┃◈┃• *🧬 Version:* V2 BETA
┃◈└───────────┈⊷
╰──────────────┈⊷

  𝐐𝐮𝐞𝐞𝐧 𝐒𝐚𝐝𝐮 𝐢𝐬 𝐀𝐥𝐢𝐯𝐞 𝐍𝐨𝐰! 🎯  

  📌 *Follow our Channel:*  
  https://whatsapp.com/channel/0029Vb0Anqe9RZAcEYc2fT2c

> *© Powered by Mr Dinesh*`;

        // 🔹 1. Send Random Voice Message (PTT)
        const voiceMessage = await conn.sendMessage(from, {
            audio: { url: voiceUrl },
            mimetype: 'audio/mpeg',
            ptt: true, // Send as voice message (PTT)
            contextInfo: {
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363357105376275@g.us@newsletter',
                    newsletterName: 'ᴍʀ ᴅɪɴᴇꜱʜ',
                    serverMessageId: 143
                }
            }
        }, { quoted: mek });

        // ⏳ Wait 2 seconds before sending GIF Video
        await new Promise(resolve => setTimeout(resolve, 2000));

        // 🔹 2. Send GIF Video with Status Caption
        await conn.sendMessage(from, {
            video: { url: `https://files.catbox.moe/ymkoq4.mp4` }, // GIF URL
            caption: status,
            mimetype: "video/mp4",
            gifPlayback: true, // Enable GIF Play Mode
            contextInfo: {
                mentionedJid: [m.sender],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363357105376275@g.us@newsletter',
                    newsletterName: 'ᴍʀ ᴅɪɴᴇꜱʜ',
                    serverMessageId: 143
                }
            }
        }, { quoted: voiceMessage });

    } catch (e) {
        console.error("Error in alive command:", e);
        reply(`❌ Error: ${e.message}`);
    }
});
