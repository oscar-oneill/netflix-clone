import React, { useState, useEffect } from 'react'
import axios from '../axios'
import YouTube from 'react-youtube'
import '../styles/Row.css'
import movieTrailer from 'movie-trailer'
const baseURL = 'https://image.tmdb.org/t/p/original/';

const Row = ({title, fetchURL, isLargeRow}) => {
    const [movies, setMovies] = useState([]);
    const [trailerURL, setTrailerURL] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            const request = await axios.get(fetchURL);
            setMovies(request.data.results);
            return request;
        }
        fetchData();
    }, [fetchURL]);

    const opts = {
        height: '390',
        width: '100%',
        playerVars: {
            autoplay: 1
        }
    }

    const handleClick = (movie) => {
        if (trailerURL) {
            setTrailerURL("");
        } else {
           movieTrailer(movie?.name || "", {id: true, multi: true})
            .then((url) => {
                console.log(url)
                // const urlParams = new URLSearchParams(new URL(url).search);
                // setTrailerURL(urlParams.get("v"))
            })
            .catch((err) => {
                console.log(err)
            })
        }
    }

    return (
        <div className="row">
            <h2>{title}</h2>

            <div className="row_posters">
                {movies.map((movie) => (
                    <img 
                        className={`row_poster ${isLargeRow && 'row_poster_lg'}`}
                        onClick={handleClick(movie)}

                        key={movie.id} 
                        src={`${baseURL}${isLargeRow ? movie.poster_path : movie.backdrop_path}`} 
                        alt={movie.name}
                    />
                ))}
            </div>
            
            {trailerURL && <YouTube videoId={trailerURL} opts={opts}/>}
        </div>
    )
}

export default Row
