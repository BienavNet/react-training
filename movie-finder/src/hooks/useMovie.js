import { useState } from "react";
import { getMovies } from "../services/Movies.js";
import { useRef } from "react";
import { useCallback } from "react";
import { useMemo } from "react";

export function useMovie() {

    const [movies, setMovies] = useState([])
    const [sort, setSort ] = useState(false)
    const [loading, setLoading] = useState(false)
    const prevSearch = useRef('')


    const loadMovies = useCallback( async ({ search }) => {

        if (prevSearch.current === search) return
        if (search === "") {
            setMovies([])
            return
        }
        
        // if (prevSearch.current === '') return
        try {
            prevSearch.current = search
            setLoading(true)
            const gotMovies = await getMovies(search)
            setMovies(gotMovies)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }, [])

    const sortMovies = useMemo(() => {
        if (!movies) return
        return sort ?
            [...movies].sort((a, b) => a.title.localeCompare(b.title))
            : movies
    }, [sort, movies])

    return {movies: sortMovies, loadMovies, loading, setSort}

}