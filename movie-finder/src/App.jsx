import Search from "./components/Search.jsx"
import Movies from "./components/Movies.jsx"
import { useMovie } from "./hooks/useMovie.js"

function App() {


  const {loadMovies, loading, movies, setSort} = useMovie()

  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
      margin: "30px 0"
    }}>
      <div>
        <h3>BUSCADOR DE PELICULAS</h3>
      </div>
      <Search
        setMovies={loadMovies}
        setSort={setSort}
      ></Search>


      { loading && <div><p>Cargando...</p></div> }

      { movies && !loading && <Movies movies={movies}></Movies>}
      
      

    </div>
  )
}

export default App
