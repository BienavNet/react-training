export interface Todo {
    id: string
    title: string
    completed: boolean
    order: number
}

export type TodoList = Todo[]