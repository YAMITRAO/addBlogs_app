import React, { useContext } from 'react'
import PostCart from './PostCart'
import DataContext from '../../store/DataContext'

const HomePage = () => {
    const ctx = useContext(DataContext);
    let data = ctx.postData;

  return (
    <div style={{display:'flex'}}>
    {data.length>0 ?  data.map( (val) => {
        return (
            <PostCart data={val}/>
        )
    }) : <p style={{ width:"100%", textAlign:"center", fontSize:"30px"}}>No Data Found</p>}
    </div>
    
  )
}

export default HomePage