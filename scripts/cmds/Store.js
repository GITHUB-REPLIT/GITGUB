const { GoatWrapper } = require("fca-liane-utils");
const axios = require('axios');

module.exports = {
  config: {
    name: "stor",
    aliases: ["dk"],
    role: 1,
    shortDescription: {
      en: "View and manage items in the GoatMart."
    },
    category: "store",
    author: "Rômeo| ArYAN ",
  },
  onStart: async ({ api, event, args, message }) => {
    try {
      // Fetch items from the URL
      const { data: items } = await axios.get('https://raw.githubusercontent.com/romeoxaryan/scripts/main/cmds.json');
      
      if (!args[0]) {
        api.sendMessage(`📚 𝗖𝗺𝗱𝘀𝘁𝗼𝗿𝗲\n━━━━━━━━━━━━\n\n➜ ${event.body} page <page number>\n➜ ${event.body} show <Item ID>\n➜ ${event.body} upload <JSON FORMAT>\n➜ ${event.body} edit <Item ID>\n➜ ${event.body} search <Item name>\n➜ ${event.body} delete <Item ID>\n\n📒 Note: If you need help with upload or edit, you can ask our GoatMart developers for guidance.\n\n- Team GoatMart\nThank you for using our GoatMart services 🥰.`, event.threadID, event.messageID);
      } else if (args[0] === "page") {
        const pageNumber = parseInt(args[1]);
        const totalItems = items.length;
        const totalPages = Math.ceil(totalItems / 6);
        const offset = (pageNumber - 1) * 6;

        if (pageNumber <= 0 || pageNumber > totalPages || isNaN(pageNumber)) {
          api.sendMessage("📚 𝗖𝗺𝗱𝘀𝘁𝗼𝗿𝗲\n━━━━━━━━━━━━\nThe page number you are trying to access is invalid. Please provide a valid page number.", event.threadID, event.messageID);
        } else {
          const pageItems = items.slice(offset, offset + 6);

          const itemDescriptions = pageItems.map(
            (item) =>
              `👑 Item Name: ${item.itemName}\n🆔 Item ID: ${item.itemID}\n⚙ Item Type: ${item.type || "Unknown"}\n📝 Description: ${item.description}\n💻 Author: ${item.authorName}\n📅 Time: ${new Date(item.timestamp).toLocaleString()}\n\n━━━━━━━━━━━━\n`
          );

          const itemInfo = itemDescriptions.join("\n");

          message.reply(`📚 𝗚𝗼𝗮𝘁𝗠𝗮𝗿𝘁\n━━━━━━━━━━━━\n\n✅ Items are listed in GoatMart\n\n${itemInfo}📝 Usage:\n ${event.body.split(" ")[0]} [ show ] <item id> to view command data.\n\n👑 Pages: [ ${pageNumber} / ${totalPages} ]\n\n- Team GoatMart`, event.threadID, event.messageID);
        }
      } else if (args[0] === "show") {
        const itemID = isNaN(args[1]) ? args[1] : parseInt(args[1]);
        
        // Find the item with the given ID
        const item = items.find(i => i.itemID === itemID || i.itemName.toLowerCase() === itemID.toLowerCase());

        if (item) {
          message.reply(`📚 𝗚𝗼𝗮𝘁𝗠𝗮𝗿𝘁\n━━━━━━━━━━━━\n\n👑 Item Name: ${item.itemName}\n🆔 Item ID: ${item.itemID}\n📝 Description: ${item.description}\n📁 Item Link: ${item.pastebinLink}\n\n- Team GoatMart\nThank you for using our GoatMart services 🥰.`, event.threadID, event.messageID);
        } else {
          message.reply("📚 𝗖𝗺𝗱𝘀𝘁𝗼𝗿𝗲\n━━━━━━━━━━━━\n\n𝖸𝗈𝗎 𝖺𝗋𝖾 𝖨𝖣 𝖿𝗋𝗈𝗆 𝗎𝗌𝗂𝗇𝗀 𝗍𝗁𝗂𝗌 𝖼𝗈𝗆𝗆𝖺𝗇𝖽.\n\n- 𝖳𝖾𝖺𝗆 𝗖𝗺𝗱𝘀𝘁𝗼𝗿𝗲\n𝖳𝗁𝖺𝗇𝗄 𝗒𝗈𝗎 𝖿𝗈𝗋 𝗎𝗌𝗂𝗇𝗀 𝗈𝗎𝗋 𝖢𝗆𝖽𝗌𝗍𝗈𝗋𝖾 𝗌𝖾𝗋𝗏𝗂𝖼𝖾𝗌 🥰.", event.threadID, event.messageID);
        }
      } else if (args[0] === "upload") {
        try {
          const jsonData = JSON.parse(args.slice(1).join(' '));
          // Save the JSON data to your database or storage
          // For example, you could send it to an API or save it locally
          // This part will depend on your backend setup

          // Example response
          api.sendMessage("📚 𝗖𝗺𝗱𝘀𝘁𝗼𝗿𝗲\n━━━━━━━━━━━━\n\n✅ Item successfully uploaded to GoatMart \n\n -𝖳𝖾𝖺𝗆 𝗖𝗺𝗱𝘀𝘁𝗼𝗿𝗲\n𝖳𝗁𝖺𝗇𝗄 𝗒𝗈𝗎 𝖿𝗈𝗋 𝗎𝗌𝗂𝗇𝗀 𝗈𝗎𝗋 𝖢𝗆𝖽𝗌𝗍𝗈𝗋𝖾 𝗌𝖾𝗋𝗏𝗂𝖼𝖾𝗌 🥰.", event.threadID, event.messageID);
        } catch (error) {
          api.sendMessage("📚 𝗖𝗺𝗱𝘀𝘁𝗼𝗿𝗲\n━━━━━━━━━━━━\n\n❌ Error parsing JSON. Please make sure your JSON format is correct \n\n -𝖳𝖾𝖺𝗆 𝗖𝗺𝗱𝘀𝘁𝗼𝗿𝗲\n𝖳𝗁𝖺𝗇𝗄 𝗒𝗈𝗎 𝖿𝗈𝗋 𝗎𝗌𝗂𝗇𝗀 𝗈𝗎𝗋 𝖢𝗆𝖽𝗌𝗍𝗈𝗋𝖾 𝗌𝖾𝗋𝗏𝗂𝖼𝖾𝗌 🥰.", event.threadID, event.messageID);
        }
      } else if (args[0] === "edit") {
        const itemID = isNaN(args[1]) ? args[1] : parseInt(args[1]);
        const itemIndex = items.findIndex(i => i.itemID === itemID || i.itemName.toLowerCase() === itemID.toLowerCase());

        if (itemIndex !== -1) {
          const newItemData = JSON.parse(args.slice(2).join(' '));
          items[itemIndex] = { ...items[itemIndex], ...newItemData };
          // Update the item in your database or storage
          // For example, send the updated item to an API or save it locally

          // Example response
          api.sendMessage("📚 𝗖𝗺𝗱𝘀𝘁𝗼𝗿𝗲\n━━━━━━━━━━━━\n\n✅ Item successfully edited in Cmdstore \n\n -𝖳𝖾𝖺𝗆 𝗖𝗺𝗱𝘀𝘁𝗼𝗿𝗲\n𝖳𝗁𝖺𝗇𝗄 𝗒𝗈𝗎 𝖿𝗈𝗋 𝗎𝗌𝗂𝗇𝗀 𝗈𝗎𝗋 𝖢𝗆𝖽𝗌𝗍𝗈𝗋𝖾 𝗌𝖾𝗋𝗏𝗂𝖼𝖾𝗌 🥰.", event.threadID, event.messageID);
        } else {
          api.sendMessage("📚 𝗖𝗺𝗱𝘀𝘁𝗼𝗿𝗲\n━━━━━━━━━━━━\n\n🛑 Item not found. Check the item ID or name\n\n -𝖳𝖾𝖺𝗆 𝗖𝗺𝗱𝘀𝘁𝗼𝗿𝗲\n𝖳𝗁𝖺𝗇𝗄 𝗒𝗈𝗎 𝖿𝗈𝗋 𝗎𝗌𝗂𝗇𝗀 𝗈𝗎𝗋 𝖢𝗆𝖽𝗌𝗍𝗈𝗋𝖾 𝗌𝖾𝗋𝗏𝗂𝖼𝖾𝗌 🥰.", event.threadID, event.messageID);
        }
      } else if (args[0] === "search") {
        const searchName = args.slice(1).join(' ').toLowerCase();
        const foundItems = items.filter(i => i.itemName.toLowerCase().includes(searchName));

        if (foundItems.length > 0) {
          const searchResults = foundItems.map(
            (item) =>
              `👑 Item Name: ${item.itemName}\n🆔 Item ID: ${item.itemID}\n⚙ Item Type: ${item.type || "Unknown"}\n📝 Description: ${item.description}\n💻 Author: ${item.authorName}\n📅 Time: ${new Date(item.timestamp).toLocaleString()}\n\n━━━━━━━━━━━━\n`
          ).join("\n");

          message.reply(`📚 𝗖𝗺𝗱𝘀𝘁𝗼𝗿𝗲\n━━━━━━━━━━━━\n\nFound items:\n\n${searchResults}`, event.threadID, event.messageID);
        } else {
          api.sendMessage("📚 𝗖𝗺𝗱𝘀𝘁𝗼𝗿𝗲\n━━━━━━━━━━━━\n𝖳𝗁𝖾 𝗌𝖾𝖺𝗋𝖼𝗁 𝗍𝖾𝗋𝗆 𝗒𝗈𝗎 𝗉𝗋𝗈𝗏𝗂𝖽𝖾𝖽 𝖽𝗈𝖾𝗌 𝗇𝗈𝗍 𝗆𝖺𝗍𝖼𝗁 𝖺𝗇𝗒 𝖺𝗏𝖺𝗂𝗅𝖺𝖻𝗅𝖾 𝗂𝗍𝖾𝗆𝗌 𝗂𝗇 𝗈𝗎𝗋 𝗖𝗺𝗱𝘁𝗼𝗿𝗲𝗐𝖾𝖻𝗌𝗂𝗍𝖾.\n\n- 𝖳𝖾𝖺𝗆 𝗖𝗺𝗱𝘀𝘁𝗼𝗿𝗲\n𝖳𝗁𝖺𝗇𝗄 𝗒𝗈𝗎 𝖿𝗈𝗋 𝗎𝗌𝗂𝗇𝗀 𝗈𝗎𝗋 𝖢𝗆𝖽𝗌𝗍𝗈𝗋𝖾 𝗌𝖾𝗋𝗏𝗂𝖼𝖾𝗌 🥰.", event.threadID, event.messageID);
        }
      } else if (args[0] === "delete") {
        const itemID = isNaN(args[1]) ? args[1] : parseInt(args[1]);
        const itemIndex = items.findIndex(i => i.itemID === itemID || i.itemName.toLowerCase() === itemID.toLowerCase());

        if (itemIndex !== -1) {
          items.splice(itemIndex, 1);
          // Delete the item from your database or storage
          // For example, send a delete request to an API or remove it locally

          // Example response
          api.sendMessage("📚 𝗖𝗺𝗱𝘀𝘁𝗼𝗿𝗲\n━━━━━━━━━━━━\n\n✅ 𝖨𝗍𝖾𝗆 𝖽𝖾𝗅𝖾𝗍𝖾𝖽 𝗌𝗎𝖼𝖼𝖾𝗌𝗌𝖿𝗎𝗅𝗅𝗒 𝖿𝗋𝗈𝗆 𝗖𝗺𝗱𝘀𝘁𝗼𝗿𝗲\n\n -𝖳𝖾𝖺𝗆 𝗖𝗺𝗱𝘀𝘁𝗼𝗿𝗲\n𝖳𝗁𝖺𝗇𝗄 𝗒𝗈𝗎 𝖿𝗈𝗋 𝗎𝗌𝗂𝗇𝗀 𝗈𝗎𝗋 𝖢𝗆𝖽𝗌𝗍𝗈𝗋𝖾 𝗌𝖾𝗋𝗏𝗂𝖼𝖾𝗌 🥰.", event.threadID, event.messageID);
        } else {
          api.sendMessage("📚 𝗖𝗺𝗱𝘁𝗼𝗿𝗲\n━━━━━━━━━━━━\n𝖳𝗁𝖾 𝗌𝖾𝖺𝗋𝖼𝗁 𝗍𝖾𝗋𝗆 𝗒𝗈𝗎 𝗉𝗋𝗈𝗏𝗂𝖽𝖾𝖽 𝖽𝗈𝖾𝗌 𝗇𝗈𝗍 𝗆𝖺𝗍𝖼𝗁 𝖺𝗇𝗒 𝖺𝗏𝖺𝗂𝗅𝖺𝖻𝗅𝖾 𝗂𝗍𝖾𝗆𝗌 𝗂𝗇 𝗈𝗎𝗋 𝗖𝗺𝗱𝘀𝘁𝗼𝗿𝗲𝗐𝖾𝖻𝗌𝗂𝗍𝖾.\n\n- 𝖳𝖾𝖺𝗆 𝗖𝗺𝗱𝘀𝘁𝗼𝗿𝗲\n𝖳𝗁𝖺𝗇𝗄 𝗒𝗈𝗎 𝖿𝗈𝗋 𝗎𝗌𝗂𝗇𝗀 𝗈𝗎𝗋 𝖢𝗆𝖽𝗌𝗍𝗈𝗋𝖾 𝗌𝖾𝗋𝗏𝗂𝖼𝖾𝗌 🥰.", event.threadID, event.messageID);
        }
      } else {
        api.sendMessage("📚 𝗖𝗺𝗱𝘀𝘁𝗼𝗿𝗲\n━━━━━━━━━━━━\nThe command you used is not recognized. Please check the available commands and try again.\n\n -𝖳𝖾𝖺𝗆 𝗖𝗺𝗱𝘀𝘁𝗼𝗿𝗲\n𝖳𝗁𝖺𝗇𝗄 𝗒𝗈𝗎 𝖿𝗈𝗋 𝗎𝗌𝗂𝗇𝗀 𝗈𝗎𝗋 𝖢𝗆𝖽𝗌𝗍𝗈𝗋𝖾 𝗌𝖾𝗋𝗏𝗂𝖼𝖾𝗌 🥰.", event.threadID, event.messageID);
      }
    } catch (error) {
      console.error(error);
      api.sendMessage("📚 𝗖𝗺𝗱𝘀𝘁𝗼𝗿𝗲\n━━━━━━━━━━━━\n\n❌ 𝖠𝗇 𝖾𝗋𝗋𝗈𝗋 𝗈𝖼𝖼𝗎𝗋𝗋𝖾𝖽 𝗐𝗁𝗂𝗅𝖾 𝗁𝖺𝗇𝖽𝗅𝗂𝗇𝗀 𝗒𝗈𝗎𝗋 𝗋𝖾𝗊𝗎𝖾𝗌𝗍 . 𝗉𝗅𝖾𝖺𝖼𝖾 𝗍𝗋𝗒 𝖺𝗀𝖺𝗂𝗇𝖾 𝗅𝖺𝗍𝖾𝗋\n\n- 𝖳𝖾𝖺𝗆 𝗖𝗺𝗱𝘀𝘁𝗼𝗿𝗲\n𝖳𝗁𝖺𝗇𝗄 𝗒𝗈𝗎 𝖿𝗈𝗋 𝗎𝗌𝗂𝗇𝗀 𝗈𝗎𝗋 𝖢𝗆𝖽𝗌𝗍𝗈𝗋𝖾 𝗌𝖾𝗋𝗏𝗂𝖼𝖾𝗌 🥰.", event.threadID, event.messageID);
    }
  }
}

const wrapper = new GoatWrapper(module.exports);
wrapper.applyNoPrefix({ allowPrefix: true });
