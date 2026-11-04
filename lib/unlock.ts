import { gcm } from "@noble/ciphers/aes.js";
import { bytesToUtf8, hexToBytes } from "@noble/ciphers/utils.js";
import keyFile from "./lock-key.json";
import type { LockedQuestion, Question } from "./types";

// Opens the encrypted answer of a question. Called only after the exam
// is submitted, or on the all-answers page that opens after the first exam.

const key = hexToBytes(keyFile.key);

type Secret = { answer: number; explanation: string };

function openSecret(secret: string): Secret {
  const nonce = hexToBytes(secret.slice(0, 24));
  const sealed = hexToBytes(secret.slice(24));

  return JSON.parse(bytesToUtf8(gcm(key, nonce).decrypt(sealed)));
}

export function unlockQuestion(question: LockedQuestion): Question {
  const { secret, optionOrder, ...visible } = question;
  const { answer, explanation } = openSecret(secret);

  // The options were shuffled, so find where the right one went.
  const shownAnswer = optionOrder ? optionOrder.indexOf(answer) : answer;

  return { ...visible, answer: shownAnswer, explanation };
}
