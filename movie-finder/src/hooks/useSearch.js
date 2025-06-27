import { useEffect } from "react"
import { useRef } from "react"
import { useState } from "react"

export function useSearch() {
    const [search, setSearch] = useState('')
    const [error, setError] = useState(null)
    const firstInput = useRef(true)

    useEffect(() => {
        if (firstInput.current){
            firstInput.current = search === ''
            return
        }

        if (search === ''){
            setError("El campo de búsqueda está vacío")
            return
        }

        if (search.length < 3){
            setError("El tamaño mínimo de búsqueda son 3 caracteres.")
            return
        }

        if (search.match(/^\d/)){
            setError("No puedes empezar buscando con un número.")
            return
        }

        setError(null)


    }, [search])

    return { search, setSearch, error}
}