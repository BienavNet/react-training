import { filterReducer, type filterOptions } from "../reducers/filterReducer";

import { createContext, useEffect, useReducer, useState, type ReactNode } from "react";
import type { TodoList } from "../types";
import { fetchAll } from "../services/todoService";

interface ContextType {
    dispatchAll: () => void
    dispatchComplete: () => void
    dispatchPending: () => void
    syncTodos: ({todos}: {todos: TodoList}) => void
    todos: TodoList
    currentFilter: filterOptions, 
    counter: number
}

interface ProviderProps {
    children: ReactNode
}

const filterDispatcher = () => {

    const [todos, setTodos] = useState<TodoList>([])

    const [state, dispatch] = useReducer(filterReducer, { filter: 'ALL', todos: todos })
    const { todos: filteredTodos } = state
    const pendingTodosCounter = todos.filter(todo => todo.completed==false).length

    useEffect(() => {
        fetchAll()
            .then(res => {
                setTodos(res)
                dispatch({
                    type: 'ALL',
                    payload: {
                        todos: res
                    }
                })
            })
    }, [])

    const syncTodos = ({todos}: {todos: TodoList}) => {
        setTodos(todos)
        dispatch({
            type: state.filter, 
            payload: {
                todos:  todos
            }
        })
    }

    const dispatchAll = () => {
        dispatch({
            type: 'ALL',
            payload: {
                todos: todos
            }
        })
    }

    const dispatchComplete = () => {
        dispatch({
            type: 'COMPLETE',
            payload: {
                todos: todos
            }
        })
    }

    const dispatchPending = () => {
        dispatch({
            type: 'PENDING',
            payload: {
                todos: todos
            }
        })
    }

    return { filteredTodos, dispatchAll, dispatchComplete, dispatchPending, syncTodos, currentFilter: state.filter, counter: pendingTodosCounter }
}

export const FilterContext = createContext<ContextType | undefined>(undefined)

export const FilterProvider = ({ children }: ProviderProps) => {

    const { filteredTodos, dispatchAll, dispatchComplete, dispatchPending, syncTodos, currentFilter, counter } = filterDispatcher()

    return (
        <FilterContext.Provider
            value={{
                dispatchAll,
                dispatchComplete,
                dispatchPending,
                syncTodos,
                todos: filteredTodos,
                currentFilter,
                counter
            }}
        >
            {children}
        </FilterContext.Provider>
    )

}