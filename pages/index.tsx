import { Fragment } from 'react'
import Head from 'next/head'
import axios from '../lib/axios'

interface Movies {
  title: string | undefined;
  name: string | undefined;
  overview: string;
  backdrop_path: string;
  first_air_date: string;
  original_name: string;
  genre_ids: number[];
  poster_path: string;
  id: string;
}

interface MovieData {
  data: {
    page: number;
    results: Movies[]
  }
}

interface Props {
  allMovies: {
    fetchTrending: Movies[]
    fetchTopRated: Movies[]
    fetchNetflixOriginals: Movies[]
    fetchActionMovies: Movies[]
    fetchComedyMovies: Movies[]
    fetchHorrorMovies: Movies[]
    fetchRomanceMovies: Movies[]
    fetchDocumentaries: Movies[]
  };
  banner: Movies
}

import requests from '../lib/request_urls'

import Row from '../layout/movie_row/Row'
import Banner from '../components/banner/Banner'
import Nav from '../components/nav/Nav'


export default function Home({allMovies, banner}:Props) {
  return (
    <Fragment>
      <Nav/>
      <Banner movie={banner}/>
      <Row title='NETFLIX ORIGINALS' isLargeRow={true} movies={allMovies.fetchNetflixOriginals} />
      <Row title='TRENDING NOW' isLargeRow={false} movies={allMovies.fetchTrending} />
      <Row title='ACTION MOVIES' isLargeRow={false} movies={allMovies.fetchActionMovies} />
      <Row title='COMEDY MOVIES' isLargeRow={false} movies={allMovies.fetchComedyMovies} />
      <Row title='HORROR MOVIES' isLargeRow={false} movies={allMovies.fetchHorrorMovies} />
      <Row title='ROMANCE MOVIES' isLargeRow={false} movies={allMovies.fetchRomanceMovies} />
      <Row title='DOCUMENTARIES' isLargeRow={false} movies={allMovies.fetchDocumentaries} />
    </Fragment>
  )
}

export async function getServerSideProps() {

  const allMovies:any = {}

  for (const keys in requests) {
    const { data }: MovieData = await axios.get(requests[keys])
    allMovies[keys] = data.results
  }

  const banner = allMovies.fetchTrending[Math.floor(Math.random() * (allMovies.fetchTrending.length - 1))]
  
  return {
    props: {
      allMovies,
      banner
    }
  }
}