import { getResponseError } from "@Utils/page-error";

describe("Page Error", () => {
  it("getResponseError should parse response", () => {
    const errorResponse = {
      response: {
        data: {
          fields: {
            field_with_error1: {
              ERROR_CODE1: {},
            },
            field_with_error2: {
              ERROR_CODE2: {},
            },
          },
        },
      },
    };

    const errors = getResponseError(errorResponse);
    expect(errors).toEqual([
      { field: "field_with_error1", code: "ERROR_CODE1" },
      { field: "field_with_error2", code: "ERROR_CODE2" },
    ]);
  });

  it("getResponseError should parse response with translated errors", () => {
    const errorResponse = {
      response: {
        data: {
          fields: {
            field_with_error1: "Translated error 1",
            field_with_error2: "Translated error 2",
          },
        },
      },
    };

    const errors = getResponseError(errorResponse);
    expect(errors).toEqual([
      { field: "field_with_error1", code: "Translated error 1" },
      { field: "field_with_error2", code: "Translated error 2" },
    ]);
  });

  it("getResponseError should parse response with array of errors", () => {
    const errorResponse = {
      response: {
        data: {
          fields: {
            field_with_error1: ["Translated error 1"],
            field_with_error2: ["Translated error 2"],
          },
        },
      },
    };

    const errors = getResponseError(errorResponse);
    expect(errors).toEqual([
      { field: "field_with_error1", code: "Translated error 1" },
      { field: "field_with_error2", code: "Translated error 2" },
    ]);
  });

  it("getResponseError should return global error if fields is empty", () => {
    const errorResponse = {
      response: {
        data: {
          fields: [],
        },
      },
    };

    const errors = getResponseError(errorResponse);
    expect(errors).toEqual("pGlobal_cErrorTemplates_GeneralError");
  });

  it("getResponseError should return error message", () => {
    const errorResponse = {
      response: {
        data: {
          message: "Time out",
        },
      },
    };

    const errors = getResponseError(errorResponse);
    expect(errors).toEqual("Time out");
  });

  it("getResponseError should return a generic error", () => {
    const errorResponse = {
      response: {
        data: {},
      },
    };

    const errors = getResponseError(errorResponse);
    expect(errors).toEqual("pGlobal_cErrorTemplates_GeneralError");
  });
});
