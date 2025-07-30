import React, { useState } from "react"
import type { Todo as TodoType } from "../types"
import { deleteTodo, updateTodo } from "../services/todoService"
import { useFilter } from "../hooks/useFilter"

interface Props {
    todo: TodoType
}

export const Todo: React.FC<Props> = ({ todo }) => {

    const [checked, setChecked] = useState(todo.completed)
    const [titleText, setTitleText] = useState(todo.title)
    const { syncTodos } = useFilter()

    const handleOnDeleteButton: React.MouseEventHandler<HTMLButtonElement> = () => {
        deleteTodo(todo.id)
            .then(res => {
                if (res.state)
                    syncTodos({ todos: res.todos })
            })
    }

    const handleOnUpdate: React.KeyboardEventHandler<HTMLInputElement> = (e) => {

        if (e.key !== 'Enter')
            return
        if (titleText === '')
            return

        updateTodo(todo.id, { completed: checked, title: titleText, id: todo.id })
            .then(res => {
                if (res.state)
                    syncTodos({ todos: res.todos })
            })
    }

    const handleCheckbocOnChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        setChecked(e.target.checked)
        updateTodo(todo.id, { completed: e.target.checked, title: titleText, id: todo.id })
            .then(res => {
                if (res.state)
                    syncTodos({ todos: res.todos })
            })
    }

    return (
        <li className={checked ? 'completed' : ''}>
            <div className="view">
                <input className="toggle" type="checkbox" checked={checked} onChange={handleCheckbocOnChange} />
                <label>{todo.title}</label>
                <button className="destroy" onClick={handleOnDeleteButton}></button>
            </div>
            <input className="edit" value={titleText} onChange={(e) => setTitleText(e.target.value)} onKeyDown={handleOnUpdate} />
        </li>
    )

}