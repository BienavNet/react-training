import { updateTodos } from "../services/todos"
import type { Todo } from "../types"
import { useFilter } from "./useFilter"


interface setProps {
    todo: Todo
}


export const useTodo = () => {

    const {refreshTodos} = useFilter()

    const createTodo = ( { todo }: setProps) => {
        if (!todo)
            return

        updateTodos(todo)
            .then(res => {
                if (res)
                    refreshTodos()
            })
    }
    return {createTodo}
}