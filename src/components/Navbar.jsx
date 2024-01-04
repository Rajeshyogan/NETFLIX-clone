import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { auth } from '../Services/Firebase'
import { IoMdExit } from "react-icons/io";

const Navbar = () => {
let navigate=useNavigate()


  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate("/")
    } catch (error) {
      console.error('Error signing out: ', error);
    }
  };

  return (
    <div className='absolute capitalize p-4 flex  items-center justify-between  w-full z-50'>
        <Link to="/">
     <h1 className='text-2xl md:text-3xl lg:text-4xl font-nsans-bold text-red-600'>NETFLIX</h1>
        </Link>

         {user ? (
        <div className='flex items-center'>
          <Link to='/profile'><button className='pr-4'>Profile</button></Link>
          <button onClick={handleLogout} className='bg-red-600 px-1 py-[2px] md:py-1 md:px-2 rounded flex items-center'><IoMdExit className='mr-1'/>Logout</button>
        </div>
      ) : (
        <div>
          <Link to='/login'><button className='pr-4'>Login</button></Link>
          <Link to='/signup'><button className='bg-red-600 px-1 py-[2px] md:py-1 md:px-2 rounded'>Sign Up</button></Link>
        </div>
      )}
     
    
    </div>
  )
}

export default Navbar