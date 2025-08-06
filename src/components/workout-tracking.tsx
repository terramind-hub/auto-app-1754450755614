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
  
  const getIntensityColor = (intensity: string) => {
    switch (intensity.toLowerCase()) {
      case 'high':
        return 'bg-red-500'
      case 'medium':
        return 'bg-yellow-500'
      case 'low':
        return 'bg-green-500'
      default:
        return 'bg-gray-500'
    }
  }
  
  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
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
              <p className="text-sm">Start your fitness journey today!</p>
            </div>
          ) : (
            recentWorkouts.map((workout) => (
              <div key={workout.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="text-2xl">
                    {getCategoryIcon(workout.category)}
                  </div>
                  <div>
                    <h4 className="font-semibold">{workout.name}</h4>
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      <span>{format(new Date(workout.date), 'MMM dd, yyyy')}</span>
                      <Clock className="h-3 w-3 ml-2" />
                      <span>{workout.duration} min</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="secondary">{workout.category}</Badge>
                  <div className={`w-3 h-3 rounded-full ${getIntensityColor(workout.intensity)}`} title={`${workout.intensity} intensity`} />
                </div>
              </div>
            ))
          )}
          
          {recentWorkouts.length > 0 && (
            <div className="pt-4 border-t">
              <Button variant="outline" className="w-full">
                View All Workouts
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}