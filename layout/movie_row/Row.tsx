import styles from './Row.module.scss'
import {useState} from 'react'

import Youtube from 'react-youtube'
import movieTrailer from 'movie-trailer'

import Poster from '../../components/cards/MoviePoster'

interface Movies {
    title: string|undefined;
    name: string|undefined;
    overview:string;
    backdrop_path: string;
    first_air_date: string;
    genre_ids: number[];
    poster_path: string;
    id:string;
}
interface Props {
    title: string;
    movies: Movies[];
    isLargeRow: boolean;
}

const opts:any = {
    height: "390",
    width: "100%",
    playerVars: {
        autoplay:1
    }
}

const Row = ({ title, movies, isLargeRow }: Props) => {
    
    const [trailerUrl, setTrailerUrl] = useState<null|string>(null)
    const [activeMovie, setActiveMovie] = useState<null|string>(null)

    const handleClick = async (movie: string)=>{
        if(trailerUrl && movie === activeMovie){
            setTrailerUrl(null)
            setActiveMovie(null)
        }else {
            try {
                
                const trailer:string = await movieTrailer(movie && movie)
                const urlParams = new URLSearchParams(new URL(trailer).search)
                setTrailerUrl(urlParams.get('v'))
                setActiveMovie(movie)
                
                
            } catch (error) {
                setActiveMovie(null)
                setTrailerUrl(null)
            }
        }
    }

    
    return (
        <div className={styles.row}>

            <h2>{title}</h2>

            <div className={styles.row__posters}>
                {
                    movies.map(movie=>{
                        
                        if(!isLargeRow && !movie.backdrop_path) return null
                        if(!movie.title && !movie.name)console.log(movie)

                        return (
                            <Poster 
                            key={movie.id} 
                            isLargeRow={isLargeRow} 
                            name={movie.title?movie.title:movie.name?movie.name:''}
                            poster_path={isLargeRow?movie.poster_path:movie.backdrop_path}
                            clickHandler={handleClick}
                            />
                        )
                    })
                }
            </div>
            {
                trailerUrl && (
                    <Youtube
                        videoId={trailerUrl}
                        opts={opts}
                    />
                )
            }
        </div>
    )
}

export default Row
