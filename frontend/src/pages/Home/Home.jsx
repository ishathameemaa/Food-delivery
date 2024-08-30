import React, { useState } from 'react'
import './Home.scss'
import Header from '../../components/Header/Header'
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu'
import FoodDisplay from '../../FoodDisplay/FoodDisplay'
import AppDownloader from '../../components/AppDownloader/AppDownloader'


const Home = () => {

  const [category,setCategory]=useState('All')
  return (
    <div>
      <Header/>
      <ExploreMenu category={category} setCategory={setCategory}/>
      <FoodDisplay category={category}/>
      <AppDownloader/>
      
    </div>
  
  )
}

export default Home