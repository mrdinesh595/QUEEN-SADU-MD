const {cmd , commands} = require('../command');
const { ttdl } = require('ruhend-scraper');

cmd({
    pattern: "tiktok",
    desc: "To download tiktok videos.",
    category: "download",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{

  if (!args[0]) {
    return reply('*`ρℓєαѕє gινє α ωαιℓ∂ тιктσк ℓιηк`*');
  }

  await m.react('🕒');
  let res;
  try {
    res = await igdl(args[0]);
  } catch (error) {
    return reply('*`єяяσя σвтαιηιηg ∂αтα.`*');
  }

  let result = res.data;
  if (!result || result.length === 0) {
    return reply('*`ησ яєѕαℓт ƒσυη∂.`*');
  }

  let data;
  try {
    data = result.find(i => i.resolution === "720p (HD)") || result.find(i => i.resolution === "360p (SD)");
  } catch (error) {
    return reply('*`єяяσя ∂αтα ℓσѕѕ.`*');
  }

  if (!data) {
    return reply('*`ησ ∂αтα ƒσυη∂.`*');
  }

  await m.react('✅');
  let video = data.url;
  let dev = 'QUEEN-SADU MD Tiktok Downloader | Download with ease, cherish forever.'
  
  try {
    await conn.sendMessage(m.chat, { video: { url: video }, caption: dev, fileName: 'tt.mp4', mimetype: 'video/mp4' }, { quoted: m });
  } catch (error) {
    return reply('*`єяяσя ∂σωηℓσα∂ νι∂єσ.`*');
  await m.react('❌');
  }
}catch(e){
console.log(e)
  reply(`αη єяяσя`)
}
});
