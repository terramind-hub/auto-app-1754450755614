'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Target, Trophy, Plus, Calendar, Star } from 'lucide-react'
import { FitnessData } from '@/types/fitness'

interface GoalsAchievementsProps {
  data: FitnessData
}

export function GoalsAchievements({ data }: GoalsAchievementsProps) {
  const { goals, achievements } = data

  const getGoalTypeIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'weight':
        return '⚖️'
      case 'workout':
        return '🏋️'
      case 'cardio':
        return '🏃'
      case 'strength':
        return '💪'
      default:
        return '🎯'
    }
  }

  const getAchievementIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'streak':
        return '🔥'
      case 'milestone':
        return '🏆'
      case 'personal_best':
        return '⭐'
      case 'consistency':
        return '📅'
      default:
        return '🎖️'
    }
  }

  const getProgressColor = (progress: number) => {
    if (progress >= 100) return 'bg-green-500'
    if (progress >= 75) return 'bg-blue-500'
    if (progress >= 50) return 'bg-yellow-500'
    return 'bg-gray-500'
  }

  return (
    <section id="goals">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-fitness-primary" />
              Goals & Achievements
            </CardTitle>
            <Button size="sm" className="bg-fitness-primary hover:bg-fitness-primary/90">
              <Plus className="h-4 w-4 mr-2" />
              New Goal
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="goals" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="goals">Active Goals</TabsTrigger>
              <TabsTrigger value="achievements">Achievements</TabsTrigger>
            </TabsList>

            <TabsContent value="goals" className="space-y-4 mt-4">
              {goals.map((goal, index) => (
                <Card key={index} className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="text-2xl">{getGoalTypeIcon(goal.type)}</div>
                      <div>
                        <h4 className="font-semibold text-foreground">{goal.title}</h4>
                        <p className="text-sm text-muted-foreground">{goal.description}</p>
                      </div>
                    </div>
                    <Badge variant={goal.progress >= 100 ? 'default' : 'secondary'}>
                      {goal.progress >= 100 ? 'Completed' : 'In Progress'}
                    </Badge>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span className="font-medium">
                        {goal.current}/{goal.target} {goal.unit}
                      </span>
                    </div>
                    <Progress value={goal.progress} className="h-2" />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>{Math.round(goal.progress)}% complete</span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        Due: {new Date(goal.deadline).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </Card>
              ))}
              
              {goals.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  <Target className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No active goals</p>
                  <p className="text-sm">Set your first goal to start tracking progress</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="achievements" className="space-y-4 mt-4">
              <div className="grid grid-cols-1 gap-4">
                {achievements.map((achievement, index) => (
                  <Card key={index} className="p-4">
                    <div className="flex items-center gap-4">
                      <div className="text-3xl">{getAchievementIcon(achievement.type)}</div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-semibold text-foreground">{achievement.title}</h4>
                          <Badge className="bg-yellow-500/10 text-yellow-700 border-yellow-500/20">
                            <Star className="h-3 w-3 mr-1" />
                            {achievement.points} pts
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          {achievement.description}
                        </p>
                        <p className="text-xs text-muted-foreground mt-2">
                          Earned on {new Date(achievement.dateEarned).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
              
              {achievements.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  <Trophy className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No achievements yet</p>
                  <p className="text-sm">Complete workouts and goals to earn achievements</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </section>
  )
}