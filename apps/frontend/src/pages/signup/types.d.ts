import { RootState } from "@/types/globals";
import { Shops, Time } from "@reservando/commons/types";

export interface SignupState extends RootState {
  name: string;
  calendar: Shops.Calendar;
  sectors: {
    [key in Shops.SectorId]: Shops.Sector;
  };
  notifications: {
    whatsapp: Shops.Notification;
    email: Shops.Notification;
  };
  interval: Time.Interval;
  duration: Time.Duration;
  userId: null | string;
  error: string | null;
}

interface ChangeStatePayload<T = any> {
  property: keyof SignupState;
  value: T;
}
