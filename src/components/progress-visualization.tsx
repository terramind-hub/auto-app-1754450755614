'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { TrendingUp, Weight, Activity, Flame, Trophy } from 'lucide-react'
import { WeightChart } from '@/components/weight-chart'
import { WorkoutFrequencyChart } from '@/components/workout-frequency-chart'
import { CaloriesChart } from '@/components/calories-chart'
import { FitnessData } from '@/types/fitness'

interface ProgressVisualizationProps {
  data: FitnessData
}

export function ProgressVisualization({ data }: ProgressVisualizationProps) {
  const { weightHistory, workoutFrequency, caloriesHistory, personalRecords } = data

  return (
    <section id="progress" className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">Progress Visualization</h2>
        <Badge variant="outline" className="text-sm">
          Last 3 months
        </Badge>
      </div>

      <Tabs defaultValue="weight" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="weight" className="flex items-center gap-2">
            <Weight className="h-4 w-4" />
            Weight
          </TabsTrigger>
          <TabsTrigger value="frequency" className="flex items-center gap-2">
            <Activity className="h-4 w-4" />
            Frequency
          </TabsTrigger>
          <TabsTrigger value="calories" className="flex items-center gap-2">
            <Flame className="h-4 w-4" />
            Calories
          </TabsTrigger>
          <TabsTrigger value="records" className="flex items-center gap-2">
            <Trophy className="h-4 w-4" />
            Records
          </TabsTrigger>
        </TabsList>

        <TabsContent value="weight" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-fitness-primary" />
                Weight Progress
              </CardTitle>
            </CardHeader>
            <CardContent>
              <WeightChart data={weightHistory} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="frequency" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-fitness-secondary" />
                Workout Frequency
              </CardTitle>
            </CardHeader>
            <CardContent>
              <WorkoutFrequencyChart data={workoutFrequency} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="calories" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Flame className="h-5 w-5 text-orange-500" />
                Calories Burned Over Time
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CaloriesChart data={caloriesHistory} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="records" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {personalRecords.map((record, index) => (
              <Card key={index} className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-foreground">{record.exercise}</h4>
                  <Trophy className="h-5 w-5 text-yellow-500" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Personal Best:</span>
                    <span className="font-medium">{record.value} {record.unit}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Date:</span>
                    <span className="text-sm">{new Date(record.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Improvement:</span>
                    <span className="text-sm text-green-600">+{record.improvement}%</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
          
          {personalRecords.length === 0 && (
            <Card className="p-8">
              <div className="text-center text-muted-foreground">
                <Trophy className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No personal records yet</p>
                <p className="text-sm">Keep working out to set your first record!</p>
              </div>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </section>
  )
}