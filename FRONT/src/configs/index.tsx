
export class AppSettings {
    baseURL: string
    credentials: {
        username: string
        password: string
    }
    constructor() {
      this.baseURL = import.meta.env.VITE_APP_BASE_URL
      this.credentials = {
          username: import.meta.env.VITE_APP_USERNAME,
          password: import.meta.env.VITE_APP_PASSWORD
      }
    }
    validate(): string[] {
        const errors: string[] = []
        if (!this.baseURL) {
            errors.push("VITE_APP_BASE_URL not defined!!")
        }
        // username
        if (!this.credentials.username) {
            errors.push("VITE_APP_DEFAULT_USERNAME not defined!!")
        }
        // password
        if (!this.credentials.password) {
            errors.push("VITE_APP_DEFAULT_PASSWORD not defined!!")
        }
        return errors
    };
  }
  