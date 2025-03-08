"use client"

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { uploadImage } from '@/lib/cloudinary'
import { Event } from '@/models/Event'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
// import { start } from 'repl'
import axios from 'axios'

const eventSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string().min(1, 'End date is required'),
  startTime: z.string().min(1, 'Start time is required'),
  endTime: z.string().min(1, 'End time is required'),
  thumbnail: z.instanceof(File).optional()
})

type EventFormProps = {
  event?: Event
}

export default function EventForm({ event }: EventFormProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<z.infer<typeof eventSchema>>({
    resolver: zodResolver(eventSchema),
    defaultValues: event ? {
      title: event.title,
      description: event.description,
      startDate: new Date(event.startDate).toISOString().slice(0, 16),
      endDate: new Date(event.endDate).toISOString().slice(0, 16),
      startTime: new Date(event.startDate).toISOString().slice(0, 16),
      endTime: new Date(event.endDate).toISOString().slice(0, 16),
    } : {
        title: '',
        description: '',
        startDate: '',
        endDate: '',
        startTime: '',
        endTime: '',
    },
  })

  async function onSubmit(data: z.infer<typeof eventSchema>) {
    setIsSubmitting(true);
    console.log("submitting")
    try {
      let thumbnailUrl = event?.thumbnail;

      if (data.thumbnail) {
        thumbnailUrl = await uploadImage(data.thumbnail);
        console.log('thumbnailUrl', thumbnailUrl);
      }

      const eventData = {
        ...data,
        thumbnail: thumbnailUrl,
        startDate: new Date(data.startDate),
        endDate: new Date(data.endDate),
        startTime: convertToTimeDate(data.startTime),
        endTime: convertToTimeDate(data.endTime),
      };

      const url = `/api/events${event ? `/${event._id}` : ''}`;
      const method = event ? 'PUT' : 'POST';

      const response = await axios({
        url,
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        data: eventData,
      });

      if (response.status === 201) {
        router.push('/admin/events');
      } else {
        console.error('Failed to submit event');
      }
    } catch (error) {
      console.error('Error submitting event:', error);
    } finally {
      setIsSubmitting(false);
    }
  }
  function convertToTimeDate(timeString:string) {
    // Get the current date
    const date = new Date();

    // Extract hours and minutes from the time string
    const [hours, minutes] = timeString.split(":").map(Number);

    // Set the time on the date object
    date.setHours(hours, minutes, 0, 0); // (hours, minutes, seconds, milliseconds)

    return date;
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Date */}
        <div className="flex justify-between">

          <FormField
            control={form.control}
            name="startDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Start Date</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="endDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>End Date</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <span className='hidden md:block'></span>
        </div>

        {/* Time */}
        <div className="flex justify-between">

          <FormField
            control={form.control}
            name="startTime"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Start Time</FormLabel>
                <FormControl>
                  <Input type="time" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="endTime"
            render={({ field }) => (
              <FormItem>
                <FormLabel>End Time</FormLabel>
                <FormControl>
                  <Input type="time" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <span className='hidden md:block'></span>
        </div>
        <FormField
          control={form.control}
          name="thumbnail"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Thumbnail</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => field.onChange(e.target.files?.[0])}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : event ? 'Update Event' : 'Create Event'}
        </Button>
      </form>
    </Form>
  )
}

