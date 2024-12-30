import { Suspense } from 'react'
import { notFound } from 'next/navigation'
import EventList from '@/components/event-list'

export default function EventsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const type = searchParams.type as 'upcoming' | 'past'

  if (type !== 'upcoming' && type !== 'past') {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">
        {type === 'upcoming' ? 'Upcoming Events' : 'Past Events'}
      </h1>
      <Suspense fallback={<div>Loading events...</div>}>
        <EventList type={type} />
      </Suspense>
    </div>
  )
}

