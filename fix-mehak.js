const fs = require('fs');

function fixMehak() {
  const p = 'web/src/app/practitioners/mehak-page.tsx';
  let c = fs.readFileSync(p, 'utf8');
  
  // Fix background
  c = c.replace(
    '<div className="min-h-screen bg-[#faf9f6] flex flex-col relative font-sans">',
    '<div className="min-h-screen flex flex-col relative font-sans" style={{background:"linear-gradient(145deg, #F5F0FF 0%, #EDE9FE 20%, #DDD6FE 45%, #C4B5FD 70%, #A5B4FC 100%)"}}>\n      <div style={{position:"absolute",top:"-10%",left:"-5%",width:"40%",height:"40%",borderRadius:"50%",background:"radial-gradient(circle, rgba(167,139,250,0.35) 0%, transparent 70%)",filter:"blur(80px)",pointerEvents:"none"}} />\n      <div style={{position:"absolute",bottom:"-10%",right:"-5%",width:"50%",height:"50%",borderRadius:"50%",background:"radial-gradient(circle, rgba(129,140,248,0.3) 0%, transparent 70%)",filter:"blur(100px)",pointerEvents:"none"}} />'
  );
  
  // Fix specific text
  c = c.replace(/I"Ac\s/g, '₹'); // In case it's specifically this
  c = c.replace(/I"Ac/g, '₹');
  c = c.replace(/" -/g, '• -');
  c = c.replace(/%'ArA% Spoken Languages:/g, '🗣️ Spoken Languages:');

  fs.writeFileSync(p, c, 'utf8');
}

function fixClient() {
  const p = 'web/src/app/practitioners/PractitionersClient.tsx';
  let c = fs.readFileSync(p, 'utf8');
  
  c = c.replace(/,"1/g, '₹');
  c = c.replace(/,1{p/g, '₹{p');
  c = c.replace(/\?"/g, '—'); // em-dash
  
  fs.writeFileSync(p, c, 'utf8');
}

fixMehak();
fixClient();