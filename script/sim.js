const axios = require("axios");
const fs = require("fs");

const SIM_API_KEY = "2423ba2ac91a4f6fbd39b9b47c744fe0fbf4d219";
const DATA_FILE = "./simData.json";

// load data
let simData = fs.existsSync(DATA_FILE)
  ? JSON.parse(fs.readFileSync(DATA_FILE))
  : {};

function saveData() {
  fs.writeFileSync(DATA_FILE, JSON.stringify(simData, null, 2));
}

module.exports = async function ({ api, event }) {
  try {
    if (!event.body) return;
    if (event.senderID === api.getCurrentUserID()) return;

    const threadID = event.threadID;
    const text = event.body.trim();
    const lower = text.toLowerCase();

    // init thread data
    if (!simData[threadID]) {
      simData[threadID] = { enabled: false };
      saveData();
    }

    /* ========= SIM ON ========= */
    if (lower === "sim on") {
      simData[threadID].enabled = true;
      saveData();
      return api.sendMessage(
`🤖 SIM
━━━━━━━━━━━━━━
✅ SIM AI is now ON
Sabihin mo lang: sim <message>`,
        threadID
      );
    }

    /* ========= SIM OFF ========= */
    if (lower === "sim off") {
      simData[threadID].enabled = false;
      saveData();
      return api.sendMessage(
`🤖 SIM
━━━━━━━━━━━━━━
⛔ SIM AI is now OFF`,
        threadID
      );
    }

    // kung off, wag gumalaw
    if (!simData[threadID].enabled) return;

    // kailangan "sim" sa umpisa
    if (!lower.startsWith("sim")) return;

    const message = text.slice(3).trim();
    if (!message) return;

    const res = await axios.get("https://simsimi.ooguy.com/talk", {
      params: {
        text: message,
        apikey: SIM_API_KEY
      },
      timeout: 15000
    });

    const reply = res.data?.answer;
    if (!reply) return;

    api.sendMessage(
`🤖 SIM
━━━━━━━━━━━━━━
${reply}`,
      threadID
    );

  } catch (err) {
    console.error("SIM ERROR:", err.message);
  }
};