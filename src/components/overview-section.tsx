"use client"

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CaloriesChart } from '@/components/calories-chart'
import { WeeklyChart } from '@/components/weekly-chart'
import { Activity, Flame, Clock, TrendingUp } from 'lucide-react'
import { FitnessData } from '@/types/fitness'

interface OverviewSectionProps {
  data: FitnessData
}

export function OverviewSection({ data }: OverviewSectionProps) {
  const metrics = [
    {
      title: 'Calories Burned',
      value: data.todayCalories,
      icon: Flame,
      color: 'text-orange-500',
      bgColor: 'bg-orange-50 dark:bg-orange-950',
    },
    {
      title: 'Workouts Completed',
      value: data.workoutsThisWeek,
      icon: Activity,
      color: 'text-blue-500',
      bgColor: 'bg-blue-50 dark:bg-blue-950',
    },
    {
      title: 'Active Minutes',
      value: data.activeMinutesToday,
      icon: Clock,
      color: 'text-green-500',
      bgColor: 'bg-green-50 dark:bg-green-950',
    },
    {
      title: 'Weight Progress',
      value: `${data.currentWeight} lbs`,
      icon: TrendingUp,
      color: 'text-purple-500',
      bgColor: 'bg-purple-50 dark:bg-purple-950',
    },
  ]

  return (
    <div className="space-y-6">
      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric, index) => {
          const Icon = metric.icon
          return (
            <Card key={index} className="relative overflow-hidden">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {metric.title}
                </CardTitle>
                <div className={`p-2 rounded-full ${metric.bgColor}`}>
                  <Icon className={`h-4 w-4 ${metric.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{metric.value}</div>
                <p className="text-xs text-muted-foreground">
                  +20.1% from last month
                </p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Current Streak */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Current Streak
            <Badge variant="secondary" className="ml-2">
              🔥 {data.currentStreak} days
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Keep it up! You're on a {data.currentStreak}-day workout streak.
          </p>
        </CardContent>
      </Card>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CaloriesChart data={data} />
        <WeeklyChart data={data} />
      </div>
    </div>
  )
}