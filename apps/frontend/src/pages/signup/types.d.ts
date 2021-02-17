import { RootState } from "@/types/globals";

export interface LoginState extends RootState {
  isLoading: boolean;
}

export interface ModulesQuery {
  modules: string[];
}
