"use client"

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Target, Trophy, Star, Plus } from 'lucide-react'
import { FitnessData } from '@/types/fitness'

interface GoalsAchievementsProps {
  data: FitnessData
}

export function GoalsAchievements({ data }: GoalsAchievementsProps) {
  const achievements = [
    { name: 'First Workout', description: 'Complete your first workout', earned: true, date: '2024-01-01' },
    { name: '7-Day Streak', description: 'Workout for 7 consecutive days', earned: true, date: '2024-01-07' },
    { name: '1000 Calories', description: 'Burn 1000 calories in a single workout', earned: false, progress: 85 },
    { name: 'Early Bird', description: 'Complete 5 morning workouts', earned: false, progress: 60 },
    { name: 'Consistency King', description: 'Workout 20 days in a month', earned: false, progress: 40 },
    { name: 'Weight Goal', description: 'Reach your target weight', earned: false, progress: 75 },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Goals & Achievements
          </span>
          <Button variant="outline" size="sm">
            <Plus className="h-4 w-4 mr-1" />
            Add Goal
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Current Goals */}
        <div>
          <h4 className="font-medium mb-3 flex items-center gap-2">
            <Target className="h-4 w-4" />
            Current Goals
          </h4>
          <div className="space-y-3">
            {data.goals.map((goal, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{goal.title}</span>
                  <span className="text-sm text-muted-foreground">
                    {goal.current}/{goal.target} {goal.unit}
                  </span>
                </div>
                <Progress 
                  value={(goal.current / goal.target) * 100} 
                  className="h-2"
                />
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>{goal.type} • {goal.period}</span>
                  <span>{Math.round((goal.current / goal.target) * 100)}% complete</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Achievements */}
        <div>
          <h4 className="font-medium mb-3 flex items-center gap-2">
            <Trophy className="h-4 w-4" />
            Achievements
          </h4>
          <div className="grid grid-cols-1 gap-3">
            {achievements.map((achievement, index) => (
              <div
                key={index}
                className={`p-3 rounded-lg border transition-colors ${
                  achievement.earned
                    ? 'bg-primary/5 border-primary/20'
                    : 'bg-muted/50 border-muted'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {achievement.earned ? (
                      <Trophy className="h-4 w-4 text-primary" />
                    ) : (
                      <Star className="h-4 w-4 text-muted-foreground" />
                    )}
                    <span className="font-medium text-sm">
                      {achievement.name}
                    </span>
                  </div>
                  {achievement.earned && (
                    <Badge variant="secondary" className="text-xs">
                      Earned
                    </Badge>
                  )}
                </div>
                <p className="text-xs text-muted-foreground mb-2">
                  {achievement.description}
                </p>
                {!achievement.earned && achievement.progress && (
                  <div className="space-y-1">
                    <Progress value={achievement.progress} className="h-1" />
                    <span className="text-xs text-muted-foreground">
                      {achievement.progress}% complete
                    </span>
                  </div>
                )}
                {achievement.earned && achievement.date && (
                  <span className="text-xs text-muted-foreground">
                    Earned on {achievement.date}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}