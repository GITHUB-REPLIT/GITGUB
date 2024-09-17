const { GoatWrapper } = require("fca-liane-utils");
module.exports = {
    config: {
        name: "aryan",
        version: "1.0",
        author: "ArYa", //** original author fb I'd : https://m.me/MR.AYAN.2X **//
        countDown: 5,
        role: 0,
        shortDescription: "No Prefix",
        longDescription: "No Prefix",
        category: "reply",
    },
onStart: async function(){}, 
onChat: async function({
    event,
    message,
    getLang
}) {
    if (event.body && event.body.toLowerCase() == "Aryan") return message.reply("ARYAN ALMIGHTY LORD YHWACH IS BUSY PLEASE WAIT 👑");
}
}
    
const wrapper = new GoatWrapper(module.exports);
wrapper.applyNoPrefix({ allowPrefix: true });
