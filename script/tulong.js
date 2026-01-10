module.exports.config = {
  name: "tulong",
  version: "1.0",
  hasPermssion: 0,
  credits: "Jerobie",
  description: "Display all bot commands",
  usage: "tulong",
};

module.exports.run = async function({ api, event }) {
  const helpText = `
✨ 𝓙𝓮𝓻𝓸𝓫𝓲𝓮 𝓐𝐈 — 𝐂𝐨𝐦𝐦𝐚𝐧𝐝 𝐂𝐞𝐧𝐭𝐞𝐫 ✨
━━━━━━━━━━━━━━━━━━━━━━

📂 🛠️ 𝐔𝐓𝐈𝐋𝐈𝐓𝐈𝐄𝐒
🟢 :accept       └─ Confirm user       💡 :accept 12345
🟢 :active       └─ Status check       💡 :active
🟢 :adc          └─ Auto DC            💡 :adc
🟢 :adduser      └─ Add member         💡 :adduser @tag
🟢 :allgroups    └─ List groups        💡 :allgroups
🟢 :antiadmin    └─ Anti admin         💡 :antiadmin on
🟢 :applemusic   └─ Music search       💡 :applemusic Believer
🟢 :autoseen     └─ Auto seen          💡 :autoseen on
🟢 :avatar       └─ Profile pic        💡 :avatar
🟢 :babye        └─ Baby emoji         💡 :babye
🟢 :badwords     └─ Filter words       💡 :badwords list
🟢 :bakla        └─ Fun label          💡 :bakla
🟢 :billboard    └─ Billboard fetch    💡 :billboard

────────────────────────
📂 🤖 𝐀𝐈 & 𝐁𝐎𝐓
🟢 :ai           └─ Ask AI             💡 :ai Kumusta?
🟢 :meta         └─ Meta AI            💡 :meta Chess
🟢 :lootedpinay  └─ Video fetch        💡 :lootedpinay 5
🟢 :bible        └─ Bible verse        💡 :bible
🟢 :lyrics       └─ Song lyrics        💡 :lyrics Believer
🟢 :hug          └─ Send hug           💡 :hug @tag
🟢 :hugot        └─ Hugot lines        💡 :hugot
🟢 :hugv2        └─ Hug version2       💡 :hugv2 @tag
🟢 :chat         └─ Chat AI            💡 :chat Kumusta?
🟢 :chatfun      └─ Fun chat           💡 :chatfun Sabihin mo
🟢 :dalle        └─ Generate image     💡 :dalle Sunset
🟢 :faceswap     └─ Swap face          💡 :faceswap
🟢 :font         └─ Stylish text       💡 :font Hello
🟢 :gagstock     └─ Funny stock        💡 :gagstock
🟢 :gemini       └─ Gemini AI          💡 :gemini Hello
🟢 :mistral      └─ Mistral AI         💡 :mistral
🟢 :mix          └─ Mix content        💡 :mix
🟢 :nglspam      └─ NGL spam           💡 :nglspam 5

────────────────────────
📂 🏰 𝐇𝐎𝐔𝐒𝐄 𝐂𝐎𝐌𝐌𝐀𝐍𝐃𝐒
🟢 :gryffindor   └─ Gryff welcome      💡 :gryffindor
🟢 :ravenclaw    └─ Raven welcome      💡 :ravenclaw
🟢 :slytherin    └─ Slyth welcome      💡 :slytherin
🟢 :hufflepuff   └─ Huff welcome       💡 :hufflepuff
🟢 :war          └─ House battle       💡 :war

────────────────────────
📂 🎮 𝐆𝐀𝐌𝐄𝐒 & 𝐅𝐔𝐍
🟢 :pickupline   └─ Flirty line        💡 :pickupline
🟢 :meme         └─ Meme fetch         💡 :meme
🟢 :bratvid      └─ Brat video         💡 :bratvid
🟢 :waifu-bot    └─ Waifu bot          💡 :waifu-bot
🟢 :catfact      └─ Cat fact           💡 :catfact
🟢 :spank        └─ Fun spank          💡 :spank
🟢 :patay        └─ Kill message       💡 :patay
🟢 :pet          └─ Pet info           💡 :pet
🟢 :quiz         └─ Quiz game          💡 :quiz

────────────────────────
📂 🌐 𝐖𝐄𝐁 & 𝐓𝐎𝐎𝐋𝐒
🟢 :githubrepo   └─ GitHub repo        💡 :githubrepo user/repo
🟢 :githubuser   └─ GitHub user        💡 :githubuser username
🟢 :imgbb        └─ Upload image       💡 :imgbb
🟢 :imgur        └─ Upload image       💡 :imgur
🟢 :search       └─ Web search         💡 :search chess.com
🟢 :qr           └─ Generate QR        💡 :qr
🟢 :pastebin     └─ Paste text         💡 :pastebin Hello
🟢 :upscale      └─ Image upscale      💡 :upscale
🟢 :removebg     └─ Remove BG          💡 :removebg
🟢 :recipe       └─ Food recipe        💡 :recipe

────────────────────────
📂 📢 𝐀𝐃𝐌𝐈𝐍
🟢 :kick         └─ Kick user          💡 :kick @tag
🟢 :setname      └─ Set name           💡 :setname MyName
🟢 :blockuser    └─ Block user         💡 :blockuser @tag
🟢 :resetmemory  └─ Reset memory       💡 :resetmemory
🟢 :out          └─ Leave thread       💡 :out
🟢 :outall       └─ Leave all          💡 :outall
🟢 :prefix       └─ Set prefix         💡 :prefix :

────────────────────────
📂 📅 𝐄𝐕𝐄𝐍𝐓𝐒
🟢 :goodbye               └─ Goodbye msg        💡 :goodbye
🟢 :auto-weather-ph-zones └─ Auto weather      💡 :auto-weather-ph-zones
🟢 :welcome               └─ Welcome msg        💡 :welcome
🟢 :antiout               └─ Anti leave         💡 :antiout
🟢 :autodownload          └─ Auto download      💡 :autodownload
🟢 :auto-post             └─ Auto post          💡 :auto-post
🟢 :nickname              └─ Nickname update    💡 :nickname
🟢 :resend                └─ Resend msg         💡 :resend
🟢 :soyeon                └─ Soyeon bot         💡 :soyeon
🟢 :waifu-bot             └─ Waifu bot          💡 :waifu-bot

────────────────────────
📌 Tip: Type commands with prefix, follow usage examples.
━━━━━━━━━━━━━━━━━━━━━━
© Jerobie AI
`;

  return api.sendMessage(helpText, event.threadID);
};