import React from 'react'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import dataContext from './context/dataContext'


const Nav = () => {
  const {search,setSearch} = useContext(dataContext);
  return (
    <nav className='Nav'>
      <form className='searchForm' onClick={(e) => e.preventDefault()}>
          <label htmlFor="search">Search Posts </label>
          <input 
            type="text" 
            id='search'
            placeholder='Search Posts'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
      </form>
      <ul>
        <Link to={'/'}><li>Home</li></Link>
        <Link to={'/post'}><li>Post</li></Link>
        <Link to={'/about'}><li>About</li></Link>
      </ul>
    </nav>
  )
}

export default Nav
