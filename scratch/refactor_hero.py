import re

with open('web/src/components/heros/hero.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

wheel_start_marker = "{/* RIGHT: Cosmic Wheel Graphic (Adapted to Half-Arc) */}"
wheel_start_idx = content.find(wheel_start_marker)

logo_end_marker = 'alt="HealConnect Logo"'
logo_end_idx = content.find(logo_end_marker, wheel_start_idx)
central_logo_end = content.find('</motion.div>', logo_end_idx)
wheel_container_end = content.find('</div>', central_logo_end)
right_col_end = content.find('</motion.div>', wheel_container_end) + len('</motion.div>')

wheel_jsx = content[wheel_start_idx:right_col_end]

left_col_start = content.find("{/* LEFT: Typography & CTA */}")
description_start = content.find('<motion.p', left_col_start)

# Mobile wheel: change the container styling so it's a block in the flow, not absolute right
mobile_wheel = wheel_jsx.replace('className="lg:col-span-6 relative lg:absolute left-1/2 -translate-x-1/2 lg:left-auto lg:top-1/2 lg:right-0 translate-y-[20%] lg:-translate-y-1/2 lg:translate-x-[25%] w-[450px] h-[450px] sm:w-[550px] sm:h-[550px] md:w-[700px] md:h-[700px] lg:w-[900px] lg:h-[900px] flex items-center justify-center rounded-full z-10 pointer-events-none mb-8 lg:mb-0"', 'className="relative left-1/2 -translate-x-1/2 w-[340px] h-[340px] sm:w-[450px] sm:h-[450px] flex items-center justify-center rounded-full z-10 pointer-events-none my-12"')
mobile_wheel = mobile_wheel.replace('className="lg:col-span-6 relative lg:absolute lg:inset-y-0 lg:right-0 w-full lg:h-full lg:pointer-events-none flex items-center justify-center z-0 mt-16 lg:mt-0"', 'className="flex lg:hidden relative w-full items-center justify-center z-0 my-8 overflow-visible"')

# Desktop wheel: hide on mobile
desktop_wheel = wheel_jsx.replace('className="lg:col-span-6 relative lg:absolute lg:inset-y-0 lg:right-0 w-full lg:h-full lg:pointer-events-none flex items-center justify-center z-0 mt-16 lg:mt-0"', 'className="hidden lg:flex lg:col-span-6 absolute inset-y-0 right-0 w-full h-full pointer-events-none items-center justify-center z-0"')

content = content[:wheel_start_idx] + desktop_wheel + content[right_col_end:]
content = content[:description_start] + mobile_wheel + "\n            " + content[description_start:]

with open('web/src/components/heros/hero.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
