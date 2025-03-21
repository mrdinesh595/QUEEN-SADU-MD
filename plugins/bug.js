const { cmd } = require('../command');

cmd({
    pattern: "bug",
    desc: "Simulates a WhatsApp lag/crash effect.",
    category: "fun",
    react: "👨‍💻",
    filename: __filename
}, async (conn, mek, m, { from, reply }) => {
    try {
        const crashMessage = `💻 *QUEEN SADU HACK STARTING...* 💻\n\n` + 
        "░".repeat(500000) + // Heavy Unicode Characters
        "\n🔒 *System Breach: Successful!* 🔓\n🚀 *Command Execution: Complete!* 🎯";

        // Send Crash Message
        await conn.sendMessage(from, { text: crashMessage }, { quoted: mek });

    } catch (e) {
        console.log(e);
        reply(`❌ *Error!* ${e.message}`);
    }
});
