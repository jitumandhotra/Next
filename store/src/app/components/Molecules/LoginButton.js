'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/app/context/AuthContext';
import { useRouter } from 'next/navigation';

const LoginButton = () => {  
  const { isAuthenticated, logout } = useAuth();  
  const router = useRouter();
  const [authStatus, setAuthStatus] = useState(isAuthenticated);
  
  useEffect(() => {    
    setAuthStatus(isAuthenticated);
  }, [isAuthenticated]);

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <div>
      {authStatus ? (
        <span
          onClick={handleLogout}
          className="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800 cursor-pointer"
        >
          Log out
        </span>
      ) : (
        <Link href="/login" className="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800">
          Log in
        </Link>
      )}
    </div>
  );
};

export default LoginButton;
