"use client"

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Target, Award, Plus, Calendar } from 'lucide-react'
import { FitnessData } from '@/types/fitness'

interface GoalsAchievementsProps {
  data: FitnessData
}

export function GoalsAchievements({ data }: GoalsAchievementsProps) {
  const achievements = [
    { name: 'First Workout', description: 'Complete your first workout', earned: true, date: '2024-01-01' },
    { name: 'Week Warrior', description: 'Work out 5 days in a week', earned: true, date: '2024-01-07' },
    { name: 'Calorie Crusher', description: 'Burn 500+ calories in a day', earned: true, date: '2024-01-05' },
    { name: 'Consistency King', description: 'Maintain a 7-day streak', earned: data.currentStreak >= 7, date: data.currentStreak >= 7 ? new Date().toISOString().split('T')[0] : null },
    { name: 'Marathon Prep', description: 'Run 20+ miles in a week', earned: false, date: null },
    { name: 'Strength Builder', description: 'Complete 10 strength workouts', earned: false, date: null },
  ]

  const getGoalProgress = (goal: any) => {
    switch (goal.type) {
      case 'weight':
        const currentWeight = data.weightEntries[data.weightEntries.length - 1]?.weight || 0
        const startWeight = data.weightEntries[0]?.weight || currentWeight
        const progress = Math.abs(currentWeight - startWeight) / Math.abs(goal.target - startWeight) * 100
        return Math.min(progress, 100)
      case 'workout':
        const weeklyWorkouts = data.workouts.filter(w => {
          const workoutDate = new Date(w.date)
          const weekAgo = new Date()
          weekAgo.setDate(weekAgo.getDate() - 7)
          return workoutDate >= weekAgo
        }).length
        return (weeklyWorkouts / goal.target) * 100
      case 'calories':
        const todayCalories = data.dailyCalories[data.dailyCalories.length - 1]?.calories || 0
        return (todayCalories / goal.target) * 100
      default:
        return 0
    }
  }

  return (
    <div className="space-y-6">
      {/* Goals Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Current Goals
            </CardTitle>
            <Button size="sm" variant="outline">
              <Plus className="h-4 w-4 mr-2" />
              Add Goal
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {data.goals.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Target className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No goals set yet</p>
                <p className="text-sm">Set your first fitness goal!</p>
              </div>
            ) : (
              data.goals.map((goal) => {
                const progress = getGoalProgress(goal)
                return (
                  <div key={goal.id} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">{goal.title}</h4>
                        <p className="text-sm text-muted-foreground">{goal.description}</p>
                      </div>
                      <Badge variant={progress >= 100 ? 'default' : 'secondary'}>
                        {Math.round(progress)}%
                      </Badge>
                    </div>
                    <Progress value={progress} className="h-2" />
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>Target: {goal.target} {goal.unit}</span>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        Due: {new Date(goal.deadline).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                )
              })
            )}
          </div>
        </CardContent>
      </Card>
      
      {/* Achievements Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5" />
            Achievements
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {achievements.map((achievement, index) => (
              <div
                key={index}
                className={`p-4 border rounded-lg transition-all ${
                  achievement.earned
                    ? 'bg-primary/5 border-primary/20'
                    : 'bg-muted/30 border-muted'
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Award
                      className={`h-5 w-5 ${
                        achievement.earned ? 'text-primary' : 'text-muted-foreground'
                      }`}
                    />
                    <h4 className={`font-medium ${
                      achievement.earned ? 'text-foreground' : 'text-muted-foreground'
                    }`}>
                      {achievement.name}
                    </h4>
                  </div>
                  {achievement.earned && (
                    <Badge variant="default" className="text-xs">
                      Earned
                    </Badge>
                  )}
                </div>
                <p className={`text-sm ${
                  achievement.earned ? 'text-muted-foreground' : 'text-muted-foreground/70'
                }`}>
                  {achievement.description}
                </p>
                {achievement.earned && achievement.date && (
                  <p className="text-xs text-muted-foreground mt-2">
                    Earned on {new Date(achievement.date).toLocaleDateString()}
                  </p>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}