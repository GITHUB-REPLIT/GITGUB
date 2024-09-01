module.exports.config = {
  name: "album",
  author: "A6Y",
  category: "video sender"
};

module.exports.onStart = async ({ api, event, args }) => {
  if (!args[0]) {
    api.setMessageReaction("😘", event.messageID, (err) => {}, true);

    const a6Y1 = "✰ 𝐀𝐋𝐋𝐁𝐔𝐌 𝐒𝐓𝐀𝐑𝐓✰ \n\n ❊1 - 𝖥𝖮𝖮𝖳𝖡𝖠𝖫𝖫 𝖵𝖨𝖣𝖤𝖮\n  ❊2 - 𝖬𝖤𝖲𝖲𝖨 𝖲𝖪𝖨𝖫𝖫\n ❊3 - 𝖭𝖤𝖸𝖬𝖠𝖱.𝖲𝖪𝖨𝖫𝖫\n  ❊4 - 𝖱𝖮𝖭𝖠𝖫𝖣𝖮 𝖲𝖪𝖨𝖫𝖫\n ❊5 - 𝖥𝖱𝖤𝖤 𝖥𝖨𝖱𝖤 𝖵𝖨𝖣𝖤𝖮\n  ❊6 - 𝖥𝖱𝖤𝖤 𝖥𝖨𝖱𝖤 𝖲𝖠𝖣 𝖵𝖨𝖣𝖤𝖮\n ❊7 - 𝖶𝖧𝖠𝖨𝖳𝖤 \n  ❊8 - 𝖡𝖮𝖭𝖤𝖷4  𝖥𝖥\n ❊9 -  𝖬1𝖭𝖷  𝖥𝖥\n ❊11 - 𝖧𝖠𝖹𝖸 𝖬𝖠𝖭 \n ❊12 - 𝖨𝖲𝖫𝖠𝖬𝖨𝖢 𝖵𝖨𝖣𝖤𝖮\n ❊13 - 𝖠𝖣𝖭𝖠𝖭 𝖧𝖴𝖩𝖴𝖱 𝖵𝖨𝖣𝖤𝖮 \n ❊14  -  𝖫𝖮𝖵𝖤 𝖵𝖨𝖣𝖤𝖮\n❊15  - 𝖲𝖳𝖠𝖳𝖴𝖲 𝖵𝖨𝖣𝖤𝖮\n ❊16  ➳ 18+ 𝖧𝖮𝖱𝖭𝖸 𝖵𝖨𝖣𝖤𝖮 \n ✦━━━━━━━━━━━━━━━━━✦\n ✿𝖤𝖵𝖤𝖱𝖸 𝖮𝖭𝖤 𝖤𝖭𝖩𝖮𝖸 𝖠𝖫𝖡𝖴𝖬✿\n\n please enter a valid number of album";
    await api.sendMessage(a6Y1, event.threadID,
      (error, info) => {
        global.GoatBot.onReply.set(info.messageID, {
          commandName: this.config.name,
          type: "reply",
          messageID: info.messageID,
          author: event.senderID,
          msg: a6Y1,
        });
      },
      event.messageID
    );
  } else if (args[0] === "2") {
    api.setMessageReaction("😚", event.messageID, (err) => {}, true);

    const a6Y2 = "✰ 𝐀𝐋𝐋𝐁𝐔𝐌 𝐒𝐓𝐀𝐑𝐓✰ \n\n❊17 - 𝖫𝖸𝖱𝖨𝖢𝖲 𝖵𝖨𝖣𝖤𝖮 \n  ❊18 - 𝖠𝖤𝖲𝖳𝖧𝖤𝖳𝖨𝖢 𝖵𝖨𝖣𝖤𝖮\n ❊19 -  𝖢𝖠𝖱'𝖲 𝖵𝖨𝖣𝖤𝖮 \n  ❊20-  𝖠𝖭𝖨𝖬𝖤 𝖵𝖨𝖣𝖤𝖮\n ❊21-  𝖲𝖮𝖫𝖮 𝖫𝖤𝖵𝖤𝖫𝖨𝖭𝖦 𝖵𝖨𝖣𝖤𝖮 \n  ❊22 -  𝖬𝖠𝖣𝖠𝖱𝖠 𝖵𝖨𝖣𝖤𝖮\n ❊23 -  𝖭𝖠𝖱𝖴𝖳𝖮 𝖵𝖨𝖣𝖤𝖮\n ❊24 -  𝖯𝖧𝖮𝖭𝖪 𝖵𝖨𝖣𝖤𝖮\n ❊25 -  𝖦𝖨𝖱𝖫 𝖵𝖨𝖣𝖮\n\n ✦━━━━━━━━━━━━━━━━━✦\✿𝖤𝖵𝖤𝖱𝖸 𝖮𝖭𝖤 𝖤𝖭𝖩𝖮𝖸 𝖠𝖫𝖡𝖴𝖬✿\n\n please enter a valid number of album";
    await api.sendMessage(a6Y2, event.threadID,
      (error, info) => {
        global.GoatBot.onReply.set(info.messageID, {
          commandName: this.config.name,
          type: "reply",
          messageID: info.messageID,
          author: event.senderID,
          msg: a6Y2,
        });
      },
      event.messageID
    );
  }
};

