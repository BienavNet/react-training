import type { TodoList } from "../types"

export type filterOptions = keyof typeof ACTIONS

export const ACTIONS = {
    ALL: 'ALL',
    COMPLETE: 'COMPLETE',
    PENDING: 'PENDING'
}

export interface State {
    filter: filterOptions,
    todos: TodoList
}

interface Action {
    type: filterOptions,
    payload: {
        todos: TodoList
    }
}


const DO_ACTION = {
    [ACTIONS.ALL]: (state: State, action: Action): State => {
        const {todos} = action.payload
        return {
            filter: 'ALL',
            todos
        }
    }, 
    [ACTIONS.COMPLETE]: (state: State, action: Action): State => {
        const {todos} = action.payload

        if (!todos)
            return {
                filter: "COMPLETE",
                todos
            }

        const filteredTodos = todos.filter(todo => todo.completed === true)

        return {
            filter: 'COMPLETE',
            todos: filteredTodos
        }

    }, 
    [ACTIONS.PENDING]: (state: State, action: Action): State => {
        const {todos} = action.payload

        if (!todos)
            return {
                filter: 'PENDING',
                todos
            }
        
        const filteredTodos = todos.filter(todo => !todo.completed)

        return {
            filter: 'PENDING', 
            todos: filteredTodos
        }
    }
}

export const filterReducer = (state: State, action: Action): State => {
    const {type: actiontype} = action

    const actionFunction = DO_ACTION[actiontype]

    return actionFunction ? actionFunction(state, action) : state
}

