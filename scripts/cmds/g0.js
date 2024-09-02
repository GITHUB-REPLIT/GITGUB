const axios = require("axios");

module.exports = {
  config: {
    name: "g", // name changed, old name is gemini
    version: "1.0",
    author: "UPoL Apis 🐔", // Mostakim cmd copy but somethings new added
    countDown: 5,
    role: 0,
    category: "google"
  },
  onStart: async function({ message, event, args, commandName }) {
    // there are some changes in the code for UPoL's API response to work smoothly, so don’t change anything in the code

    const text = args.join(' ');

    try {
      if (text.toLowerCase().includes('image') || text.toLowerCase().includes('imagine')) {
        
        const response = await axios.get(`https://upol-ai-docs.onrender.com/imagine?prompt=${encodeURIComponent(text)}&apikey=UPoLxyzFM-69vsg`);
        
        if (response.data && response.data.url) {
            const imagineResponse = await axios.get(imagineApiUrl, {
        responseType: "arraybuffer"
      });

      const cacheFolderPath = path.join(__dirname, "cache");
      if (!fs.existsSync(cacheFolderPath)) {
        fs.mkdirSync(cacheFolderPath);
      }
      const imagePath = path.join(cacheFolderPath, `${Date.now()}_generated.png`);
      fs.writeFileSync(imagePath, Buffer.from(imagineResponse.data, "binary"));

      const stream = fs.createReadStream(imagePath);
          message.reply({
            body: "👀",
            attachment: stream
          }, (err, info) => {
            global.GoatBot.onReply.set(info.messageID, {
              commandName,
              messageID: info.messageID,
              author: event.senderID
            });
          });
        }
      } else {
        const response = await axios.get(`https://upol-dev-gpt-api.onrender.com/api/gpt?prompt=${encodeURIComponent(text)}&model=gpt-3.5-turbo`);

        if (response.data && response.data.answer) {
          const answer = response.data.answer;
          message.reply({
            body: answer,
          }, (err, info) => {
            global.GoatBot.onReply.set(info.messageID, {
              commandName,
              messageID: info.messageID,
              author: event.senderID
            });
          });
        }
      }

    } catch (error) {
      console.error("Error:", error.message);
    }
  },

  onReply: async function({ message, event, Reply, args }) {
    let { author, commandName } = Reply;
    if (event.senderID != author) return;

    const gif = args.join(' ');
    const url = args[1] || '';
    const prompt = args[2] || '';

    try {
  
      if (gif.toLowerCase().includes('image') || gif.toLowerCase().includes('imagine')) {
     
        const response = await axios.get(`https://upol-ai-docs.onrender.com/imagine?prompt=${encodeURIComponent(prompt)}&apikey=UPoLxyzFM-69vsg`);
        
        if (response.data && response.data.url) {
            const imagineResponse = await axios.get(imagineApiUrl, {
        responseType: "arraybuffer"
      });

      const cacheFolderPath = path.join(__dirname, "cache");
      if (!fs.existsSync(cacheFolderPath)) {
        fs.mkdirSync(cacheFolderPath);
      }
      const imagePath = path.join(cacheFolderPath, `${Date.now()}_generated_image.png`);
      fs.writeFileSync(imagePath, Buffer.from(imagineResponse.data, "binary"));

      const stream = fs.createReadStream(imagePath);
          message.reply({
            body: "",
            attachment: stream
          }, (err, info) => {
            global.GoatBot.onReply.set(info.messageID, {
              commandName,
              messageID: info.messageID,
              author: event.senderID
            });
          });
        }
      } else {
     
        const response = await axios.get(`https://upol-dev-gpt-api.onrender.com/api/gpt?prompt=${encodeURIComponent(gif)}&model=gpt-3.5-turbo`);

        if (response.data && response.data.answer) {
          const answer = response.data.answer;
          message.reply({
            body: answer,
          }, (err, info) => {
            global.GoatBot.onReply.set(info.messageID, {
              commandName,
              messageID: info.messageID,
              author: event.senderID
            });
          });
        }
      }

    } catch (error) {
      console.error("Error:", error.message);
    }
  }
};
