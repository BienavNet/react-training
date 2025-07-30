import type { TodoList, Todo } from "../types"

const API_URL = 'https://api.jsonbin.io/v3/b/686aa5478960c979a5b81b89'
const API_KEY = '$2a$10$aZr16/NCFhdwWCNFGftbseTj/H8vzpcXlVo4i7kDI44V60ZXRlbdu'
const HEADERS = {
    'Content-Type': 'application/json',
    'X-Master-Key': API_KEY
}

interface Action {
    state: boolean
    todos: TodoList
}

const request = async (method: string = 'GET', body: string | undefined = undefined) : Promise<Response | null> => {

    const response = await fetch(API_URL, {
        headers: HEADERS,
        method: method,
        body: body
    })

    if (!response.ok){
        console.log('Error al obtener los todos.')
        return null
    }

    return response
}

export const clearTodosCompleted = async () : Promise<Action> => {
    const records = await fetchAll()
    const filteredRecords = records.filter(record => record.completed == false)

    const response = await request('PUT', JSON.stringify(filteredRecords))

    return {
        state: response !== null,
        todos: response !== null ? filteredRecords : records
    }
}

export const updateTodoCompleted = async (newState: boolean) : Promise<Action> => {
    const records = await fetchAll()
    const updatedRecords = records.map( record => ({...record, completed: newState}))

    const response = await request('PUT', JSON.stringify(updatedRecords))

    return {
        state:  response !== null, 
        todos: response !== null ? updatedRecords : records
    }
}

export const fetchAll = async () : Promise<TodoList> => {
    const response = await request()

    if (response === null)
        return []

    const {record: todos} = await response.json() as {record: TodoList}
    return todos
}

export const createTodo = async (todo: Todo) : Promise<Action> => {
    const records = await fetchAll()
    records.push(todo)
    
    const response = await request('PUT', JSON.stringify(records))

    if (response === null)
        records.pop()
    

    return {
        state: response !== null ? true : false,
        todos: records
    }
}

export const updateTodo = async (id: string, todo: Todo) : Promise<Action> => {
    const records = await fetchAll()
    const filteredRecords = records.filter(todo => todo.id != id)
    filteredRecords.push(todo)

    const response = await request('PUT', JSON.stringify(filteredRecords))

    return {
        state: response !== null ? true : false,
        todos: response !== null ? filteredRecords : records
    }
}

export const deleteTodo = async (id: string) : Promise<Action> => {
    const records = await fetchAll()

    const filteredRecords = records.filter(todo => todo.id !== id)

    const response = await request('PUT', JSON.stringify(filteredRecords))

    return {
        state: response !== null ? true : false,
        todos: response !== null ? filteredRecords : records
    } 
}
