const axios = require("axios");
module.exports.config = {
  name: "npx",
  author: "ArYan",
  category: "jani na"
}
module.exports.onStart = async function ({}) {};
module.exports.onChat = async ({api,event}) => {
  const non = event.body.toLowerCase()
  if (non.includes("❤️‍🩹")||non.includes("🤍")||non.includes("❤️")||non.includes("💔")) {
 try {
      const response = await axios.get(`https://a6-video-api-t0il.onrender.com/video/love`)
    const type = response.data
    const a6 = type.data
    const a6y = await axios.get(a6, {responseType: 'stream'})
    const a6y1 = a6y.data
    api.sendMessage({body:`-༎• প্রিয় মানুষ তো সেই__😊\n🌸🖤যে বকা দিবে,শাসন করবে,আবার চোখে পানি আসার আগেই ভালেবাসা দিয়ে ভুলিয়ে দেবে__༎•🌼😊`,attachment: a6y1},event.threadID,event.messageID)
 
 } catch (error) {
   api.sensMessage(`error:${error.message}`,event.threadID,event.messageID)
 } }
}
