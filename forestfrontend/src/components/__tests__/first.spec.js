import {render, screen, fireEvent, waitFor} from "@testing-library/vue";
import {describe, it, expect} from "vitest";
import App from "../../App.vue";
import Chat from "../Chat.vue";

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
            //const message = await screen.getByText("Ich bin ein KI-Modell");
            // it'll wait until the mock function has been called once.
            await waitFor(() => expect(screen.findByText('Ich bin ein KI-Modell'),{exact: false}));
        });
});
