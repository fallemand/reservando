import { RootState } from "@/types/globals";
import { Shops } from "@reservando/commons/types";

export interface SignupState extends RootState {
  name: string;
  calendars: Shops.Calendar[];
  sectors: {
    [key in Shops.SectorId]: Shops.Sector;
  };
  notifications: {
    whatsapp: Shops.Notification;
    email: Shops.Notification;
  };
  userId: null | string;
  error: string | null;
}

interface ChangeStatePayload<T = any> {
  property: keyof SignupState;
  value: T;
}
