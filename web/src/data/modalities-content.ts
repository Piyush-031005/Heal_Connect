export interface ModalityData {
  id: string;
  name: string;
  heroTitle: string;
  heroDescription: string;
  heroImages: string[];
  contentSections: {
    title: string;
    text: string;
    image: string;
    imagePosition: 'left' | 'right';
  }[];
  scrollGallery: string[];
  remedies: string[];
}
export const MODALITIES_CONTENT: Record<string, any> = {
  astrology: {
    id: 'astrology',
    name: 'Astrology',
    heroTitle: 'Decode Your Cosmic Blueprint',
    heroDescription: 'Understand the profound influence of the planets on your personality, life path, and relationships.',
    heroImages: [
      '/insights_page/astrology/daniel-carmona-4FvSpxyxIb0-unsplash.jpg',
      '/insights_page/astrology/miracosic-astrology-993127_1920.jpg',
      '/insights_page/astrology/viva-luna-studios-r_-onuwuWAU-unsplash.jpg',
    ],
    contentSections: [
      {
        title: 'The Language of the Stars',
        text: 'Astrology is an ancient practice that studies the movements and relative positions of celestial bodies interpreted as having an influence on human affairs. Your birth chart is a snapshot of the sky at the exact moment of your birth, revealing your unique cosmic blueprint.',
        image: '/insights_page/astrology/daniel-carmona-4FvSpxyxIb0-unsplash.jpg',
        imagePosition: 'left'
      },
      {
        title: 'Navigating Life with Cosmic Wisdom',
        text: 'By understanding the positions of the sun, moon, and planets in your chart, you gain deep insights into your strengths, challenges, career path, and romantic compatibility. Astrology provides a powerful framework for self-discovery and personal growth.',
        image: '/insights_page/astrology/farzad-mohsenvand-TbuescuqMjA-unsplash.jpg',
        imagePosition: 'right'
      },
      {
        title: 'Ancient Wisdom, Modern Relevance',
        text: 'For thousands of years, civilizations across Egypt, Greece, India and China used celestial patterns to understand cycles of time, personality, and destiny. Today, modern astrology integrates psychology to help you understand unconscious patterns and step into your highest potential.',
        image: '/insights_page/astrology/greg-rakozy-oMpAz-DN-9I-unsplash.jpg',
        imagePosition: 'left'
      }
    ],
    scrollGallery: [
      '/insights_page/astrology/daniel-carmona-4FvSpxyxIb0-unsplash.jpg',
      '/insights_page/astrology/miracosic-astrology-993127_1920.jpg',
      '/insights_page/astrology/farzad-mohsenvand-TbuescuqMjA-unsplash.jpg',
      '/insights_page/astrology/greg-rakozy-oMpAz-DN-9I-unsplash.jpg',
      '/insights_page/astrology/the-new-york-public-library-FcI-z6bfq4g-unsplash.jpg',
      '/insights_page/astrology/viva-luna-studios-r_-onuwuWAU-unsplash.jpg',
    ],
    remedies: [
      'Read your rising sign horoscopes along with your sun sign for a more accurate daily picture.',
      'Track the lunar cycles â€â€ start new projects on a new moon and reflect on a full moon.',
      'Meditate on your natal chart North Node to understand your soul purpose.',
      'Journal about planetary transits to channel their energy productively.'
    ]
  },

  breathwork: {
    id: 'breathwork',
    name: 'Breathwork',
    heroTitle: 'Transform Your Life with Every Breath',
    heroDescription: 'Ancient and modern breathing techniques to reduce stress, elevate consciousness, and heal your body from within.',
    heroImages: [
      '/insights_page/breathwork/angelina-sarycheva-wD1J9DD7fSk-unsplash.jpg',
      '/insights_page/breathwork/masha-raymers-UBxoHz3zQG4-unsplash.jpg',
      '/insights_page/breathwork/pexels-arthousestudio-7363287.jpg',
    ],
    contentSections: [
      {
        title: 'The Power of Conscious Breathing',
        text: 'Breathwork encompasses a range of intentional breathing practices that directly influence your nervous system, mind, and emotional state. When you consciously control your breath, you can shift from a stressed, reactive state into deep calm and clarity within minutes.',
        image: '/insights_page/breathwork/pexels-ivan-s-6648557.jpg',
        imagePosition: 'left'
      },
      {
        title: 'From Stress Relief to Spiritual Awakening',
        text: 'Different techniques serve different purposes. Box breathing calms anxiety, Wim Hof energizes the body, and holotropic breathwork can facilitate profound spiritual experiences. Regular practice rewires your nervous system, reducing cortisol and improving focus.',
        image: '/insights_page/breathwork/pexels-mikhail-nilov-6945081.jpg',
        imagePosition: 'right'
      },
      {
        title: 'Healing Trauma Through the Breath',
        text: 'Somatic breathwork is used by therapists worldwide to help clients release stored trauma. The breath is the bridge between your conscious mind and your unconscious nervous system. Many practitioners report deep emotional releases and lasting healing.',
        image: '/insights_page/breathwork/pexels-thirdman-6958263.jpg',
        imagePosition: 'left'
      }
    ],
    scrollGallery: [
      '/insights_page/breathwork/angelina-sarycheva-wD1J9DD7fSk-unsplash.jpg',
      '/insights_page/breathwork/masha-raymers-UBxoHz3zQG4-unsplash.jpg',
      '/insights_page/breathwork/pexels-arthousestudio-7363287.jpg',
      '/insights_page/breathwork/pexels-burst-373936.jpg',
      '/insights_page/breathwork/pexels-ivan-s-6648558.jpg',
      '/insights_page/breathwork/pexels-ivan-s-6648565.jpg',
      '/insights_page/breathwork/pexels-kampus-6298314.jpg',
      '/insights_page/breathwork/pexels-mikhail-nilov-6945081.jpg',
      '/insights_page/breathwork/pexels-pnw-prod-8981324.jpg',
      '/insights_page/breathwork/pexels-silverkblack-36715239.jpg',
    ],
    remedies: [
      'Practice 4-7-8 breathing before bed to activate the parasympathetic nervous system.',
      'Try box breathing for 5 minutes before stressful meetings or presentations.',
      'Spend 10 minutes each morning doing conscious deep belly breathing.',
      'Explore Wim Hof or pranayama breathing to boost energy and immune resilience.'
    ]
  },

  'chakra-healing': {
    id: 'chakra-healing',
    name: 'Chakra Healing',
    heroTitle: 'Balance Your Energy Centers',
    heroDescription: 'Align and activate your seven chakras to restore harmony, vitality, and spiritual wellbeing.',
    heroImages: [
      '/insights_page/chakra-healing/b-cole-to62lwqrbdk-unsplash.jpg',
      '/insights_page/chakra-healing/esther-verdu-G3ttEY6r7J0-unsplash.jpg',
      '/insights_page/chakra-healing/esther-verdu-z3I6QNClKLk-unsplash.jpg',
    ],
    contentSections: [
      {
        title: 'The Seven Sacred Energy Centers',
        text: 'The chakra system, originating in ancient Indian texts, describes seven major energy centers running along the spine. Each chakra corresponds to specific organs, emotions, and aspects of life. From the root chakra governing security to the crown chakra connecting you to divine consciousness, each center influences your physical, emotional, and spiritual health.',
        image: '/insights_page/chakra-healing/b-cole-to62lwqrbdk-unsplash.jpg',
        imagePosition: 'left'
      },
      {
        title: 'Signs of Imbalance and Healing',
        text: 'When a chakra is blocked or overactive, it manifests as physical symptoms, emotional patterns, or life challenges. A blocked throat chakra may appear as difficulty communicating, while an imbalanced solar plexus leads to low self-esteem. Through targeted practices, you can restore balance and flow.',
        image: '/insights_page/chakra-healing/esther-verdu-G3ttEY6r7J0-unsplash.jpg',
        imagePosition: 'right'
      },
      {
        title: 'Tools for Chakra Alignment',
        text: 'Crystal healing, color therapy, sound bowls, yoga postures, and essential oils are among the many tools used to balance the chakras. Working with a skilled healer, you can receive personalized guidance on which chakras need attention and which healing modalities will be most effective.',
        image: '/insights_page/chakra-healing/esther-verdu-z3I6QNClKLk-unsplash.jpg',
        imagePosition: 'left'
      }
    ],
    scrollGallery: [
      '/insights_page/chakra-healing/b-cole-to62lwqrbdk-unsplash.jpg',
      '/insights_page/chakra-healing/esther-verdu-G3ttEY6r7J0-unsplash.jpg',
      '/insights_page/chakra-healing/esther-verdu-z3I6QNClKLk-unsplash.jpg',
      '/insights_page/chakra-healing/pexels-arina-krasnikova-6998231.jpg',
      '/insights_page/chakra-healing/scroll image.jpg',
      '/insights_page/chakra-healing/scroll image1.jpg',
      '/insights_page/chakra-healing/scroll image2.jpg',
    ],
    remedies: [
      'Practice the Seed (Bija) mantras for each chakra during meditation â€â€ LAM, VAM, RAM, YAM, HAM, OM.',
      'Use color therapy: wear the color associated with the chakra you are working on.',
      'Place corresponding crystals on each chakra during a 20-minute lying-down meditation.',
      'Practice yoga poses that target specific chakras: mountain pose for root, cobra for heart.'
    ]
  },

  dreams: {
    id: 'dreams',
    name: 'Dream Prediction',
    heroTitle: 'Messages from the Subconscious',
    heroDescription: 'Decode the rich symbolism of your dreams to uncover hidden desires, fears, and profound intuitive guidance.',
    heroImages: [
      '/insights_page/dream-interpretation/pexels-alexeydemidov-11472317.jpg',
      '/insights_page/dream-interpretation/pexels-lucaspezeta-11371344.jpg',
      '/insights_page/dream-interpretation/pexels-roman-odintsov-11760374.jpg',
    ],
    contentSections: [
      {
        title: 'Why Your Dreams Matter',
        text: 'Dreams are the language of the subconscious mind. Every night, while your conscious mind rests, your deeper self processes emotions, rehearses scenarios, and communicates vital messages. Dream interpretation is the art of decoding this rich, symbolic language â€â€ offering unprecedented access to your inner world, fears, desires, and soul guidance.',
        image: '/insights_page/dream-interpretation/pexels-alexeydemidov-11472317.jpg',
        imagePosition: 'left'
      },
      {
        title: 'Symbols, Archetypes, and Meaning',
        text: 'Carl Jung identified universal archetypes â€â€ the Shadow, the Anima, the Hero â€â€ that appear consistently in dream imagery across cultures. Water represents the unconscious; flying symbolizes liberation; falling indicates fear of failure. A skilled dream interpreter reads these symbols in the context of your unique life circumstances.',
        image: '/insights_page/dream-interpretation/pexels-mikhail-nilov-6932881.jpg',
        imagePosition: 'right'
      },
      {
        title: 'Prophetic Dreams and Spiritual Guidance',
        text: 'Many spiritual traditions regard certain dreams as prophetic or divinely inspired. Lucid dreaming allows you to become conscious within your dreams, enabling dialogue with dream figures and access to higher wisdom. Dream prediction combines modern psychology with ancient spiritual insight to help you navigate your waking life.',
        image: '/insights_page/dream-interpretation/pexels-ron-lach-8263062.jpg',
        imagePosition: 'left'
      }
    ],
    scrollGallery: [
      '/insights_page/dream-interpretation/pexels-alexeydemidov-11472317.jpg',
      '/insights_page/dream-interpretation/pexels-andrea-h-b-1313707030-28347336.jpg',
      '/insights_page/dream-interpretation/pexels-cottonbro-4980311.jpg',
      '/insights_page/dream-interpretation/pexels-lucaspezeta-11371344.jpg',
      '/insights_page/dream-interpretation/pexels-mikhail-nilov-6932881.jpg',
      '/insights_page/dream-interpretation/pexels-mlkbnl-27818275.jpg',
      '/insights_page/dream-interpretation/pexels-pixabay-37407.jpg',
      '/insights_page/dream-interpretation/pexels-roman-odintsov-11760374.jpg',
      '/insights_page/dream-interpretation/pexels-ron-lach-8263062.jpg',
      '/insights_page/dream-interpretation/pexels-shvets-production-8037024.jpg',
    ],
    remedies: [
      'Keep a dream journal beside your bed and write down your dreams immediately upon waking.',
      'Before sleep, set a clear intention or ask your subconscious a specific question for guidance.',
      'Explore lucid dreaming techniques like the WILD method to gain conscious awareness.',
      'Avoid alcohol before bed as it suppresses REM sleep, where most meaningful dreaming occurs.'
    ]
  },

  'face-reading': {
    id: 'face-reading',
    name: 'Face Reading',
    heroTitle: 'The Face as a Map of the Soul',
    heroDescription: 'Discover how the unique features of your face reveal your personality, health, and destiny according to ancient wisdom.',
    heroImages: [
      '/insights_page/face-reading/pexels-chloe-amaya-1047565-4079238.jpg',
      '/insights_page/face-reading/pexels-andy-lee-1453672476-36126957.jpg',
      '/insights_page/face-reading/pexels-eric-quinones-2149843819-35725745.jpg',
    ],
    contentSections: [
      {
        title: 'The Ancient Art of Physiognomy',
        text: 'Face reading, known as physiognomy in the West and Mian Xiang in Chinese tradition, is the practice of interpreting facial features to understand personality, health tendencies, and life patterns. Practiced for over 3,000 years in China, it became a core tool of Traditional Chinese Medicine.',
        image: '/insights_page/face-reading/pexels-chloe-amaya-1047565-4079238.jpg',
        imagePosition: 'left'
      },
      {
        title: 'What Each Feature Reveals',
        text: 'In face reading, every feature tells a story. The forehead represents your thinking style. The eyes reveal emotional depth. A strong nose indicates business acumen, while full lips suggest generosity. The shape of the jaw speaks to determination. A skilled reader synthesizes all these features into a holistic portrait.',
        image: '/insights_page/face-reading/pexels-algrey-5891868.jpg',
        imagePosition: 'right'
      },
      {
        title: 'Practical Applications in Daily Life',
        text: 'Face reading is used by business leaders to understand team dynamics, by psychologists as a complementary assessment tool, and by individuals seeking self-understanding. It can help you identify natural strengths, understand health vulnerabilities, and navigate career choices that align with your innate nature.',
        image: '/insights_page/face-reading/pexels-cottonbro-8090286.jpg',
        imagePosition: 'left'
      }
    ],
    scrollGallery: [
      '/insights_page/face-reading/pexels-algrey-5891868.jpg',
      '/insights_page/face-reading/pexels-andy-lee-1453672476-36126957.jpg',
      '/insights_page/face-reading/pexels-chloe-amaya-1047565-4079238.jpg',
      '/insights_page/face-reading/pexels-cottonbro-8090286.jpg',
      '/insights_page/face-reading/pexels-eric-quinones-2149843819-35725745.jpg',
      '/insights_page/face-reading/pexels-mart-production-7334335.jpg',
      '/insights_page/face-reading/pexels-pavel-danilyuk-7222018.jpg',
    ],
    remedies: [
      'Study the nine major face zones corresponding to different life areas like career and relationships.',
      'Notice which features you lead with in conversation â€â€ this reveals your dominant interaction mode.',
      'Use face reading as a self-compassion practice: understand your challenges as encoded in your features.',
      'Work with a certified face reader for a personalized, in-depth analysis of your unique facial map.'
    ]
  },

  meditation: {
    id: 'meditation',
    name: 'Meditation',
    heroTitle: 'Find Peace in the Present Moment',
    heroDescription: 'Cultivate inner stillness, mental clarity, and profound peace through the ancient and modern science of meditation.',
    heroImages: [
      '/insights_page/meditation/em-0p8foYTgeA4-unsplash.jpg',
      '/insights_page/meditation/pexels-firshads-3957803.jpg',
      '/insights_page/meditation/pexels-vlada-karpovich-8939958.jpg',
    ],
    contentSections: [
      {
        title: 'The Science Behind the Stillness',
        text: 'Modern neuroscience has confirmed what ancient meditators knew for millennia: regular meditation literally changes the brain. Studies show it increases gray matter density in areas associated with self-awareness and compassion, while reducing the size of the amygdala â€â€ your brain stress alarm system. Just 8 weeks of daily practice produces measurable structural changes.',
        image: '/insights_page/meditation/pexels-cup-of-couple-6962536.jpg',
        imagePosition: 'left'
      },
      {
        title: 'Traditions and Techniques',
        text: 'From Vipassana insight meditation to Transcendental Meditation, from Zen sitting to Tibetan visualization, the worlds wisdom traditions offer a vast spectrum of techniques. Whether you seek stress relief, spiritual awakening, or creative inspiration, there is a practice perfectly suited to your temperament and goals.',
        image: '/insights_page/meditation/pexels-abhayaranya-35338412.jpg',
        imagePosition: 'right'
      },
      {
        title: 'Building a Sustainable Practice',
        text: 'The greatest challenge for most people is not the practice itself, but consistency. Starting with just 5 minutes daily, finding the right time, creating a dedicated space, and using guided sessions can help you build a habit that becomes the cornerstone of your wellbeing. Even on difficult days, showing up for your practice is what creates transformation.',
        image: '/insights_page/meditation/pexels-gulsahaydgn-20367722.jpg',
        imagePosition: 'left'
      }
    ],
    scrollGallery: [
      '/insights_page/meditation/em-0p8foYTgeA4-unsplash.jpg',
      '/insights_page/meditation/pexels-abhayaranya-35338412.jpg',
      '/insights_page/meditation/pexels-cup-of-couple-6962536.jpg',
      '/insights_page/meditation/pexels-firshads-3957803.jpg',
      '/insights_page/meditation/pexels-gulsahaydgn-20367722.jpg',
      '/insights_page/meditation/pexels-n-voitkevich-7078130.jpg',
      '/insights_page/meditation/pexels-vlada-karpovich-8939958.jpg',
      '/insights_page/meditation/pexels-yogendras31-14237832.jpg',
    ],
    remedies: [
      'Start with just 5 minutes of breath-focused meditation each morning before checking your phone.',
      'Use body scan meditation before sleep to release tension accumulated throughout the day.',
      'Try loving-kindness (Metta) meditation to cultivate compassion toward yourself and others.',
      'Explore walking meditation to bring mindful awareness into everyday movement.'
    ]
  },

  numerology: {
    id: 'numerology',
    name: 'Numerology',
    heroTitle: 'Your Life Numbers Never Lie',
    heroDescription: 'Unlock the hidden patterns in your birth date and name that reveal your soul mission, personality, and destiny.',
    heroImages: [
      '/insights_page/numerology/markus-krisetya-Vkp9wg-VAsQ-unsplash.jpg',
      '/insights_page/numerology/superko-ai-generated-8888074_1920.jpg',
      '/insights_page/numerology/kira-auf-der-heide-QyCH5jwrD_A-unsplash.jpg',
    ],
    contentSections: [
      {
        title: 'The Mathematics of the Soul',
        text: 'Numerology is the ancient study of the mystical relationship between numbers and living things. Rooted in the teachings of Pythagoras and ancient Chaldean wisdom, it holds that every number carries a specific vibration and meaning. Your birth date and name, reduced to their core numbers, reveal your Life Path, Expression Number, Soul Urge, and much more.',
        image: '/insights_page/numerology/markus-krisetya-Vkp9wg-VAsQ-unsplash.jpg',
        imagePosition: 'left'
      },
      {
        title: 'Decoding Your Life Path Number',
        text: 'The Life Path Number, derived from your birth date, is the most important number in your numerological chart. It describes the nature of your journey through life, your natural talents, and the lessons you are here to master. A Life Path 3 is destined for creative expression; a Life Path 8 is built for material achievement and leadership.',
        image: '/insights_page/numerology/pexels-ann-h-45017-32417524.jpg',
        imagePosition: 'right'
      }
    ],
    scrollGallery: [
      '/insights_page/numerology/markus-krisetya-Vkp9wg-VAsQ-unsplash.jpg',
      '/insights_page/numerology/pexels-ann-h-45017-32417524.jpg',
      '/insights_page/numerology/superko-ai-generated-8888074_1920.jpg',
      '/insights_page/numerology/kira-auf-der-heide-QyCH5jwrD_A-unsplash.jpg',
    ],
    remedies: [
      'Calculate your Life Path Number by adding all digits of your birth date to a single digit.',
      'Notice recurring numbers in your daily life â€â€ these are often messages from the universe.',
      'Use your Personal Year Number to understand the overarching theme of each year of your life.',
      'Work with a numerologist to get a complete chart analysis covering name number and karmic lessons.'
    ]
  },

  'palm-reading': {
    id: 'palm-reading',
    name: 'Palm Reading',
    heroTitle: 'Your Future is Written in Your Hands',
    heroDescription: 'The ancient art of palmistry reveals your character, life lessons, and potential through the lines and features of your palm.',
    heroImages: [
      '/insights_page/palm-reading/pexels-devvishu-8229081.jpg',
      '/insights_page/palm-reading/shreyas-shah-Ka-speuU7W4-unsplash.jpg',
      '/insights_page/palm-reading/pexels-cottonbro-7182585.jpg',
    ],
    contentSections: [
      {
        title: 'Reading the Map of Your Palm',
        text: 'Palmistry has been practiced for over 5,000 years across cultures from India and China to ancient Greece and Rome. Your palm contains a unique map of lines, mounts, and features that reflect your personality, health, emotional life, and life journey. Unlike a fixed fate, your palm changes over time â€â€ reflecting your choices and evolution.',
        image: '/insights_page/palm-reading/pexels-devvishu-8229081.jpg',
        imagePosition: 'left'
      },
      {
        title: 'The Major Lines and Their Meanings',
        text: 'The Heart Line speaks to your emotional life and relationships. The Head Line reveals your thinking style. The Life Line indicates the quality and vitality of your life, not its length. The Fate Line shows the degree to which external circumstances influence your path. Together, these lines tell a rich, complex story.',
        image: '/insights_page/palm-reading/pexels-pavel-danilyuk-7221646.jpg',
        imagePosition: 'right'
      },
      {
        title: 'Both Hands Tell a Different Story',
        text: 'In palmistry, the non-dominant hand reveals your innate potential and the gifts you were born with, while your dominant hand shows what you have done with those gifts. Comparing both hands illuminates the gap between your potential and your reality, and the areas where focused effort can bring the greatest transformation.',
        image: '/insights_page/palm-reading/pexels-alexander-suhorucov-6457564.jpg',
        imagePosition: 'left'
      }
    ],
    scrollGallery: [
      '/insights_page/palm-reading/pexels-alexander-suhorucov-6457564.jpg',
      '/insights_page/palm-reading/pexels-cottonbro-7182585.jpg',
      '/insights_page/palm-reading/pexels-devvishu-8229081.jpg',
      '/insights_page/palm-reading/pexels-pavel-danilyuk-7221646.jpg',
      '/insights_page/palm-reading/pexels-pavel-danilyuk-7221656.jpg',
      '/insights_page/palm-reading/pexels-pavel-danilyuk-7221659.jpg',
      '/insights_page/palm-reading/shreyas-shah-Ka-speuU7W4-unsplash.jpg',
    ],
    remedies: [
      'Observe your dominant hand regularly â€â€ if lines deepen or new branches appear, your choices are creating new pathways.',
      'Compare your left and right hands side by side to identify areas of unrealized potential.',
      'Focus on the qualities shown by your Mercury finger for better communication and intuition.',
      'Seek a reading from a certified palmist who combines traditional lineage with psychological insight.'
    ]
  },

  'sound-healing': {
    id: 'sound-healing',
    name: 'Sound Healing',
    heroTitle: 'Heal with the Frequency of the Universe',
    heroDescription: 'Harness the power of sacred sound â€â€ from Tibetan singing bowls to binaural beats â€â€ to restore harmony in body, mind, and soul.',
    heroImages: [
      '/insights_page/sound-healing/pexels-anastasia-shuraeva-6013501.jpg',
      '/insights_page/sound-healing/thlt-lcx-VsI_74zRzAo-unsplash.jpg',
      '/insights_page/sound-healing/sound heal.jpg',
    ],
    contentSections: [
      {
        title: 'The Science of Sound as Medicine',
        text: 'Sound healing is grounded in the scientific principle of resonance â€â€ the phenomenon by which one vibrating object causes another to vibrate at the same frequency. Your cells, organs, and even your DNA respond to sound frequencies. Research shows that sound therapy can reduce cortisol, lower blood pressure, improve sleep, and shift brainwaves into healing alpha and theta states.',
        image: '/insights_page/sound-healing/pexels-anastasia-shuraeva-6013501.jpg',
        imagePosition: 'left'
      },
      {
        title: 'Sacred Instruments and Their Healing Power',
        text: 'Tibetan singing bowls produce rich, complex overtones that entrain brainwaves into meditative states. Crystal bowls, tuned to the frequencies of specific chakras, directly influence your energy centers. Gongs create powerful sound baths that dissolve tension in minutes. The human voice â€â€ through toning, chanting, and mantra â€â€ is perhaps the most accessible healing instrument of all.',
        image: '/insights_page/sound-healing/pexels-cottonbro-5602498.jpg',
        imagePosition: 'right'
      }
    ],
    scrollGallery: [
      '/insights_page/sound-healing/pexels-anastasia-shuraeva-6013501.jpg',
      '/insights_page/sound-healing/pexels-cottonbro-5602498.jpg',
      '/insights_page/sound-healing/pexels-shkrabaanthony-6252163.jpg',
      '/insights_page/sound-healing/thlt-lcx-VsI_74zRzAo-unsplash.jpg',
      '/insights_page/sound-healing/sound heal.jpg',
    ],
    remedies: [
      'Listen to 432Hz or 528Hz frequency music during meditation or sleep for deep cellular healing.',
      'Explore binaural beats to shift your brainwave state into deep relaxation on demand.',
      'Chant the Om mantra for 10 minutes daily â€â€ its vibration harmonizes the nervous system.',
      'Attend a live sound bath session with Tibetan bowls or gongs for a full-body energetic reset.'
    ]
  },

  'space-harmony': {
    id: 'space-harmony',
    name: 'Space Harmony',
    heroTitle: 'Transform Your Space, Transform Your Life',
    heroDescription: 'Ancient principles of Vastu Shastra and Feng Shui reveal how the energy of your living space directly shapes your health, wealth, and wellbeing.',
    heroImages: [
      '/insights_page/space-harmony/pexels-homelane-com-492179-1776574.jpg',
      '/insights_page/space-harmony/pexels-liva-kitchens-and-interiors-2153927697-33452539.jpg',
      '/insights_page/space-harmony/pexels-devansh-raniwala-1888270-18633512.jpg',
    ],
    contentSections: [
      {
        title: 'The Ancient Science of Spatial Energy',
        text: 'Vastu Shastra, the ancient Indian science of architecture and spatial harmony, and Feng Shui, its Chinese counterpart, teach that the spaces we inhabit are alive with energy. The orientation of rooms, placement of furniture, colors used, and flow of air and light all influence the quality of energy â€â€ and therefore the quality of life â€â€ of everyone who lives within.',
        image: '/insights_page/space-harmony/pexels-homelane-com-492179-1776574.jpg',
        imagePosition: 'left'
      },
      {
        title: 'Practical Principles for Your Home',
        text: 'Clearing clutter is the single most powerful thing you can do for the energy of your space â€â€ clutter represents stuck energy and creates mental congestion. Orienting your bed so you can see the door promotes security. Introducing plants brings living energy and purifies the air. Natural light and specific colors in specific rooms can profoundly shift how a space feels.',
        image: '/insights_page/space-harmony/pexels-artbovich-6489106.jpg',
        imagePosition: 'right'
      },
      {
        title: 'Transforming Your Workspace for Success',
        text: 'Your workspace is a mirror of your professional energy. A cluttered desk signals a cluttered mind. Positioning your desk to face the entrance, keeping your workspace clean and organized, and incorporating the five Feng Shui elements â€â€ wood, fire, earth, metal, and water â€â€ can dramatically elevate your professional energy and outcomes.',
        image: '/insights_page/space-harmony/pexels-rdne-6806390.jpg',
        imagePosition: 'left'
      }
    ],
    scrollGallery: [
      '/insights_page/space-harmony/pexels-allison-pang-2163709073-39148302.jpg',
      '/insights_page/space-harmony/pexels-artbovich-6489106.jpg',
      '/insights_page/space-harmony/pexels-devansh-raniwala-1888270-18633512.jpg',
      '/insights_page/space-harmony/pexels-gokul-purushothaman-125319319-13099442.jpg',
      '/insights_page/space-harmony/pexels-golboo-33210282.jpg',
      '/insights_page/space-harmony/pexels-homelane-com-492179-1776574.jpg',
      '/insights_page/space-harmony/pexels-jan-vee-2150834267-31352325.jpg',
      '/insights_page/space-harmony/pexels-joeofcochin-6593988.jpg',
      '/insights_page/space-harmony/pexels-liva-kitchens-and-interiors-2153927697-33452539.jpg',
      '/insights_page/space-harmony/pexels-rdne-6806390.jpg',
    ],
    remedies: [
      'Declutter one room completely â€â€ donate anything that does not serve your current life chapter.',
      'Place a bowl of sea salt in the corners of rooms to absorb stagnant energy, replacing it monthly.',
      'Introduce living plants â€â€ especially money plants or peace lilies â€â€ to purify energy and attract abundance.',
      'Consult a Vastu or Feng Shui expert to analyze the energy map of your home.'
    ]
  },

  spiritual: {
    id: 'spiritual',
    name: 'Spiritual Guidance',
    heroTitle: 'Illuminate Your Path Within',
    heroDescription: 'Connect with higher wisdom, purpose, and the deepest truth of who you are through transformative spiritual guidance.',
    heroImages: [
      '/insights_page/spiritual-guidance/pexels-amychandra-773013.jpg',
      '/insights_page/spiritual-guidance/pexels-ajan-yogi-311175-9271141.jpg',
      '/insights_page/spiritual-guidance/aamir-suhail-ATlRqTCbvV4-unsplash.jpg',
    ],
    contentSections: [
      {
        title: 'Beyond Religion: Universal Spiritual Wisdom',
        text: 'Spiritual guidance is not tied to any specific religion or doctrine. It is the art of helping a person connect with their own inner knowing, their sense of meaning and purpose, and their relationship with something greater than themselves. A skilled spiritual guide helps you find your own truth, not adopt someone elses.',
        image: '/insights_page/spiritual-guidance/pexels-amychandra-773013.jpg',
        imagePosition: 'left'
      },
      {
        title: 'Navigating the Dark Nights of the Soul',
        text: 'Every spiritual path includes periods of darkness and doubt. A compassionate spiritual guide who has traversed this terrain themselves can be an invaluable companion through these transformative but often bewildering passages. These dark nights precede the deepest awakenings and expansions of consciousness.',
        image: '/insights_page/spiritual-guidance/pexels-cottonbro-5386075.jpg',
        imagePosition: 'right'
      },
      {
        title: 'Awakening to Your True Purpose',
        text: 'At the heart of spiritual guidance is the question every soul asks: Why am I here? What is my purpose? Through deep inquiry and contemplative practices drawn from Vedanta, Sufism, Buddhism, and Indigenous spirituality, a skilled guide helps you hear the clear, still voice of your own soul.',
        image: '/insights_page/spiritual-guidance/pexels-anete-lusina-4790557.jpg',
        imagePosition: 'left'
      }
    ],
    scrollGallery: [
      '/insights_page/spiritual-guidance/aamir-suhail-ATlRqTCbvV4-unsplash.jpg',
      '/insights_page/spiritual-guidance/pexels-ajan-yogi-311175-9271141.jpg',
      '/insights_page/spiritual-guidance/pexels-amychandra-773013.jpg',
      '/insights_page/spiritual-guidance/pexels-anete-lusina-4790557.jpg',
      '/insights_page/spiritual-guidance/pexels-arina-krasnikova-6998232.jpg',
      '/insights_page/spiritual-guidance/pexels-cottonbro-5386075.jpg',
      '/insights_page/spiritual-guidance/pexels-mikhail-nilov-6931773.jpg',
      '/insights_page/spiritual-guidance/pexels-pavel-danilyuk-7267752.jpg',
      '/insights_page/spiritual-guidance/pexels-visualkarsa-11393075.jpg',
    ],
    remedies: [
      'Establish a daily contemplative practice â€â€ even 10 minutes of silence or journaling creates a foundation for growth.',
      'Read the texts of multiple wisdom traditions with an open mind, seeking universal truths.',
      'Practice service (seva) â€â€ actively giving to others without expectation is one of the fastest paths to awakening.',
      'Find a teacher whose life embodies the qualities you aspire to and learn through their lived example.'
    ]
  },

  tarot: {
    id: 'tarot',
    name: 'Tarot',
    heroTitle: 'A Mirror for the Soul',
    heroDescription: 'The 78 cards of the Tarot are a profound tool for self-reflection, intuitive guidance, and navigating life most important questions.',
    heroImages: [
      '/insights_page/tarot/edz-norton-eUX74J_IpXw-unsplash.jpg',
      '/insights_page/tarot/viva-luna-studios-XZhILkqs2mk-unsplash.jpg',
      '/insights_page/tarot/petr-sidorov-D3SzBCAeMhQ-unsplash.jpg',
    ],
    contentSections: [
      {
        title: 'The 78-Card Journey of Self',
        text: 'The Tarot deck is a profound symbolic system of 78 cards divided into the Major Arcana â€â€ 22 cards depicting life major archetypes and lessons â€â€ and the Minor Arcana depicting the everyday experiences of life across four suits. Together they form a complete map of the human experience, from the Fool innocent leap to the World completion.',
        image: '/insights_page/tarot/edz-norton-eUX74J_IpXw-unsplash.jpg',
        imagePosition: 'left'
      },
      {
        title: 'Not Fortune-Telling, but Inner Guidance',
        text: 'The most powerful use of Tarot is not to predict a fixed future, but to illuminate the dynamics at play in a situation and the energies available to you. Each card drawn activates your intuition, bringing unconscious wisdom to the surface. A skilled reader uses the cards as a catalyst for insight to help you make more conscious choices.',
        image: '/insights_page/tarot/viva-luna-studios-zu_hPWH32wA-unsplash.jpg',
        imagePosition: 'right'
      },
      {
        title: 'Learning Tarot as a Spiritual Practice',
        text: 'Drawing a single daily card is one of the simplest and most powerful spiritual practices available. Each morning, ask what you need to know or focus on today and draw one card. Over months and years of this practice, you develop a deep relationship with the cards and with your own intuitive wisdom.',
        image: '/insights_page/tarot/subarasikiai-tarot-cards-7395644_1920.jpg',
        imagePosition: 'left'
      }
    ],
    scrollGallery: [
      '/insights_page/tarot/edz-norton-eUX74J_IpXw-unsplash.jpg',
      '/insights_page/tarot/edz-norton-IAvYkUPm-lI-unsplash.jpg',
      '/insights_page/tarot/lower scroll image.jpg',
      '/insights_page/tarot/lower_scroll inmage.jpg',
      '/insights_page/tarot/petr-sidorov-D3SzBCAeMhQ-unsplash.jpg',
      '/insights_page/tarot/subarasikiai-tarot-cards-7395644_1920.jpg',
      '/insights_page/tarot/viva-luna-studios-XZhILkqs2mk-unsplash.jpg',
      '/insights_page/tarot/viva-luna-studios-zu_hPWH32wA-unsplash.jpg',
    ],
    remedies: [
      'Pull a single card each morning and journal about how its energy might manifest in your day.',
      'Do a monthly Celtic Cross spread on a new or full moon to gain clarity on dominant life themes.',
      'Study the Rider-Waite deck deeply â€â€ its rich symbolism reveals layers of meaning over years of study.',
      'Trust your first instinct when reading cards â€â€ your initial emotional response is your intuition speaking.'
    ]
  },
};
