import {getEventById, updateEvent, createEvent, deleteEvent, getEvents} from '../models/event.model.js';



export async function newEvent(req, res) {
  try {
    const { name, participants, date, createdBy } = req.body;


    // Basic validation
    if (!name || !participants || !date || !createdBy) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Create event
    const newEvent = await createEvent({ name, participants, date, createdBy });

    // Send success response
    return res.status(201).json({ message: 'Event created successfully', event: newEvent });
  } catch (error) {
    console.error('Error creating event:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}


export async function changeEvent(req, res){
  const {id, ...updatedData} = req.body;
  if (!id) {
    return res.status(400).json({ error: "id is required in the request body" });
  }
  try {
    const updatedEvent = await updateEvent(id, updatedData);

    if (!updatedEvent) {
      return res.status(404).json({ error: "Event not found" });
    }

    return res.status(200).json({ message: "Event updated", event: updatedEvent });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
}


export async function removeEvent(req, res){
  const {eventId} = req.params;
  try {
    await deleteEvent(eventId);
    return res.status(200).json({ message: 'Event deleted successfully' });
  } catch (error) {
    res.status(404).send("Event not found");
  }
}

export async function readEvent(req, res) {
  try {
    const events = await getEvents();
    if (!events || events.length === 0) {
      return res.status(404).json({ message: 'No events found' });
    }
    res.json(events);
  } catch (error) {
    res.status(500).send('Error retrieving events');
  }
}
