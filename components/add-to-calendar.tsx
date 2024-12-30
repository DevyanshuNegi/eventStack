"use client"

import { Button } from '@/components/ui/button'
import { Calendar } from 'lucide-react'

type AddToCalendarProps = {
  event: {
    title: string
    description: string
    startDate: string
    endDate: string
  }
}

export default function AddToCalendar({ event }: AddToCalendarProps) {
  const handleAddToCalendar = () => {
    const { title, description, startDate, endDate } = event
    const startDateTime = new Date(startDate).toISOString().replace(/-|:|\.\d\d\d/g, '')
    const endDateTime = new Date(endDate).toISOString().replace(/-|:|\.\d\d\d/g, '')

    const url = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
      title
    )}&details=${encodeURIComponent(description)}&dates=${startDateTime}/${endDateTime}`

    window.open(url, '_blank')
  }

  return (
    <Button onClick={handleAddToCalendar} variant="outline">
      <Calendar className="mr-2 h-4 w-4" />
      Add to Google Calendar
    </Button>
  )
}

