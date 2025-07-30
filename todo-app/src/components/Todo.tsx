import { type Todo as TodoType } from "../types"

type Props = TodoType

export const Todo : React.FC<Props> = ( {id, order, title, completed} ) => {


    return (
        <>
            <div className="view">
                <label>{title}</label>
                <button className="destroy"></button>
            </div>
            <input 
                type="text" 
                className="edit"
            />
        </>
    )
}