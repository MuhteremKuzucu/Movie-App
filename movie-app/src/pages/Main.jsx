import React, { useContext } from 'react'
import { FilmContext } from '../context/MovieContext'
import MovieCard from '../components/MovieCard'

const Main = () => {

  const{filmler}=useContext(FilmContext)

  return (
    <div className='flex justify-center flex-wrap'>
      {filmler.map((film)=> <MovieCard key={film.id} {...film}/>)}
    </div>
  )
}

export default Main