"use client"

import { useState, useCallback } from 'react'
import { FitnessData, Workout, Meal, WeightEntry, Goal } from '@/types/fitness'

// Mock initial data
const initialData: FitnessData = {
  workouts: [
    {
      id: '1',
      name: 'Morning Run',
      type: 'Cardio',
      duration: 30,
      intensity: 'Medium',
      caloriesBurned: 300,
      date: '2024-01-15',
      exercises: []
    },
    {
      id: '2',
      name: 'Strength Training',
      type: 'Strength',
      duration: 45,
      intensity: 'High',
      caloriesBurned: 250,
      date: '2024-01-14',
      exercises: []
    },
    {
      id: '3',
      name: 'Yoga Session',
      type: 'Flexibility',
      duration: 60,
      intensity: 'Low',
      caloriesBurned: 150,
      date: '2024-01-13',
      exercises: []
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
      calories: 450,
      protein: 25,
      carbs: 50,
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
      title: 'Lose Weight',
      description: 'Reach target weight',
      type: 'weight',
      target: 170,
      unit: 'lbs',
      deadline: '2024-03-01',
      completed: false
    },
    {
      id: '2',
      title: 'Weekly Workouts',
      description: 'Work out 4 times per week',
      type: 'workout',
      target: 4,
      unit: 'workouts',
      deadline: '2024-12-31',
      completed: false
    }
  ],
  dailyCalories: [
    { date: '2024-01-10', calories: 280 },
    { date: '2024-01-11', calories: 320 },
    { date: '2024-01-12', calories: 450 },
    { date: '2024-01-13', calories: 150 },
    { date: '2024-01-14', calories: 250 },
    { date: '2024-01-15', calories: 300 }
  ],
  weeklyProgress: [
    { week: 'Week 1', workouts: 3, calories: 1200 },
    { week: 'Week 2', workouts: 4, calories: 1450 },
    { week: 'Week 3', workouts: 2, calories: 800 },
    { week: 'Week 4', workouts: 5, calories: 1650 }
  ],
  currentStreak: 5
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
      workouts: [...prev.workouts, newWorkout],
      dailyCalories: prev.dailyCalories.map(day => 
        day.date === workout.date 
          ? { ...day, calories: day.calories + workout.caloriesBurned }
          : day
      )
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

  const addGoal = useCallback((goal: Omit<Goal, 'id' | 'completed'>) => {
    const newGoal: Goal = {
      ...goal,
      id: Date.now().toString(),
      completed: false
    }
    
    setData(prev => ({
      ...prev,
      goals: [...prev.goals, newGoal]
    }))
  }, [])

  const updateStreak = useCallback(() => {
    // Simple streak calculation based on recent workouts
    const today = new Date()
    const recentWorkouts = data.workouts.filter(workout => {
      const workoutDate = new Date(workout.date)
      const daysDiff = Math.floor((today.getTime() - workoutDate.getTime()) / (1000 * 60 * 60 * 24))
      return daysDiff <= 7
    })
    
    setData(prev => ({
      ...prev,
      currentStreak: recentWorkouts.length
    }))
  }, [data.workouts])

  return {
    data,
    addWorkout,
    addMeal,
    addWeight,
    addGoal,
    updateStreak
  }
}