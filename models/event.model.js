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
