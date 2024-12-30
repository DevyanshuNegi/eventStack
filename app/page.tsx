import Link from 'next/link'
import { Button } from '@/components/ui/button'
import EventList from '@/components/event-list'

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Welcome to VIT Bhopal University Events</h1>
      
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Upcoming Events</h2>
        <EventList type="upcoming" limit={3} />
        <div className="mt-4">
          <Button asChild>
            <Link href="/events?type=upcoming">View All Upcoming Events</Link>
          </Button>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Past Events</h2>
        <EventList type="past" limit={3} />
        <div className="mt-4">
          <Button asChild variant="outline">
            <Link href="/events?type=past">View All Past Events</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}

