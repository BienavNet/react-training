import '../styles/movies.css'

function Movies({ movies }) {
    return movies.length > 0 ? (
        <div className="moviesContainer">
            {movies?.map(movie => (
                <Movie
                    key={movie.id}
                    movie={movie}
                >
                </Movie>
            ))}
        </div>
    ) :
    (
        <div><p>No se encontraron elementos para esta busqueda.</p></div>
    )
}


function Movie({ movie }) {
    return (
        <div id={movie.id}>
            <img src={movie.img} alt={movie.title} />
            <span>{movie.title}</span>
            <span>{movie.year}</span>
        </div>
    )
}

export default Movies