export interface Todo {
    id: string
    title: string
    completed: boolean
}

export type TodoList = Array<Todo>