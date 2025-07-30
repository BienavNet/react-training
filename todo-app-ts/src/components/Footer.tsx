import { useFilter } from "../hooks/useFilter"
import { clearTodosCompleted } from "../services/todoService"



// const handleDispatchAll: React.MouseEventHandler<HTMLAnchorElement> = (e) => {
//     e.preventDefault()
//     dispatchAll()
// }

export const Footer: React.FC = () => {

    const { dispatchAll, dispatchComplete, dispatchPending, currentFilter, counter, syncTodos } = useFilter()

    const handleFilter = (filter: string) : string => {
        return filter == currentFilter ? 'selected' : ''
    }

    return (
        <footer className="footer">
            <span className="todo-count">ToDo Pendientes: <strong>{counter}</strong></span>
            <ul className="filters">
                <li>
                    <a
                        href="#"
                        className={handleFilter('ALL')}
                        onClick={e => {
                            e.preventDefault()
                            dispatchAll()
                        }}>
                        Todos
                    </a>
                </li>
                <li>
                    <a
                        className={handleFilter('PENDING')}
                        onClick={(e) => {
                            e.preventDefault()
                            dispatchPending()
                        }}
                        href="#">Pendientes
                    </a>
                </li>
                <li>
                    <a
                        className={handleFilter('COMPLETE')}
                        onClick={e => {
                            e.preventDefault()
                            dispatchComplete()
                        }}
                        href="#">
                        Completadas
                    </a>
                </li>
            </ul>
            <button 
                className="clear-completed"
                onClick={() => clearTodosCompleted().then(res =>  {
                    if (res.state)
                        syncTodos(res)
                })}
            >
                <small>Limpiar Completadas</small>
            </button>

        </footer>
    )
}