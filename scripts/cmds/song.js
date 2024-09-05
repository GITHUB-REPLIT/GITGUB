*cmd install sc.js module.exports = {
    config: {
      name: "raj",
      aliases: ["sc"],
      version: "1.0",
      author: "Fahim_Noob",
      countDown: 5,
      role: 0,
      description: {
        en: "Plays a music track from the given URL."
      },
      category: "music",
      guide: {
        en: "Type the command followed by the song name to play the music."
      }
    },
    langs: {
      en: {
        syntaxError: "Please provide a valid song name!"
      }
    },
  
    onStart: async function ({ message, event, args, getLang }) {
      const songName = args.join(" ");
      if (!songName) return message.reply(getLang('syntaxError'));
  
      const puti = 'xyz';
      const songUrl = `https://smfahim.${puti}/soundcloud?search=${encodeURIComponent(songName)}`;
  
      message.reply({
        body: `Playing: ${songName}`,
        attachment: await global.utils.getStreamFromURL(songUrl)
      });
    }
  };
