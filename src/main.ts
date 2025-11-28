import { Calendar } from "./calendar.js";

const myCalendar = new Calendar();
const myUser = myCalendar.createUser("Mykhailo", "Makohon");
const addedEvent1 = myCalendar.addEvent(
  myUser.userId,
  "My Birthday",
  "22-03-1995",
  "12:15",
  "13:00",
  "Be Happy"
);
const addedEvent2 = myCalendar.addEvent(
  myUser.userId,
  "New Year",
  "31-12-2025",
  "00:01",
  "23:59",
  "Make a wish"
);
const addedEvent3 = myCalendar.addEvent(
  myUser.userId,
  "Test",
  "22-03-1995",
  "00:01",
  "23:59",
  "Whatever"
);
console.log(addedEvent2);
myCalendar.deleteEvent(myUser.userId, addedEvent2.eventId);
myCalendar.listEvents(myUser.userId);
myCalendar.listEventsByDate(myUser.userId, "22-03-1995");

console.log(myCalendar.listEvents(myUser.userId));
