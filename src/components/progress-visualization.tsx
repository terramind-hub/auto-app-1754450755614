"use client"

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { WeightChart } from '@/components/weight-chart'
import { WorkoutFrequencyChart } from '@/components/workout-frequency-chart'
import { CaloriesChart } from '@/components/calories-chart'
import { Badge } from '@/components/ui/badge'
import { TrendingUp, Award, Target } from 'lucide-react'
import { FitnessData } from '@/types/fitness'

interface ProgressVisualizationProps {
  data: FitnessData
}

export function ProgressVisualization({ data }: ProgressVisualizationProps) {
  const personalRecords = [
    { name: 'Longest Run', value: '10.5 miles', date: '2024-01-15' },
    { name: 'Max Bench Press', value: '185 lbs', date: '2024-01-10' },
    { name: 'Fastest 5K', value: '22:30', date: '2024-01-08' },
    { name: 'Most Calories Burned', value: '850 cal', date: '2024-01-12' },
  ]

  return (
    <div className="space-y-6">
      <Tabs defaultValue="weight" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="weight">Weight Progress</TabsTrigger>
          <TabsTrigger value="frequency">Workout Frequency</TabsTrigger>
          <TabsTrigger value="calories">Calories Burned</TabsTrigger>
        </TabsList>
        
        <TabsContent value="weight" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Weight Tracking
              </CardTitle>
            </CardHeader>
            <CardContent>
              <WeightChart data={data.weightEntries} />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="frequency" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Workout Frequency
              </CardTitle>
            </CardHeader>
            <CardContent>
              <WorkoutFrequencyChart data={data.workouts} />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="calories" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Daily Calories Burned
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CaloriesChart data={data.dailyCalories} />
            </CardContent>
          </Card>
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {personalRecords.map((record, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div>
                  <h4 className="font-medium">{record.name}</h4>
                  <p className="text-sm text-muted-foreground">{record.date}</p>
                </div>
                <Badge variant="secondary" className="text-lg font-bold">
                  {record.value}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}