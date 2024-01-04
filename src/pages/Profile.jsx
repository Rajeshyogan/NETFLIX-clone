import React, { useEffect, useRef, useState } from 'react';
import { firestore, auth } from '../Services/Firebase'; // Import Firebase Firestore and authentication
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import { createimage } from '../Services/MovieSerives';
import { AiOutlineCloseCircle} from "react-icons/ai"

const Profile = ({altimg}) => {
  const [userEmail, setUserEmail] = useState('');
  const [likedMovies, setLikedMovies] = useState([]);
  const sliderRef = useRef(null);


  useEffect(() => {
    const user = auth.currentUser;

    const fetchUserData = async () => {
      try {
        if (user) {
          setUserEmail(user.email || '');
          const likedMoviesRef = firestore.collection('likedMovies').doc(user.uid);
          const doc = await likedMoviesRef.get();

          if (doc.exists) {
            const movies = doc.data().movies || [];
            setLikedMovies(movies);
          } else {
            console.log('No liked movies found.');
          }
        } else {
          console.log('User not logged in.');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchUserData();
  }, []);

  const slide = (offset) => {
    if (sliderRef.current) {
      sliderRef.current.scrollLeft += offset;
    }
  };

  const handleUnlikeShow = async (titleToRemove) => {
    try {
      const user = auth.currentUser;
      if (user) {
        const likedMoviesRef = firestore.collection('likedMovies').doc(user.uid);
        const doc = await likedMoviesRef.get();

        if (doc.exists) {
          const currentLikes = doc.data().movies || [];
          const updatedLikes = currentLikes.filter((movie) => movie.title !== titleToRemove);

          await likedMoviesRef.set({ movies: updatedLikes });
          setLikedMovies(updatedLikes);
        }
      }
    } catch (error) {
      console.error('Error removing liked show:', error);
    }
  };

console.log(likedMovies);

  return (
    <>
    <div >
      <div className=''>
      <img  className="w-full h-[500px] object-cover "
      src="https://assets.nflxext.com/ffe/siteui/vlv3/a09bb938-2d90-42ae-986e-5a3e4abf9e77/8eb1e781-3494-4aa4-9405-268ca6473e4c/IN-en-20231113-popsignuptwoweeks-perspective_alpha_website_large.jpg" alt="" />

     <div className="fixed bg-black/70 top-0 left-0 w-full h-[500px]" />

     <div className='absolute top-[20%] p-4 md:p-8'>
     <h2 className='text-4xl md:text-6xl mb-5 text-yellow-400'>My Shows</h2>
      <p className='text-2xl md:text-3xl text-gray-300'>User: <span className='text-2xl text-white'> {userEmail}</span></p>
     </div>
     </div>


<h2 className='p-4 capitalize md:text-xl font-nsans-bold text-white  relative'>Fav Shows</h2>

<div className='relative flex items-center group'>
  <FaAngleLeft
    onClick={() => slide(-500)}
    className='bg-white rounded-full absolute left-2 opacity-80 text-gray-700 z-10 hidden group-hover:block cursor-pointer'
  />
  <div ref={sliderRef} className='w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide'>

    {likedMovies.map(({id,title,image}) => {

  return <div key={title} className='relative m-2 inline-block w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] rounded-lg'>
<img className='object-cover h-40 block w-full object-top' src={createimage("original",image)} />
<div className='absolute top-0 left-0 w-full h-40 bg-black/80 opacity-0 hover:opacity-100 duration-150'>
  <p className='overflow-hidden flex justify-center items-center h-40 text-white text-center max-w-full md:max-w-xs lg:max-w-md '>{title}</p>
  <p><AiOutlineCloseCircle size={27} onClick={()=>handleUnlikeShow(title)} className='absolute top-2 right-2'/></p>
</div>
</div>

    }
    )}
  </div>
  <FaAngleRight
    onClick={() => slide(500)}
    className='bg-white rounded-full absolute right-2 opacity-80 text-gray-700 z-10 hidden group-hover:block cursor-pointer'
  />
</div>


    </div>
    </>
  );
};

export default Profile;
