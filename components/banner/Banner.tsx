import React, { useState } from 'react'
import styles from './Banner.module.scss'

import Youtube from 'react-youtube'
import movieTrailer from 'movie-trailer'

interface Movies {
    title: string | undefined;
    name: string | undefined;
    original_name: string | undefined;
    overview: string;
    backdrop_path: string;
}

interface Props {
    movie: Movies;
}

import Backdrop from '../backdrop/Backdrop'

const opts:any = {
    playerVars: {
        autoplay:1
    }
}

const Banner = ({ movie }: Props) => {

    const [backdrop, setBackdrop] = useState(false)
    const [trailerUrl, setTrailerUrl] = useState<null|string>(null)

    const truncate = (str: string, n: number) => {
        return str?.length > n ? str.substr(0, n - 1) + '...' : str
    }

    const clickHandler = async () => {
        if(!movie)return
        const movieName = movie.name ? movie.name : movie.title ? movie.title : movie.original_name ? movie.original_name : null

        const trailer:(string|null) = await movieTrailer(movieName)
       
        if(!trailer)setTrailerUrl('')

        const urlParams = new URLSearchParams(new URL(trailer).search)
        setTrailerUrl(urlParams.get('v'))
        setBackdrop(true)
    }

    const closeBackdrop = (event:any)=>{
        const targetId = event.target.getAttribute('id')
        if(!targetId)return
        
        setBackdrop(false)
    }

    return (
        <React.Fragment>
            <Backdrop closeHandler = {closeBackdrop} active={backdrop}>
                <span className={styles.player}>
                    <Youtube
                        videoId={trailerUrl}
                        opts={opts}
                    />
                </span>
            </Backdrop>
            <header style={{

                backgroundImage: `url("https://image.tmdb.org/t/p/original${movie?.backdrop_path}")`,

            }} className={styles.banner}>

                <div className={styles.banner__contents}>
                    <h1 className={styles.banner__title} >{movie?.title || movie?.name || movie?.original_name}</h1>

                    <div className={styles.banner__btns}>
                        <button onClick={clickHandler} className={styles.banner__btn}>Play</button>
                        <button className={styles.banner__btn}>My List</button>
                    </div>

                    <p className={styles.banner__description}>{movie ? truncate(movie.overview, 150) : null}</p>
                </div>

                <div className={styles.banner__fadeBottom}></div>

            </header>
        </React.Fragment>
    )
}

export default Banner
