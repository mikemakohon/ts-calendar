import type {
  UserId,
  User,
  UserEvent,
  CalendarId,
  Calendar as TCalendar,
  EventId,
} from "./types.js";
import { parseDate, parseTime } from "./helpers.js";

type UsersState = Record<UserId, User>;
type CalendarsState = Record<CalendarId, TCalendar>;

export class Calendar {
  users: UsersState = {};
  calendars: CalendarsState = {};

  constructor(initialState?: { users: UsersState; calendars: CalendarsState }) {
    if (initialState) {
      this.users = initialState.users ?? {};
      this.calendars = initialState.calendars ?? {};
    }
  }

  getUser = (userId: UserId) => {
    return this.users[userId] ?? null;
  };

  getCalendar = (userId: UserId): TCalendar => {
    const user = this.getUser(userId);
    if (!user) {
      throw new Error(`User not found ${userId}`);
    }

    const calendar = this.calendars[user.calendarId];
    if (!calendar) {
      throw new Error(`User not found ${userId}`);
    }

    return calendar;
  };

  createUser = (firstName: string, lastName: string): User => {
    const userId = crypto.randomUUID() as UserId;
    const calendarId = crypto.randomUUID() as CalendarId;

    const user: User = { firstName, lastName, userId, calendarId };
    const calendar: TCalendar = { calendarId, events: [], holidays: [] };

    this.users[userId] = user;
    this.calendars[calendarId] = calendar;

    return this.users[userId];
  };

  listEvents = (userId: UserId): UserEvent[] => {
    const userEvents = this.getCalendar(userId).events;

    return userEvents;
  };

  listEventsByDate = (userId: UserId, dateStr: string): UserEvent[] => {
    const calendar = this.getCalendar(userId);
    const date = parseDate(dateStr);
    const filteredEventsByDate = calendar.events.filter(
      (event) =>
        event.date.year === date.year &&
        event.date.month === date.month &&
        event.date.day === date.day
    );

    console.log(filteredEventsByDate);
    return filteredEventsByDate;
  };

  addEvent = (
    userId: UserId,
    title: string,
    date: string,
    timeStarts: string,
    timeEnds: string,
    message?: string
  ): UserEvent => {
    const user = this.users[userId];

    if (user) {
      const calendar = this.calendars[user.calendarId];

      const eventId = crypto.randomUUID();
      const parsedDate = parseDate(date);
      const startTime = parseTime(timeStarts);
      const endTime = parseTime(timeEnds);

      const event: UserEvent = {
        eventId,
        title,
        date: parsedDate,
        startTime,
        endTime,
        notification: {
          ...parsedDate,
          ...startTime,
          message: message ?? "Join now",
        },
      };

      calendar?.events.push(event);
      return event;
    } else {
      throw new Error("User hasn't been found");
    }
  };

  deleteEvent = (userId: UserId, eventId: EventId): boolean => {
    const calendar = this.getCalendar(userId);
    const numOfEvents = calendar.events.length;

    calendar.events = calendar.events.filter(
      (event) => event.eventId !== eventId
    );
    return numOfEvents !== calendar.events.length;
  };
}
