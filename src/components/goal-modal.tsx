'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'

interface GoalModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (goal: any) => void
}

export function GoalModal({ isOpen, onClose, onSubmit }: GoalModalProps) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: '',
    target: '',
    unit: '',
    deadline: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({
      ...formData,
      target: parseInt(formData.target),
      current: 0,
      progress: 0,
      createdAt: new Date().toISOString()
    })
    setFormData({
      title: '',
      description: '',
      type: '',
      target: '',
      unit: '',
      deadline: ''
    })
  }

  const goalTypes = [
    { value: 'weight', label: 'Weight Loss/Gain', unit: 'lbs' },
    { value: 'workout', label: 'Workout Frequency', unit: 'sessions' },
    { value: 'cardio', label: 'Cardio Minutes', unit: 'minutes' },
    { value: 'strength', label: 'Strength Training', unit: 'sessions' },
    { value: 'calories', label: 'Calories Burned', unit: 'kcal' }
  ]

  const handleTypeChange = (type: string) => {
    const goalType = goalTypes.find(gt => gt.value === type)
    setFormData({ 
      ...formData, 
      type, 
      unit: goalType?.unit || '' 
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Set New Goal</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Goal Title</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g., Lose 10 pounds"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Describe your goal..."
              rows={3}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="type">Goal Type</Label>
            <Select value={formData.type} onValueChange={handleTypeChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select goal type" />
              </SelectTrigger>
              <SelectContent>
                {goalTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="target">Target</Label>
              <Input
                id="target"
                type="number"
                value={formData.target}
                onChange={(e) => setFormData({ ...formData, target: e.target.value })}
                placeholder="10"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="unit">Unit</Label>
              <Input
                id="unit"
                value={formData.unit}
                onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                placeholder="lbs"
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="deadline">Deadline</Label>
            <Input
              id="deadline"
              type="date"
              value={formData.deadline}
              onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
              required
            />
          </div>
          
          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className="bg-purple-500 hover:bg-purple-600">
              Create Goal
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}