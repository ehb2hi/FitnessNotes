export interface ExerciseCategory {
  name: string;
  exercises: string[];
  image: string; // path to category image/icon
}

export const CATEGORIES: ExerciseCategory[] = [
  {
    name: 'Chest',
    image: 'assets/category-icons/chest.jpg',
    exercises: ['Bench Press','Chest Butter Fly','Push-Up', 'Incline Dumbbell Press']
  },
  {
    name: 'Back',
    image: 'assets/category-icons/back.jpg',
    exercises: ['Lat Pulldown', 'Seated Row', 'Deadlift', 'Lat Press Back']
  },
  {
    name: 'Shoulders',
    image: 'assets/category-icons/shoulders.jpg',
    exercises: ['Dumbbell Overhead Press', 'Lateral Raise', 'Lever Shoulder Press']
  },
  {
    name: 'Biceps',
    image: 'assets/category-icons/biceps.jpg',
    exercises: ['Barbell Curl','Seated Dumbbell Curl']
  },
  {
    name: 'Triceps',
    image: 'assets/category-icons/triceps.jpg',
    exercises: ['Triceps Pushdown','Overhead Extension']
  },
  {
    name: 'Legs',
    image: 'assets/category-icons/legs.jpg',
    exercises: ['Squat', 'Leg Curl', 'Leg Press']
  }
];
