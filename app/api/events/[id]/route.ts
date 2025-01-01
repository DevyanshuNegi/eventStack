import { getEventById } from "@/models/Event";
import { NextResponse } from "next/server"; 
import { updateEvent } from "@/models/Event";
import { Event } from "@/models/Event";


export async function PUT(req: Request) {
    try {
        const body = await req.json();
        const url = req.url;
        const { event } = body;
        // bad logic to get id
        const temp = url.split("/");
        const id = temp[temp.length - 1];
        console.log("in PUT id", id);
        const updatedEvent = await updateEvent(id,event);
        console.log("updated event1 ", updatedEvent);
        
        const plainEvent = updatedEvent?.toObject();

        console.log("updated event ", plainEvent);

        return NextResponse.json(plainEvent, { status: 201 });
    } catch (error) {
        console.error("Error updating event:", error);
        return NextResponse.json({ error: "Failed to update event" }, { status: 500 });
    }
}