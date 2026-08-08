import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

const JIKAN_BASE_URL = "https://api.jikan.moe/v4";

// Simple in-memory rate-limiter queue (350ms delay between consecutive outgoing requests)
class RequestQueue {
  private queue: Array<() => Promise<void>> = [];
  private processing = false;
  private minDelayMs = 350;

  public enqueue<T>(requestFn: () => Promise<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      this.queue.push(async () => {
        try {
          const res = await requestFn();
          resolve(res);
        } catch (err) {
          reject(err);
        }
      });
      this.processQueue();
    });
  }

  private async processQueue() {
    if (this.processing) return;
    this.processing = true;

    while (this.queue.length > 0) {
      const task = this.queue.shift();
      if (task) {
        await task();
        await new Promise((res) => setTimeout(res, this.minDelayMs));
      }
    }

    this.processing = false;
  }
}

const jikanQueue = new RequestQueue();

export const jikanAxios: AxiosInstance = axios.create({
  baseURL: JIKAN_BASE_URL,
  timeout: 12000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Axios response interceptor for automatic retry on 429 rate limits
jikanAxios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const config = error.config as AxiosRequestConfig & { _retryCount?: number };
    if (!config) return Promise.reject(error);

    config._retryCount = config._retryCount || 0;

    // Retry up to 3 times on 429 (rate limit) or 503 (service unavailable)
    if ((error.response?.status === 429 || error.response?.status === 503) && config._retryCount < 3) {
      config._retryCount += 1;
      const backoffDelay = config._retryCount * 1200;
      await new Promise((res) => setTimeout(res, backoffDelay));
      return jikanAxios(config);
    }

    return Promise.reject(error);
  }
);

// Helper function to execute rate-limited GET requests
export async function jikanGet<T>(endpoint: string, params: Record<string, any> = {}): Promise<T> {
  return jikanQueue.enqueue(async () => {
    const response = await jikanAxios.get<T>(endpoint, { params });
    return response.data;
  });
}
