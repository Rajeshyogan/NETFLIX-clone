import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { auth } from '../Services/Firebase';

const ProtectedRoute = ({children}) => {
  
    const [user, setUser] = useState(null);

    useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged((currentUser) => {
        setUser(currentUser);
      });
  
      return () => {
        unsubscribe();
      };
    }, []);

if (user === null) {
    return null
}

  if(!user){
    return <Navigate to="/"/>
  }
  
  
    return children
}

export default ProtectedRoute