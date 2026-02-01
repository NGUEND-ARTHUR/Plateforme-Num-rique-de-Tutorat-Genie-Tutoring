const fs = require('fs');
const path = require('path');
const glob = require('glob');

const root = path.resolve(__dirname, '..');
const codePattern = path.join(root, 'app', '**', '*.{ts,tsx,js,jsx}');
const enFile = path.join(root, 'app', 'i18n', 'en.json');
const frFile = path.join(root, 'app', 'i18n', 'fr.json');

const en = JSON.parse(fs.readFileSync(enFile, 'utf8'));
const fr = JSON.parse(fs.readFileSync(frFile, 'utf8'));

function findKeysInCode() {
  const files = glob.sync(codePattern, { nodir: true });
  const keySet = new Set();
  const regex = /t\(\s*['\"]([^'\"]+)['\"]\s*(,\s*['\"][^'\"]+['\"])?\s*\)/g;

  files.forEach((f) => {
    const s = fs.readFileSync(f, 'utf8');
    let m;
    while ((m = regex.exec(s)) !== null) {
      keySet.add(m[1]);
    }
  });
  return Array.from(keySet).sort();
}

const usedKeys = findKeysInCode();

function missing(keys, dict) {
  return keys.filter(k => !(k in dict));
}

const missingInEn = missing(usedKeys, en);
const missingInFr = missing(usedKeys, fr);

console.log('Total keys used in code:', usedKeys.length);
console.log('Missing in en.json:', missingInEn.length);
missingInEn.forEach(k => console.log('  ', k));
console.log('\nMissing in fr.json:', missingInFr.length);
missingInFr.forEach(k => console.log('  ', k));

// write results
fs.writeFileSync(path.join(root, 'scripts', 'i18n-missing.json'), JSON.stringify({ usedKeys, missingInEn, missingInFr }, null, 2));
console.log('\nWrote scripts/i18n-missing.json');
