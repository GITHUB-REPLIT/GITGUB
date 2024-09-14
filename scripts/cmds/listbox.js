const { GoatWrapper } = require("fca-liane-utils");
module.exports = {
  config: {
    name: "listbox",
    aliases: [],
    author: "ArYan",
    version: "2.0",
    cooldowns: 5,
    role: 2,
    shortDescription: {
      en: "List all group chats the bot is in."
    },
    longDescription: {
      en: "Use this command to list all group chats the bot is currently in."
    },
    category: "owner",
    guide: {
      en: "{p}{n} "
    }
  },
  onStart: async function ({ api, event }) {
    try {
      const groupList = await api.getThreadList(100, null, ['INBOX']);

      
      const filteredList = groupList.filter(group => group.threadName !== null);

      if (filteredList.length === 0) {
        
        await api.sendMessage('No group chats found.', event.threadID);
      } else {
        const formattedList = filteredList.map((group, index) =>
          `│${index + 1}. ${group.threadName}\n│𝗚𝗥𝗢𝗨𝗣 𝗜𝗗: \n│${group.threadID}`
        );
        const message = `╭─────❁\n│𝗔𝗥𝗬𝗔𝗡 𝗟𝗜𝗦𝗧 𝗕𝗢𝗫 \n╰────────────❁\n\n╭────────────❁\n ${formattedList.map(line => `${line}`).join("\n")}\n`;
        await api.sendMessage(message, event.threadID, event.messageID);
      }
    } catch (error) {
      console.error("Error listing group chats", error);
    }
  },
}

const wrapper = new GoatWrapper(module.exports);
wrapper.applyNoPrefix({ allowPrefix: true });
