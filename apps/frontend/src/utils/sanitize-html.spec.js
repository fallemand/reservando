import sanitizeHTML from "./sanitize-html";

describe("Sanitize HTML Util", () => {
  it("Should Clean HTML tags", () => {
    const string = `<script></script>`;

    expect(sanitizeHTML(string)).toEqual("&lt;script&gt;&lt;/script&gt;");
  });
});
