import React, { useContext } from 'react'
import style from "./NavBar.module.css"
import DataContext from '../../store/DataContext'

const NavBar = () => {
  const ctx = useContext(DataContext);
  return (
    <div className={style.container}>
      <div className={style.title}>
        My Blogs
      </div>
      <div className={style.addPostButton}>
        <button onClick={ () => {
          ctx.displayPostHandler()
          }}>Add New Post</button>
      </div>
    </div>
  )
}

export default NavBar