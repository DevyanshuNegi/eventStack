import { Event } from "@/models/Event";
import { getEventById } from "@/models/Event";
import { createEvent } from "@/models/Event";
import { updateEvent } from "@/models/Event";
import { deleteEvent } from "@/models/Event";
import { getEvents } from "@/models/Event";


export async function agetEvents(type: 'upcoming' | 'past', limit?: number): Promise<Event[]> {
    return getEvents(type, limit);
}

export async function agetEventById(id: string): Promise<Event | null> {
    return getEventById(id);
}

export async function POST(event: Omit<Event, '_id' | 'createdAt' | 'updatedAt'>): Promise<Event> {
    console.log("createEvent", event);
    return createEvent(event);
}

export async function aupdateEvent(id: string, event: Partial<Event>): Promise<Event | null> {
    return updateEvent(id, event);
}

export async function adeleteEvent(id: string): Promise<boolean> {
    return deleteEvent(id);
}

