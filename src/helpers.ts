import type { Date, Time } from "./types.ts";

export const parseDate = (str: string): Date => {
  const [day, month, year] = str.split("-");
  const date = { day, month, year };

  return date as Date;
};

export const parseTime = (str: string): Time => {
  const [hour, minute] = str.split(":");
  const time = { hour, minute };

  return time as Time;
};
