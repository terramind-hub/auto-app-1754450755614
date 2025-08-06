'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Play, Utensils, Scale, Target, Zap } from 'lucide-react'

interface QuickActionsProps {
  onAction: (action: string) => void
}

export function QuickActions({ onAction }: QuickActionsProps) {
  const actions = [
    {
      id: 'workout',
      title: 'Start Workout',
      description: 'Log a new workout session',
      icon: Play,
      color: 'bg-fitness-primary hover:bg-fitness-primary/90',
      textColor: 'text-white'
    },
    {
      id: 'meal',
      title: 'Log Meal',
      description: 'Track your nutrition',
      icon: Utensils,
      color: 'bg-fitness-secondary hover:bg-fitness-secondary/90',
      textColor: 'text-white'
    },
    {
      id: 'weight',
      title: 'Add Weight',
      description: 'Update your weight',
      icon: Scale,
      color: 'bg-fitness-accent hover:bg-fitness-accent/90',
      textColor: 'text-white'
    },
    {
      id: 'goal',
      title: 'Set Goal',
      description: 'Create a new goal',
      icon: Target,
      color: 'bg-purple-500 hover:bg-purple-600',
      textColor: 'text-white'
    }
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Zap className="h-5 w-5 text-fitness-primary" />
          Quick Actions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {actions.map((action) => {
            const Icon = action.icon
            return (
              <Button
                key={action.id}
                onClick={() => onAction(action.id)}
                className={`h-auto p-4 flex flex-col items-center gap-2 ${action.color} ${action.textColor}`}
              >
                <Icon className="h-6 w-6" />
                <div className="text-center">
                  <div className="font-medium text-sm">{action.title}</div>
                  <div className="text-xs opacity-90">{action.description}</div>
                </div>
              </Button>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}