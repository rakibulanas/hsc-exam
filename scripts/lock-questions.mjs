// Turns data/questions.json (answers in plain text) into
// lib/questions.locked.json (answer and explanation encrypted).
// The app only ever loads the locked file.
//
// Runs by itself before "npm run dev" and "npm run build".
// After editing data/questions.json, run: npm run lock

import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { gcm } from "@noble/ciphers/aes.js";
import { bytesToHex, hexToBytes, randomBytes, utf8ToBytes } from "@noble/ciphers/utils.js";

const SOURCE = "data/questions.json";
const TARGET = "lib/questions.locked.json";
const KEY_FILE = "lib/lock-key.json";

// Make the key once. Later runs reuse it.
if (!existsSync(KEY_FILE)) {
  writeFileSync(KEY_FILE, JSON.stringify({ key: bytesToHex(randomBytes(32)) }, null, 2) + "\n");
}

const key = hexToBytes(JSON.parse(readFileSync(KEY_FILE, "utf8")).key);
const questions = JSON.parse(readFileSync(SOURCE, "utf8"));

function lock(secretParts) {
  const nonce = randomBytes(12);
  const sealed = gcm(key, nonce).encrypt(utf8ToBytes(JSON.stringify(secretParts)));
  return bytesToHex(nonce) + bytesToHex(sealed);
}

const locked = questions.map(({ answer, explanation, ...visible }) => ({
  ...visible,
  secret: lock({ answer, explanation }),
}));

writeFileSync(TARGET, JSON.stringify(locked, null, 2) + "\n");
console.log(`Locked ${locked.length} questions into ${TARGET}`);
