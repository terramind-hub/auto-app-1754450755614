'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Flame, Activity, Clock, TrendingUp, Target, Zap } from 'lucide-react'
import { WeeklyChart } from '@/components/weekly-chart'
import { CircularProgress } from '@/components/circular-progress'
import { FitnessData } from '@/types/fitness'

interface OverviewSectionProps {
  data: FitnessData
}

export function OverviewSection({ data }: OverviewSectionProps) {
  const { metrics, weeklyProgress, currentStreak, goals } = data

  const metricCards = [
    {
      title: 'Calories Burned',
      value: metrics.caloriesBurned.toLocaleString(),
      unit: 'kcal',
      icon: Flame,
      color: 'text-orange-500',
      bgColor: 'bg-orange-500/10',
      change: '+12%',
      changeType: 'positive' as const
    },
    {
      title: 'Workouts Completed',
      value: metrics.workoutsCompleted.toString(),
      unit: 'sessions',
      icon: Activity,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10',
      change: '+8%',
      changeType: 'positive' as const
    },
    {
      title: 'Active Minutes',
      value: metrics.activeMinutes.toLocaleString(),
      unit: 'min',
      icon: Clock,
      color: 'text-green-500',
      bgColor: 'bg-green-500/10',
      change: '+15%',
      changeType: 'positive' as const
    },
    {
      title: 'Weight Progress',
      value: metrics.weightProgress.toString(),
      unit: 'lbs',
      icon: TrendingUp,
      color: 'text-purple-500',
      bgColor: 'bg-purple-500/10',
      change: '-2.5%',
      changeType: 'positive' as const
    }
  ]

  return (
    <section id="overview" className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">Overview</h2>
        <Badge variant="secondary" className="text-sm">
          Last 7 days
        </Badge>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metricCards.map((metric, index) => {
          const Icon = metric.icon
          return (
            <Card key={index} className="metric-card animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {metric.title}
                </CardTitle>
                <div className={`p-2 rounded-lg ${metric.bgColor}`}>
                  <Icon className={`h-4 w-4 ${metric.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-baseline space-x-2">
                  <div className="text-2xl font-bold text-foreground">
                    {metric.value}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {metric.unit}
                  </div>
                </div>
                <div className="flex items-center mt-2">
                  <span className={`text-xs font-medium ${
                    metric.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {metric.change}
                  </span>
                  <span className="text-xs text-muted-foreground ml-1">
                    from last week
                  </span>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Weekly Progress and Streak */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Weekly Progress Chart */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-fitness-primary" />
              Weekly Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <WeeklyChart data={weeklyProgress} />
          </CardContent>
        </Card>

        {/* Current Streak and Goals */}
        <div className="space-y-4">
          {/* Current Streak */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-yellow-500" />
                Current Streak
              </CardTitle>
            </CardHeader>
            <CardContent className="flex items-center justify-center">
              <div className="text-center">
                <div className="text-4xl font-bold text-fitness-primary mb-2">
                  {currentStreak}
                </div>
                <div className="text-sm text-muted-foreground">
                  days in a row
                </div>
                <div className="mt-4">
                  <CircularProgress value={85} size={80} strokeWidth={6} />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Goal Progress */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-fitness-secondary" />
                Today's Goals
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {goals.slice(0, 2).map((goal, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">{goal.title}</span>
                    <span className="text-muted-foreground">
                      {goal.current}/{goal.target} {goal.unit}
                    </span>
                  </div>
                  <Progress value={goal.progress} className="h-2" />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}