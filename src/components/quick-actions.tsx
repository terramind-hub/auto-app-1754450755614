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
      label: 'Start Workout',
      icon: Play,
      color: 'bg-blue-500 hover:bg-blue-600',
      description: 'Log a new workout session'
    },
    {
      id: 'meal',
      label: 'Log Meal',
      icon: Utensils,
      color: 'bg-green-500 hover:bg-green-600',
      description: 'Track your nutrition'
    },
    {
      id: 'weight',
      label: 'Add Weight',
      icon: Scale,
      color: 'bg-purple-500 hover:bg-purple-600',
      description: 'Update your weight'
    },
    {
      id: 'goal',
      label: 'Set Goal',
      icon: Target,
      color: 'bg-orange-500 hover:bg-orange-600',
      description: 'Create a new fitness goal'
    }
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
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {actions.map((action) => {
            const Icon = action.icon
            return (
              <Button
                key={action.id}
                variant="outline"
                className="h-auto p-4 flex flex-col items-center space-y-2 hover:scale-105 transition-transform"
                onClick={() => onAction(action.id)}
              >
                <div className={`p-3 rounded-full text-white ${action.color}`}>
                  <Icon className="h-6 w-6" />
                </div>
                <div className="text-center">
                  <p className="font-semibold">{action.label}</p>
                  <p className="text-xs text-muted-foreground">{action.description}</p>
                </div>
              </Button>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}