const fs = require('fs');

let c = fs.readFileSync('web/src/app/login/page.tsx', 'utf8');
c = c.replace(/placeholder="\\u2022\\u2022\\u2022\\u2022\\u2022\\u2022\\u2022\\u2022"/g, 'placeholder="••••••••"');
fs.writeFileSync('web/src/app/login/page.tsx', c, 'utf8');