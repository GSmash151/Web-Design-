import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className='text-center w-full h-full backdrop-blur-lg bg-black/70'>
      <div className='flex items-center justify-center gap-4'>
        <Link to="/">About</Link>
      <Link to="/">Contact</Link>
      </div>
      <p className="text-sm">Created by Badu9 with GSmash</p>
    </footer>
  )
}

export default Footer
