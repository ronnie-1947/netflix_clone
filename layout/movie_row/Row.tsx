import styles from './Row.module.scss'

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


const Row = ({ title, movies, isLargeRow }: Props) => {

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
                            />
                        )
                    })
                }
            </div>

        </div>
    )
}

export default Row
