import { useFilter } from "../hooks/useFilter"

export const Filter: React.FC = () => {

    const {dispatchAll, dispatchCompleted, dispatchPending} = useFilter()

    return (
        <div style={{
            display: "flex",
            flexDirection: 'row',
            justifyContent: "space-between",
            alignItems: "center"
        }}>
            <button onClick={dispatchAll}>todos</button>
            <button onClick={dispatchCompleted}>Completados</button>
            <button onClick={dispatchPending}>Pendientes</button>
        </div>
    )
}