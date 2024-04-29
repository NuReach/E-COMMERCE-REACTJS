import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function SearchBar() {
  const [searchValue, setSearchValue] = useState('');
  const navigate=useNavigate();

  const {search} = useLocation();
  const key = new URLSearchParams(search);
  const query = key.get('query') || 'all';     
  const category = key.get('category') || 'all';     
  const min = key.get('min') || 'all';     
  const max = key.get('max') || 'all';     
  const rating = key.get('rating') || 'all';     
  const order = key.get('order') || 'newest';     
  const page = key.get('page') || 1;  


  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      navigate(`/search/result?category=${category}&&query=${event.target.value}&&min=${min}&&max=${max}&&rating=${rating}&&order=${order}&&page=${page}`)
    }
  };

  const handleChange = (event) => {
    setSearchValue(event.target.value);
  };

  return (
    <div className='w-full border-2 rounded-lg'>
      <div className="relative flex items-center w-full h-12 rounded-lg focus-within:shadow-lg bg-white overflow-hidden">
        <div className="grid place-items-center h-full w-12 text-gray-300">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        <input
          className="peer h-full w-full outline-none text-sm text-gray-700 pr-2"
          type="text"
          id="search"
          placeholder="Search something.."
          value={searchValue}
          onChange={handleChange}
          onKeyPress={handleKeyPress}
        />
      </div>
    </div>
  );
}
