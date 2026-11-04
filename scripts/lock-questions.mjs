// Turns data/questions.json (answers in plain text) into
// lib/questions.locked.json (answer and explanation encrypted).
// The app only ever loads the locked file.
//
// Runs by itself before "npm run dev" and "npm run build".
// After editing data/questions.json, run: npm run lock

import { createHash } from "node:crypto";
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

// The nonce comes from the question itself, so an unchanged question
// gives the same locked text and git shows no change.
function lock(id, secretParts) {
  const plain = JSON.stringify(secretParts);
  const nonce = createHash("sha256").update(id + plain).digest().subarray(0, 12);
  const sealed = gcm(key, nonce).encrypt(utf8ToBytes(plain));
  return bytesToHex(nonce) + bytesToHex(sealed);
}

const locked = questions.map(({ answer, explanation, ...visible }) => ({
  ...visible,
  secret: lock(visible.id, { answer, explanation }),
}));

writeFileSync(TARGET, JSON.stringify(locked, null, 2) + "\n");
console.log(`Locked ${locked.length} questions into ${TARGET}`);
