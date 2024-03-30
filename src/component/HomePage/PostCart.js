import React, { useContext } from 'react'
import style from "./PostCart.module.css"
import DataContext from '../../store/DataContext';


const PostCart = (props) => {
    let data = props.data;
    const ctx = useContext(DataContext);

    
    
    const edithandler = (e) => {
        let postId = e.target.value;
        // console.log("edit the post clicked");
        // console.log("edit id is ", postId);
        ctx.displayPostHandler();
        ctx.updatePostHandler({
            ...data,
            type:"CHANGE_ISEDIT_TRUE"
        });
    }
  return (
    <>
   
    <div className={style.container}>
        <div className={style.postContainer}>

            <div className={style.postTitle}>
                <h1>{data.title}</h1>
            </div>
            <div className={style.postImg}>
                <img src={data.imgUrl} alt={data.title} width="200px"/>
            </div>

            <div className={style.postDesc}>
               <p>{data.desc}</p>
            </div>

            <div className={style.button}>
                <button value={data._id} onClick={ edithandler }>Edit</button>
                <button value={data._id} onClick={ (e) => {
                    console.log("delete request for");
                    console.log(e.target.value);
                    ctx.postDeleteHandler(e.target.value);
                }}>Delete</button>
            </div>
        </div>
    </div>
    </>
  )
}

export default PostCart