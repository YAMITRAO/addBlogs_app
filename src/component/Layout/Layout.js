
import React from 'react'
import PostForm from '../PostForm/PostForm'
import  { createPortal } from 'react-dom';
// import style from "./Layout.module.css"

const Layout = () => {
    let root = document.getElementById('layout');
    console.log(root);
  return (
  <>
    {createPortal(
    <PostForm/>,
    root
  )}
   </>
    
   
    
  )
}

export default Layout;