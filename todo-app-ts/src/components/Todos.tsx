import type React from "react";
import type { TodoList } from "../types";
import { Todo } from "./Todo";
import { useState } from "react";
import { updateTodoCompleted } from "../services/todoService";
import { useFilter } from "../hooks/useFilter";

interface Props {
    todos: TodoList
}

export const Todos: React.FC<Props> = ({todos}) => {

    const [checked, setChecked] = useState<boolean>(false)
    const {syncTodos} = useFilter()


    return (
        <section className="main">
            <input 
                id="toggle-all" 
                className="toggle-all" 
                type="checkbox" 
                checked={checked}
                onChange={e => {
                    console.log(e.target.checked)
                    setChecked(e.target.checked)
                    updateTodoCompleted(e.target.checked)
                        .then(res => {
                            console.log(res)
                            if (res.state)
                                syncTodos(res)
                        })

                }}
            />
			<label htmlFor="toggle-all">Mark all as complete</label>

            <ul className="todo-list">
                {
                    todos.map(todo=> (
                        <Todo
                            key={todo.id}
                            todo={todo}
                        />
                    ))
                }
            </ul>
        </section>
    )
}