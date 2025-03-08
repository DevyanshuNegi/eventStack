// "use client";
import AddToCalendar from '@/components/add-to-calendar';
import { getEventById } from '@/models/Event';

export default async function EventPage({ params }: { params: { id: string } }) {

  const event = await getEventById(params.id)
  console.log('event', event)
  if (!event) {
    return (<div>Event not found</div>)
  }

  return (
    <div className="container mx-auto px-4 py-8 text-light">
      {/* Event Thumbnail */}
      {event.thumbnail && (
        <img
          src={event.thumbnail}
          alt={`${event.title} Thumbnail`}
          className="w-full h-64 object-cover rounded-lg mb-4"
        />
      )}

      {/* Event Title */}
      <h1 className="text-3xl font-bold  mb-4">{event.title}</h1>

      {/* Event Description */}
      <p className=" mb-6">{event.description}</p>

      {/* Event Date and Time */}
      <div className="flex flex-col space-y-2 ">
        <div>
          <strong>Start Date:</strong> {event.startDate.toDateString()}
        </div>
        <div>
          <strong>End Date:</strong> {event.endDate.toDateString()}
        </div>
        <div>
          <strong>Start Time:</strong> {event.startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
        <div>
          <strong>End Time:</strong> {event.endTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
  
        {/* Add to Calendar Button */}
      <div className="mt-4">
        <AddToCalendar event={{
          startDate: event.startDate.toString(),
          endDate: event.endDate.toString(),
          title: event.title,
          description: event.description
        }}
        />
      </div>
    </div>
  )
}

