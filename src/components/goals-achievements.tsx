"use client"

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Target, Award, Plus, Trophy } from 'lucide-react'
import { FitnessData } from '@/types/fitness'

interface GoalsAchievementsProps {
  data: FitnessData
}

export function GoalsAchievements({ data }: GoalsAchievementsProps) {
  const achievements = [
    { id: 1, name: 'First Workout', description: 'Complete your first workout', earned: true, date: '2024-01-01' },
    { id: 2, name: 'Week Warrior', description: 'Work out 5 days in a week', earned: true, date: '2024-01-07' },
    { id: 3, name: 'Calorie Crusher', description: 'Burn 500+ calories in a day', earned: true, date: '2024-01-05' },
    { id: 4, name: 'Consistency King', description: 'Maintain a 7-day streak', earned: data.currentStreak >= 7, date: data.currentStreak >= 7 ? new Date().toISOString().split('T')[0] : null },
    { id: 5, name: 'Monthly Master', description: 'Complete 20 workouts in a month', earned: false, date: null },
    { id: 6, name: 'Weight Warrior', description: 'Lose 10 pounds', earned: false, date: null },
  ]

  const earnedAchievements = achievements.filter(a => a.earned)
  const upcomingAchievements = achievements.filter(a => !a.earned)

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Target className="h-5 w-5" />
          Goals & Achievements
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Current Goals */}
        <div>
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <Target className="h-4 w-4" />
            Current Goals
          </h3>
          <div className="space-y-4">
            {data.goals.map((goal) => {
              const progress = Math.min((goal.current / goal.target) * 100, 100)
              return (
                <div key={goal.id} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{goal.title}</span>
                    <Badge variant={progress >= 100 ? 'default' : 'secondary'}>
                      {goal.current}/{goal.target} {goal.unit}
                    </Badge>
                  </div>
                  <Progress value={progress} className="h-2" />
                  <p className="text-sm text-muted-foreground">
                    {progress.toFixed(0)}% complete • {goal.timeframe}
                  </p>
                </div>
              )
            })}
            
            {data.goals.length === 0 && (
              <div className="text-center py-4 text-muted-foreground">
                <Target className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p>No goals set yet</p>
                <Button variant="outline" size="sm" className="mt-2">
                  <Plus className="h-4 w-4 mr-2" />
                  Set Your First Goal
                </Button>
              </div>
            )}
          </div>
        </div>
        
        {/* Achievements */}
        <div>
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <Award className="h-4 w-4" />
            Achievements ({earnedAchievements.length}/{achievements.length})
          </h3>
          
          {/* Earned Achievements */}
          {earnedAchievements.length > 0 && (
            <div className="mb-4">
              <h4 className="text-sm font-medium text-muted-foreground mb-2">Earned</h4>
              <div className="grid grid-cols-2 gap-2">
                {earnedAchievements.map((achievement) => (
                  <div key={achievement.id} className="flex items-center space-x-2 p-2 bg-primary/10 rounded-lg">
                    <Trophy className="h-4 w-4 text-primary" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{achievement.name}</p>
                      <p className="text-xs text-muted-foreground">{achievement.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Upcoming Achievements */}
          {upcomingAchievements.length > 0 && (
            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-2">In Progress</h4>
              <div className="space-y-2">
                {upcomingAchievements.slice(0, 3).map((achievement) => (
                  <div key={achievement.id} className="flex items-center space-x-2 p-2 border rounded-lg opacity-60">
                    <Award className="h-4 w-4 text-muted-foreground" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">{achievement.name}</p>
                      <p className="text-xs text-muted-foreground">{achievement.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}