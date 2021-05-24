import { Time } from "./time";

/* eslint-disable @typescript-eslint/no-namespace */
export namespace Shops {
  export interface Shop {
    id: string;
    userId: string;
    name: string;
    calendars: Calendar[];
    duration: Time.Duration;
    interval: Time.Interval;
    sectors: {
      [key in SectorId]: Sector;
    };
    notifications: {
      whatsapp: Notification;
      email: Notification;
    };
  }

  export interface Calendar {
    id?: number;
    openingTimes: Time.OpeningTime[];
    days: Time.DayName[];
  }

  export type SectorId = "outside" | "inside";

  export interface Sector {
    id: SectorId;
    enabled: boolean;
    for2: number;
    for4: number;
    for6: number;
    for8: number;
  }

  export interface Notification {
    enabled: boolean;
    value: string;
  }
}