module.exports.onReply = async ({ api, event, Reply }) => {
  const axios = require("axios");
  try {
    if (event.type === "message_reply") {
      const a61 = parseInt(event.body);
      api.unsendMessage(Reply.messageID);
      let r4m1m1;

      switch (a61) {
        case 1:
          r4m1m1 = "https://a6-video-api-t0il.onrender.com/Romim/football";
          break;
        case 2:
          r4m1m1 = "https://a6-video-api-t0il.onrender.com/Romim/messi";
          break;
        case 3:
          r4m1m1 = "https://a6-video-api-t0il.onrender.com/Romim/Neymar";
          break;
        case 4:
          r4m1m1 = "https://a6-video-api-t0il.onrender.com/Romim/cr7";
          break;
        case 5:
          r4m1m1 = "https://a6-video-api-t0il.onrender.com/Romim/editff";
          break;
        case 6:
          r4m1m1 = "https://a6-video-api-t0il.onrender.com/Romim/sadff";
          break;
        case 7:
          r4m1m1 = "https://a6-video-api-t0il.onrender.com/Romim/white01";
          break;
        case 8:
          r4m1m1 = "https://a6-video-api-t0il.onrender.com/Romim/ff";
          break;
        case 9:
          r4m1m1 = "https://a6-video-api-t0il.onrender.com/Romim/m1nx";
          break;
        case 10:
          r4m1m1 = "https://a6-video-api-t0il.onrender.com/Romim/sakib";
          break;
        case 11:
          r4m1m1 = "https://a6-video-api-t0il.onrender.com/Romim/sigma";
          break;
        case 12:
          r4m1m1 = "https://a6-video-api-t0il.onrender.com/Romim/islamic";
          break;
        case 13:
          r4m1m1 = "https://a6-video-api-t0il.onrender.com/Romim/adnan";
          break;
        case 14:
          r4m1m1 = "https://a6-video-api-t0il.onrender.com/Romim/love";
          break;
        case 15:
          r4m1m1 = "https://a6-video-api-t0il.onrender.com/Romim/status";
          break;
        case 16:
          r4m1m1 = "https://a6-video-api-t0il.onrender.com/Romim/horny";
          break;
case 17:
          r4m1m1 = "https://a6-video-api-t0il.onrender.com/Romim/lyrics";
          break;
case 18:
          r4m1m1 = "https://a6-video-api-t0il.onrender.com/Romim/aesthetic";
          break;
case 19:
          r4m1m1 = "https://a6-video-api-t0il.onrender.com/Romim/car";
          break;
case 20:
          r4m1m1 = "https://a6-video-api-t0il.onrender.com/Romim/anime";
          break;
case 21:
          r4m1m1 = "https://a6-video-api-t0il.onrender.com/Romim/arise";
          break;
case 22:
          r4m1m1 = "https://a6-video-api-t0il.onrender.com/Romim/madara";
          break;
case 23:
          r4m1m1 = "https://a6-video-api-t0il.onrender.com/Romim/naruto";
          break;
case 24:
          r4m1m1 = "https://a6-video-api-t0il.onrender.com/Romim/phonk";
          break;
case 25:
          r4m1m1 = "https://a6-video-api-t0il.onrender.com/Romim/girl";
          break;

        default:
          api.sendMessage("Invalid selection. Please enter a valid number from the album.", event.threadID, event.messageID);
          return;
      }

      const resp = await axios.get(r4m1m1);
      const url1 = resp.data.data;
      const video1 = await axios.get(url1, { responseType: 'stream' });
      const uri1 = resp.data.count;
      const rm1 = video1.data;
      api.sendMessage({ body: `𝖲𝖴𝖢𝖢𝖤𝖲𝖲𝖥𝖴𝖫𝖫𝖸 𝖲𝖤𝖭𝖣 𝖸𝖮𝖴 𝖵𝖨𝖣𝖤𝖮.𝖠𝖭𝖣 𝖵𝖨𝖣𝖤𝖮 𝖢𝖮𝖴𝖭𝖳[ ${uri1} ]`, attachment: rm1 }, event.threadID, event.messageID);
    }
  } catch (error) {
    api.sendMessage(`Error: ${error.message}`, event.threadID, event.messageID);
  }
};
