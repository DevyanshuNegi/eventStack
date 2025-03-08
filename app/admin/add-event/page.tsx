// import { getServerSession } from 'next-auth/next'
import EventForm from '@/components/event-form'

export default async function AddEventPage({ params }: { params: { id: string } }) {
  // const session = await getServerSession()

  // if (!session) {
  //   redirect('/admin/login')
  // }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Add New Event</h1>
      <EventForm />
    </div>
  )
}

