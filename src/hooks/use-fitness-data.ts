"use client"

import { useState, useCallback } from 'react'
import { FitnessData, Workout, Meal, WeightEntry, Goal } from '@/types/fitness'

// Mock initial data
const initialData: FitnessData = {
  workouts: [
    {
      id: '1',
      name: 'Morning Run',
      category: 'Cardio',
      duration: 30,
      intensity: 'Medium',
      caloriesBurned: 300,
      date: '2024-01-15'
    },
    {
      id: '2',
      name: 'Strength Training',
      category: 'Strength',
      duration: 45,
      intensity: 'High',
      caloriesBurned: 250,
      date: '2024-01-14'
    },
    {
      id: '3',
      name: 'Yoga Session',
      category: 'Flexibility',
      duration: 60,
      intensity: 'Low',
      caloriesBurned: 150,
      date: '2024-01-13'
    }
  ],
  meals: [
    {
      id: '1',
      name: 'Breakfast',
      calories: 350,
      protein: 20,
      carbs: 45,
      fat: 12,
      date: '2024-01-15'
    },
    {
      id: '2',
      name: 'Lunch',
      calories: 500,
      protein: 30,
      carbs: 60,
      fat: 18,
      date: '2024-01-15'
    }
  ],
  weightEntries: [
    { id: '1', weight: 175, date: '2024-01-01' },
    { id: '2', weight: 174, date: '2024-01-08' },
    { id: '3', weight: 173, date: '2024-01-15' }
  ],
  goals: [
    {
      id: '1',
      title: 'Weekly Workouts',
      target: 5,
      current: 3,
      unit: 'workouts',
      timeframe: 'This week',
      type: 'workout'
    },
    {
      id: '2',
      title: 'Weight Loss',
      target: 10,
      current: 2,
      unit: 'lbs',
      timeframe: 'This month',
      type: 'weight'
    }
  ],
  currentStreak: 5,
  weeklyProgress: [
    { day: 'Mon', workouts: 1, calories: 300 },
    { day: 'Tue', workouts: 0, calories: 0 },
    { day: 'Wed', workouts: 1, calories: 250 },
    { day: 'Thu', workouts: 1, calories: 400 },
    { day: 'Fri', workouts: 0, calories: 0 },
    { day: 'Sat', workouts: 1, calories: 350 },
    { day: 'Sun', workouts: 1, calories: 300 }
  ],
  dailyCalories: [
    { date: '2024-01-09', calories: 300 },
    { date: '2024-01-10', calories: 450 },
    { date: '2024-01-11', calories: 200 },
    { date: '2024-01-12', calories: 600 },
    { date: '2024-01-13', calories: 150 },
    { date: '2024-01-14', calories: 250 },
    { date: '2024-01-15', calories: 300 }
  ]
}

export function useFitnessData() {
  const [data, setData] = useState<FitnessData>(initialData)

  const addWorkout = useCallback((workout: Omit<Workout, 'id'>) => {
    const newWorkout: Workout = {
      ...workout,
      id: Date.now().toString()
    }
    
    setData(prev => ({
      ...prev,
      workouts: [...prev.workouts, newWorkout]
    }))
  }, [])

  const addMeal = useCallback((meal: Omit<Meal, 'id'>) => {
    const newMeal: Meal = {
      ...meal,
      id: Date.now().toString()
    }
    
    setData(prev => ({
      ...prev,
      meals: [...prev.meals, newMeal]
    }))
  }, [])

  const addWeight = useCallback((weight: number) => {
    const newEntry: WeightEntry = {
      id: Date.now().toString(),
      weight,
      date: new Date().toISOString().split('T')[0]
    }
    
    setData(prev => ({
      ...prev,
      weightEntries: [...prev.weightEntries, newEntry]
    }))
  }, [])

  const addGoal = useCallback((goal: Omit<Goal, 'id' | 'current'>) => {
    const newGoal: Goal = {
      ...goal,
      id: Date.now().toString(),
      current: 0
    }
    
    setData(prev => ({
      ...prev,
      goals: [...prev.goals, newGoal]
    }))
  }, [])

  const updateStreak = useCallback(() => {
    // Simple streak calculation - in a real app this would be more sophisticated
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