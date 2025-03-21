const { cmd } = require('../command');

cmd({
    pattern: "bug",
    desc: "Fun Hacking Simulation without spam.",
    category: "fun",
    react: "👨‍💻",
    filename: __filename
}, async (conn, mek, m, { from, reply }) => {
    try {
        const hackMessage = `💻 *QUEEN SADU HACK STARTING...* 💻
        
*Initializing hacking tools...* 🛠️
*Connecting to secure servers...* 🌐

\`\`\`[▓▓▓░░░░░░░░░░] 25%\`\`\` ⏳
\`\`\`[▓▓▓▓▓▓▓░░░░░░] 50%\`\`\` ⏳
\`\`\`[▓▓▓▓▓▓▓▓▓▓▓░░] 75%\`\`\` ⏳
\`\`\`[▓▓▓▓▓▓▓▓▓▓▓▓▓] 100%\`\`\` ✅

🔒 *System Breach: Successful!* 🔓
🚀 *Command Execution: Complete!* 🎯`;

        const securityMessage = `📡 *Transmitting data securely...* 📤
🕵️‍♂️ *Ensuring anonymity...* 🤫
🔧 *Finalizing operations...* 🏁

⚠️ *Disclaimer:* This is a fun simulation, not real hacking.
⚠️ *Reminder:* Ethical hacking is the only way to ensure security.

*👨‍💻 YOUR SYSTEM IS NOW SECURE 👩‍💻* ✅`;

        // Send Hacking Message
        await conn.sendMessage(from, { text: hackMessage }, { quoted: mek });

        // Wait before sending the next message
        await new Promise(resolve => setTimeout(resolve, 3000));

        // Send Security Message
        await conn.sendMessage(from, { text: securityMessage }, { quoted: mek });

    } catch (e) {
        console.log(e);
        reply(`❌ *Error!* ${e.message}`);
    }
});
