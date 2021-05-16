import { RootState } from "@/types/globals";
import { Shops } from "@reservando/commons/types";

export interface HomeState extends RootState {
  name: string;
  shops: Shops.Shop[];
}

interface ChangeStatePayload<T = any> {
  property: keyof HomeState;
  value: T;
}
