<template>
    <div class="max-w-lg min-w-full mx-auto my-10 bg-lime-300   ">
        <div>
            <button @click="personaChoice('City')" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"> City</button>
            <button @click="personaChoice('Forest')" class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full"> Forest</button>
        </div>
        <div class="border border-gray-300 p-4 rounded-lg">
            <div v-for="message in messages" :key="message.id">
                <div v-if="message.role === 'user'" class="text-right">
                    <p class="inline-block text-sm border border-gray-200 bg-lime-100 font-medium text-gray-700 rounded-lg">{{
                        message.content
                        }}</p>
                </div>
                <div v-else class="ai-message">
                    <div class="flex justify-end opacity-0 mb-[-10px] z-10">
                        <button @click="saveHighlight(message.id,message.content)" class="text-amber-300 font-bold text-lg  rounded-full hover:delay-100 hover:text-amber-400" title="add to highlights">
                            ★
                        </button>
                    </div>
                    <p class="inline-block whitespace-break-spaces text-sm font-medium border  bg-green-100 bg border-blue-200 text-gray-700 rounded-lg">
                        {{ message.content }}</p>
                </div>
            </div>
            <form @submit.prevent="sendMessage">
                <input ref="input" type="text" v-model="newMessage"
                       class="w-full border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                       placeholder="Type your message...">
                <button type="submit"
                        class="mt-2 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    Send
                </button>
            </form>
        </div>
    </div>
</template>

<script>
import {ref} from 'vue'

export default {
    data() {
        return {
            messages: [],
            newMessage: '',
            forest: "I want you to act as a text based adventure game. I will type commands and you will reply with a description of what the character sees, he starts in a forest. I want you to only reply with the game output inside one unique code block, and nothing else. do not write explanations. do not type commands unless I instruct you to do so. when i need to tell you something in english, i will do so by putting text inside curly brackets {like this}. my first command is wake up",
            //forest: 'Hello, how are you today?',
            city: "I want you to act as a text based adventure game. I will type commands and you will reply with a description of what the character sees, he starts in a medieval city. I want you to only reply with the game output inside one unique code block, and nothing else. do not write explanations. do not type commands unless I instruct you to do so. when i need to tell you something in english, i will do so by putting text inside curly brackets {like this}. my first command is wake up",
        }
    },
    methods: {
        personaChoice(message){
            if (message==="Forest"){
                this.newMessage= this.forest;
            } else if (message==="City"){
                this.newMessage= this.city;
            }
            this.sendMessage();
        },
        saveHighlight(aiMessageID,aiMessage){
            //Todo send highlighted message to backend and save there to h2 DB
            console.log("content::"+aiMessage)
            fetch("http://localhost:8080/messages", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({id: aiMessageID,content: aiMessage}),
            })

        },


/*        formatMessage(message) {
            return message.replace(/\n/g, '<br>');
        },
        findCodeBlocks(message) {
            let code = string.match(regex);
        },*/
        async sendMessage() {
            if (!this.newMessage) {
                return
            }
            const message = {

                id: Date.now(),
                content: this.newMessage,
                role: 'user',
            }
            this.messages.push(message)
            this.newMessage = ''

            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({message}),
            })
            const data = await response.json()
            const reply = data.reply

            const botMessage = {
                id: Date.now(),
                content: reply,
                role: 'bot',
            }
            this.messages.push(botMessage)
            console.log(botMessage)
        }
    }
}
</script>
