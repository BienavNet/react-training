import { Footer } from "./components/Footer"
import { Header } from "./components/Header"
import { Todos } from "./components/Todos"
import { useFilter } from "./hooks/useFilter"
import 'todomvc-app-css/index.css'

function App() {

  const { todos } = useFilter()

  return (
    <>
      <section className="todoapp">
        <Header />
        <Todos
          todos={todos}
        />
        <Footer />

      </section>
    </>


  )
}

export default App
