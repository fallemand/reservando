class Cookie {
  name: string;

  constructor(name) {
    this.name = name;
  }

  setCookieVal(value: string): void {
    document.cookie = `${this.name}=${value};path=/;`;
  }

  getCookieVal(): string {
    const match = document.cookie.match(new RegExp(`(^| )${this.name}=([^;]+)`));

    if (match) {
      return match[2];
    }
  }

  deleteCookie(): void {
    document.cookie = `${this.name}=; expires = Thu, 01 Jan 1970 00:00:00 GMT;path=/;"`;
  }
}

export default Cookie;
