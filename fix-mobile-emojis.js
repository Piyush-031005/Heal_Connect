const fs = require('fs');

function fixIndex() {
  const p = 'mobile/app/(tabs)/index.tsx';
  let c = fs.readFileSync(p, 'utf8');
  c = c.replace(/Piyush [A-Za-z0-9,\?~]+<\/Text>/, 'Piyush 👋</Text>');
  c = c.replace(/<Text style=\{styles.introLogoIcon\}>[A-Za-z0-9,]+<\/Text>/, '<Text style={styles.introLogoIcon}>✨</Text>');
  fs.writeFileSync(p, c, 'utf8');
}

function fixChat() {
  const p = 'mobile/app/(tabs)/chat.tsx';
  let c = fs.readFileSync(p, 'utf8');
  c = c.replace(/<Text style=\{\{ fontSize: 40 \}\}>[A-Za-z0-9,\.]+<\/Text>/, '<Text style={{ fontSize: 40 }}>💬</Text>');
  fs.writeFileSync(p, c, 'utf8');
}

fixIndex();
fixChat();