import React from 'react'
import Hero from '../components/Hero'
import Movierow from '../components/Movierow'
import database from '../Services/MovieSerives'

const Home = () => {
  return (
    <div>
      <Hero/>
      <Movierow title="upcoming" url={database.upcoming}/>
      <Movierow title="trending" url={database.trending}/>
      <Movierow title="toprated" url={database.toprated}/>
      <Movierow title="comedy"  url={database.comedy}/>
      <Movierow title="popular" url={database.popular}/>
    </div>
  )
}

export default Home