const axios = require("axios");
const { cmd } = require("../command");
const fs = require("fs");
const path = require("path");

cmd({
    pattern: "gpt",
    alias: "ai",
    desc: "Interact with ChatGPT using Sinhala voice.",
    category: "ai",
    react: "🤖",
    use: "<your query>",
    filename: __filename,
}, async (conn, mek, m, { from, args, q, reply }) => {
    try {
        if (!q) return reply("⚠️ කරුණාකර ප්‍රශ්නයක් ලබාදෙන්න.\n\nඋදාහරණය:\n.gpt AI කියන්නේ මොකක්ද?");

        const text = encodeURIComponent(q);
        
        // ChatGPT API Request (Sinhala Response)
        const gptResponse = await axios.get(`https://api.dreaded.site/api/chatgpt?text=${text}&lang=si`);
        
        if (!gptResponse.data || !gptResponse.data.result || !gptResponse.data.result.prompt) {
            return reply("❌ GPT API වෙතින් පිළිතුරක් ලබාගත නොහැක.");
        }

        const message = gptResponse.data.result.prompt;

        // Image and Text Reply
        const AI_IMAGE = 'https://i.postimg.cc/4y4Bxdc8/Picsart-25-02-08-23-56-16-217.jpg';
        const formattedInfo = `🤖 *ChatGPT පිළිතුර:* \n\n${message}`;

        await conn.sendMessage(from, {
            image: { url: AI_IMAGE },
            caption: formattedInfo,
            contextInfo: {
                mentionedJid: [m.sender],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363357105376275@g.us@newsletter',
                    newsletterName: 'MR DINESH AI',
                    serverMessageId: 143
                }
            }
        }, { quoted: mek });

        // Voice (Sinhala Female Voice) Generation with Split
        const splitText = (str, maxLength) => {
            let result = [];
            for (let i = 0; i < str.length; i += maxLength) {
                result.push(str.substring(i, i + maxLength));
            }
            return result;
        };

        const voiceParts = splitText(message, 200); // Google TTS supports max 200 characters

        for (let i = 0; i < voiceParts.length; i++) {
            const voiceUrl = `https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&q=${encodeURIComponent(voiceParts[i])}&tl=si-LK`;
            const voicePath = path.join(__dirname, `sinhala_voice_part_${i + 1}.mp3`);

            const voiceResponse = await axios({
                method: 'get',
                url: voiceUrl,
                responseType: 'stream',
            });

            await new Promise((resolve, reject) => {
                const stream = voiceResponse.data.pipe(fs.createWriteStream(voicePath));
                stream.on('finish', resolve);
                stream.on('error', reject);
            });

            // Send each part of the voice message
            await conn.sendMessage(from, {
                audio: { url: voicePath },
                mimetype: 'audio/mp4',
                ptt: true,
            }, { quoted: mek });
        }

    } catch (error) {
        console.error("Error in GPT command:", error);
        reply("❌ දෝෂයක් සිදුවී ඇත. කරුණාකර නැවත උත්සාහ කරන්න.");
    }
});
