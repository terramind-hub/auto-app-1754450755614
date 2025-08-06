export interface Exercise {
  id: string
  name: string
  sets: number
  reps: number
  weight?: number
  duration?: number
}

export interface Workout {
  id: string
  name: string
  type: string
  duration: number
  intensity: string
  caloriesBurned: number
  date: string
  exercises: Exercise[]
}

export interface Meal {
  id: string
  name: string
  calories: number
  protein: number
  carbs: number
  fat: number
  date: string
}

export interface WeightEntry {
  id: string
  weight: number
  date: string
}

export interface Goal {
  id: string
  title: string
  description: string
  type: string
  target: number
  unit: string
  deadline: string
  completed: boolean
}

export interface DailyCalories {
  date: string
  calories: number
}

export interface WeeklyProgress {
  week: string
  workouts: number
  calories: number
}

export interface FitnessData {
  workouts: Workout[]
  meals: Meal[]
  weightEntries: WeightEntry[]
  goals: Goal[]
  dailyCalories: DailyCalories[]
  weeklyProgress: WeeklyProgress[]
  currentStreak: number
}