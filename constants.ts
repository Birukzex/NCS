
import { Pathology } from './types';

export const DEFAULT_RISK_FACTORS = [
  'Diabetes Mellitus',
  'Chronic Alcohol Use',
  'Vitamin B12 Deficiency',
  'Chemotherapy',
  'Renal Failure',
  'Thyroid Disease'
];

// Standard Nerves
export const STANDARD_NERVES = {
  upperLimb: {
    motor: [
      { name: 'Median Motor', hasFWave: true },
      { name: 'Ulnar Motor', hasFWave: true }
    ],
    sensory: [
      { name: 'Median Sensory', hasFWave: false },
      { name: 'Ulnar Sensory', hasFWave: false }
    ]
  },
  lowerLimb: {
    motor: [
      { name: 'Peroneal Motor', hasFWave: true },
      { name: 'Tibial Motor', hasFWave: true }
    ],
    sensory: [
      { name: 'Sural Sensory', hasFWave: false }
    ]
  }
};

// Special Investigations
export const SPECIAL_INVESTIGATIONS = {
  lowerLimb: [
    { name: 'Anterior Tibial Motor Peroneal', hasFWave: true, category: 'special' },
    { name: 'Superficial Peroneal Sensory', hasFWave: false, category: 'special' }
  ],
  upperLimb: [
    { name: 'Transcarpal Median', hasFWave: false, category: 'special' },
    { name: 'Ulnar Inching', hasFWave: false, category: 'special' }
  ],
  other: [
    { name: 'Facial Nerve Motor', hasFWave: false, category: 'special' },
    { name: 'Blink Reflex', hasFWave: false, category: 'special' },
    { name: 'SSR (Sympathetic Skin Response)', hasFWave: false, category: 'special' },
    { name: 'Femoral Lateral Cutaneous', hasFWave: false, category: 'special' },
    { name: 'Plantar', hasFWave: false, category: 'special' },
    { name: 'H-Wave Study', hasFWave: false, category: 'special' }
  ]
};

// Brachial Plexus Nerves
export const BRACHIAL_PLEXUS_NERVES = [
  { name: 'Musculocutaneous Motor', hasFWave: true, category: 'brachial_plexus' },
  { name: 'Axillary Motor', hasFWave: true, category: 'brachial_plexus' },
  { name: 'Suprascapular Motor', hasFWave: true, category: 'brachial_plexus' },
  { name: 'Dorsal Scapular Motor', hasFWave: true, category: 'brachial_plexus' },
  { name: 'Long Thoracic Motor', hasFWave: true, category: 'brachial_plexus' },
  { name: 'Thoracodorsal Motor', hasFWave: true, category: 'brachial_plexus' },
  { name: 'Medial Pectoral Motor', hasFWave: true, category: 'brachial_plexus' },
  { name: 'Lateral Pectoral Motor', hasFWave: true, category: 'brachial_plexus' },
  { name: 'Subscapular Motor', hasFWave: true, category: 'brachial_plexus' },
  { name: 'Medial Antebrachial Cutaneous', hasFWave: false, category: 'brachial_plexus' },
  { name: 'Lateral Antebrachial Cutaneous', hasFWave: false, category: 'brachial_plexus' },
  { name: 'Posterior Antebrachial Cutaneous', hasFWave: false, category: 'brachial_plexus' }
];

// Repetitive Stimulation Studies
export const REPETITIVE_STIMULATION = [
  { name: 'Repetitive Stimulation - Median', hasFWave: false, category: 'repetitive' },
  { name: 'Repetitive Stimulation - Ulnar', hasFWave: false, category: 'repetitive' },
  { name: 'Repetitive Stimulation - Accessory', hasFWave: false, category: 'repetitive' },
  { name: 'Repetitive Stimulation - Facial', hasFWave: false, category: 'repetitive' }
];

// Legacy support - keeping the old NERVE_LIST for backward compatibility
export const NERVE_LIST = [
  'Median Motor',
  'Ulnar Motor', 
  'Median Sensory',
  'Ulnar Sensory',
  'Peroneal Motor',
  'Tibial Motor',
  'Sural Sensory'
];

export const NORMAL_THRESHOLDS = {
  // Simplified values for demonstration
  motor: {
    velocity: 40, // m/s - below is abnormal
    latency: 5, // ms - above is abnormal
  },
  sensory: {
    velocity: 40, // m/s - below is abnormal
    latency: 4, // ms - above is abnormal
  }
};

export const PATHOLOGY_COLORS: { [key in Pathology]: string } = {
  [Pathology.Normal]: 'text-green-600 dark:text-green-400',
  [Pathology.Demyelinating]: 'text-orange-600 dark:text-orange-400',
  [Pathology.Axonal]: 'text-red-600 dark:text-red-400',
  [Pathology.Mixed]: 'text-purple-600 dark:text-purple-400',
  [Pathology.Unclassified]: 'text-gray-500 dark:text-gray-400',
};
