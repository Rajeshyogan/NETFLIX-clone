
import React, { useState, useEffect } from 'react';
import { createimage } from '../Services/MovieSerives';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { firestore, auth } from '../Services/Firebase';

const Movieitem = ({ title, image, altimg }) => {


  const [like, setLike] = useState(false);

  useEffect(() => {
    const checkIfLiked = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const likedMoviesRef = firestore.collection('likedMovies').doc(user.uid);
          const doc = await likedMoviesRef.get();

          if (doc.exists) {
            const currentLikes = doc.data().movies || [];
            const liked = currentLikes.some((movie) => movie.title === title); // Check if movie is liked
            setLike(liked);
          }
        }
      } catch (error) {
        console.error('Error checking liked movies:', error);
      }
    };

    checkIfLiked();
  }, [title]);

  const handleLike = async () => {
    try {
      const user = auth.currentUser;
      if (user) {
        const likedMoviesRef = firestore.collection('likedMovies').doc(user.uid);
        const doc = await likedMoviesRef.get();

        if (doc.exists) {
          const currentLikes = doc.data().movies || [];
          const updatedLikes = [...currentLikes];

          const index = updatedLikes.findIndex((movie) => movie.title === title);
          if (!like && index === -1) {
            updatedLikes.push({ title, image });
            alert(`Added ${title} to Favorites.`);
          } else {
            if (index !== -1) {
              updatedLikes.splice(index, 1);
              alert(`Removed ${title} from Favorites.`);
            }
          }

          await likedMoviesRef.set({ movies: updatedLikes });
          setLike(!like);
        } else {
          await likedMoviesRef.set({ movies: [{ title, image }] });
          setLike(true);
          alert(`Added ${title} to Favorites.`);
        }
      } else {
        alert('Please log in to like movies.');
      }
    } catch (error) {
      console.error('Error toggling like:', error);
    }
  };


  
  return (
    <div className='relative m-2 inline-block w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] rounded-lg'>
      <img className='object-cover h-40 block w-full object-top' src={createimage('original', image ?? altimg)} alt={title} />
      <div className='absolute top-0 left-0 w-full h-40 bg-black/80 opacity-0 hover:opacity-100 duration-150'>
        <p className='text-xs md:text-sm flex items-center justify-center h-40 w-full'>{title}</p>
        <p onClick={handleLike}>
          {like ? (
            <FaHeart size={20} className='absolute top-2 left-2 text-gray-300' />
          ) : (
            <FaRegHeart size={20} className='absolute top-2 left-2 text-gray-300' />
          )}
        </p>
      </div>
    </div>
  );
};

export default Movieitem;
