import type React from "react";
import { useState } from "react";
import { createTodo } from "../services/todoService";
import { useFilter } from "../hooks/useFilter";


export const CreateTodo: React.FC = () => {

    const [text, setText] = useState('')
    const { syncTodos } = useFilter()


    const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
        if (e.key !== 'Enter')
            return
        if (text === '')
            return

        createTodo({
            id: `newTodoRegistered-${text}`,
            completed: false,
            title: text
        })
            .then(response => {
                if (response.state) {
                    syncTodos({ todos: response.todos })
                    setText('')
                }
            })
    }


    return (
        <>
            <input
                value={text}
                onChange={(e) => setText(e.target.value)}
                type="text"
                placeholder="Escribe una nueva tarea"
                className="new-todo"
                onKeyDown={handleKeyDown}
                autoFocus
            />
        
        </>
    )
    
}