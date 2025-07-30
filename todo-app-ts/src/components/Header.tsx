import { CreateTodo } from "./CreateTodo"


export const Header: React.FC = () => {

    return (
        <header
            className="header"
        >
            <h1>ToDo App</h1>
            <CreateTodo/>
        </header>
    )
}