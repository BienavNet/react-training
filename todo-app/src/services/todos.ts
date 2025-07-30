import type { Todo, TodoList } from "../types"

const API_LINK = 'https://api.jsonbin.io/v3/b/686880d68a456b7966bb8bc8'
const API_KEY = '$2a$10$aZr16/NCFhdwWCNFGftbseTj/H8vzpcXlVo4i7kDI44V60ZXRlbdu'
const HEADERS = {
    'Content-Type': 'application/json',
    'X-Master-Key': API_KEY
}

export const fetchAllTodo = async (): Promise<TodoList> => {
    const res = await fetch(API_LINK, {
        headers: HEADERS
    })

    if (!res.ok) {
        console.log("No se pudieron obtener las tareas TODO")
        return []
    }
    const { record: todos } = await res.json() as { record: TodoList }
    return todos
}

export const updateTodos = async (todo: Todo): Promise<boolean> => {

    const allTodos = await fetchAllTodo()
    allTodos.push(todo)

    const res = await fetch(API_LINK, {
        headers: HEADERS,
        method: 'PUT',
        body: JSON.stringify(allTodos)
    })

    return res.ok
}