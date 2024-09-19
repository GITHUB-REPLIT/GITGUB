const axios = require('axios');

module.exports = {
  config: {
    name: "store",
    aliases: ["st"],
    role: 1,
    shortDescription: {
      en: "View and manage items in the GoatMart."
    },
    category: "store",
    author: " ArYan",
  },
  onStart: async ({ api, event, args, message }) => {
    try {
      // Fetch items from the URL
      const { data: items } = await axios.get('https://raw.githubusercontent.com/ARYAN-AROHI/AROHI-ARYAN/main/cmds.json');
      
      if (!args[0]) {
        api.sendMessage(`📚𝗔𝗥𝗬𝗔𝗡 𝗦𝗧𝗢𝗥𝗘\n━━━━━━━━━━━━\n\n➜ ${event.body} page <page number>\n➜ ${event.body} show <Item ID>\n➜ ${event.body} upload <JSON FORMAT>\n➜ ${event.body} edit <Item ID>\n➜ ${event.body} search <Item name>\n➜ ${event.body} delete <Item ID>\n\n📒 Note: If you need help with upload or edit, you can ask our Aryanstore developers for guidance.\n\n- Team ArYanStore\nThank you for using our ArYanStore services 🥰.`, event.threadID, event.messageID);
      } else if (args[0] === "page") {
        const pageNumber = parseInt(args[1]);
        const totalItems = items.length;
        const totalPages = Math.ceil(totalItems / 6);
        const offset = (pageNumber - 1) * 6;

        if (pageNumber <= 0 || pageNumber > totalPages || isNaN(pageNumber)) {
          api.sendMessage("📚 𝗔𝗥𝗬𝗔𝗡 𝗦𝗧𝗢𝗥𝗘\n━━━━━━━━━━━━\nThe page number you are trying to access is invalid. Please provide a valid page number.", event.threadID, event.messageID);
        } else {
          const pageItems = items.slice(offset, offset + 6);

          const itemDescriptions = pageItems.map(
            (item) =>
              `👑 Item Name: ${item.itemName}\n🆔 Item ID: ${item.itemID}\n⚙ Item Type: ${item.type || "Unknown"}\n📝 Description: ${item.description}\n💻 Author: ${item.authorName}\n📅 Time: ${new Date(item.timestamp).toLocaleString()}\n\n━━━━━━━━━━━━\n`
          );

          const itemInfo = itemDescriptions.join("\n");

          message.reply(`📚 𝗔𝗥𝗬𝗔𝗡 𝗦𝗧𝗢𝗥𝗘\n━━━━━━━━━━━━\n\n✅ Items are listed in ArYanStore\n\n${itemInfo}📝 Usage:\n ${event.body.split(" ")[0]} [ show ] <item id> to view command data.\n\n👑 Pages: [ ${pageNumber} / ${totalPages} ]\n\n- Team ArYanStore`, event.threadID, event.messageID);
        }
      } else if (args[0] === "show") {
        const itemID = isNaN(args[1]) ? args[1] : parseInt(args[1]);
        
        // Find the item with the given ID
        const item = items.find(i => i.itemID === itemID || i.itemName.toLowerCase() === itemID.toLowerCase());

        if (item) {
          message.reply(`📚 𝗔𝗥𝗬𝗔𝗡 𝗦𝗧𝗢𝗥𝗘\n━━━━━━━━━━━━\n\n👑 Item Name: ${item.itemName}\n🆔 Item ID: ${item.itemID}\n📝 Description: ${item.description}\n📁 Item Link: ${item.pastebinLink}\n\n- Team ArYanStore\nThank you for using our ArYanStore services 🥰.`, event.threadID, event.messageID);
        } else {
          message.reply("🛑 Item not found. Check the item ID or name.", event.threadID, event.messageID);
        }
      } else if (args[0] === "upload") {
        try {
          const jsonData = JSON.parse(args.slice(1).join(' '));
          // Save the JSON data to your database or storage
          // For example, you could send it to an API or save it locally
          // This part will depend on your backend setup

          // Example response
          api.sendMessage("✅ Item successfully uploaded to GoatMart.", event.threadID, event.messageID);
        } catch (error) {
          api.sendMessage("❌ Error parsing JSON. Please make sure your JSON format is correct.", event.threadID, event.messageID);
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
          api.sendMessage("✅ Item successfully edited in GoatMart.", event.threadID, event.messageID);
        } else {
          api.sendMessage("🛑 Item not found. Check the item ID or name.", event.threadID, event.messageID);
        }
      } else if (args[0] === "search") {
        const searchName = args.slice(1).join(' ').toLowerCase();
        const foundItems = items.filter(i => i.itemName.toLowerCase().includes(searchName));

        if (foundItems.length > 0) {
          const searchResults = foundItems.map(
            (item) =>
              `👑 Item Name: ${item.itemName}\n🆔 Item ID: ${item.itemID}\n⚙ Item Type: ${item.type || "Unknown"}\n📝 Description: ${item.description}\n💻 Author: ${item.authorName}\n📅 Time: ${new Date(item.timestamp).toLocaleString()}\n\n━━━━━━━━━━━━\n`
          ).join("\n");

          message.reply(`📚 𝗔𝗥𝗬𝗔𝗡 𝗦𝗧𝗢𝗥𝗘\n━━━━━━━━━━━━\n\n✅ Found items:\n\n${searchResults}`, event.threadID, event.messageID);
        } else {
          api.sendMessage("🛑 No items found matching your search criteria.", event.threadID, event.messageID);
        }
      } else if (args[0] === "delete") {
        const itemID = isNaN(args[1]) ? args[1] : parseInt(args[1]);
        const itemIndex = items.findIndex(i => i.itemID === itemID || i.itemName.toLowerCase() === itemID.toLowerCase());

        if (itemIndex !== -1) {
          items.splice(itemIndex, 1);
          // Delete the item from your database or storage
          // For example, send a delete request to an API or remove it locally

          // Example response
          api.sendMessage("✅ Item successfully deleted from GoatMart.", event.threadID, event.messageID);
        } else {
          api.sendMessage("🛑 Item not found. Check the item ID or name.", event.threadID, event.messageID);
        }
      } else {
        api.sendMessage("📚 𝗔𝗥𝗬𝗔𝗡 𝗦𝗧𝗢𝗥𝗘\n━━━━━━━━━━━━\nThe command you used is not recognized. Please check the available commands and try again.", event.threadID, event.messageID);
      }
    } catch (error) {
      console.error(error);
      api.sendMessage("❌ An error occurred while handling your request. Please try again later.", event.threadID, event.messageID);
    }
  }
};
