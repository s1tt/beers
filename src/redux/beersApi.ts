import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Beer } from '../types/beer';

export const beersApi = createApi({
  reducerPath: 'beers/api',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.punkapi.com/v2/' }),
  tagTypes: ['Beers'],
  endpoints: build => ({
    getRandomBeer: build.query<number, void>({
      query: () => ({
        url: 'beers/random'
      }),
      transformResponse: (data: Beer[]) => data[0].id
    }),
    getBeer: build.query<Beer, unknown>({
      query: (id: string) => ({
        url: `beers/${id}`
      }),
      transformResponse: (data: Beer[]) => data[0]
    }),
    getBeers: build.query<Beer[], { searchPage: number; beer_name?: string }>({
      query: ({ searchPage, beer_name }) => ({
        url: `beers`,
        params: {
          page: searchPage,
          per_page: 9,
          ...(beer_name && { beer_name })
        }
      })
    }),
    searchBeers: build.query<
      Beer[],
      { searchPage: number; beer_name?: string }
    >({
      query: ({ searchPage, beer_name }) => ({
        url: `beers`,
        params: {
          page: searchPage,
          per_page: 9,
          beer_name: beer_name
        }
      })
    })
  })
});

export const {
  useLazyGetRandomBeerQuery,
  useGetBeerQuery,
  useGetBeersQuery,
  useLazyGetBeersQuery,
  useLazySearchBeersQuery
} = beersApi;
