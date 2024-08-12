'use client';

import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import Image from 'next/image';

export default function Page() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [preview, setPreview] = useState('');
  const [validationError, setValidationError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    const formData = new FormData();
    formData.append('username', username);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('profilePhoto', profilePhoto);
    try {
      const response = await fetch('/api/user/register', {
        method: 'POST',
        body: formData,
      });
      
      const result = await response.json();
      if (result.error) {
        throw new Error(result.error);        
      } 
      setSuccess(result.message);
      router.push('/login');
    } catch (error) {
      setError( error.message); 
      setSuccess('');
    }
    
       
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];  
    if (file) {
      const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
      if (!validTypes.includes(file.type)) {
        setValidationError('Invalid file type. Please upload an image.');
        setProfilePhoto(null);
        setPreview('');
        return;
      }
      
      const maxSize = 5 * 1024 * 1024; 
      if (file.size > maxSize) {
        setValidationError('File size exceeds the 5MB limit.');
        setProfilePhoto(null);
        setPreview('');
        return;
      }      
      setValidationError('');
      setProfilePhoto(file);
      
      const imagePreviewUrl = URL.createObjectURL(file);
      setPreview(imagePreviewUrl);
    }
  };

  const handleRemoveImage = () => {
    if (preview) {
      URL.revokeObjectURL(preview);
    }
    setProfilePhoto(null);
    setPreview('');
    setValidationError('');
  };

  React.useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]); 
  

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="container flex items-center justify-center min-h-screen px-6 mx-auto">
        <form className="w-full max-w-md" onSubmit={handleSubmit}>
          <div className="flex justify-center mx-auto">
            <Image 
              src="https://merakiui.com/images/logo.svg" 
              alt="Logo" 
              width={100} 
              height={28} 
              className="w-auto h-7 sm:h-8" 
            />
          </div>
  
          <div className="flex items-center justify-center mt-6"> 
            <a 
              href="#" 
              className="w-1/3 pb-4 font-medium text-center text-gray-800 capitalize border-b-2 border-blue-500 dark:border-blue-400 dark:text-white"
            >
              Sign up
            </a>
          </div>
          <div className="relative flex items-center mt-8">
          {success && (
            <p className="text-sm font-light text-green-500 mt-2">{success}</p>
          )}
          </div>
          <div className="relative flex items-center mt-1">
            <span className="absolute">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor" 
                strokeWidth="2"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" 
                />
              </svg>
            </span>
            <input 
              type="text" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" 
              placeholder="Username" 
              required 
            />
          </div>        
  
          <div className="relative flex items-center mt-4">
            <span className="absolute">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor" 
                strokeWidth="2"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" 
                />
              </svg>
            </span>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" 
              placeholder="Email address" 
              required 
            />
          </div>
  
          <div className="relative flex items-center mt-4">
            <span className="absolute">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor" 
                strokeWidth="2"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" 
                />
              </svg>
            </span>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block w-full px-10 py-3 text-gray-700 bg-white border rounded-lg dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" 
              placeholder="Password" 
              required 
            />
          </div>
  
          <div className="relative flex items-center mt-4">
            <span className="absolute">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor" 
                strokeWidth="2"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" 
                />
              </svg>
            </span>
            <input 
              type="password" 
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="block w-full px-10 py-3 text-gray-700 bg-white border rounded-lg dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" 
              placeholder="Confirm Password" 
              required 
            />
          </div>

          <label 
            htmlFor="profile-photo" 
            className="flex items-center px-3 py-3 mx-auto mt-4 text-center bg-white border-2 border-dashed rounded-lg cursor-pointer dark:border-gray-600 dark:bg-gray-900"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="w-6 h-6 text-gray-300 dark:text-gray-500" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor" 
              strokeWidth="2"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" 
              />
            </svg>
            <h2 className="mx-3 text-gray-400">Profile Photo</h2>
            <input 
              id="profile-photo" 
              type="file" 
              onChange={handleFileChange}
              className="hidden" 
            />
          </label>

          {preview && (
            <div className="relative mt-4">
              <img
                src={preview}
                alt="Profile Preview"
                className="w-32 h-32 object-cover rounded-full"
              />
              <span
                onClick={handleRemoveImage}
                className="absolute top-0 right-0 p-2 bg-red-500 text-white rounded-full cursor-pointer"
                title="Change Image"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </span>
            </div>
          )}

          {validationError && (
            <p className="text-sm font-light text-red-500 mt-2">{validationError}</p>
          )}


          <div className="mt-6">
            <button 
              type="submit"
              className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
            >
              Sign Up
            </button>
  
            {error && <p className="text-sm font-light text-red-500 mt-2">{error}</p>}
  
            <div className="mt-6 text-center">
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Already have an account?{' '}
                <a href="#" className="font-medium text-blue-500 hover:underline dark:text-blue-400">
                  Sign in
                </a>
              </p>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}  