// Finger-Zuordnung für die deutsche QWERTZ-Tastatur
const FINGER = {};
const fingerRows = {
  "lp": "qay", "lr": "wsx", "lm": "edc", "li": "rfvtgb",
  "rI": "zhnujm", "rm": "ik,", "rr": "ol.", "rp": "pöäüß-"
};
const FINGER_NAME = {
  lp: "linker kleiner Finger", lr: "linker Ringfinger", lm: "linker Mittelfinger", li: "linker Zeigefinger",
  rI: "rechter Zeigefinger", rm: "rechter Mittelfinger", rr: "rechter Ringfinger", rp: "rechter kleiner Finger"
};
for (const [finger, keys] of Object.entries(fingerRows)) {
  for (const key of keys) FINGER[key] = finger;
}

const KB_ROWS = ["1234567890ß", "qwertzuiopü", "asdfghjklöä", "yxcvbnm,.-"];
const targetEl = document.getElementById("target");
const inputEl = document.getElementById("input");
const hintEl = document.getElementById("hint");
const statsEl = document.getElementById("stats");
const translationEl = document.getElementById("translation");
const translationButton = document.getElementById("translation-button");
let text = "";
let startTime = null;
let currentLevel = "";
let currentMode = "";
let exerciseComplete = false;

function makeKey(ch, label) {
  const key = document.createElement("div");
  key.className = "key";
  key.textContent = label || ch;
  key.dataset.key = ch;
  const finger = FINGER[ch];
  if (finger) key.classList.add(finger.startsWith("l") ? "left" : "right", finger);
  if (ch === "shiftL") key.classList.add("left", "shift");
  if (ch === "shiftR") key.classList.add("right", "shift");
  if ("fj".includes(ch)) key.classList.add("home");
  if (ch === " ") key.classList.add("space");
  return key;
}

function buildKeyboard() {
  const keyboard = document.getElementById("keyboard");
  keyboard.innerHTML = "";
  for (const row of KB_ROWS) {
    const rowElement = document.createElement("div");
    rowElement.className = "kbrow";
    for (const key of row) rowElement.appendChild(makeKey(key));
    keyboard.appendChild(rowElement);
  }
  const bottomRow = document.createElement("div");
  bottomRow.className = "kbrow";
  bottomRow.appendChild(makeKey("shiftL", "Umschalt"));
  bottomRow.appendChild(makeKey(" ", "Leertaste"));
  bottomRow.appendChild(makeKey("shiftR", "Umschalt"));
  keyboard.appendChild(bottomRow);
}

function highlightKey(ch) {
  document.querySelectorAll(".key.next").forEach(key => key.classList.remove("next"));
  if (!ch) return;
  const lower = ch.toLowerCase();
  const keys = [lower];
  if (ch !== lower) {
    const leftHand = (FINGER[lower] || "").startsWith("l");
    const preference = document.getElementById("shiftpref").value;
    if (preference === "links") keys.push("shiftL");
    else keys.push(leftHand ? "shiftR" : "shiftL");
  }
  for (const key of keys) {
    const element = document.querySelector(`.key[data-key="${CSS.escape(key)}"]`);
    if (element) element.classList.add("next");
  }
}

function makeText(level, mode) {
  const content = window.TRAINING_CONTENT[level];
  if (mode === "saetze") {
    const sentences = content.sentences;
    return sentences[Math.floor(Math.random() * sentences.length)];
  }
  const words = [];
  for (let i = 0; i < 8; i++) {
    words.push(content.words[Math.floor(Math.random() * content.words.length)]);
  }
  return words.join(" ");
}

function renderTarget(typed) {
  targetEl.innerHTML = "";
  for (let i = 0; i < text.length; i++) {
    const character = document.createElement("span");
    character.textContent = text[i];
    if (i < typed.length) character.className = typed[i] === text[i] ? "ok" : "bad";
    else if (i === typed.length) character.className = "cur";
    targetEl.appendChild(character);
  }
  highlightKey(text[typed.length]);
}

function startNew() {
  currentLevel = document.getElementById("level").value;
  currentMode = document.getElementById("mode").value;
  text = makeText(currentLevel, currentMode);
  inputEl.value = "";
  inputEl.disabled = false;
  inputEl.focus();
  startTime = null;
  exerciseComplete = false;
  statsEl.textContent = "";
  hintEl.textContent = "";
  translationEl.textContent = "";
  translationEl.hidden = true;
  translationButton.hidden = true;
  translationButton.textContent = "Übersetzung anzeigen";
  translationButton.setAttribute("aria-expanded", "false");
  renderTarget("");
}

function toggleTranslation() {
  if (!exerciseComplete) return;
  if (!translationEl.hidden) {
    translationEl.hidden = true;
    translationButton.textContent = "Übersetzung anzeigen";
    translationButton.setAttribute("aria-expanded", "false");
    return;
  }

  translationEl.textContent = "";
  const translations = window.ENGLISH_TRANSLATIONS[currentLevel];
  if (currentMode === "saetze") {
    const translatedSentence = translations.sentences[text];
    if (!translatedSentence) {
      throw new Error(`Missing English sentence translation for ${currentLevel}: ${text}`);
    }
    translationEl.textContent = translatedSentence;
  } else {
    const translatedWords = text.split(" ").map(word => {
      const translatedWord = translations.words[word];
      if (!translatedWord) {
        throw new Error(`Missing English word translation for ${currentLevel}: ${word}`);
      }
      return translatedWord;
    });
    translationEl.textContent = translatedWords.join(" · ");
  }
  translationEl.hidden = false;
  translationButton.textContent = "Übersetzung ausblenden";
  translationButton.setAttribute("aria-expanded", "true");
}

inputEl.addEventListener("input", () => {
  if (!startTime) startTime = Date.now();
  const typed = inputEl.value;
  renderTarget(typed);

  const nextChar = text[typed.length];
  if (nextChar) {
    const finger = FINGER[nextChar.toLowerCase()];
    hintEl.textContent = finger ? `Nächste Taste: ${nextChar} (${FINGER_NAME[finger]})` : "";
  }

  if (typed.length >= text.length) {
    exerciseComplete = true;
    const minutes = (Date.now() - startTime) / 60000;
    let errors = 0;
    for (let i = 0; i < text.length; i++) {
      if (typed[i] !== text[i]) errors++;
    }
    const correct = text.length - errors;
    const wpm = Math.round((correct / 5) / minutes);
    const accuracy = Math.round((correct / text.length) * 100);
    statsEl.textContent = `Fertig! ${wpm} Wörter pro Minute, Genauigkeit ${accuracy} %.`;
    hintEl.textContent = "";
    inputEl.disabled = true;
    translationButton.hidden = false;
    localStorage.setItem("lastResult", JSON.stringify({
      wpm,
      acc: accuracy,
      date: new Date().toISOString()
    }));
  }
});

translationButton.addEventListener("click", toggleTranslation);
buildKeyboard();
document.getElementById("start").addEventListener("click", startNew);
document.getElementById("next").addEventListener("click", startNew);
