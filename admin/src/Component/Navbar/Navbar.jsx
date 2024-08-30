import React from 'react'
import { assets } from '../../assets/assets' 
import  './Navbar.scss'
const Navbar = () => {
  return(
    <div className='navbar'>
      <img src={assets.logo} alt="" className='logo'/>
      <img className='profile' src={assets.profile_image} alt="" />
    </div>
  )
}
export default Navbar