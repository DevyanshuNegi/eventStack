import AddToCalendar from '@/components/add-to-calendar'

// ... rest of the imports and component

export default async function EventPage({ params }: { params: { id: string } }) {
  const event = await getEventById(params.id)

  if (!event) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* ... existing event details */}
      <div className="mt-4">
        <AddToCalendar event={event} />
      </div>
    </div>
  )
}

