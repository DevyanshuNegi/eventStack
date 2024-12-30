import { ObjectId, Sort } from 'mongodb'
import clientPromise from '@/lib/mongodb'
import mongoose from 'mongoose';
import { Document , Schema} from 'mongoose';
import dbConnect from '@/lib/mongodb';

export interface Event extends Document{
  _id: ObjectId
  title: string
  description: string
  startDate: Date
  endDate: Date
  startTime: Date
  endTime: Date
  thumbnail?: string
  // createdAt: Date
  // updatedAt: Date
}

export async function getEvents(type: 'upcoming' | 'past', limit?: number, user?: string): Promise<Event[] | undefined> {

  console.log("getting events in event.ts");
  try {
    await dbConnect();

    const now = new Date()
    console.log("type ", type);
    // Construct the query based on the type
    const query = type === 'upcoming' ? { startDate: { $gte: now } } : { startDate: { $lt: now } };
    console.log("Constructed query:", query);

    // Sort the events based on the startDate
    const sort = type === 'upcoming' ? { startDate: 1 } : { startDate: -1 };
    console.log("Sort order:", sort);

    // Fetch the events based on the query and sort order
    const events = await EventModel.find(query).sort(sort).limit(limit || 3).exec();

    console.log("Fetched events:", events);
    return events;
  } catch (error) {
    console.error("Error getting events:", error);
    return undefined;
  }
}

export async function getEventById(id: string): Promise<Event | null> {

  await dbConnect();
  const event = await EventModel.findById(id).exec();

  return event;
}

export async function createEvent(event: Omit<Event, '_id' | 'createdAt' | 'updatedAt'>): Promise<Event> {
  await dbConnect();

  // const now = new Date()
  // const newEvent: Event = {
  //   ...event,
  //   createdAt: now,
  //   updatedAt: now,
  // }

  const createdEvent = await EventModel.create(event);

  return createdEvent;

  // const result = await db.collection<Event>('events').insertOne(newEvent)
}

export async function updateEvent(id: string, event: Partial<Event>): Promise<Event | null> {
  // const client = await clientPromise
  // const db = client.db()
  await dbConnect();
  const updatedEvent = await EventModel.findByIdAndUpdate(
    id,
    event,
    { new: true }
  )
  // const updatedEvent = await db.collection<Event>('events').findOneAndUpdate(
  //   { _id: new ObjectId(id) },
  //   { $set: { ...event, updatedAt: new Date() } },
  //   { returnDocument: 'after' }
  // )

  return updatedEvent ?? null;
}

export async function deleteEvent(id: string): Promise<boolean> {
  // const client = await clientPromise
  // const db = client.db()
  await dbConnect();
  // const result = await db.collection<Event>('events').deleteOne({ _id: new ObjectId(id) })
  const result = await EventModel.deleteOne({ _id: id }).exec();
  return result.deletedCount === 1
}


const EventSchema: Schema<Event> = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  thumbnail: { type: String, required: false },
  // createdAt: { type: Date, required: true },
  // updatedAt: { type: Date, required: true },
}
, {timestamps: true})


const EventModel =
  (mongoose.models.Event as mongoose.Model<Event>) ||
  mongoose.model<Event>('Event', EventSchema);

export default EventModel;
