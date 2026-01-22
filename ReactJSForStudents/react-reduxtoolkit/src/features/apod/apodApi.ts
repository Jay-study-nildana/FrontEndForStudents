import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Apod } from './types';

// Read API key from Vite env; fall back to NASA demo key if not provided
const API_KEY = (import.meta.env.VITE_NASA_API_KEY as string) ?? 'NO_KEY';

export const apodApi = createApi({
  reducerPath: 'apodApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.nasa.gov/planetary/' }),
  tagTypes: ['Apod'],
  endpoints: (build) => ({
    getApod: build.query<Apod, { date?: string } | void>({
      query: (arg) => {
        const dateParam = arg && 'date' in arg && arg.date ? `&date=${arg.date}` : '';
        return `apod?api_key=${API_KEY}${dateParam}`;
      },
      providesTags: (_result, _error, _arg) => [{ type: 'Apod' }],
    }),
  }),
});

export const { useGetApodQuery } = apodApi;