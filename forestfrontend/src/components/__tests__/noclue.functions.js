
    export function saveHighlight(aiMessageID, aiMessage) {
            console.log("content::" + aiMessage)
            fetch("http://localhost:8080/messages", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({id: aiMessageID, content: aiMessage, sId: this.sessionId}),
            })

        }
    export async function  getData2()  {
        let result = await fetch("http://localhost:8080/messages").then(res => res.json()).catch(error => console.log(error));
        console.log(result);
        return result;
    }
    export async function  sendMessage(roleJ) {
        if (!this.newMessage) {
            return
        }
        let role = 'user';
        if (roleJ === 'system') {
            role = 'system';
        }
        const message = {

            id: Date.now(),
            content: this.newMessage,
            role: role,
            sId: this.sessionId,
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
            sId: this.sessionId,

        }
        this.messages.push(botMessage)
        //todo debug
        console.log(message)
        console.log(botMessage)
    }