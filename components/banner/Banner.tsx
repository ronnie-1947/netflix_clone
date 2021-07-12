import React from 'react'
import styles from './Banner.module.scss'

interface Movies {
    title: string | undefined;
    name: string | undefined;
    original_name: string | undefined;
    overview: string;
    backdrop_path: string;
}

interface Props {
    movies: Movies[];
}

const Banner = ({ movies }: Props) => {

    const movie = movies[Math.floor(Math.random() * movies.length - 1)]

    return (
        <header style={{
            backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
            backgroundSize: 'cover',
            backgroundPosition: 'center center'
        }}>

            <div className={styles.banner__contents}>
                <h1>{movie?.title || movie?.name || movie?.original_name}</h1>

                <div className={styles.banner__btns}>
                    <button className={styles.banner__btn}>Play</button>
                    <button className={styles.banner__btn}>My List</button>
                </div>

                <p className={styles.banner__description}>{movie?.overview}</p>
            </div>

        </header>
    )
}

export default Banner
