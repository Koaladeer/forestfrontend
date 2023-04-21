<template>
    <div class="max-w-lg mx-auto my-10">
        <div class="border border-gray-300 p-4 rounded-lg">
            <div v-for="message in messages" :key="message.id">
                <div v-if="message.from === 'user'" class="text-right">
                    <p class="text-sm font-medium text-gray-700">{{ message.content }}</p>
                </div>
                <div v-else>
                    <p class="text-sm font-medium text-gray-700">{{ message.content }}</p>
                </div>
            </div>
            <form @submit.prevent="sendMessage">
                <input type="text" v-model="newMessage" class="w-full border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Type your message...">
                <button type="submit" class="mt-2 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    Send
                </button>
            </form>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue'

export default {
    setup() {
        const messages = ref([])
        const newMessage = ref('')

        const sendMessage = async () => {
            if (!newMessage.value) {
                return
            }

            const message = {
                id: Date.now(),
                content: newMessage.value,
                from: 'user',
            }

            messages.value.push(message)
            newMessage.value = ''

            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message }),
            })
            const data = await response.json()
            const reply = data.reply

            const botMessage = {
                id: Date.now(),
                content: reply,
                from: 'bot',
            }

            messages.value.push(botMessage)
        }

        return {
            messages,
            newMessage,
            sendMessage,
        }
    }
}
</script>
