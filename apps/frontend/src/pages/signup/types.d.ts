import { RootState } from "@/types/globals";

export interface SignupState extends RootState {
  name: string;
  calendars: Calendar[];
  sectors: {
    [key in SectorId]: Sector;
  };
  notifications: {
    whatsapp: Notification;
    email: Notification;
  };
  userId: null | string;
}

export interface ModulesQuery {
  modules: string[];
}

export interface Calendar {
  id: number;
  name: string;
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

export namespace Time {
  type Hour =
    | "00"
    | "01"
    | "02"
    | "03"
    | "04"
    | "05"
    | "06"
    | "07"
    | "08"
    | "09"
    | "10"
    | "11"
    | "12"
    | "13"
    | "14"
    | "15"
    | "16"
    | "17"
    | "18"
    | "19"
    | "20"
    | "21"
    | "22"
    | "23";
  type Minute = "00" | "15" | "30" | "45";
  type DayName = "monday" | "tuesday" | "wednesday" | "thursday" | "saturday" | "sunday";
  type Time = `${Hour}:${Minute}`;
  interface OpeningTime {
    from: Time.Time;
    to: Time.Time;
  }
}

interface ChangeStatePayload<T = any> {
  property: keyof SignupState;
  value: T;
}
