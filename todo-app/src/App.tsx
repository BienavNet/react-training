
import { CreateTodo } from "./components/CreateTodo"
import { Filter } from "./components/Filter"
import { Todos } from "./components/Todos"
import { useFilter } from "./hooks/useFilter"

export default function App() {

  const {todos} = useFilter()

  return (
    <div className="todoapp">
      <CreateTodo></CreateTodo>
      <Filter></Filter>
      <Todos
        todos={todos}
      >
      </Todos>
      
    </div>
  )
}