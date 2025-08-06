export interface Workout {
  id: string
  name: string
  category: 'Cardio' | 'Strength' | 'Flexibility' | 'Sports'
  duration: number // in minutes
  intensity: 'Low' | 'Medium' | 'High'
  caloriesBurned: number
  date: string
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
  target: number
  current: number
  unit: string
  timeframe: string
  type: 'workout' | 'weight' | 'calories' | 'custom'
}

export interface WeeklyProgress {
  day: string
  workouts: number
  calories: number
}

export interface DailyCalories {
  date: string
  calories: number
}

export interface FitnessData {
  workouts: Workout[]
  meals: Meal[]
  weightEntries: WeightEntry[]
  goals: Goal[]
  currentStreak: number
  weeklyProgress: WeeklyProgress[]
  dailyCalories: DailyCalories[]
}