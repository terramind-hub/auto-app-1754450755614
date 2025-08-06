"use client"

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Play, Utensils, Scale, Target } from 'lucide-react'

interface QuickActionsProps {
  onAction: (action: string) => void
}

export function QuickActions({ onAction }: QuickActionsProps) {
  const actions = [
    {
      id: 'workout',
      label: 'Start Workout',
      description: 'Log a new workout session',
      icon: Play,
      color: 'bg-blue-500 hover:bg-blue-600',
    },
    {
      id: 'meal',
      label: 'Log Meal',
      description: 'Track your nutrition',
      icon: Utensils,
      color: 'bg-green-500 hover:bg-green-600',
    },
    {
      id: 'weight',
      label: 'Add Weight',
      description: 'Record your weight',
      icon: Scale,
      color: 'bg-purple-500 hover:bg-purple-600',
    },
    {
      id: 'goal',
      label: 'Set Goal',
      description: 'Create a new fitness goal',
      icon: Target,
      color: 'bg-orange-500 hover:bg-orange-600',
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {actions.map((action) => {
            const Icon = action.icon
            return (
              <Button
                key={action.id}
                variant="outline"
                className="h-auto p-4 flex flex-col items-center gap-2 hover:bg-muted/50"
                onClick={() => onAction(action.id)}
              >
                <div className={`p-3 rounded-full text-white ${action.color}`}>
                  <Icon className="h-6 w-6" />
                </div>
                <div className="text-center">
                  <div className="font-medium text-sm">{action.label}</div>
                  <div className="text-xs text-muted-foreground">
                    {action.description}
                  </div>
                </div>
              </Button>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}