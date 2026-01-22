export interface Apod {
  copyright?: string;
  date: string; // "YYYY-MM-DD"
  explanation: string;
  hdurl?: string;
  media_type: 'image' | 'video' | string;
  service_version: string;
  title: string;
  url: string;
}