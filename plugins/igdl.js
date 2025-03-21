const config = require('../config')
const fg = require('api-dylux');
const { cmd, commands } = require('../command')
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep, fetchJson} = require('../lib/functions')
const cheerio = require('cheerio')
const axios = require("axios")
const vm = require('vm')
async function Insta(match) {
  const result = []
          const form = {
            url: match,
            submit: '',
          }
          const { data } = await axios(`https://downloadgram.org/`, {
            method: 'POST',
            data: form
          })
          const $ = cheerio.load(data)
                  $('#downloadhere > a').each(function (a,b) {
          const url = $(b).attr('href')
          if (url) result.push(url)
        })
              return result
  }

var needus =''
if(config.LANG === 'SI') needus = '*කරුණාකර මට Instagram url එකක් දෙන්න !!*'
else needus = "*Please give me Instagram url !!*" 
var cantf =''
if(config.LANG === 'SI') cantf = '*මට මෙම වීඩියෝව සොයාගත නොහැක!*'
else cantf = "*I cant find this video!*" 
cmd({
    pattern: "ig",
    alias: ["igstory","insta"],
    react: '🎀',
    desc: "Download instagram videos/photos.",
    category: "download",
    use: '.ig <Instagram link>',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
 if (!q) return await  reply(needus)
  let response = await fetchJson('https://api.giftedtech.my.id/api/download/instadl?apikey=gifted&type=video&url='+q)
  for (let i=0;i<response.data.data.length;i++) {
    if(response.data.data[i].type === 'image') await conn.sendMessage(from, { image: { url: response.data.data[i].url }, caption: config.FOOTER}, { quoted: mek })
  else await conn.sendMessage(from, { video: { url: response.data.data[i].url }, caption: config.FOOTER}, { quoted: mek })
  }
} catch (e) {
reply(cantf)
l(e)
}
})
