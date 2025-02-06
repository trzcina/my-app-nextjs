import { Flotiq } from "@flotiq/flotiq-api-sdk";
import { createNextMiddleware } from "@flotiq/nextjs-addon";

export const flotiqApiClient = new Flotiq({
  apiKey: process.env.FLOTIQ_API_KEY,
  apiUrl: 'https://flotiq-backend-972-mr-599.dev.cdwv.pl',
  middleware: [createNextMiddleware({
    revalidateTime: 0
  })],
});
