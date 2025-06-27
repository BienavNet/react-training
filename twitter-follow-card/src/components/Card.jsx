import { useState } from "react"
import '../css/Card.css'

function Card({ username, name, following }) {
    const [isfollowing, setIsFollowing] = useState(following)

    const textButton = isfollowing ? "Siguiendo" : "Seguir"

    const btnOnClick = () => {
        setIsFollowing(!isfollowing)
    }


    return (
        <div className="container">
            <div>
                <img
                    src={`https://unavatar.io/${username}`}
                    alt={username}
                />
                <div className="text">
                    <strong>{name}</strong>
                    <span>@{username}</span>
                </div>
            </div>
            <button
                onClick={btnOnClick}
                className={isfollowing ? "notFollowing" : "isFollowing"}
            >
                <span className="following">{textButton}</span>
                <span className="stopFollow">Dejar de seguir</span>
            </button>
        </div>
    )


}

export default Card