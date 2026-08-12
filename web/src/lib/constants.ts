import {
  MessageCircle, Phone, Star, Users,
  Globe, Languages, Shield, Gift, ChevronDown, ChevronUp,
  Zap, Heart, Briefcase, DollarSign,
  Activity, UserCheck, ArrowRight, Download, Play, Check,
  Gem,
} from 'lucide-react';

export const TOP_ASTROLOGERS = [
  { name: 'Shivani', exp: '10 yrs exp', langs: 'English, Hindi', tags: ['Top Choice', 'Tarot', 'Vedic', 'Numerology'], rating: 5.0, orders: '10k+', price: 130, online: true, img: '/avatars/astrologer_1.jpg' },
  { name: 'Aman', exp: '6 yrs exp', langs: 'English, Hindi', tags: ['Celebrity', 'Tarot'], rating: 5.0, orders: '10k+', price: 41, online: true, img: '/avatars/astrologer_2.jpg' },
  { name: 'Tanuj', exp: '24 yrs exp', langs: 'Hindi, Sanskrit, English', tags: ['Celebrity', 'Vedic', 'Numerology', 'Vastu'], rating: 5.0, orders: '10k+', price: 84, online: true, img: '/avatars/astrologer_4.jpg' },
];

export const CATEGORIES = [
  { name: 'Love', count: '4,280+', icon: Heart, color: 'text-purple-400', bg: 'bg-gradient-to-br from-purple-400/20 to-orange-500/5' },
  { name: 'Marriage & Kundli', count: '6,120+', icon: Gem, color: 'text-indigo-400', bg: 'bg-gradient-to-br from-indigo-500/20 to-purple-500/5' },
  { name: 'Career', count: '5,840+', icon: Briefcase, color: 'text-blue-400', bg: 'bg-gradient-to-br from-blue-500/20 to-cyan-500/5' },
  { name: 'Women astrologers', count: '9,210+', icon: UserCheck, color: 'text-rose-400', bg: 'bg-gradient-to-br from-rose-500/20 to-pink-500/5' },
  { name: 'Business & Money', count: '3,760+', icon: DollarSign, color: 'text-emerald-400', bg: 'bg-gradient-to-br from-emerald-500/20 to-teal-500/5' },
  { name: 'Health & Family', count: '2,480+', icon: Activity, color: 'text-teal-400', bg: 'bg-gradient-to-br from-teal-500/20 to-cyan-500/5' },
];

export const ZODIAC_SIGNS = [
  { name: 'Aries', alt: 'Mesh', emoji: '♈' },
  { name: 'Taurus', alt: 'Vrishabh', emoji: '♉' },
  { name: 'Gemini', alt: 'Mithun', emoji: '♊' },
  { name: 'Cancer', alt: 'Kark', emoji: '♋' },
  { name: 'Leo', alt: 'Singh', emoji: '♌' },
  { name: 'Virgo', alt: 'Kanya', emoji: '♍' },
  { name: 'Libra', alt: 'Tula', emoji: '♎' },
  { name: 'Scorpio', alt: 'Vrishchik', emoji: '♏' },
  { name: 'Sagittarius', alt: 'Dhanu', emoji: '♐' },
  { name: 'Capricorn', alt: 'Makar', emoji: '♑' },
  { name: 'Aquarius', alt: 'Kumbh', emoji: '♒' },
  { name: 'Pisces', alt: 'Meen', emoji: '♓' },
];

export const TESTIMONIALS = [
  { name: 'Amar Thakur', loc: 'Pune · India', text: 'This app helped me to get a job in my dream company. I was stressed about not getting a career opportunity after my graduation. One prediction from an astrologer gave me a ray of hope and within a few months, I had a job offer in hand. Thank you so much Zenauraa for helping me out.' },
  { name: 'Sneha Patel', loc: 'Mumbai · India', text: 'I was going through a tough phase in my marriage. The tarot reading session gave me clarity and helped me understand my partner better. Highly recommend!' },
  { name: 'Rahul Verma', loc: 'Delhi · India', text: 'The Kundli matching feature helped me find the perfect match for my son. The astrologers were very detailed and professional in their analysis.' },
  { name: 'Priya Sharma', loc: 'Bangalore · India', text: 'My career horoscope reading was spot on. I got the guidance I needed to make a major career transition. The astrologer understood my situation perfectly and gave me actionable advice.' },
];

