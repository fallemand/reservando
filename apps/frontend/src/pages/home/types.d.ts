import { RootState } from "@/types/globals";

export interface HomeState extends RootState {
  name: string;
}

interface ChangeStatePayload<T = any> {
  property: keyof HomeState;
  value: T;
}
