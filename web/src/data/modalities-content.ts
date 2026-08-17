export interface ModalityContentSection {
  title: string;
  text: string;
  image: string;
  imagePosition: 'left' | 'right';
}

export interface ModalityData {
  id: string;
  name: string;
  heroTitle: string;
  heroDescription: string;
  heroImages: string[];
  contentSections: ModalityContentSection[];
  scrollGallery: string[];
  remedies: string[];
}

export const MODALITIES_CONTENT: Record<string, ModalityData> = {
  astrology: {
    id: 'astrology',
    name: 'Astrology',
    heroTitle: 'Cosmic Blueprint & Guidance',
    heroDescription: 'Understand the profound influence of the cosmos on your life path, personality, and soul purpose.',
    heroImages: [
      '/insights_page/astrology/greg-rakozy-oMpAz-DN-9I-unsplash.jpg',
      '/insights_page/astrology/miracosic-astrology-993127_1920.jpg',
    ],
    contentSections: [
      {
        title: 'The Blueprint of Your Soul',
        text: 'Astrology is an ancient practice that maps the positions of celestial bodies at the exact moment of your birth. This unique map, known as your natal chart, serves as a profound blueprint for your life. It reveals your innate strengths, potential challenges, and the underlying themes of your personal journey. By understanding your astrological makeup, you can navigate life with greater clarity, aligning your actions with your cosmic design to achieve harmony and fulfillment.',
        image: '/insights_page/astrology/viva-luna-studios-r_-onuwuWAU-unsplash.jpg',
        imagePosition: 'left'
      },
      {
        title: 'Timing and Transformation',
        text: 'Beyond personality analysis, astrology provides powerful insights into the cycles and timing of your life. As the planets continue their eternal dance, they form aspects with your natal chart, triggering periods of growth, challenge, and transformation. Understanding these planetary transits empowers you to anticipate major life shifts, make informed decisions, and flow with the universal currents rather than resisting them.',
        image: '/insights_page/astrology/the-new-york-public-library-FcI-z6bfq4g-unsplash.jpg',
        imagePosition: 'right'
      }
    ],
    scrollGallery: [
      '/insights_page/astrology/greg-rakozy-oMpAz-DN-9I-unsplash.jpg',
      '/insights_page/astrology/miracosic-astrology-993127_1920.jpg',
      '/insights_page/astrology/viva-luna-studios-r_-onuwuWAU-unsplash.jpg',
    ],
    remedies: [
      'Wear specific gemstones aligned with your ruling planets to enhance positive cosmic energies.',
      'Perform daily affirmations tailored to your Moon sign to nurture emotional balance.',
      'Engage in planetary fasting or charity on specific days to appease challenging planetary transits.'
    ]
  },

  tarot: {
    id: 'tarot',
    name: 'Tarot',
    heroTitle: 'Intuitive Card Reading',
    heroDescription: 'Unlock hidden truths and gain profound clarity on your past, present, and future through the ancient symbolism of the Tarot.',
    heroImages: [
      '/insights_page/tarot/edz-norton-eUX74J_IpXw-unsplash.jpg',
      '/insights_page/tarot/viva-luna-studios-XZhILkqs2mk-unsplash.jpg',
      '/insights_page/tarot/subarasikiai-tarot-cards-7395644_1920.jpg',
    ],
    contentSections: [
      {
        title: 'The Mirror of the Subconscious',
        text: 'The Tarot is a deck of 78 cards rich in esoteric symbolism, archetypes, and spiritual wisdom. It acts as a powerful mirror reflecting the deepest truths of your subconscious mind. A skilled Tarot reading taps into your energy field, drawing out insights regarding your current circumstances, hidden influences, and potential future trajectories. It is not merely fortune-telling, but a tool for profound psychological and spiritual introspection.',
        image: '/insights_page/tarot/petr-sidorov-D3SzBCAeMhQ-unsplash.jpg',
        imagePosition: 'left'
      },
      {
        title: 'Navigating Crossroads',
        text: 'When faced with difficult choices or confusing situations, Tarot provides clarity and perspective. The cards highlight the energies surrounding your relationships, career, and personal growth, offering guidance on the best path forward. By understanding the archetypal lessons presented by the cards, you can make empowered decisions, release limiting patterns, and consciously co-create your destiny.',
        image: '/insights_page/tarot/viva-luna-studios-zu_hPWH32wA-unsplash.jpg',
        imagePosition: 'right'
      }
    ],
    scrollGallery: [
      '/insights_page/tarot/lower scroll image.jpg',
      '/insights_page/tarot/lower_scroll inmage.jpg',
      '/insights_page/tarot/edz-norton-IAvYkUPm-lI-unsplash.jpg',
    ],
    remedies: [
      'Meditate on the archetype of the Major Arcana card that frequently appears in your readings.',
      'Keep a daily Tarot journal to track intuitive insights and recurring themes in your life.',
      'Cleanse your personal space with sage or palo santo to clear stagnant energies before making major decisions.'
    ]
  },

  'face-reading': {
    id: 'face-reading',
    name: 'Face Reading',
    heroTitle: 'The Map of Your Character',
    heroDescription: 'Discover the profound connections between your physical features, personality traits, and life experiences through the ancient art of Physiognomy.',
    heroImages: [
      '/insights_page/face-reading/pexels-mart-production-7334335.jpg',
      '/insights_page/face-reading/pexels-pavel-danilyuk-7222018.jpg',
    ],
    contentSections: [
      {
        title: 'Decoding Facial Micro-Expressions',
        text: 'Face Reading, or Physiognomy, is the ancient practice of assessing a person\'s character, personality, and even health markers based on their facial features. Every line, contour, and proportion of your face tells a story about your past experiences, inherent strengths, and emotional tendencies. By learning to decode these subtle markers, we gain profound insights into our authentic selves and the true nature of those around us.',
        image: '/insights_page/face-reading/pexels-mart-production-7334335.jpg',
        imagePosition: 'left'
      },
      {
        title: 'Health and Vitality Markers',
        text: 'Beyond personality, the face serves as a diagnostic map in many holistic traditions. Changes in skin tone, the emergence of specific lines, or imbalances in facial symmetry can indicate underlying energetic or physical health conditions. Face reading provides early clues to internal imbalances, empowering you to take proactive steps in your wellness journey.',
        image: '/insights_page/face-reading/pexels-pavel-danilyuk-7222018.jpg',
        imagePosition: 'right'
      }
    ],
    scrollGallery: [
      '/insights_page/face-reading/lower scroll.jpg',
      '/insights_page/face-reading/scroll image.jpg',
    ],
    remedies: [
      'Practice daily facial massage to release tension and improve energy flow (Qi) in the face.',
      'Incorporate cooling foods into your diet if redness or inflammation appears in specific facial zones.',
      'Engage in regular emotional release techniques to soften harsh worry lines or tension held in the jaw.'
    ]
  },

  'palm-reading': {
    id: 'palm-reading',
    name: 'Palm Reading',
    heroTitle: 'The Destiny in Your Hands',
    heroDescription: 'Uncover the unique blueprint of your character, talents, and potential life events etched into the lines of your palms.',
    heroImages: [
      '/insights_page/palm-reading/sunday-oludare-UjDgsnG9LWo-unsplash.jpg',
      '/insights_page/palm-reading/use this image horizontal.jpg',
    ],
    contentSections: [
      {
        title: 'The Topography of the Hand',
        text: 'Palmistry, or Chiromancy, involves the detailed analysis of the hands to evaluate a person\'s character and predict their future. The major lines—the Heart, Head, and Life lines—provide a foundational understanding of your emotional landscape, intellectual inclinations, and overall vitality. The shape of the hand and the mounts (the fleshy pads) further reveal your elemental nature and inherent talents.',
        image: '/insights_page/palm-reading/pexels-pavel-danilyuk-7221659.jpg',
        imagePosition: 'left'
      },
      {
        title: 'A Dynamic Map of Life',
        text: 'Unlike astrology, which is fixed at birth, the lines on your palm are dynamic and can change over time. They reflect the neuro-pathways of the brain and the choices you make. A palm reading not only illuminates your current path but also empowers you to consciously alter your trajectory by highlighting areas of potential growth and cautioning against detrimental habits.',
        image: '/insights_page/palm-reading/kira-auf-der-heide-QyCH5jwrD_A-unsplash.jpg',
        imagePosition: 'right'
      }
    ],
    scrollGallery: [
      '/insights_page/palm-reading/pexels-pavel-danilyuk-7221656.jpg',
      '/insights_page/palm-reading/sunday-oludare-UjDgsnG9LWo-unsplash.jpg',
    ],
    remedies: [
      'If your Head Line shows stress, practice daily grounding exercises like walking barefoot on grass.',
      'To strengthen a weak Sun Mount (creativity/success), wear a gold ring on your ring finger.',
      'Regularly massage your hands with warm sesame oil to soothe nervous tension reflected in the minor lines.'
    ]
  },

  'sound-healing': {
    id: 'sound-healing',
    name: 'Sound Healing',
    heroTitle: 'Vibrational Harmony',
    heroDescription: 'Restore balance to your mind, body, and spirit through the therapeutic application of sound frequencies and resonant vibrations.',
    heroImages: [
      '/insights_page/sound-healing/pexels-cottonbro-5602498.jpg',
      '/insights_page/sound-healing/sound heal.jpg',
    ],
    contentSections: [
      {
        title: 'The Science of Resonance',
        text: 'Sound Healing operates on the principle that everything in the universe, including our bodies, is in a state of vibration. When we are stressed or unwell, our natural resonant frequencies become distorted. Using instruments like singing bowls, tuning forks, and gongs, sound healing introduces specific frequencies that entrain the brainwaves, shifting them from active beta states into deeply relaxing alpha and theta states, promoting cellular repair.',
        image: '/insights_page/sound-healing/thlt-lcx-VsI_74zRzAo-unsplash.jpg',
        imagePosition: 'left'
      },
      {
        title: 'Emotional and Physical Release',
        text: 'The vibrations from sound healing instruments penetrate deeply into the body, acting like an internal massage. This process helps to dislodge emotional trauma and energetic blockages stored in the tissues. Participants often experience profound emotional releases, reduced anxiety, lowered blood pressure, and a deep sense of inner peace following a sound bath session.',
        image: '/insights_page/sound-healing/pexels-shkrabaanthony-6252163.jpg',
        imagePosition: 'right'
      }
    ],
    scrollGallery: [
      '/insights_page/sound-healing/scroll image.jpg',
      '/insights_page/sound-healing/pexels-anastasia-shuraeva-6013501.jpg',
    ],
    remedies: [
      'Listen to 528Hz frequency music (the "Miracle" tone) daily to promote DNA repair and stress reduction.',
      'Humming softly for 5 minutes a day can stimulate the vagus nerve, immediately calming the nervous system.',
      'Place a Tibetan singing bowl on your chest or stomach and play it to directly transmit healing vibrations into your body.'
    ]
  },

  meditation: {
    id: 'meditation',
    name: 'Meditation',
    heroTitle: 'The Path to Inner Stillness',
    heroDescription: 'Cultivate profound mindfulness, mental clarity, and inner peace through guided practices that quiet the mind and awaken the spirit.',
    heroImages: [
      '/insights_page/meditation/activedia-meditation-1384758_1920.jpg',
      '/insights_page/meditation/pexels-arthousestudio-7363287.jpg',
    ],
    contentSections: [
      {
        title: 'Mastering the Mind',
        text: 'Meditation is the profound practice of training your attention and awareness. In our modern, hyper-stimulated world, the mind is often scattered and anxious. Through consistent meditation techniques—such as breath awareness, mantra repetition, or loving-kindness—you learn to observe your thoughts without attachment. This creates a spaciousness in the mind, leading to reduced stress, enhanced focus, and a profound sense of inner calm.',
        image: '/insights_page/meditation/pexels-thomas-benedetti-949290600-25358278.jpg',
        imagePosition: 'left'
      },
      {
        title: 'Neurological Transformation',
        text: 'Scientific research has demonstrated that regular meditation physically changes the brain. It thickens the prefrontal cortex (responsible for decision-making and emotional regulation) and shrinks the amygdala (the brain\'s fear center). This neuroplasticity means that through meditation, you are literally rewiring your brain for greater happiness, resilience, and compassion.',
        image: '/insights_page/meditation/activedia-meditation-1384758_1920.jpg',
        imagePosition: 'right'
      }
    ],
    scrollGallery: [
      '/insights_page/meditation/scroll image.jpg',
      '/insights_page/meditation/scroll image1.jpg',
    ],
    remedies: [
      'Create a dedicated, quiet "zen space" in your home specifically for daily meditation.',
      'Practice the 4-7-8 breathing technique when feeling overwhelmed to instantly trigger the parasympathetic nervous system.',
      'Incorporate mindful walking into your routine, focusing entirely on the sensation of your feet touching the ground.'
    ]
  },

  'chakra-healing': {
    id: 'chakra-healing',
    name: 'Chakra Healing',
    heroTitle: 'Balancing the Energy Centers',
    heroDescription: 'Identify and clear blockages within your seven primary energy centers to restore vitality, emotional stability, and spiritual connection.',
    heroImages: [
      '/insights_page/chakra-healing/pexels-arina-krasnikova-6998231.jpg',
      '/insights_page/chakra-healing/b-cole-to62lwqrbdk-unsplash.jpg',
    ],
    contentSections: [
      {
        title: 'The Anatomy of Energy',
        text: 'The Chakras are seven spinning wheels of energy located along the spine, from the base to the crown of the head. Each chakra corresponds to specific physical organs, emotional states, and spiritual themes. When these energy centers are open and balanced, life force energy (Prana or Qi) flows freely, resulting in vibrant health and emotional well-being. When blocked by stress or trauma, physical and emotional symptoms arise.',
        image: '/insights_page/chakra-healing/esther-verdu-G3ttEY6r7J0-unsplash.jpg',
        imagePosition: 'left'
      },
      {
        title: 'Clearing and Restoring Flow',
        text: 'Chakra healing utilizes various techniques—including crystal therapy, Reiki, specific yoga postures, and sound frequencies—to clear stagnant energy. By addressing the root energetic cause of an issue, rather than just the symptoms, this modality facilitates deep, holistic healing. You will learn to recognize which chakras are deficient or overactive and how to bring them back into harmonious alignment.',
        image: '/insights_page/chakra-healing/esther-verdu-z3I6QNClKLk-unsplash.jpg',
        imagePosition: 'right'
      }
    ],
    scrollGallery: [
      '/insights_page/chakra-healing/scroll image.jpg',
      '/insights_page/chakra-healing/scroll image1.jpg',
      '/insights_page/chakra-healing/scroll image2.jpg',
    ],
    remedies: [
      'Wear or carry specific crystals (e.g., Amethyst for Crown, Citrine for Solar Plexus) to support deficient chakras.',
      'Eat foods that match the color of the chakra you are trying to balance (e.g., root vegetables for the Root chakra).',
      'Use essential oils like lavender or frankincense on your pulse points to gently stimulate energy flow.'
    ]
  },

  numerology: {
    id: 'numerology',
    name: 'Numerology',
    heroTitle: 'The Mathematics of the Soul',
    heroDescription: 'Uncover the hidden vibrations and profound meanings behind the numbers in your life, birthdate, and name.',
    heroImages: [
      '/insights_page/numerology/superko-ai-generated-8888074_1920.jpg',
      '/insights_page/numerology/istockphoto-1334201626-1024x1024.jpg',
    ],
    contentSections: [
      {
        title: 'The Universal Language of Numbers',
        text: 'Numerology is the ancient study of the spiritual significance of numbers. It is based on the premise that the universe is a system and, once broken down, we are left with the basic elements: numbers. Your birth date and the name given to you at birth are not random; they possess specific vibrational frequencies. By calculating your Life Path Number, Expression Number, and Soul Urge Number, you gain a profound roadmap of your character and destiny.',
        image: '/insights_page/numerology/istockphoto-1334201626-1024x1024.jpg',
        imagePosition: 'left'
      },
      {
        title: 'Aligning with Your Vibrational Path',
        text: 'Understanding your numerological profile helps you make sense of your inherent talents, underlying motivations, and the recurring cycles in your life. It provides clarity on career choices, relationship compatibility, and optimal timing for major life events. By consciously aligning your actions with your core numerological vibrations, you can experience greater flow, purpose, and success.',
        image: '/insights_page/numerology/superko-ai-generated-8888074_1920.jpg',
        imagePosition: 'right'
      }
    ],
    scrollGallery: [
      '/insights_page/numerology/scroll image.jpg',
      '/insights_page/numerology/scroll image1.jpg',
    ],
    remedies: [
      'Surround yourself with colors associated with your Life Path number to amplify your natural strengths.',
      'If you are experiencing a challenging Personal Year cycle, focus on the specific lessons of that number rather than forcing outward success.',
      'Ensure the total numerical value of your house or business address harmonizes with your personal numbers for better energy flow.'
    ]
  },
  
  // Default fallbacks for the other 4
  'spiritual': {
    id: 'spiritual',
    name: 'Spiritual Guidance',
    heroTitle: 'Connect with Higher Wisdom',
    heroDescription: 'Embark on a profound journey of self-discovery, connecting with universal wisdom and your highest self.',
    heroImages: ['/lavender_logo.png'],
    contentSections: [],
    scrollGallery: [],
    remedies: ['Take a moment to sit quietly and connect with your breath each morning.', 'Keep a gratitude journal to raise your vibrational frequency.']
  },
  'breathwork': {
    id: 'breathwork',
    name: 'Breathwork',
    heroTitle: 'The Power of Prana',
    heroDescription: 'Harness the profound healing power of your own breath to clear emotional blockages and increase vitality.',
    heroImages: ['/lavender_logo.png'],
    contentSections: [],
    scrollGallery: [],
    remedies: ['Practice deep diaphragmatic breathing for 5 minutes daily.']
  },
  'dreams': {
    id: 'dreams',
    name: 'Dream Prediction',
    heroTitle: 'Messages from the Subconscious',
    heroDescription: 'Decode the rich symbolism of your dreams to uncover hidden desires, fears, and profound intuitive guidance.',
    heroImages: ['/lavender_logo.png'],
    contentSections: [],
    scrollGallery: [],
    remedies: ['Keep a dream journal by your bed and write down whatever you remember immediately upon waking.']
  },
  'space-harmony': {
    id: 'space-harmony',
    name: 'Space Harmony',
    heroTitle: 'Vastu & Feng Shui',
    heroDescription: 'Align your living and working environments with the natural flow of universal energy to attract abundance and peace.',
    heroImages: ['/lavender_logo.png'],
    contentSections: [],
    scrollGallery: [],
    remedies: ['Declutter your physical space to allow for the free flow of new, positive energy.']
  }
};
