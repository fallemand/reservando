import { SignupState } from "../pages/signup/types";

export interface GlobalType {
  ENV: {
    [key: string]: boolean;
  };
}

export interface RootState {
  signup?: SignupState;
}
