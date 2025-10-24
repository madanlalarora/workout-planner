// Initial exercise configuration with muscle targets and impact weights
export const initialExercises = {
  // CHEST EXERCISES
  'bench-press': {
    id: 'bench-press',
    name: 'Bench Press',
    category: 'compound',
    muscles: [
      { muscle: 'chest', weight: 3 },
      { muscle: 'triceps', weight: 2 },
      { muscle: 'shoulders', weight: 1 }
    ]
  },
  'incline-bench-press': {
    id: 'incline-bench-press',
    name: 'Incline Bench Press',
    category: 'compound',
    muscles: [
      { muscle: 'chest', weight: 3 },
      { muscle: 'shoulders', weight: 2 },
      { muscle: 'triceps', weight: 1 }
    ]
  },
  'chest-fly': {
    id: 'chest-fly',
    name: 'Chest Fly',
    category: 'isolation',
    muscles: [
      { muscle: 'chest', weight: 3 },
      { muscle: 'shoulders', weight: 1 }
    ]
  },
  'push-ups': {
    id: 'push-ups',
    name: 'Push-ups',
    category: 'compound',
    muscles: [
      { muscle: 'chest', weight: 2 },
      { muscle: 'triceps', weight: 2 },
      { muscle: 'shoulders', weight: 1 },
      { muscle: 'core', weight: 1 }
    ]
  },

  // BACK EXERCISES
  'deadlift': {
    id: 'deadlift',
    name: 'Deadlift',
    category: 'compound',
    muscles: [
      { muscle: 'back', weight: 3 },
      { muscle: 'hamstrings', weight: 2 },
      { muscle: 'glutes', weight: 2 },
      { muscle: 'core', weight: 1 }
    ]
  },
  'pull-ups': {
    id: 'pull-ups',
    name: 'Pull-ups',
    category: 'compound',
    muscles: [
      { muscle: 'back', weight: 3 },
      { muscle: 'biceps', weight: 2 },
      { muscle: 'forearms', weight: 1 }
    ]
  },
  'bent-over-row': {
    id: 'bent-over-row',
    name: 'Bent-Over Row',
    category: 'compound',
    muscles: [
      { muscle: 'back', weight: 3 },
      { muscle: 'biceps', weight: 2 },
      { muscle: 'core', weight: 1 }
    ]
  },
  'lat-pulldown': {
    id: 'lat-pulldown',
    name: 'Lat Pulldown',
    category: 'compound',
    muscles: [
      { muscle: 'back', weight: 3 },
      { muscle: 'biceps', weight: 1 }
    ]
  },

  // LEG EXERCISES
  'squat': {
    id: 'squat',
    name: 'Squat',
    category: 'compound',
    muscles: [
      { muscle: 'quads', weight: 3 },
      { muscle: 'glutes', weight: 2 },
      { muscle: 'core', weight: 1 }
    ]
  },
  'leg-press': {
    id: 'leg-press',
    name: 'Leg Press',
    category: 'compound',
    muscles: [
      { muscle: 'quads', weight: 3 },
      { muscle: 'glutes', weight: 2 }
    ]
  },
  'leg-curl': {
    id: 'leg-curl',
    name: 'Leg Curl',
    category: 'isolation',
    muscles: [
      { muscle: 'hamstrings', weight: 3 }
    ]
  },
  'leg-extension': {
    id: 'leg-extension',
    name: 'Leg Extension',
    category: 'isolation',
    muscles: [
      { muscle: 'quads', weight: 3 }
    ]
  },
  'calf-raises': {
    id: 'calf-raises',
    name: 'Calf Raises',
    category: 'isolation',
    muscles: [
      { muscle: 'calves', weight: 3 }
    ]
  },

  // SHOULDER EXERCISES
  'overhead-press': {
    id: 'overhead-press',
    name: 'Overhead Press',
    category: 'compound',
    muscles: [
      { muscle: 'shoulders', weight: 3 },
      { muscle: 'triceps', weight: 2 },
      { muscle: 'core', weight: 1 }
    ]
  },
  'lateral-raise': {
    id: 'lateral-raise',
    name: 'Lateral Raise',
    category: 'isolation',
    muscles: [
      { muscle: 'shoulders', weight: 3 }
    ]
  },
  'front-raise': {
    id: 'front-raise',
    name: 'Front Raise',
    category: 'isolation',
    muscles: [
      { muscle: 'shoulders', weight: 3 }
    ]
  },

  // ARM EXERCISES
  'bicep-curl': {
    id: 'bicep-curl',
    name: 'Bicep Curl',
    category: 'isolation',
    muscles: [
      { muscle: 'biceps', weight: 3 },
      { muscle: 'forearms', weight: 1 }
    ]
  },
  'hammer-curl': {
    id: 'hammer-curl',
    name: 'Hammer Curl',
    category: 'isolation',
    muscles: [
      { muscle: 'biceps', weight: 3 },
      { muscle: 'forearms', weight: 2 }
    ]
  },
  'tricep-dips': {
    id: 'tricep-dips',
    name: 'Tricep Dips',
    category: 'compound',
    muscles: [
      { muscle: 'triceps', weight: 3 },
      { muscle: 'chest', weight: 1 },
      { muscle: 'shoulders', weight: 1 }
    ]
  },
  'tricep-extension': {
    id: 'tricep-extension',
    name: 'Tricep Extension',
    category: 'isolation',
    muscles: [
      { muscle: 'triceps', weight: 3 }
    ]
  },

  // CORE EXERCISES
  'plank': {
    id: 'plank',
    name: 'Plank',
    category: 'isolation',
    muscles: [
      { muscle: 'core', weight: 3 },
      { muscle: 'shoulders', weight: 1 }
    ]
  },
  'crunches': {
    id: 'crunches',
    name: 'Crunches',
    category: 'isolation',
    muscles: [
      { muscle: 'core', weight: 3 }
    ]
  },
  'russian-twist': {
    id: 'russian-twist',
    name: 'Russian Twist',
    category: 'isolation',
    muscles: [
      { muscle: 'core', weight: 3 },
      { muscle: 'obliques', weight: 2 }
    ]
  }
};

// Muscle groups reference
export const muscleGroups = {
  upper: ['chest', 'back', 'shoulders', 'biceps', 'triceps', 'forearms'],
  core: ['core', 'obliques'],
  lower: ['quads', 'hamstrings', 'glutes', 'calves']
};

// All muscles list
export const allMuscles = [
  'chest', 'back', 'shoulders', 'biceps', 'triceps', 'forearms',
  'core', 'obliques',
  'quads', 'hamstrings', 'glutes', 'calves'
];
