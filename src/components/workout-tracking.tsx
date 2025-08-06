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
  const recentWorkouts = data.workouts.slice(-5).reverse()

  const getWorkoutTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'cardio':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
      case 'strength':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
      case 'flexibility':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
      case 'sports':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300'
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300'
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
        <CardTitle className="flex items-center gap-2">
          <Activity className="h-5 w-5" />
          Recent Workouts
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentWorkouts.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Activity className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No workouts logged yet</p>
              <p className="text-sm">Start tracking your fitness journey!</p>
            </div>
          ) : (
            recentWorkouts.map((workout) => (
              <div
                key={workout.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="font-medium">{workout.name}</h4>
                    <Badge className={getWorkoutTypeColor(workout.type)}>
                      {workout.type}
                    </Badge>
                    <Badge className={getIntensityColor(workout.intensity)}>
                      {workout.intensity}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {workout.duration} min
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {format(new Date(workout.date), 'MMM dd, yyyy')}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-medium">{workout.caloriesBurned}</div>
                  <div className="text-sm text-muted-foreground">calories</div>
                </div>
              </div>
            ))
          )}
        </div>
        
        {recentWorkouts.length > 0 && (
          <div className="mt-6 pt-4 border-t">
            <Button variant="outline" className="w-full">
              View All Workouts
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}