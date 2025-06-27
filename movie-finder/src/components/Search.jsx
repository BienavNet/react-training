import { useSearch } from "../hooks/useSearch.js";
import debounce from "just-debounce-it";
import '../styles/search.css'
import { useCallback } from "react";


export default function Search({ setMovies, setSort }) {

    const { search, setSearch, error } = useSearch()

    const moviesDebounced = useCallback(
        debounce(mySearch => {
            setMovies({ search: mySearch })
        }, 600)
    , [setMovies])

    const handlerInput = (event) => {
        const text = event.target.value
        setSearch(text)
        moviesDebounced(text)
    }

    const btnOnClick = () => {
        if (error === null) {
            setMovies({ search })
        }

    }

    return (
        <div className="searchContainer">
            <div>
                <input type="text" onChange={handlerInput} value={search} />
                <small
                    style={{
                        display: error === null ? "none" : "block",
                        color: "red"
                    }}
                >{error}</small>
            </div>
            <div>
                <span>Ordenar</span>
                <input type="checkbox" name="sort" id="sort" onChange={(event)=> setSort(event.target.checked)} />
            </div>
            <div>
                <button onClick={btnOnClick}>Buscar</button>
            </div>
        </div>
    )
}