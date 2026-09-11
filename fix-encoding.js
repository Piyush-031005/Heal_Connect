const fs = require('fs');

// The mojibake fix: 
// These files have UTF-8 encoded text that was RE-encoded as Latin-1, producing mojibake.
// Fix: for any sequence that looks like mojibake, take each char code as a byte value,
// rebuild Buffer, decode as UTF-8.

function fixMojibake(text) {
  // We need to detect sequences that are mojibake (Latin-1 encoded UTF-8)
  // and convert them back. The key insight: if chars have codes in range 0x80-0xFF
  // and when interpreted as UTF-8 bytes they form valid UTF-8, then it's mojibake.
  
  let result = '';
  let i = 0;
  
  while (i < text.length) {
    const code = text.charCodeAt(i);
    
    // If this char has code > 127, try to decode as mojibake
    if (code >= 0x80 && code <= 0xFF) {
      // Collect all consecutive high bytes
      let seqStart = i;
      let bytes = [];
      while (i < text.length) {
        const c = text.charCodeAt(i);
        if (c >= 0x80 && c <= 0xFF) {
          bytes.push(c);
          i++;
        } else {
          break;
        }
      }
      
      // Try to decode the byte sequence as UTF-8
      try {
        const buf = Buffer.from(bytes);
        const decoded = buf.toString('utf8');
        // Check if decoded contains replacement characters (invalid UTF-8)
        if (!decoded.includes('\uFFFD')) {
          result += decoded;
        } else {
          // Not valid UTF-8, keep original
          result += text.slice(seqStart, i);
        }
      } catch(e) {
        result += text.slice(seqStart, i);
      }
    } else {
      result += text[i];
      i++;
    }
  }
  
  return result;
}

// Test
const tests = [
  'Â·',
  'â€™',
  'â‚¹',
  'Hello World', // should stay same
  'â€"',
];

for (const t of tests) {
  console.log(JSON.stringify(t) + ' -> ' + JSON.stringify(fixMojibake(t)));
}