"use client"

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Clock, Calendar, Activity } from 'lucide-react'
import { FitnessData } from '@/types/fitness'
import { format } from 'date-fns'

interface WorkoutTrackingProps {
  data: FitnessData
}

export function WorkoutTracking({ data }: WorkoutTrackingProps) {
  const getWorkoutIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'cardio':
        return '🏃'
      case 'strength':
        return '💪'
      case 'flexibility':
        return '🧘'
      case 'sports':
        return '⚽'
      default:
        return '🏋️'
    }
  }

  const getIntensityColor = (intensity: string) => {
    switch (intensity.toLowerCase()) {
      case 'low':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
      case 'high':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300'
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Recent Workouts
          </span>
          <Button variant="outline" size="sm">
            View All
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {data.recentWorkouts.slice(0, 5).map((workout, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
          >
            <div className="flex items-center space-x-3">
              <div className="text-2xl">
                {getWorkoutIcon(workout.type)}
              </div>
              <div>
                <h4 className="font-medium">{workout.name}</h4>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Calendar className="h-3 w-3" />
                  <span>{format(new Date(workout.date), 'MMM dd')}</span>
                  <Clock className="h-3 w-3 ml-2" />
                  <span>{workout.duration} min</span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge
                variant="secondary"
                className={getIntensityColor(workout.intensity)}
              >
                {workout.intensity}
              </Badge>
              <div className="text-right">
                <div className="font-medium">{workout.calories} cal</div>
                <div className="text-xs text-muted-foreground">
                  {workout.type}
                </div>
              </div>
            </div>
          </div>
        ))}
        
        {data.recentWorkouts.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <Activity className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No workouts logged yet</p>
            <p className="text-sm">Start your fitness journey today!</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}