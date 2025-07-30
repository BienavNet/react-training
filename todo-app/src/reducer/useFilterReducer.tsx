import type { TodoList } from "../types";

type filterType = 'ALL' | 'PENDING' | 'COMPLETE'

interface State {
    filter: filterType
    todos: TodoList
}

interface Action {
    type: filterType,
    payload: {
        todos: TodoList
    } 
}

export const initialState : {filter: filterType, todos: TodoList} = {
    filter: 'ALL',
    todos: []
}

export const ACTIONS = {
    ALL: 'ALL',
    PENDING: 'PENDING', 
    COMPLETE: 'COMPLETE'
}

const FILTER_OPTIONS = {
    [ACTIONS.ALL]: (state: State, action: Action) : State => {
        const { todos } = action.payload
        return {
            filter: 'ALL',
            todos
        }
    },
    [ACTIONS.COMPLETE]: (state: State, action: Action): State => {
        const { todos } = action.payload
        const filtered = todos.filter(todo => todo.completed == true)
        return {
            filter: 'COMPLETE',
            todos: filtered
        }
    },
    [ACTIONS.PENDING]:  (state: State, action: Action): State => {
        const {todos} = action.payload
        const filtered = todos.filter(todo => !todo.completed)
        return {
            filter: 'PENDING',
            todos: filtered
        }
    }
}

export const filterReducer = (state: State, action: Action): State => {
    const {type: typeAction} = action
    const updateState = FILTER_OPTIONS[typeAction]
    return updateState ? updateState(state, action) : state
}