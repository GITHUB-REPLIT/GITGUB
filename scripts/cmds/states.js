const os = require('os'); 

module.exports = {
  config: {
    name: "stats",
    aliases: ["stat"],
    version: "1.1", // Updated version
    author: "OtinXSandip",
    role: 0,
    shortDescription: {
      en: "Shows stats of the bot.",
    },
    longDescription: {
      en: "Displays various statistics about the bot including uptime, current date and time, total users, total threads, ping, and hostname.",
    },
    category: "tools",
    guide: {
      en: "Use {p}stats to see stats of the bot.",
    },
  },

  onStart: async function ({ api, event, args, usersData, threadsData }) {
    try {
      const allUsers = await usersData.getAll();
      const allThreads = await threadsData.getAll();
      const uptime = process.uptime();

      const hours = Math.floor(uptime / 3600);
      const minutes = Math.floor((uptime % 3600) / 60);
      const seconds = Math.floor(uptime % 60);

      const uptimeString = `${hours}Hrs ${minutes}min ${seconds}sec`;

      const currentDate = new Date();
      const options = { year: "numeric", month: "numeric", day: "numeric" };
      const date = currentDate.toLocaleDateString("en-US", options);
      const time = currentDate.toLocaleTimeString("en-US", {
        timeZone: "Asia/Dhaka",
        hour12: true,
      });

      const timeStart = Date.now();

      const ping = Date.now() - timeStart;

      let pingStatus = "Not smooth throw your router, buddy";
      if (ping < 400) {
        pingStatus = "Smooth like your tiny fingers";
      }

      

      const hostname = os.hostname();

      api.sendMessage({
        body: `👾 | Bot running time\n☞ ${uptimeString}\n\n📅 | Date: ${date}\n\n⏰ | Time: ${time}\n\n🐉 | Total Users\n☞ ${allUsers.length}\n\n🌸 | Total Threads\n☞ ${allThreads.length}\n\n🌝 | Ping: ${ping}ms\n\nPing Status: ${pingStatus}\n\n🏠 | Hostname: ${hostname}`,
      }, event.threadID);
    } catch (error) {
      console.error(error);
      api.sendMessage("An error occurred while retrieving data.", event.threadID);
    }
  }
};
