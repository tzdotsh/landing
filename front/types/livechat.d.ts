export {};

declare global {
  interface LiveChatConfig {
    license?: number;
    integration_name?: string;
    product_name?: string;
    asyncInit?: boolean;
    [key: string]: unknown;
  }

  interface LiveChatWidgetApi {
    _q?: unknown[][];
    _h?: ((...args: unknown[]) => unknown) | null;
    _v?: string;
    on: (...args: unknown[]) => void;
    once: (...args: unknown[]) => void;
    off: (...args: unknown[]) => void;
    get: (...args: unknown[]) => unknown;
    call: (...args: unknown[]) => void;
    init: () => void;
  }

  interface Window {
    __lc?: LiveChatConfig;
    LiveChatWidget?: LiveChatWidgetApi;
  }
}
