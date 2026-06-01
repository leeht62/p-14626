import { paths } from "@/lib/backend/apiV1/schema";
import createClient from "openapi-fetch";

const clientWithNoHeaders = createClient<paths>({
  baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
});

const client = createClient<paths>({
  baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  credentials: "include",
});

export { client, clientWithNoHeaders };
