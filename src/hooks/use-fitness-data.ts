"use client"

import { useState, useCallback } from 'react'
import { FitnessData, Workout, Meal, Goal } from '@/types/fitness'

const initialData: FitnessData = {
  todayCalories: 420,
  workoutsThisWeek: 4,
  activeMinutesToday: 45,
  currentWeight: 165,
  currentStreak: 7,
  goals: [
    {
      id: '1',
      title: 'Weekly Workouts',
      type: 'workout',
      target: 5,
      current: 4,
      unit: 'workouts',
      period: 'weekly',
      deadline: '2024-01-31'
    },
    {
      id: '2',
      title: 'Weight Loss',
      type: 'weight',
      target: 160,
      current: 165,
      unit: 'lbs',
      period: 'monthly',
      deadline: '2024-02-29'
    },
    {
      id: '3',
      title: 'Daily Calories',
      type: 'calories',
      target: 500,
      current: 420,
      unit: 'calories',
      period: 'daily',
      deadline: '2024-01-20'
    }
  ],
  recentWorkouts: [
    {
      id: '1',
      name: 'Morning Run',
      type: 'cardio',
      duration: 30,
      calories: 300,
      intensity: 'medium',
      date: '2024-01-19'
    },
    {
      id: '2',
      name: 'Strength Training',
      type: 'strength',
      duration: 45,
      calories: 250,
      intensity: 'high',
      date: '2024-01-18'
    },
    {
      id: '3',
      name: 'Yoga Session',
      type: 'flexibility',
      duration: 60,
      calories: 180,
      intensity: 'low',
      date: '2024-01-17'
    }
  ],
  weeklyData: [
    { day: 'Mon', calories: 450, workouts: 1 },
    { day: 'Tue', calories: 320, workouts: 0 },
    { day: 'Wed', calories: 380, workouts: 1 },
    { day: 'Thu', calories: 290, workouts: 1 },
    { day: 'Fri', calories: 420, workouts: 1 },
    { day: 'Sat', calories: 0, workouts: 0 },
    { day: 'Sun', calories: 0, workouts: 0 }
  ],
  weightHistory: [
    { date: '2024-01-01', weight: 170 },
    { date: '2024-01-05', weight: 169 },
    { date: '2024-01-10', weight: 167 },
    { date: '2024-01-15', weight: 166 },
    { date: '2024-01-19', weight: 165 }
  ],
  caloriesHistory: [
    { date: '2024-01-15', calories: 380 },
    { date: '2024-01-16', calories: 420 },
    { date: '2024-01-17', calories: 180 },
    { date: '2024-01-18', calories: 250 },
    { date: '2024-01-19', calories: 300 }
  ]
}

export function useFitnessData() {
  const [data, setData] = useState<FitnessData>(initialData)

  const addWorkout = useCallback((workout: Omit<Workout, 'id'>) => {
    setData(prev => ({
      ...prev,
      recentWorkouts: [
        { ...workout, id: Date.now().toString() },
        ...prev.recentWorkouts
      ],
      todayCalories: prev.todayCalories + workout.calories,
      activeMinutesToday: prev.activeMinutesToday + workout.duration,
      workoutsThisWeek: prev.workoutsThisWeek + 1
    }))
  }, [])

  const addMeal = useCallback((meal: Omit<Meal, 'id'>) => {
    setData(prev => ({
      ...prev,
      todayCalories: prev.todayCalories + meal.calories
    }))
  }, [])

  const addWeight = useCallback((weight: number) => {
    setData(prev => ({
      ...prev,
      currentWeight: weight,
      weightHistory: [
        ...prev.weightHistory,
        { date: new Date().toISOString().split('T')[0], weight }
      ]
    }))
  }, [])

  const addGoal = useCallback((goal: Omit<Goal, 'id'>) => {
    setData(prev => ({
      ...prev,
      goals: [
        ...prev.goals,
        { ...goal, id: Date.now().toString() }
      ]
    }))
  }, [])

  const updateStreak = useCallback(() => {
    // Simulate streak update logic
    setData(prev => ({ ...prev }))
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