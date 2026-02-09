export interface Account {
  name: string;
  apiKey: string;
  baseUrl?: string; // Optional, defaults to https://api.anthropic.com
  color?: string; // Hex color for the card border/accent
}

export interface Config {
  accounts: Account[];
  refreshInterval: number; // In milliseconds
  alertThreshold: number; // Percentage (0-100)
}

export const DEFAULT_CONFIG: Config = {
  accounts: [],
  refreshInterval: 30000,
  alertThreshold: 80,
};
