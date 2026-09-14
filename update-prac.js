const fs = require("fs");
let content = fs.readFileSync("web/src/app/practitioners/page.tsx", "utf8");

const oldStr = `  return (
    <div className="min-h-screen flex flex-col font-sans relative overflow-hidden" style={{background:"linear-gradient(145deg, #F5F0FF 0%, #EDE9FE 20%, #DDD6FE 45%, #C4B5FD 70%, #A5B4FC 100%)"}}>
      {/* Glowing orbs for positive vibe */}`;

const newStr = `  return (
    <div className="min-h-screen flex flex-col font-sans relative overflow-hidden" style={{background:"linear-gradient(145deg, #F5F0FF 0%, #EDE9FE 20%, #DDD6FE 45%, #C4B5FD 70%, #A5B4FC 100%)"}}>
      {/* Fibre Background Effect */}
      <div className="absolute inset-0 pointer-events-none z-0 mix-blend-multiply opacity-60">
        <GhostFibers lineColor="#8345bd" glowColor="#7c41e0" speed={0.2} scale={2} rotation={0} rotationSpeed={0.25} layers={4} waveAmplitude={0.022} waveFrequency={4} waveSpeed={0.18} layerSpeed={0.1} twist={0.15} twistFrequency={7} twistSpeed={1.5} lineFrequency={10} lineSpacing={1.0} lineSharpness={13} glowFalloff={7} glowIntensity={2.5} brightness={3.0} blueBoost={1.5} vignette={0.5} grain={0.04} dpr={1} lightMode={true} fps={60} paused={false} />
      </div>
      {/* Glowing orbs for positive vibe */}`;

content = content.replace(oldStr, newStr);
fs.writeFileSync("web/src/app/practitioners/page.tsx", content, "utf8");
console.log("Updated practitioners page.");