class MockRestClient {
  constructor(axios) {
    this.addInterceptors(axios);
    this.mocks = {};
    this.enabled = true;
  }

  getMocks() {
    return this.mocks;
  }

  addMock(url, data) {
    this.mocks[url] = data;
  }

  reset() {
    this.mocks = {};
    this.enabled = true;
  }

  enable(state) {
    this.enabled = state;
    return this.enabled;
  }

  isUrlMocked(url) {
    return url in this.mocks;
  }

  mockResponse(request) {
    const { mockData } = request;

    // Handle mocked error (any non-2xx status code)
    if (mockData.status && String(mockData.status)[0] !== "2") {
      const err = new Error(mockData.message || "mock error");
      err.code = mockData.status;
      err.response = mockData;
      return Promise.reject(err);
    }

    return Promise.resolve(mockData);
  }

  isMockedRequest(request) {
    return Boolean(request.mockData);
  }

  // Create an error in order to cancel the request
  cancelRequest(config) {
    const mockRequest = new Error();
    mockRequest.mockData = this.mocks[config.url];
    mockRequest.response = mockRequest.mockData;
    mockRequest.config = config;
    return Promise.reject(mockRequest);
  }

  addInterceptors(axios) {
    // Add a request interceptor
    axios.interceptors.request.use(
      (config) => {
        if (this.enabled && this.isUrlMocked(config.url)) {
          console.log(`Mocked request: ${config.url}`); // eslint-disable-line no-console
          return this.cancelRequest(config);
        }
        return config;
      },
      (error) => Promise.reject(error),
    );

    // Add a response interceptor
    axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (this.isMockedRequest(error)) {
          return this.mockResponse(error);
        }
        return Promise.reject(error);
      },
    );

    // Execute the response interceptor at first in order for next
    // interceptors (defined on the rest-client.ts) to work well.
    if (axios.interceptors.response.handlers) {
      axios.interceptors.response.handlers.reverse();
    }
  }
}

export default MockRestClient;
