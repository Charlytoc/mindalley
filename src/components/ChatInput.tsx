import { useRef } from "react"

export const ChatInput = ({ addMessage }) => {
    const textAreaRef = useRef<HTMLTextAreaElement>(null)

    const handelSubmit = () => {
        if (textAreaRef.current){
            const text = textAreaRef.current.value
            if (text.trim()) { 
                addMessage({ type: "user", text, prediction: null})
                textAreaRef.current.value = '' 
            }
        }
    }

    const handleKeyUp = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            handelSubmit()
        }
    }
    
    return (
        <div className="ChatInputContainer">
            <textarea 
                name="input" 
                placeholder="Write your message" 
                ref={textAreaRef}
                onKeyUp={handleKeyUp}
            />
            <button onClick={handelSubmit}>Send</button>
        </div>
    )
}
