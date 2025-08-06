'use client'

import { useState, useEffect } from 'react'
import { Header } from '@/components/header'
import { OverviewSection } from '@/components/overview-section'
import { WorkoutTracking } from '@/components/workout-tracking'
import { ProgressVisualization } from '@/components/progress-visualization'
import { GoalsAchievements } from '@/components/goals-achievements'
import { QuickActions } from '@/components/quick-actions'
import { WorkoutModal } from '@/components/workout-modal'
import { MealModal } from '@/components/meal-modal'
import { WeightModal } from '@/components/weight-modal'
import { GoalModal } from '@/components/goal-modal'
import { useFitnessData } from '@/hooks/use-fitness-data'
import { useToast } from '@/hooks/use-toast'

export default function Dashboard() {
  const [activeModal, setActiveModal] = useState<string | null>(null)
  const { data, addWorkout, addMeal, addWeight, addGoal, updateStreak } = useFitnessData()
  const { toast } = useToast()

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      updateStreak()
    }, 60000) // Update every minute

    return () => clearInterval(interval)
  }, [updateStreak])

  const handleQuickAction = (action: string) => {
    setActiveModal(action)
  }

  const handleWorkoutSubmit = (workout: any) => {
    addWorkout(workout)
    setActiveModal(null)
    toast({
      title: "Workout Logged!",
      description: `${workout.name} has been added to your workout history.`,
    })
  }

  const handleMealSubmit = (meal: any) => {
    addMeal(meal)
    setActiveModal(null)
    toast({
      title: "Meal Logged!",
      description: `${meal.name} (${meal.calories} calories) has been logged.`,
    })
  }

  const handleWeightSubmit = (weight: number) => {
    addWeight(weight)
    setActiveModal(null)
    toast({
      title: "Weight Updated!",
      description: `Your weight has been updated to ${weight} lbs.`,
    })
  }

  const handleGoalSubmit = (goal: any) => {
    addGoal(goal)
    setActiveModal(null)
    toast({
      title: "Goal Set!",
      description: `New ${goal.type} goal has been created.`,
    })
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-6 space-y-6">
        {/* Overview Section */}
        <OverviewSection data={data} />
        
        {/* Quick Actions */}
        <QuickActions onAction={handleQuickAction} />
        
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Workout Tracking */}
          <WorkoutTracking data={data} />
          
          {/* Goals & Achievements */}
          <GoalsAchievements data={data} />
        </div>
        
        {/* Progress Visualization */}
        <ProgressVisualization data={data} />
      </main>
      
      {/* Modals */}
      <WorkoutModal
        isOpen={activeModal === 'workout'}
        onClose={() => setActiveModal(null)}
        onSubmit={handleWorkoutSubmit}
      />
      
      <MealModal
        isOpen={activeModal === 'meal'}
        onClose={() => setActiveModal(null)}
        onSubmit={handleMealSubmit}
      />
      
      <WeightModal
        isOpen={activeModal === 'weight'}
        onClose={() => setActiveModal(null)}
        onSubmit={handleWeightSubmit}
      />
      
      <GoalModal
        isOpen={activeModal === 'goal'}
        onClose={() => setActiveModal(null)}
        onSubmit={handleGoalSubmit}
      />
    </div>
  )
}