const fetch = require("node-fetch");
const fs = require("fs");

/* ================= ADMIN ================= */
const ADMIN_ID = "100001139243627";

/* ================= OWNER INFO ================= */
const OWNER_INFO = {
  name: "Jero",
  bot: "Jero.Ai.3.0",
  facebook: "https://www.facebook.com/jirokeene.bundang",
  phone: "09771256938",
  gmail: "jeroAilauglaug.help.org@gmail.com"
};

/* ================= MEMORY ================= */
const MEMORY_FILE = "./aiStudentMemory.json";
let memory = fs.existsSync(MEMORY_FILE)
  ? JSON.parse(fs.readFileSync(MEMORY_FILE))
  : {};

function saveMemory() {
  fs.writeFileSync(MEMORY_FILE, JSON.stringify(memory, null, 2));
}

/* ================= CONFIG ================= */
module.exports.config = {
  name: "ai",
  version: "Jero.Ai.3.0",
  role: 0,
  hasPrefix: false,
  aliases: ["gpt", "jero", "jeroai"],
  description: "Jero.Ai.3.0 – Smart Messenger Assistant",
  usage: "ai [question]",
  credits: "Jerobie",
  cooldown: 0
};

/* ================= HELPERS ================= */
const isFilipino = (t) =>
  /(ano|paano|bakit|sino|saan|info|tungkol)/i.test(t);

function getMode(text) {
  if (/timer/i.test(text)) return "TIMER";
  if (/essay|sanaysay/i.test(text)) return "ESSAY";
  if (/solve|kwentahin|compute|math/i.test(text)) return "MATH";
  if (/exam|review/i.test(text)) return "REVIEW";
  return "GENERAL";
}

/* ================= Gemini API Helper ================= */
async function askAI(question) {
  try {
    // Delay to avoid 429
    await new Promise(r => setTimeout(r, 1500));

    const res = await fetch(
      `https://betadash-api-swordslush-production.up.railway.app/gemini?ask=${encodeURIComponent(question)}`
    );

    if (res.status === 429) return "⚠️ AI is busy right now. Try again in a few seconds.";

    const data = await res.json();
    return data.response || "I couldn't generate a response right now.";

  } catch (err) {
    console.error("[AI ERROR]", err.message);
    return "❌ AI is temporarily unavailable. Try again later.";
  }
}

/* ================= MAIN ================= */
module.exports.run = async function ({ api, event, args }) {
  const input = args.join(" ").trim();
  const uid = event.senderID;
  const threadID = event.threadID;

  if (!input) {
    return api.sendMessage(
`🤖 ${OWNER_INFO.bot}

Ask me anything 👇
• General questions
• Math / Homework
• Essay / Explanation
• Tech / Coding
• Timer (ex: timer 10)
• Owner info

Just type your question.`,
      threadID
    );
  }

  /* ---------- OWNER INFO ---------- */
  if (/ai info|owner info|who made you|about you|developer info/i.test(input)) {
    return api.sendMessage(
`🤖 ${OWNER_INFO.bot} — OWNER INFO
━━━━━━━━━━━━━━━━━━
👤 Owner: ${OWNER_INFO.name}

🔵 Facebook:
${OWNER_INFO.facebook}

📞 Contact Number:
${OWNER_INFO.phone}

📧 Gmail:
${OWNER_INFO.gmail}

━━━━━━━━━━━━━━━━━━
Credits: Jerobie`,
      threadID
    );
  }

  /* ---------- ADMIN ---------- */
  if (/reset memory/i.test(input) && uid === ADMIN_ID) {
    memory = {};
    saveMemory();
    return api.sendMessage("✅ Memory reset successful.", threadID);
  }

  if (/view stats/i.test(input) && uid === ADMIN_ID) {
    return api.sendMessage(
      `📊 ADMIN DASHBOARD\n\nTotal Users: ${Object.keys(memory).length}`,
      threadID
    );
  }

  /* ---------- TIMER ---------- */
  const mode = getMode(input);
  const filipino = isFilipino(input);

  if (mode === "TIMER") {
    const mins = parseInt(input.match(/\d+/)?.[0]);
    if (!mins) {
      return api.sendMessage("❌ Please specify minutes.", threadID);
    }

    api.sendMessage(`⏱️ Timer started: ${mins} minutes`, threadID);
    setTimeout(() => {
      api.sendMessage("⏰ Time's up!", threadID);
    }, mins * 60000);
    return;
  }

  /* ---------- MEMORY ---------- */
  memory[uid] = memory[uid] || { chats: 0 };
  memory[uid].chats++;
  saveMemory();

  /* ---------- GEMINI AI ---------- */
  api.sendMessage("🤖 Jero.Ai.3.0 is thinking...", threadID, async (_, info) => {
    const answer = await askAI(input);

    api.editMessage(
`🤖 ${OWNER_INFO.bot}
━━━━━━━━━━━━━━━━━━
🧠 Mode: ${mode}

${answer}

━━━━━━━━━━━━━━━━━━
© Jerobie`,
      info.messageID
    );
  });
};