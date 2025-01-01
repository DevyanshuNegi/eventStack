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

    const sort: Record<string, 1 | -1> = {
      startDate: type==='upcoming'?1:-1, // Ascending order
    };
    console.log("Sort order:", sort);

    const events = await EventModel.find(query).sort(sort).limit(limit || 3).exec();

    console.log("Fetched events:", events);
    return events;
  } catch (error) {
    console.error("Error getting events:", error);
    return undefined;
  }
}

export async function getEventById(id: string): Promise<Event | null> {
  try {
    await dbConnect();
    const event = await EventModel.findById(id).exec();
    return event;
  } catch (error) {
    console.error("Error getting event by id:", error);
    return null;
    
  }
}

export async function createEvent(event: Omit<Event, '_id' | 'createdAt' | 'updatedAt'>): Promise<Event> {
  await dbConnect();

  const createdEvent = await EventModel.create(event);

  return createdEvent;

}

export async function updateEvent(id:string,event: Partial<Event>): Promise<Event | null> {
try {
    await dbConnect();
    console.log("id ", id);
    console.log("event ", event);
    const updatedEvent = await EventModel.findByIdAndUpdate(
      id,
      event,
      { new: true }
    )
    console.log("updated event ", updatedEvent);
  
    return updatedEvent ?? null;
} catch (error) {
    console.error("Error updating event:", error);
    return null;
  }
  
}


export async function deleteEvent(id: string): Promise<boolean> {

  await dbConnect();
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
  // TODO: add created by field
  // TODO: last edited by field
}
, {timestamps: true})


const EventModel =
  (mongoose.models.Event as mongoose.Model<Event>) ||
  mongoose.model<Event>('Event', EventSchema);

export default EventModel;
