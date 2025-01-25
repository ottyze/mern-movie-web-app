import React, { useState, useEffect } from "react";
import { IoIosEye, IoIosHeart } from "react-icons/io";
import "./Card.css";

/**
 * @param {number} seconds
 */
function calculateRuntime(seconds) {
    const minutes = (seconds / 60) % 60;
    const hours = Math.floor(seconds / 60 / 60);

    return `${hours}h ${minutes}m`
}

export function UserCard({ movie, email, refreshLikedMovies }) {
    const [fallback, setFallback] = useState(false);
    useEffect(() => {
        setFallback(false);
    }, [movie]);

    const unlikeMovie = async () => {
        try {
            console.log("email_card.js", email);
            const response = await fetch('http://localhost:3030/unlike', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({
                    email,
                    movieId: movie._id,
                }),
            });

            if (!response.ok) {
                const { message } = await response.json();
                throw new Error(message || 'Failed to remove movie from favorites');
            }

            alert('Movie removed from favorites!');

            if (refreshLikedMovies) {
                refreshLikedMovies();
            }

        } catch (err) {
            console.error("Error removing from favorites:", err);
            alert(err.message);
        }
    };

    return (
        <div className="movie-card">
            {!fallback && (
                <img
                    className="thumbnail"
                    src={movie.info.image_url}
                    alt={`${movie.title} Thumbnail`}
                    onError={() => setFallback(true)}
                />
            )}
            {fallback && <div className="fallback"></div>}
            <div className="content">
                <p className="title">{movie.title}</p>
                <div className="info">
                    <p className="rating">
                        Rating: <span>{movie.info.rating ?? "Unknown"}</span>
                    </p>
                    <p className="duration">
                        Duration:{" "}
                        <span>
                            {calculateRuntime(movie.info.running_time_secs)}
                        </span>
                    </p>
                </div>
                <div className="buttons">
                    <button>
                        <IoIosEye className="icon" size={20} color="#000000" />
                        <p>View Movie</p>
                    </button>

                    <button onClick={unlikeMovie}>
                        <IoIosHeart
                            className="icon"
                            size={20}
                            color="#000000"
                        />
                        <p>Remove from Favorites</p>
                    </button>
                </div>
            </div>
        </div>
    );
}

/**
 * @typedef {import("../Movie.js").Movie} Movie
 */

/**
 * @typedef CardProps
 * @prop {Movie} movie
 */

/**
 *
 * @param {CardProps} props
 * @returns
 */
export default function Card({ movie, email, refreshLikedMovies }) {
    const [fallback, setFallback] = useState(false);


    const likeMovie = async () => {
        try {
            console.log("email_card.js", email);
            const response = await fetch('http://localhost:3030/like', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({
                    email,
                    movieId: movie._id,
                }),
            });

            if (!response.ok) {
                const { message } = await response.json();
                throw new Error(message || 'Failed to add movie to favorites');
            }

            alert('Movie added to favorites!');

            if (refreshLikedMovies) {
                refreshLikedMovies();
            }

        } catch (err) {
            console.error("Error adding to favorites:", err);
            alert(err.message);
        }
    };

    return (
        <div className="movie-card">
            {!fallback && (
                <img
                    className="thumbnail"
                    src={movie.info.image_url}
                    alt={`${movie.title} Thumbnail`}
                    onError={() => setFallback(true)}
                />
            )}
            {fallback && <div className="fallback"></div>}
            <div className="content">
                <p className="title">{movie.title}</p>
                <div className="info">
                    <p className="rating">
                        Rating: <span>{movie.info.rating ?? "Unknown"}</span>
                    </p>
                    <p className="duration">
                        Duration:{" "}
                        <span>
                            {calculateRuntime(movie.info.running_time_secs)}
                        </span>
                    </p>
                </div>
                <div className="buttons">
                    <button>
                        <IoIosEye className="icon" size={20} color="#000000" />
                        <p>View Movie</p>
                    </button>

                    <button onClick={likeMovie}>
                        <IoIosHeart
                            className="icon"
                            size={20}
                            color="#000000"
                        />
                        <p>Add to Favorites</p>
                    </button>
                </div>
            </div>
        </div>
    );
}
