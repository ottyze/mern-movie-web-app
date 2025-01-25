import React, { useContext, useEffect, useState } from "react";
import { useAppContext } from './AppContext';
import Card from './Card'
import { UserCard } from "./Card";

/**
 * @typedef {import("../Movie").Movie} Movie
 */

/**
 *
 * @param {{movies: Movie[], genre: string}} param0
 * @returns JSX.Element
 */
function Genre({ movies, genre, email, refreshLikedMovies }) {
    return (
        <>
            <h3 className="genre">{genre}</h3>
            <ul className="movie-container">
                {movies
                    .filter((m) => m.info.genres?.includes(genre))
                    .sort((a, b) => a.info.rating === undefined ? - 1000 : a.info.rating - b.info.rating)
                    .reverse()
                    .slice(0, 10)
                    .map((m) => (
                        <li>
                            <Card key={m._id} movie={m} email={email} refreshLikedMovies={refreshLikedMovies} />
                        </li>
                    ))}
            </ul>
        </>
    );
}

function UserAccount({ movies, email, refreshLikedMovies }) {
    return (
        <>
            <h3 className="genre">User Account</h3>
            <ul className="movie-container">
                {movies
                    .sort((a, b) => a.info.rating === undefined ? - 1000 : a.info.rating - b.info.rating)
                    .reverse()
                    .slice(0, 10)
                    .map((m) => (
                        <li>
                            <UserCard key={m._id} movie={m} email={email} refreshLikedMovies={refreshLikedMovies}/>
                        </li>
                    ))}
            </ul>
        </>
    );
}

// this is sample jsx that i used to style the genres and movie lists
function GenresContainer() {
    /**
     * @type {[MovieInfo[], React.Dispatch<React.SetStateAction<MovieInfo[]>>]}
     */
    const [movies, setMovies] = useState([]);
    const [genres, setGenres] = useState([]);
    const [likedMovies, setLikedMovies] = useState([]);
    const { userEmail } = useAppContext();
    console.log(movies)

    async function fetchGenres() {
        try {
            const response = await fetch("http://localhost:3030/genres", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
            });

            if (!response.ok) {
                throw new Error("Failed to fetch genres");
            }

            const data = await response.json();
            setGenres(data);
        } catch (err) {
            console.error("Error fetching genres:", err);
        }
    }

    async function fetchMovies() {
        try {
            const response = await fetch("http://localhost:3030/movies", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
            });

            if (!response.ok) {
                throw new Error("Failed to fetch movies");
            }

            const data = await response.json();
            setMovies(data);
        } catch (err) {
            console.error("Error fetching movies:", err);
        }
    }

    async function fetchLikedMovies() {
        try {
            console.log("userEmail_movies.js", userEmail);
            const response = await fetch("http://localhost:3030/likedMovies", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: 'include',
                body: JSON.stringify({ userEmail }),
            });

            if (!response.ok) {
                throw new Error("Failed to fetch liked movies");
            }

            const data = await response.json();
            setLikedMovies(data); // Update state with liked movies
        } catch (err) {
            console.error("Error fetching liked movies:", err);
        }
    }

    useEffect(() => {
        fetchGenres();
        fetchMovies();
        fetchLikedMovies();
    }, []);

    return (
        <div className="genre-container">
            {userEmail && (<UserAccount key={userEmail} movies={likedMovies} email={userEmail} refreshLikedMovies={fetchLikedMovies} />)}
            {genres.map((genre) => (
                <Genre movies={movies} genre={genre} email={userEmail} refreshLikedMovies={fetchLikedMovies} />
            ))}
        </div>
    );
}
export default GenresContainer;
