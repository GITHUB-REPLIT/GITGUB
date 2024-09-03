const fs = require("fs-extra");
const request = require("request");

module.exports = {
config: {
		name: "groupinfo",
    aliases: ['boxinfo'],
    version: "1.0",
		author: "Loid Butter",
		countDown: 5,
		role: 0,
		shortDescription: "See Full Box Information With Image",
		longDescription: "",
		category: "Group Chat",
		guide: {
      en: "{p} [groupinfo|boxinfo]",
    }
	},

 onStart: async function ({ api, event, args }) {
	let threadInfo = await api.getThreadInfo(event.threadID);
	var memLength = threadInfo.participantIDs.length;
	let threadMem = threadInfo.participantIDs.length;
	var nameMen = [];
    var gendernam = [];
    var gendernu = [];
    var nope = [];
     for (let z in threadInfo.userInfo) {
     	var gioitinhone = threadInfo.userInfo[z].gender;
     	var nName = threadInfo.userInfo[z].name;
        if(gioitinhone == "MALE"){gendernam.push(z+gioitinhone)}
        else if(gioitinhone == "FEMALE"){gendernu.push(gioitinhone)}
            else{nope.push(nName)}
    };
	var nam = gendernam.length;
    var nu = gendernu.length;
   var listad = '';
   var qtv2 = threadInfo.adminIDs;
	let qtv = threadInfo.adminIDs.length;
	let sl = threadInfo.messageCount;
	let u = threadInfo.nicknames;
	let icon = threadInfo.emoji;
	let threadName = threadInfo.threadName;
	let id = threadInfo.threadID;
   for (let i = 0; i < qtv2.length; i++) {
const infu = (await api.getUserInfo(qtv2[i].id));
const name = infu[qtv2[i].id].name;
		listad += '•' + name + '\n';
	}
	let sex = threadInfo.approvalMode;
			var pd = sex == false ? 'Turned off' : sex == true ? 'Turned on' : 'loid';
			var callback = () =>
				api.sendMessage(
					{
						body: `👪「 𝖦𝖢 𝖭𝖠𝖬𝖤 」:${threadName}\n❇️「 𝖦𝖱𝖮𝖴𝖯 𝖨𝖣 」: ${id}\n✅「 𝖠𝖯𝖯𝖱𝖴𝖵𝖠𝖫 」: ${pd}\n✴️「 𝖤𝖬𝖮𝖩𝖨 」: ${icon}\n☢️「 𝖨𝖭𝖥𝖮𝖱𝖬𝖠𝖳𝖨𝖮𝖭 」: 𝖨𝖭𝖢𝖫𝖴𝖣𝖨𝖭𝖦 ${threadMem} 𝖬𝖤𝖬𝖡𝖤𝖱𝖲\n🙎‍♂️「 𝖭𝖴𝖬𝖡𝖤𝖱 𝖮𝖥 𝖬𝖠𝖫𝖤𝖲 」: ${nam}\n🙎‍♀️「 𝖭𝖴𝖬𝖡𝖤𝖱 𝖮𝖥 𝖥𝖤𝖬𝖠𝖫𝖲 」:  ${nu}\n👑「 𝖳𝖮𝖳𝖠𝖫 𝖠𝖣𝖬𝖨𝖭𝖨𝖲𝖳𝖱𝖠𝖳𝖮𝖱𝖲 」: ${qtv} \n「 𝖨𝖭𝖢𝖫𝖴𝖡𝖤 」:\n${listad}\n💌「 𝖳𝖮𝖳𝖠𝖫 𝖭𝖴𝖬𝖡𝖤𝖱 𝖮𝖥 𝖬𝖤𝖲𝖲𝖠𝖦𝖤𝖲 」: ${sl} msgs.\n\n𝖡𝖸: Loid Senpai Follow https://www.facebook.com/ArYan.com.404`,
						attachment: fs.createReadStream(__dirname + '/cache/1.png')
					},
					event.threadID,
					() => fs.unlinkSync(__dirname + '/cache/1.png'),
					event.messageID
				);
			return request(encodeURI(`${threadInfo.imageSrc}`))
				.pipe(fs.createWriteStream(__dirname + '/cache/1.png'))
				.on('close', () => callback());
 }
};
