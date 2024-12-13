import { useEffect, useState } from 'react'
import './App.css'
import { ChatInput } from '../components/ChatInput'
import { Message } from '../components/ChatMessages'
import { socket } from '../utils/socket'

type Tmessage = {
  type: "assistant" | "user",
  text: string,
  prediction: null | string
}


const defaultMessages: Tmessage[] = [
  {
    type: "assistant",
    text: "Hola, como estas?",
    prediction: null
  }
]

function App() {
  const [messages, setMessages] = useState<Tmessage[]>(defaultMessages)

  useEffect(() => {
    socket.on("prediction", (data) => {
   
      setMessages(prev => {
        const lastMessage = prev[prev.length - 1]
        lastMessage.prediction = data.prediction
        prev[prev.length - 1] = lastMessage
        return [...prev]

      })
    })

    socket.on("advice", (data) => {
      console.log(data.advice);
      addMessage({
        text: data.advice,
        type: "assistant",
        prediction: null
      })
    })

    return () => {
      socket.off("prediction")
      socket.off("advice")
    }
  }, [])

  const addMessage = (message: Tmessage) => {
    setMessages(prev => [...prev, message])

    if (message.type === "user"){
      socket.emit("message", {
        message
      })
    }
  }

  return (
    <>
      {messages.map((message) => {
        return <Message {...message} />
      })}
      <ChatInput addMessage={addMessage} />
    </>
  )
}

export default App
