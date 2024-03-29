import React, { useContext } from 'react'
import NavBar from "./NavBar/NavBar";
import Layout from './Layout/Layout';
import HomePage from './HomePage/HomePage';
import DataContext from '../store/DataContext';

const Project = () => {
  const ctx = useContext(DataContext);
  return (
   <>
   <NavBar />
   <HomePage />
   {ctx.displayPostForm && <Layout/>}
   </>
  )
}

export default Project