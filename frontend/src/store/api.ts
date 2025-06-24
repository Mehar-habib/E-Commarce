import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

// Create the main API slice using Redux Toolkit's createApi
export const api = createApi({
  // Define the base query function using fetch with credentials
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL, // Set the base URL for all endpoints
    credentials: "include", // Send cookies with requests (for auth)
  }),

  // Optional tags for cache invalidation and refetching
  tagTypes: ["User"],

  // Define API endpoints here using builder (empty for now)
  endpoints: (builder) => ({}),
});
