import { Suspense } from 'react'
import { notFound } from 'next/navigation'
import EventList from '@/components/event-list'
import EventsPage from '@/app/events/page'

export default function AdminEventsPage() {
  return (
    EventsPage({searchParams: {type: 'upcoming'}})
  )
}

