const fs = require('fs');
const path = require('path');

const DIRECTORIES = ['web/src', 'mobile/app'];
const EXTENSIONS = ['.tsx', '.ts', '.jsx', '.js', '.json', '.css'];

const replacements = [
  { regex: /Ã‚Â©/g, text: '©' },
  { regex: /Ã‚Â®/g, text: '®' },
  { regex: /Ã¢â‚¬â„¢/g, text: '’' },
  { regex: /â€™/g, text: '’' },
  { regex: /Ã¢â‚¬Å“/g, text: '“' },
  { regex: /â€œ/g, text: '“' },
  { regex: /Ã¢â‚¬Â\s/g, text: '” ' }, // quotes followed by space
  { regex: /Ã¢â‚¬Â/g, text: '”' },
  { regex: /â€/g, text: '”' },
  { regex: /Ã¢â‚¬â€œ/g, text: '–' }, // en-dash
  { regex: /â€“/g, text: '–' },
  { regex: /Ã¢â‚¬â€ /g, text: '—' }, // em-dash
  { regex: /â€”/g, text: '—' },
  { regex: /\?"/g, text: '—' }, // Specific case found in modalities-content
  { regex: /\?"/g, text: '—' }, // Fallback for the above
  { regex: /Ã‚Â°/g, text: '°' },
  { regex: /Â°/g, text: '°' },
  { regex: /Ã¢â‚¬Â¢/g, text: '•' }, // bullet
  { regex: /ÃƒÆ’Ã†â€™Ãƒâ€/g, text: '•' }, // deeply corrupted bullet
  { regex: /A,AA/g, text: '🧘' }, // specific mobile corruption
  { regex: /dY`<|dY/g, text: '✨' }, // specific mobile corruption
  { regex: /A,1|,1|A,AA/g, text: '₹' }, // Rupee sign
  { regex: /Ãƒ/g, text: 'í' } // Generic fallback (e.g., in specific names if any, but better handle case by case)
];

function processDirectory(directory) {
  const files = fs.readdirSync(directory);
  
  for (const file of files) {
    const fullPath = path.join(directory, file);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      processDirectory(fullPath);
    } else {
      const ext = path.extname(fullPath);
      if (EXTENSIONS.includes(ext)) {
        let content = fs.readFileSync(fullPath, 'utf8');
        let modified = false;
        
        // Check for specific long string corruption in placeholders
        if (content.includes('ÃƒÆ’Ã†â€™Ãƒâ€ ')) {
          content = content.replace(/ÃƒÆ’Ã†â€™Ãƒâ€ [^\"]+/g, '••••••••');
          modified = true;
        }
        
        // Specifically fix the bullet placeholders in signup/login
        if (content.includes('Ã¢â‚¬Â¢Ã¢â‚¬Â¢Ã¢â‚¬Â¢')) {
            content = content.replace(/(Ã¢â‚¬Â¢)+/g, '••••••••');
            modified = true;
        }

        // Apply global regex replacements
        for (const r of replacements) {
          if (r.regex.test(content)) {
            content = content.replace(r.regex, r.text);
            modified = true;
          }
        }
        
        // Also fix the footer text explicitly
        if (content.includes('ÃƒÆ’Ã‚Â¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’')) {
             content = content.replace(/ÃƒÆ’Ã‚Â¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’.*?RIGHTS RESERVED\./gi, '© 2026 TARA INFOTECH. ALL RIGHTS RESERVED.');
             modified = true;
        }

        if (modified) {
          fs.writeFileSync(fullPath, content, 'utf8');
          console.log(`Fixed encoding in: ${fullPath}`);
        }
      }
    }
  }
}

DIRECTORIES.forEach(dir => {
  if (fs.existsSync(dir)) {
    processDirectory(dir);
  }
});

console.log('Encoding fix script completed.');