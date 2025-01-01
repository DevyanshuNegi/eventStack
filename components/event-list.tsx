import Link from 'next/link'
import Image from 'next/image'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { getEvents } from '@/models/Event'

type EventListProps = {
  type: 'upcoming' | 'past'
  limit?: number
  isAdmin?: boolean
}

export default async function EventList({ type, limit, isAdmin }: EventListProps) {
  const events = await getEvents(type, limit)

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {events && events.map((event) => (
        <Card key={event._id?.toString()}>
          <CardHeader>
            <Image
              src={event.thumbnail ?? ''}
              alt={event.title}
              width={300}
              height={200}
              className="w-full h-48 object-cover rounded-t-lg"
            />
          </CardHeader>
          <CardContent>
            <CardTitle className="mb-2">{event.title}</CardTitle>
            <p className="text-sm text-muted-foreground mb-2">
              {new Date(event.startDate).toLocaleString()} <br/> {new Date(event.endDate).toLocaleString()}
            </p>
            <Badge variant={type === 'upcoming' ? 'default' : 'secondary'}>{type}</Badge>
          </CardContent>
          <CardFooter>
            <Button asChild>
              <Link href={`/events/${event._id}`}>View Details</Link>
            </Button>
            {isAdmin && (
              <Button asChild>
                <Link href={`/admin/edit-event/${event._id}`}>Edit Event</Link>
              </Button>
            )
            }
          </CardFooter>
        </Card>


      ))}
      <Card key={"234"}>
        <CardHeader>
          <Image
            src={"https://picsum.photos/200"}
            alt={"COde and Chords"}
            width={300}
            height={200}
            className="w-full h-48 object-cover rounded-t-lg"
          />
        </CardHeader>
        <CardContent>
          <CardTitle className="mb-2">{"code and chords"}</CardTitle>
          <p className="text-sm text-muted-foreground mb-2">
            {new Date("23/3/223").toLocaleString()} - {new Date("23/34/23").toLocaleString()}
          </p>
          <Badge variant={type === 'upcoming' ? 'default' : 'secondary'}>{type}</Badge>
        </CardContent>
        <CardFooter>
          <Button asChild>
            <Link href={`/events/${23}`}>View Details</Link>
          </Button>
          {isAdmin && (
            <Button asChild>
              <Link href={`/admin/events/${234}`}>Edit Event</Link>
            </Button>
          )
          }
        </CardFooter>
      </Card>
    </div>
  )
}

// next.config.js



