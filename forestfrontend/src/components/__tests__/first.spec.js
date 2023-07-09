import {render, screen, fireEvent, waitFor} from "@testing-library/vue";
import App from "../../App.vue";
import Chat from "../Chat.vue";
import { describe, it, expect, beforeAll, afterEach, afterAll } from "vitest";
import { rest } from "msw";
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

describe("my app", () => {
    it("renders correctly", async () => {
        //arrange
        render(App);
        const textInp = await screen.getByPlaceholderText('Type your', {exact: false});
        //getbytext doesnt return tr
        const showButton = await screen.findByText("Hide Datatable");
        const sendButton = await screen.getByText('Send', {exact: false});
        const forestButton = await screen.getByText('Forest', {exact: false});
    }),
        it("can render grid & gets api response", async () => {
            const tableEntry = await screen.findByText('The air feels', {exact: false});
            expect(tableEntry.innerHTML).contains("You wake up in the middle of a dense forest. The sunlight filters through the thick foliage, casting dappled patterns on the forest floor.");
        }),
        it("can send post requests", async () => {
            const textInp = await screen.getByPlaceholderText('Type your', {exact: false});
            textInp.value = "Hallo"
            const sendButton = await screen.getByText('Send', {exact: false});
            await fireEvent.click(sendButton);
            // it'll wait until the mock function has been called once.
            await waitFor(() => expect(screen.findByText('Ich bin ein KI-Modell'),{exact: false}));

        });
});
