import { createContext, useEffect, useReducer, useState, type ReactNode } from "react";
import { filterReducer, initialState } from "../reducer/useFilterReducer";
import type { TodoList } from "../types";
import { fetchAllTodo } from "../services/todos";

interface ContextType {
    dispatchAll: () => void
    dispatchPending: () => void
    dispatchCompleted: () => void
    refreshTodos: () => void
    todos: TodoList
}

interface FilterProviderProps {
    children: ReactNode
}


const filterDispatcher = () => {
    const [state, dispatch] = useReducer(filterReducer, initialState)
    const [tasks, setTasks] = useState<TodoList>([])
    const { todos: filteredTodos } = state

    const refreshTodos = () => {
        fetchAllTodo()
            .then(res => {

                dispatch({
                    type: state.filter,
                    payload: {
                        todos: res
                    }
                })
                // setTasks(res)
            })
    }

    useEffect(() => {
        fetchAllTodo()
            .then(res => {
                setTasks(res)
            })
    }, [])

    const dispatchAll = () => {
        dispatch({
            type: 'ALL',
            payload: {
                todos: tasks
            }
        })
    }

    const dispatchCompleted = () => {
        dispatch({
            type: 'COMPLETE',
            payload: {
                todos: tasks
            }
        })
    }

    const dispatchPending = () => {
        dispatch({
            type: 'PENDING',
            payload: {
                todos: tasks
            }
        })
    }

    return { filteredTodos, dispatchAll, dispatchCompleted, dispatchPending, refreshTodos }
}


export const FilterContext = createContext<ContextType | undefined>(undefined)

export const FilterProvider = ({ children }: FilterProviderProps) => {

    const { dispatchAll, dispatchCompleted, dispatchPending, filteredTodos, refreshTodos } = filterDispatcher()

    return (
        <FilterContext.Provider
            value={{
                dispatchAll,
                dispatchCompleted,
                dispatchPending,
                refreshTodos,
                todos: filteredTodos
            }}
        >
            {children}
        </FilterContext.Provider>
    )

}