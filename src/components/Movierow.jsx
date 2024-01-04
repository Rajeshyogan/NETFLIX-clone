import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react';
import Movieitem from './Movieitem';
import { FaAngleRight, FaAngleLeft } from 'react-icons/fa6';
import { Profile } from '../pages';

const Movierow = ({ title, url }) => {
  const [moviedata, setMovieData] = useState([]);
  const sliderRef = useRef(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await axios.get(url);
        setMovieData(data.results);
      } catch (error) {
        if (error.response && error.response.status === 404) {
          console.log('Resource not found', error.message);
        } else {
          console.error('An error occurred:', error.message);
        }
      }
    }
    fetchData();
  }, [url]);

  const slide = (offset) => {
    if (sliderRef.current) {
      sliderRef.current.scrollLeft += offset;
    }
  };

  return (
    <>
      <h2 className='p-4 capitalize md:text-xl font-nsans-bold'>{title}</h2>

      <div className='relative flex items-center group'>
        <FaAngleLeft
        size={23}
          onClick={() => slide(-500)}
          className='bg-white rounded-full absolute left-2 opacity-80 text-gray-700 z-10 hidden group-hover:block cursor-pointer'
        />
        <div ref={sliderRef} className='w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide'>
          {moviedata.map(({ backdrop_path, title, id, poster_path }) => (
             <Movieitem image={backdrop_path} title={title} key={id} altimg={poster_path} />
          ))}
        </div>
        <FaAngleRight
        size={23}
          onClick={() => slide(500)}
          className='bg-white rounded-full absolute right-2 opacity-80 text-gray-700 z-10 hidden group-hover:block cursor-pointer'
        />
      </div>
    </>
  );
};

export default Movierow;
