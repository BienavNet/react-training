const API_KEY = 'aab883d2'
const URL_BASE = 'http://www.omdbapi.com/'

export async function getMovies(query) {
    try {
        const response = await fetch(`${URL_BASE}?s=${query}&apikey=${API_KEY}`)
        const json = await response.json()

        return json?.Search?.map(value => (
            {
                id: value.imdbID,
                title: value.Title,
                year: value.Year,
                img: value.Poster
            }
        ))
    } catch (error) {
        console.log(error)
        return undefined
    }
}
