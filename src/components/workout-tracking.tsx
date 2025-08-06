'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Activity, Clock, Flame, Plus, Filter } from 'lucide-react'
import { FitnessData } from '@/types/fitness'
import { formatDistanceToNow } from 'date-fns'

interface WorkoutTrackingProps {
  data: FitnessData
}

export function WorkoutTracking({ data }: WorkoutTrackingProps) {
  const { recentWorkouts, workoutCategories } = data

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

  const getIntensityColor = (intensity: string) => {
    switch (intensity.toLowerCase()) {
      case 'low':
        return 'bg-green-500/10 text-green-700 border-green-500/20'
      case 'moderate':
        return 'bg-yellow-500/10 text-yellow-700 border-yellow-500/20'
      case 'high':
        return 'bg-red-500/10 text-red-700 border-red-500/20'
      default:
        return 'bg-gray-500/10 text-gray-700 border-gray-500/20'
    }
  }

  return (
    <section id="workouts">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-fitness-primary" />
              Workout Tracking
            </CardTitle>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
              <Button size="sm" className="bg-fitness-primary hover:bg-fitness-primary/90">
                <Plus className="h-4 w-4 mr-2" />
                Log Workout
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="recent" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="recent">Recent Workouts</TabsTrigger>
              <TabsTrigger value="categories">Categories</TabsTrigger>
            </TabsList>
            
            <TabsContent value="recent" className="space-y-4 mt-4">
              {recentWorkouts.map((workout, index) => (
                <div key={index} className="workout-item">
                  <div className="flex items-start space-x-4">
                    <div className="text-2xl">{getCategoryIcon(workout.category)}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold text-foreground truncate">
                          {workout.name}
                        </h4>
                        <Badge className={getIntensityColor(workout.intensity)}>
                          {workout.intensity}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        {workout.category} • {formatDistanceToNow(new Date(workout.date), { addSuffix: true })}
                      </p>
                      <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {workout.duration} min
                        </div>
                        <div className="flex items-center gap-1">
                          <Flame className="h-4 w-4" />
                          {workout.calories} kcal
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              {recentWorkouts.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  <Activity className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No recent workouts found</p>
                  <p className="text-sm">Start logging your workouts to see them here</p>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="categories" className="mt-4">
              <div className="grid grid-cols-2 gap-4">
                {workoutCategories.map((category, index) => (
                  <Card key={index} className="p-4 hover:bg-accent/50 transition-colors cursor-pointer">
                    <div className="flex items-center space-x-3">
                      <div className="text-2xl">{getCategoryIcon(category.name)}</div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-foreground">{category.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          {category.count} workouts
                        </p>
                      </div>
                    </div>
                    <div className="mt-3 text-sm text-muted-foreground">
                      Last: {formatDistanceToNow(new Date(category.lastWorkout), { addSuffix: true })}
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </section>
  )
}