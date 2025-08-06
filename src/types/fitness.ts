export interface Workout {
  id: string
  name: string
  type: string
  duration: number
  calories: number
  intensity: string
  date: string
}

export interface Meal {
  id: string
  name: string
  calories: number
  protein?: number
  carbs?: number
  fat?: number
  date: string
}

export interface Goal {
  id: string
  title: string
  type: string
  target: number
  current: number
  unit: string
  period: string
  deadline: string
}

export interface WeeklyData {
  day: string
  calories: number
  workouts: number
}

export interface WeightEntry {
  date: string
  weight: number
}

export interface CaloriesEntry {
  date: string
  calories: number
}

export interface FitnessData {
  todayCalories: number
  workoutsThisWeek: number
  activeMinutesToday: number
  currentWeight: number
  currentStreak: number
  goals: Goal[]
  recentWorkouts: Workout[]
  weeklyData: WeeklyData[]
  weightHistory: WeightEntry[]
  caloriesHistory: CaloriesEntry[]
}