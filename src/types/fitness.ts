export interface FitnessData {
  metrics: {
    caloriesBurned: number
    workoutsCompleted: number
    activeMinutes: number
    weightProgress: number
  }
  weeklyProgress: Array<{
    day: string
    workouts: number
    calories: number
  }>
  currentStreak: number
  recentWorkouts: Workout[]
  workoutCategories: WorkoutCategory[]
  weightHistory: WeightEntry[]
  workoutFrequency: Array<{
    week: string
    workouts: number
    target: number
  }>
  caloriesHistory: Array<{
    date: string
    calories: number
    target: number
  }>
  personalRecords: PersonalRecord[]
  goals: Goal[]
  achievements: Achievement[]
}

export interface Workout {
  id: string
  name: string
  category: string
  duration: number
  calories: number
  intensity: string
  date: string
  notes?: string
}

export interface WorkoutCategory {
  name: string
  count: number
  lastWorkout: string
}

export interface WeightEntry {
  date: string
  weight: number
  target?: number
}

export interface PersonalRecord {
  exercise: string
  value: number
  unit: string
  date: string
  improvement: number
}

export interface Goal {
  id: string
  title: string
  description: string
  type: string
  current: number
  target: number
  unit: string
  progress: number
  deadline: string
  createdAt: string
}

export interface Achievement {
  id: string
  title: string
  description: string
  type: string
  points: number
  dateEarned: string
}

export interface Meal {
  id: string
  name: string
  type: string
  calories: number
  protein: number
  carbs: number
  fat: number
  date: string
}