const axios = require("axios");

module.exports = {
  config: {
    name: "tinfo",
    version: "1.0",
    author: "mustakim",
    role: 0,
    category: "info",
  },
  onStart: async ({ api, event, args }) => {
    const { threadID, messageID } = event;
    const input = args.join(" ");
    if (!input) {
      return api.sendMessage("please provide a valid tiktok username", threadID, messageID);
    }
    try {
      const response = await axios.get(`https://mostakim-api.onrender.com/tikstalk?username=${input}`);
      var Url = response.data;
      var nick = Url.nickname;
      var user = Url.username;
      var avtar = Url.avatarLarger;
      var like = Url.heartCount;
      var follower = Url.followerCount;
      const a6 = await axios.get(avtar,{responseType: 'stream'});
      var a6y = a6.data
      var all = `𝖭𝖨𝖢𝖪𝖭𝖠𝖬𝖤:${nick}\n 𝖴𝖲𝖤𝖱𝖭𝖠𝖬𝖤:${user}\n𝖫𝖨𝖪𝖤:${like}\n𝖥𝖮𝖫𝖫𝖮𝖶𝖤𝖱:${follower} `;
      api.sendMessage({ body: `${all}`, attachment: a6y},threadID,messageID);
    } catch (error) {
      api.sendMessage(`error☞︎︎︎${error.message}`, event.threadID, event.messageID);
    }
  }
};
