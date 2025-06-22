export interface ExerciseCategory {
  name: string;
  exercises: string[];
  image: string; // path to category image/icon
}

export const CATEGORIES: ExerciseCategory[] = [
  {
    name: 'Chest',
    image: 'assets/category-icons/chest.png',
    exercises: ['Bench Press','Chest Butter Fly','Push-Up', 'Incline Dumbbell Press']
  },
  {
    name: 'Back',
    image: 'assets/category-icons/back.png',
    exercises: ['Lat Pulldown', 'Seated Row', 'Deadlift', 'Lat Press Back']
  },
  {
    name: 'Shoulders',
    image: 'assets/category-icons/shoulders.png',
    exercises: ['Dumbbell Overhead Press', 'Lateral Raise', 'Lever Shoulder Press']
  },
  {
    name: 'Biceps',
    image: 'assets/category-icons/biceps.png',
    exercises: ['Barbell Curl','Seated Dumbbell Curl']
  },
  {
    name: 'Triceps',
    image: 'assets/category-icons/triceps.png',
    exercises: ['Triceps Pushdown','Overhead Extension']
  },
  {
    name: 'Legs',
    image: 'assets/category-icons/legs.png',
    exercises: ['Squat', 'Leg Curl', 'Vertical Leg Press', 'Horizontal Leg Press',  'abductors', 'adductors']
  }
];
