import { AxiosError } from "axios";
import i18n from "@Utils/i18n";
import { TranslateResult } from "vue-i18n";

export interface FieldError {
  field: string;
  code: string;
}
/**
 * Get list of fields and errors
 * data => { fields: { field1: { ERROR_CODE: '' }}}
 */
export const getResponseError = (
  error: AxiosError,
  defaultMessage: TranslateResult = i18n.t("pGlobal_cErrorTemplates_GeneralError"),
): FieldError[] | string | TranslateResult => {
  const { data = {} } = error.response;
  const result = [];

  if (data && data.fields && Object.keys(data.fields).length) {
    Object.keys(data.fields).forEach((key) => {
      let fieldError = data.fields[key];
      if (fieldError instanceof Array) {
        fieldError = fieldError[0];
      } else if (fieldError instanceof Object) {
        fieldError = Object.keys(fieldError)[0];
      }
      result.push({ field: key, code: fieldError });
    });
  } else if (data.message) {
    return data.message;
  } else {
    return defaultMessage;
  }
  return result;
};
