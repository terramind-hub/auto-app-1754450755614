"use client"

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { WeightChart } from '@/components/weight-chart'
import { WorkoutFrequencyChart } from '@/components/workout-frequency-chart'
import { CaloriesChart } from '@/components/calories-chart'
import { TrendingUp, Target, Award } from 'lucide-react'
import { FitnessData } from '@/types/fitness'

interface ProgressVisualizationProps {
  data: FitnessData
}

export function ProgressVisualization({ data }: ProgressVisualizationProps) {
  const personalRecords = [
    { name: 'Longest Run', value: '10.5 km', date: '2024-01-15' },
    { name: 'Max Bench Press', value: '185 lbs', date: '2024-01-10' },
    { name: 'Most Calories Burned', value: '850 cal', date: '2024-01-12' },
    { name: 'Longest Workout', value: '90 min', date: '2024-01-08' },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Progress Visualization</h2>
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <TrendingUp className="h-4 w-4" />
          <span>Last 30 days</span>
        </div>
      </div>

      <Tabs defaultValue="weight" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="weight">Weight Progress</TabsTrigger>
          <TabsTrigger value="frequency">Workout Frequency</TabsTrigger>
          <TabsTrigger value="calories">Calories Burned</TabsTrigger>
        </TabsList>
        
        <TabsContent value="weight" className="space-y-4">
          <WeightChart data={data} />
        </TabsContent>
        
        <TabsContent value="frequency" className="space-y-4">
          <WorkoutFrequencyChart data={data} />
        </TabsContent>
        
        <TabsContent value="calories" className="space-y-4">
          <CaloriesChart data={data} />
        </TabsContent>
      </Tabs>

      {/* Personal Records */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5" />
            Personal Records
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {personalRecords.map((record, index) => (
              <div
                key={index}
                className="p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
              >
                <div className="flex items-center justify-between mb-2">
                  <Target className="h-4 w-4 text-primary" />
                  <span className="text-xs text-muted-foreground">
                    {record.date}
                  </span>
                </div>
                <h4 className="font-medium text-sm mb-1">{record.name}</h4>
                <p className="text-2xl font-bold text-primary">{record.value}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}