import axios from 'axios'
import React, { useEffect, useState } from 'react'
import database, { createimage } from "../Services/MovieSerives"

const Hero = () => { 

const[movie,setMovie]=useState({})

useEffect(()=>{
  async function apidata(){
    let {data} = await axios.get(database.popular);
    let movies=data.results[Math.floor(Math.random() * data.results.length)]
    setMovie(movies)
  }
  apidata()
},[])
// console.log(movie);

let {backdrop_path,title,overview,release_date}=movie

  return (
    <div className='w-full h-[550px] '>
      <div className='w-full h-full'>
        <div className='w-full absolute h-[550px] bg-gradient-to-r from-black'/>
          <img src={createimage('original',backdrop_path)} alt="" className='w-full h-full object-cover object-top'/>

          <div className='absolute top-[30%] md:top-[32%] lg:top-[30%] p-4 md:p-8 max-w-[100%] md:max-w-[70%] lg:max-w-[50%]'>
            <h1 className='text-3xl md:text-5xl '>{title && title.length > 40 ? `${title.slice(0, 40)}...` : title}</h1>
            <div className='mt-4 mb-3'>
              <button className='mr-4 bg-slate-200 text-black px-2 py-1'>Play</button>
              <button className='bg-gray-600 px-2 py-1 rounded'>Water Later</button>
            </div>
            <p className='mb-2'>{release_date}</p>
            <p className=''>{overview ? overview.slice(0,140)+"...": ""}</p>
          </div>
      </div>
    </div>
  )
}

export default Hero