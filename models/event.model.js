import fs from 'fs/promises';
import { v4 as uuidv4 } from 'uuid';
const db = './db.json';


export async function getData() {
  const data = await fs.readFile(db, 'utf-8');
  return JSON.parse(data);
}


export async function getEvents() {
  const data = await getData();
  return data.eventos || [];
}

export async function getEventById(id) {
  const data = await getData();
  const events = data.eventos || [];
  return events.find(event => event.id === id) || null;
}


export async function createEvent({name, participants, date, createdBy}) {
  const data = await getData();
  const events = data.eventos || [];
  if (!isValidEvent(req.body)) {
  return res.status(400).json({ error: 'Invalid event data' });
  }
  const newEvent = {
    id: uuidv4(),
    name,
    participants,
    date,
    createdBy,
  };
  events.push(newEvent);
  data.eventos = events;
  await fs.writeFile(db, JSON.stringify(data, null, 2));
}


export async function deleteEvent(eventId){
  const data = await getData();
  const events = data.eventos || [];
  const updatedEvents = events.filter(event => event.id !== eventId);

  if (events.length === updatedEvents.length) {
    throw new Error('Event not found');
  }

  data.eventos = updatedEvents;
  await fs.writeFile(db, JSON.stringify(data, null, 2));
}


export async function updateEvent(eventId, updatedData) {
  const data = await getData();
  const events = data.eventos || [];
  const eventIndex = events.findIndex(event => event.id === eventId);
  if (eventIndex === -1) return null;
  events[eventIndex] = {
    ...events[eventIndex],
    ...updatedData,
  };

  await fs.writeFile(db, JSON.stringify(data, null, 2));
  return events[eventIndex];
}


function isValidEvent(event) {
  const { name, participants, date, createdBy } = event;

  if (
    typeof name !== 'string' || !name.trim() ||
    typeof participants !== 'object' || participants === null || Array.isArray(participants) ||
    typeof date !== 'string' || !Date.parse(date) ||
    typeof createdBy !== 'string' || !createdBy.trim()
  ) {
    return false;
  }

  return true;
}

export async function addParticipantToEvent(eventId, newParticipant) {
  const data = await getData();
  const events = data.eventos || [];

  const eventIndex = events.findIndex(e => e.id === eventId);
  if (eventIndex === -1) {
    return null; // event not found
  }

  const event = events[eventIndex];

  if (typeof event.participants !== 'object' || event.participants === null) {
    event.participants = {};
  }

  const participantId = newParticipant.id;
  if (!participantId) {
    throw new Error('Participant must have an id');
  }

  event.participants[participantId] = newParticipant;

  data.eventos[eventIndex] = event;
  await fs.writeFile(db, JSON.stringify(data, null, 2));

  return event;
}
