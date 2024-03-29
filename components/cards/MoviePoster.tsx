import styles from './MoviePoster.module.scss'
import Image from 'next/image'

interface props {
    name: string;
    poster_path: string;
    isLargeRow: boolean;
    clickHandler: (name: string)=>void;
}

const MoviePoster = ({name, isLargeRow, poster_path, clickHandler}:props) => {
    return (
        <div onClick={()=>clickHandler(name)} className={styles.poster}>
            <span>
                <Image src={`https://image.tmdb.org/t/p/original/${poster_path}`} alt={name} height={isLargeRow?280:110} width={isLargeRow?180:190}  layout="intrinsic"/>
            </span>
        </div>
    )
}

export default MoviePoster
