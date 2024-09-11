const axios = require('axios');

module.exports = {
  config: {
    name: "raj",
    aliases: ["raj"],
    version: "1.0.0",
    author: "𝙼𝚘𝚜𝚝𝚊𝚔𝚒𝚎𝚖",
    role: 2,
    category: "Image Generation",
    shortDescription: {
      en: "Generate an image based on a prompt",
      vi: "Tạo hình ảnh dựa trên một prompt"
    },
    longDescription: {
      en: "This command generates an image based on a prompt using an external API.",
      vi: "Lệnh này tạo ra một hình ảnh dựa trên một prompt bằng cách sử dụng API bên ngoài."
    },
    guide: {
      en: "To use this command, simply type generateImage followed by your prompt.",
      vi: "Để sử dụng lệnh này, đơn giản nhấp generateImage theo sau là prompt của bạn."
    }
  },
  onStart: async ({ event, args, api }) => {
    try {
      const prompt = args.join(" "); // Join the arguments to form the prompt
      const apiUrl = `${global.GoatBot.config.mostakim}/img?text=${encodeURIComponent(prompt)}`;

      api.sendMessage("pleace wait...🫡", event.threadID);

      // Fetch image using the API
      const response = await axios.get(apiUrl);

      // Check if the response contains an image URL
      if (response.data && response.data.output && response.data.output.length > 0) {
        const output = response.data.output[0]; // Use the first image URL from the output array

        const imageResponse = await axios({
          url: output,
          responseType: 'stream'
        });

        api.sendMessage({
          body: " Here is your generated raj",
          attachment: imageResponse.data
        }, event.threadID);
      } else {
        api.sendMessage("Filed to genere raj. pleace try again.", event.threadID);
      }
    } catch (error) {
      console.error("Error generating image:", error);
      api.sendMessage("an error", event.threadID);
    }
  },
  onReply: async ({ api, event, message, args, commandName }) => {
    // Additional logic to handle user replies if necessary
  }
};
