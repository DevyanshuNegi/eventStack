// "use client"
// import { useUser } from '@clerk/clerk-react'
import EventList from '@/components/event-list'

export default function Admin() {
    return (
        <div className="container mx-auto px-4 py-8">
            {/* <h1>Hello, {user?.firstName}</h1> */}
            <EventList type="upcoming" limit={3} isAdmin={true}/>
        </div>
    )
}

