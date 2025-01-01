import { getServerSession } from 'next-auth/next'
import { redirect } from 'next/navigation'
import EventForm from '@/components/event-form'
import { getEventById } from '@/models/Event'
import { use, useEffect } from 'react'

export default async function EditEventPage({ params }: { params: { id: string } }) {
  // const session = await getServerSession()

  // if (!session) {
  //   redirect('/admin/login')
  // }
 
  const event = await getEventById(params.id)
    
  if (!event) {
    redirect('/admin/events')
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Edit Event</h1>
      <EventForm event={event} />
    </div>
  )
}

