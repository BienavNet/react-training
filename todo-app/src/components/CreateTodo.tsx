import { useId, useState, type KeyboardEventHandler } from "react"
import { useTodo } from "../hooks/useTodo"


export const CreateTodo: React.FC = () => {

    const [text, setText] = useState('')
    const {createTodo} = useTodo()
    const todoId = useId()

    const handleEnterKey:  KeyboardEventHandler<HTMLInputElement> = (e) => {
        if (e.key === 'Enter' && text!== ''){
            createTodo({todo: {
                id: `${todoId}-${text}`,
                completed: false,  
                order: 1, 
                title: text
            }})
            setText('')
        }
    }

    return (
        <div>
            <input 
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={handleEnterKey}
            />
        </div>
    )
}