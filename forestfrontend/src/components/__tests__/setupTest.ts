import { describe, it, expect, beforeAll, afterEach, afterAll } from "vitest";
import { rest,graphql } from "msw";
import { setupServer } from "msw/node";
import { getresponse,postresponse } from "./mock.api";
import "whatwg-fetch";

export const restHandlers = [
    rest.get("http://localhost:8080/messages", (req, res, ctx) => {
        return res(ctx.status(200), ctx.json(getresponse));
    }),

    rest.post("http://localhost:5173/api/chat", (req, res, ctx) => {
        return res(ctx.status(200), ctx.json(postresponse));
    }),

];
const server = setupServer(...restHandlers);

// Start server before all tests
beforeAll(() => server.listen({ onUnhandledRequest: "error" }));

//  Close server after all tests
afterAll(() => server.close());

// Reset handlers after each test `important for test isolation`
afterEach(() => server.resetHandlers());
