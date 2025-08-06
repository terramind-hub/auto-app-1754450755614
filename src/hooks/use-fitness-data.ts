'use client'

import { useState, useCallback } from 'react'
import { FitnessData } from '@/types/fitness'

// Mock data for demonstration
const initialData: FitnessData = {
  metrics: {
    caloriesBurned: 2450,
    workoutsCompleted: 12,
    activeMinutes: 480,
    weightProgress: -5.2
  },
  weeklyProgress: [
    { day: 'Mon', workouts: 1, calories: 350 },
    { day: 'Tue', workouts: 0, calories: 0 },
    { day: 'Wed', workouts: 2, calories: 520 },
    { day: 'Thu', workouts: 1, calories: 280 },
    { day: 'Fri', workouts: 1, calories: 400 },
    { day: 'Sat', workouts: 2, calories: 650 },
    { day: 'Sun', workouts: 1, calories: 250 }
  ],
  currentStreak: 7,
  recentWorkouts: [
    {
      id: '1',
      name: 'Morning Run',
      category: 'Cardio',
      duration: 30,
      calories: 350,
      intensity: 'Moderate',
      date: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString() // 2 hours ago
    },
    {
      id: '2',
      name: 'Upper Body Strength',
      category: 'Strength',
      duration: 45,
      calories: 280,
      intensity: 'High',
      date: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString() // 1 day ago
    },
    {
      id: '3',
      name: 'Yoga Flow',
      category: 'Flexibility',
      duration: 60,
      calories: 180,
      intensity: 'Low',
      date: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString() // 2 days ago
    }
  ],
  workoutCategories: [
    {
      name: 'Cardio',
      count: 8,
      lastWorkout: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString()
    },
    {
      name: 'Strength',
      count: 6,
      lastWorkout: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString()
    },
    {
      name: 'Flexibility',
      count: 4,
      lastWorkout: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString()
    },
    {
      name: 'Sports',
      count: 2,
      lastWorkout: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString()
    }
  ],
  weightHistory: [
    { date: '2024-01-01', weight: 175, target: 165 },
    { date: '2024-01-08', weight: 174, target: 165 },
    { date: '2024-01-15', weight: 172, target: 165 },
    { date: '2024-01-22', weight: 171, target: 165 },
    { date: '2024-01-29', weight: 169.8, target: 165 }
  ],
  workoutFrequency: [
    { week: 'Week 1', workouts: 3, target: 4 },
    { week: 'Week 2', workouts: 4, target: 4 },
    { week: 'Week 3', workouts: 2, target: 4 },
    { week: 'Week 4', workouts: 5, target: 4 }
  ],
  caloriesHistory: [
    { date: '2024-01-22', calories: 420, target: 400 },
    { date: '2024-01-23', calories: 380, target: 400 },
    { date: '2024-01-24', calories: 450, target: 400 },
    { date: '2024-01-25', calories: 520, target: 400 },
    { date: '2024-01-26', calories: 350, target: 400 },
    { date: '2024-01-27', calories: 480, target: 400 },
    { date: '2024-01-28', calories: 410, target: 400 }
  ],
  personalRecords: [
    {
      exercise: 'Bench Press',
      value: 185,
      unit: 'lbs',
      date: '2024-01-20',
      improvement: 12
    },
    {
      exercise: '5K Run',
      value: 22.5,
      unit: 'min',
      date: '2024-01-18',
      improvement: 8
    },
    {
      exercise: 'Deadlift',
      value: 225,
      unit: 'lbs',
      date: '2024-01-15',
      improvement: 15
    }
  ],
  goals: [
    {
      id: '1',
      title: 'Lose 10 pounds',
      description: 'Reach target weight of 165 lbs',
      type: 'weight',
      current: 5.2,
      target: 10,
      unit: 'lbs',
      progress: 52,
      deadline: '2024-03-01',
      createdAt: '2024-01-01'
    },
    {
      id: '2',
      title: 'Workout 4x per week',
      description: 'Maintain consistent workout schedule',
      type: 'workout',
      current: 3,
      target: 4,
      unit: 'sessions',
      progress: 75,
      deadline: '2024-02-29',
      createdAt: '2024-01-01'
    },
    {
      id: '3',
      title: 'Burn 2000 calories weekly',
      description: 'Increase weekly calorie burn',
      type: 'calories',
      current: 1650,
      target: 2000,
      unit: 'kcal',
      progress: 82.5,
      deadline: '2024-02-15',
      createdAt: '2024-01-15'
    }
  ],
  achievements: [
    {
      id: '1',
      title: 'Week Warrior',
      description: 'Completed 7 days in a row',
      type: 'streak',
      points: 100,
      dateEarned: '2024-01-28'
    },
    {
      id: '2',
      title: 'Calorie Crusher',
      description: 'Burned 500+ calories in a single workout',
      type: 'milestone',
      points: 50,
      dateEarned: '2024-01-26'
    },
    {
      id: '3',
      title: 'Personal Best',
      description: 'Set a new personal record',
      type: 'personal_best',
      points: 75,
      dateEarned: '2024-01-20'
    }
  ]
}

export function useFitnessData() {
  const [data, setData] = useState<FitnessData>(initialData)

  const addWorkout = useCallback((workout: any) => {
    setData(prev => ({
      ...prev,
      recentWorkouts: [workout, ...prev.recentWorkouts].slice(0, 10),
      metrics: {
        ...prev.metrics,
        workoutsCompleted: prev.metrics.workoutsCompleted + 1,
        caloriesBurned: prev.metrics.caloriesBurned + workout.calories,
        activeMinutes: prev.metrics.activeMinutes + workout.duration
      }
    }))
  }, [])

  const addMeal = useCallback((meal: any) => {
    // In a real app, this would update nutrition tracking
    console.log('Meal logged:', meal)
  }, [])

  const addWeight = useCallback((weight: number) => {
    setData(prev => ({
      ...prev,
      weightHistory: [
        ...prev.weightHistory,
        {
          date: new Date().toISOString(),
          weight,
          target: prev.weightHistory[prev.weightHistory.length - 1]?.target || weight - 10
        }
      ]
    }))
  }, [])

  const addGoal = useCallback((goal: any) => {
    setData(prev => ({
      ...prev,
      goals: [{ ...goal, id: Date.now().toString() }, ...prev.goals]
    }))
  }, [])

  const updateStreak = useCallback(() => {
    // In a real app, this would calculate streak based on actual workout data
    setData(prev => ({
      ...prev,
      currentStreak: prev.currentStreak
    }))
  }, [])

  return {
    data,
    addWorkout,
    addMeal,
    addWeight,
    addGoal,
    updateStreak
  }
}