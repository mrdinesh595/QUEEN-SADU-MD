
// money by mr frank
























































const config = require('../config');
const { cmd } = require("../command");
const axios = require("axios");
const fs = require("fs");

cmd({
  pattern: "imagine",
  alias: ["aiimg6", "metaimg"],
  react: "✨",
  desc: "Generate an image using AI.",
  category: "main",
  filename: __filename
}, async (conn, mek, m, { q, reply }) => {
  try {
    if (!q) return reply("Please provide a prompt for the image.");

    await reply("> *Brewing Up Magic...✨*");

    const apiUrl = `https://api.siputzx.my.id/api/ai/flux?prompt=${encodeURIComponent(q)}`;

    const response = await axios.get(apiUrl, { responseType: "arraybuffer" });

    if (!response || !response.data) {
      return reply("Error: The API did not return a valid image. Try again later.");
    }

    const imageBuffer = Buffer.from(response.data, "binary");

    await conn.sendMessage(m.chat, {
      image: imageBuffer,
      caption: `* 🤖 ᴘʀᴏᴍᴘᴛ : ${q}*\n\n> © *Gᴇɴᴇʀᴀᴛᴇᴅ ʙʏ qᴜᴇᴇɴ ꜱᴀᴅᴜ*`
    });

  } catch (error) {
    console.error("FluxAI Error:", error);
    reply(`An error occurred: ${error.response?.data?.message || error.message || "Unknown error"}`);
  }
});

cmd({
  pattern: "stablediffusion",
  alias: ["aiimg5", "imagine2"],
  react: "✨",
  desc: "Generate an image using AI.",
  category: "main",
  filename: __filename
}, async (conn, mek, m, { q, reply }) => {
  try {
    if (!q) return reply("Please provide a prompt for the image.");

    await reply("> *Brewing Up Some Magic...⚡*");

    const apiUrl = `https://api.siputzx.my.id/api/ai/stable-diffusion?prompt=${encodeURIComponent(q)}`;

    const response = await axios.get(apiUrl, { responseType: "arraybuffer" });

    if (!response || !response.data) {
      return reply("Error: The API did not return a valid image. Try again later.");
    }

    const imageBuffer = Buffer.from(response.data, "binary");

    await conn.sendMessage(m.chat, {
      image: imageBuffer,
      caption: `* 🤖 ᴘʀᴏᴍᴘᴛ : ${q}*\n\n> © *Gᴇɴᴇʀᴀᴛᴇᴅ ʙʏ qᴜᴇᴇɴ ꜱᴀᴅᴜ*`
    });

  } catch (error) {
    console.error("FluxAI Error:", error);
    reply(`An error occurred: ${error.response?.data?.message || error.message || "Unknown error"}`);
  }
});

cmd({
  pattern: "midjourneyai",
  alias: ["aiimg4", "imagine3"],
  react: "🚀",
  desc: "Generate an image using AI.",
  category: "main",
  filename: __filename
}, async (conn, mek, m, { q, reply }) => {
  try {
    if (!q) return reply("Please provide a prompt for the image.");

    await reply("> *ωαιτ α ѕєϲοи∂...*");

    const apiUrl = `https://api.siputzx.my.id/api/ai/stabilityai?prompt=${encodeURIComponent(q)}`;

    const response = await axios.get(apiUrl, { responseType: "arraybuffer" });

    if (!response || !response.data) {
      return reply("Error: The API did not return a valid imaaiimgry again later.");
    }

    const imageBuffer = Buffer.from(response.data, "binary");

    await conn.sendMessage(m.chat, {
      image: imageBuffer,
      caption: `* 🤖 ᴘʀᴏᴍᴘᴛ : ${q}*\n\n> © *Gᴇɴᴇʀᴀᴛᴇᴅ ʙʏ qᴜᴇᴇɴ ꜱᴀᴅᴜ*`
    });

  } catch (error) {
    console.error("FluxAI Error:", error);
    reply(`An error occurred: ${error.response?.data?.message || error.message || "Unknown error"}`);
  }
});


cmd({
  pattern: "bingimg",
  alias: ["aiimg3", "bingimage"],
  desc: "Search for images using Bing and send 5 results.",
  category: "utility",
  use: ".bingimg <query>",
  filename: __filename,
}, async (conn, mek, msg, { from, args, reply }) => {
  try {
    const query = args.join(" ");
    if (!query) {
      return reply("❌ Please provide a search query. Example: `.bingimg dog`");
    }

    // Fetch images from the Bing Image Search API
    const response = await axios.get(`https://api.siputzx.my.id/api/s/bimg?query=${encodeURIComponent(query)}`);
    const { status, data } = response.data;

    if (!status || !data || data.length === 0) {
      return reply("❌ No images found for the specified query. Please try again.");
    }

    // Select the first 5 images
    const images = data.slice(0, 5);

    // Send each image as an attachment
    for (const imageUrl of images) {
      await conn.sendMessage(from, {
        image: { url: imageUrl }, // Attach the image
        caption: `🔍 *Bing Image Search*: ${query}`,
      });
    }
  } catch (error) {
    console.error("Error fetching images:", error);
    reply("❌ Unable to fetch images. Please try again later.");
  }
});
