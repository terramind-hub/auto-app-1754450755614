"use client"

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
      description: 'Begin a new workout session',
      icon: Play,
      color: 'bg-blue-500 hover:bg-blue-600',
      textColor: 'text-white',
    },
    {
      id: 'meal',
      title: 'Log Meal',
      description: 'Track your nutrition intake',
      icon: Utensils,
      color: 'bg-green-500 hover:bg-green-600',
      textColor: 'text-white',
    },
    {
      id: 'weight',
      title: 'Add Weight',
      description: 'Record your current weight',
      icon: Scale,
      color: 'bg-purple-500 hover:bg-purple-600',
      textColor: 'text-white',
    },
    {
      id: 'goal',
      title: 'Set Goal',
      description: 'Create a new fitness goal',
      icon: Target,
      color: 'bg-orange-500 hover:bg-orange-600',
      textColor: 'text-white',
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Zap className="h-5 w-5" />
          Quick Actions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {actions.map((action) => {
            const Icon = action.icon
            return (
              <Button
                key={action.id}
                onClick={() => onAction(action.id)}
                className={`h-auto p-4 flex flex-col items-center space-y-2 ${action.color} ${action.textColor}`}
                variant="default"
              >
                <Icon className="h-6 w-6" />
                <div className="text-center">
                  <div className="font-medium">{action.title}</div>
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