export const HOROSCOPE_DATA: Record<number, { text: string; mood: string; luckyNum: number; color: string; colorClass: string; love: number; career: number; health: number; money: number; dateRange: string }> = {
  0: { text: "Aries, today the stars align to boost your confidence. Take the lead on projects that matter to you. Your natural charisma will attract positive attention from those around you.", mood: "Energetic", luckyNum: 7, color: "Red", colorClass: "bg-red-400", love: 75, career: 85, health: 70, money: 80, dateRange: "Mar 21 – Apr 19" },
  1: { text: "Taurus, patience will be your greatest ally today. Financial matters require careful attention. A stable approach to relationships will bring lasting rewards.", mood: "Calm", luckyNum: 3, color: "Green", colorClass: "bg-green-400", love: 80, career: 70, health: 85, money: 75, dateRange: "Apr 20 – May 20" },
  2: { text: "Gemini, your communication skills are at their peak. Share your ideas freely and network with new people. A short trip could bring unexpected opportunities.", mood: "Curious", luckyNum: 5, color: "Yellow", colorClass: "bg-yellow-400", love: 70, career: 80, health: 75, money: 85, dateRange: "May 21 – Jun 20" },
  3: { text: "Cancer, focus on home and family today. Your emotional intuition is sharp — trust it. A creative project will bring you joy and a sense of accomplishment.", mood: "Nurturing", luckyNum: 2, color: "Silver", colorClass: "bg-gray-300", love: 85, career: 65, health: 80, money: 70, dateRange: "Jun 21 – Jul 22" },
  4: { text: "Leo, the spotlight is on you! Your natural leadership will inspire others. Take calculated risks in your career. Romance blossoms when you're confident.", mood: "Bold", luckyNum: 1, color: "Gold", colorClass: "bg-purple-300", love: 90, career: 85, health: 75, money: 80, dateRange: "Jul 23 – Aug 22" },
  5: { text: "Virgo, organization is key today. Your attention to detail will solve a complex problem. Health routines started now will have long-term benefits.", mood: "Focused", luckyNum: 6, color: "Navy", colorClass: "bg-blue-800", love: 65, career: 90, health: 85, money: 75, dateRange: "Aug 23 – Sep 22" },
  6: { text: "Libra, don't take on more than you can manage. Attempting to make everyone happy could exhaust you emotionally. You may need a healthy break due to work-related stress, and a little sleep could be really beneficial. A setback could make you doubt your luck, but don't give up. Recognize other people's emotions to prevent needless confrontation.", mood: "Nervous", luckyNum: 2, color: "Pink", colorClass: "bg-pink-400", love: 80, career: 65, health: 70, money: 75, dateRange: "Sep 23 – Oct 22" },
  7: { text: "Scorpio, intense emotions surface today. Channel them into productive work or deep conversations. A financial opportunity from an unexpected source appears.", mood: "Intense", luckyNum: 9, color: "Burgundy", colorClass: "bg-red-700", love: 85, career: 75, health: 70, money: 85, dateRange: "Oct 23 – Nov 21" },
  8: { text: "Sagittarius, adventure calls! Explore new ideas and places. Your optimism is contagious and will attract helpful people. Higher education or travel is favored.", mood: "Adventurous", luckyNum: 4, color: "Purple", colorClass: "bg-purple-400", love: 75, career: 80, health: 85, money: 70, dateRange: "Nov 22 – Dec 21" },
  9: { text: "Capricorn, discipline brings rewards today. Focus on long-term goals rather than instant gratification. A mentor figure could offer valuable guidance.", mood: "Determined", luckyNum: 8, color: "Brown", colorClass: "bg-amber-700", love: 70, career: 90, health: 75, money: 85, dateRange: "Dec 22 – Jan 19" },
  10: { text: "Aquarius, your innovative ideas are ahead of their time. Share them anyway. Social causes and group activities bring fulfillment. A friendship deepens unexpectedly.", mood: "Visionary", luckyNum: 11, color: "Cyan", colorClass: "bg-cyan-400", love: 75, career: 80, health: 70, money: 80, dateRange: "Jan 20 – Feb 18" },
  11: { text: "Pisces, your creativity flows freely today. Artistic pursuits and spiritual practices bring peace. Be careful with boundaries as your empathy may overwhelm you.", mood: "Dreamy", luckyNum: 12, color: "Lavender", colorClass: "bg-purple-300", love: 85, career: 70, health: 80, money: 65, dateRange: "Feb 19 – Mar 20" },
};
