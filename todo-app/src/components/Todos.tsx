import { Todo } from "./Todo";
import { type TodoList } from "../types";

interface Props {
    todos: TodoList
}

export const Todos : React.FC<Props> = ({todos}) => {
    return (
        <ul className="todo-list">
            {todos?.map(todo => (
                <Todo
                    completed={todo.completed}
                    id={todo.id}
                    order={todo.order}
                    title={todo.title}
                    key={todo.id}
                >

                </Todo>
            ))}


        </ul>
    )
}