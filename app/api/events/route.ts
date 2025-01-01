import { NextResponse } from "next/server";
import { createEvent } from "@/models/Event";

export async function POST(req: Request) {
    try {
        const event = await req.json();
        // console.log("createEvent", event);p
        const createdEvent = await createEvent(event);
        return NextResponse.json(createdEvent, { status: 201 });
    } catch (error) {
        console.error("Error creating event:", error);
        return NextResponse.json({ error: "Failed to create event" }, { status: 500 });
    }
}