const { cmd } = require("../command");
const yts = require("yt-search");
const axios = require("axios");

cmd({
pattern: "play2",
alias: ["audio", "mp3"],
desc: "Search and download audio from YouTube",
category: "media",
react: "🎧",
filename: __filename
}, async (conn, mek, m, { from, args, q, reply }) => {
try {
if (!q) return reply("Please provide a song name or YouTube link to download.");

let videoUrl = q;  
    if (!q.includes("youtube.com") && !q.includes("youtu.be")) {  
        reply("🔍 Searching for your song...");  
        const searchResults = await yts(q);  
        if (!searchResults.videos.length) return reply("No results found for your query.");  
        videoUrl = searchResults.videos[0].url;  
    }  
      
    const apiUrl = `https://apis.davidcyriltech.my.id/youtube/mp3?url=${videoUrl}`;  
    const response = await axios.get(apiUrl);  
    if (!response.data || !response.data.success || !response.data.result.downloadUrl) {  
        return reply("Failed to fetch the audio. Try again later.");  
    }  
      
    await conn.sendMessage(from, {  
        audio: { url: response.data.result.downloadUrl },  
        mimetype: "audio/mpeg",  
        ptt: false  
    }, { quoted: mek });  
      
} catch (e) {  
    console.error("Error in play command:", e);  
    reply("An error occurred while processing your request.");  
}

});

