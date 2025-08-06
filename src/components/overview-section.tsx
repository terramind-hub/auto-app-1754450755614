"use client"

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CaloriesChart } from '@/components/calories-chart'
import { WeeklyChart } from '@/components/weekly-chart'
import { Activity, Target, TrendingUp, Zap } from 'lucide-react'
import { FitnessData } from '@/types/fitness'

interface OverviewSectionProps {
  data: FitnessData
}

export function OverviewSection({ data }: OverviewSectionProps) {
  const todayCalories = data.dailyCalories[data.dailyCalories.length - 1]?.calories || 0
  const weeklyWorkouts = data.workouts.filter(w => {
    const workoutDate = new Date(w.date)
    const weekAgo = new Date()
    weekAgo.setDate(weekAgo.getDate() - 7)
    return workoutDate >= weekAgo
  }).length

  const currentWeight = data.weightEntries[data.weightEntries.length - 1]?.weight || 0
  const previousWeight = data.weightEntries[data.weightEntries.length - 2]?.weight || 0
  const weightChange = currentWeight - previousWeight

  return (
    <div className="space-y-6">
      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Calories Burned</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{todayCalories}</div>
            <p className="text-xs text-muted-foreground">
              +12% from yesterday
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Workouts This Week</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{weeklyWorkouts}</div>
            <p className="text-xs text-muted-foreground">
              {weeklyWorkouts >= 3 ? 'Great progress!' : 'Keep going!'}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Streak</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.currentStreak}</div>
            <p className="text-xs text-muted-foreground">
              days in a row
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Weight Progress</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currentWeight} lbs</div>
            <p className="text-xs text-muted-foreground">
              {weightChange > 0 ? '+' : ''}{weightChange.toFixed(1)} lbs this week
            </p>
          </CardContent>
        </Card>
      </div>
      
      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Weekly Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <WeeklyChart data={data.weeklyProgress} />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Daily Calories</CardTitle>
          </CardHeader>
          <CardContent>
            <CaloriesChart data={data.dailyCalories} />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}