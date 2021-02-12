import { SupplierStatusState } from "@Modules/supplier/store";
import { TranslateResult } from "vue-i18n";

export interface FileAttachment {
  fileName: string;
  file: BlobPart;
}

export interface GlobalType {
  ENV: {
    [key: string]: boolean;
  };
  SECRETS: {
    [key: string]: string;
  };
}

export interface BasePagination {
  page?: number;
  limit?: number;
}

export interface RootState {
  supplier?: SupplierStatusState;
  isLoading?: boolean;
  snackbarMessage?: string | TranslateResult;
  snackbarType?: string;
}

export interface SnackbarParams {
  type: string;
  message: string | TranslateResult;
}

export interface HTMLInputEvent {
  target: HTMLInputElement;
}
