module.exports = {
  config: {
    name: "editff",
    role: 0,
    author: "ArYan",
    countDown: 5,
    longDescription: "Randomvideo",
    category: "video",
    guide:{
      en: "{pn} <video>"
    } 
  },
   onStart: async function({ api, event }) {
  const axios = require('axios');
  const request = require('request');
  const fs = require("fs");
  var romim = ["https://a6-video-api-t0il.onrender.com/video/editff","https://a6-video-api-t0il.onrender.com/video/sadff"]
  var romim1 = romim[Math.floor(Math.random() * romim.length)]
  axios.get(romim1).then(res => {
  let ext = res.data.data.substring(res.data.data.lastIndexOf(".") + 1);
  let count = res.data.count;
  let romim2 = res.data.romim;
  let callback = function () {
          api.sendMessage({
            body: `𝗦𝗨𝗖𝗖𝗘𝗦𝗦𝗙𝗨𝗟𝗟𝗬 𝗔𝗣𝗜 𝗦𝗘𝗡𝗗 𝗩𝗜𝗗𝗘𝗢                           𝗙𝗥𝗘𝗘 𝗙𝗜𝗥𝗘 𝗘𝗗𝗜𝗧  𝗩𝗜𝗗𝗘𝗢\n\n｢ 𝗜𝘁𝘇 𝗔𝗿𝗬𝗔𝗡 ｣`,
            attachment: fs.createReadStream(__dirname + `/cache/Romim.mp4`)
          }, event.threadID, () => fs.unlinkSync(__dirname + `/cache/Romim.mp4`), event.messageID);
        }
        request(res.data.data).pipe(fs.createWriteStream(__dirname + `/cache/Romim.mp4`)).on("close", callback);
      })
   } 
}
