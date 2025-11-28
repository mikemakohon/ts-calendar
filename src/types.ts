export type Digit = {
  short: 0 | 1 | 2 | 3;
  full: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
};

export type Hour =
  | `0${Digit["full"]}`
  | `1${Digit["full"]}`
  | `2${Digit["short"]}`;

export type Minute =
  | `0${Digit["full"]}`
  | `1${Digit["full"]}`
  | `2${Digit["full"]}`
  | `3${Digit["full"]}`
  | `4${Digit["full"]}`
  | `5${Digit["full"]}`;

export type Time = {
  hour: Hour;
  minute: Minute;
};

export type DayOfMonth =
  | `0${Exclude<Digit["full"], 0>}`
  | `1${Digit["full"]}`
  | `2${Digit["full"]}`
  | `3${0 | 1}`;

export type DayOfWeek = "Mon" | "Tue" | "Wed" | "Thu" | "Fri" | "Sat" | "Sun";

export type Month =
  | `0${Exclude<Digit["full"], 0>}`
  | `1${Exclude<Digit["short"], 3>}`;

export type MonthName =
  | "January"
  | "February"
  | "March"
  | "April"
  | "May"
  | "June"
  | "July"
  | "August"
  | "September"
  | "October"
  | "November"
  | "December";

export type Year =
  `${Digit["full"]}${Digit["full"]}${Digit["full"]}${Digit["full"]}`;

export type Date = {
  day: DayOfMonth;
  month: Month;
  year: Year;
};

export type UserId = string;

export type CalendarId = string;

export type EventId = string;

export type Message = string;

export type Notification = Date & Time & { message: Message };

export type BaseEvent = {
  title: string;
  date: Date;
};

export type Holiday = BaseEvent & {
  isRecurring: boolean;
};

export type UserEvent = BaseEvent & {
  eventId: EventId;
  startTime: Time;
  endTime: Time;
  notification: Notification;
};

export type Person = {
  firstName: string;
  lastName: string;
};

export type User = Person & {
  userId: UserId;
  calendarId: CalendarId;
};

export type Calendar = {
  calendarId: CalendarId;
  events: UserEvent[];
  holidays: Holiday[];
};
