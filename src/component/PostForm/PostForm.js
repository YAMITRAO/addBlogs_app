import React, { useContext, useEffect, useState } from 'react'
import style from "./PostForm.module.css";
import DataContext from '../../store/DataContext';

const PostForm = () => {
  const ctx = useContext(DataContext);
  

  const[ urlValue, setUrlValue] = useState("");
  const [titleValue, setTitleValue] = useState("");
  const [descValue, setDescValue] = useState("");
  const postId = ctx.formEditValue._id;

    
  const formSubmitHandler = (e) => {
    e.preventDefault();
    let data = {
      title:titleValue,
      imgUrl :urlValue,
      desc: descValue,
  }

    //to send the post data to postData
    ctx.postDataHandler(data);

    // to close the post form
    ctx.displayPostHandler();
  }

    useEffect( () => {
      setTitleValue(ctx.formEditValue.title);
      setDescValue(ctx.formEditValue.desc);
      setUrlValue(ctx.formEditValue.imgUrl);
    }, [ctx.isEdit, ctx.formEditValue.title,ctx.formEditValue.desc, ctx.formEditValue.imgUrl])

    const updateHandler = () => {
      let postDataToUpdate = {
        type: "UPDATE_THE_POST",
        _id:postId,
        title:titleValue,
        imgUrl:urlValue,
        desc:descValue,
      }
      ctx.putThePost(postDataToUpdate);
      ctx.displayPostHandler()
    }


  


  return (
    <div className={style.container}>
         <form onSubmit={ formSubmitHandler}>
            <div className={style.inputContainer}>
              <div className={style.postImg}>
              <label >Image Url</label>
              <input type='text' placeholder='Enter image url' value={urlValue}  onChange={ (e) => setUrlValue(e.target.value)}/>
              </div>

              <div className={style.postTitle}>
              <label>Title</label>
              <input type='text' placeholder='Enter the Title' value = {titleValue} onChange={ (e) => setTitleValue(e.target.value)} />
              </div>

              <div className={style.postDesc}>
              <label>Description</label>
              <input type='text' placeholder='Enter description' value={descValue}  onChange={(e) => setDescValue(e.target.value)}/>
              </div>

              <div className={style.postButton}>
                {!ctx.isEdit && <button type="submit" >Add Post</button>}
                {ctx.isEdit && <button type="button" onClick={ updateHandler} >Update Post</button>}
                <button type="button" onClick={ ( )=> {
                   ctx.displayPostHandler()
                   ctx.updatePostHandler({
                    _id:"",
                    title:"",
                    imgUrl:"",
                    desc:"",
                    type:"CHANGE_ISEDIT_FALSE"
                })
                }}>Close</button>
              </div>

            </div>
         </form>
      </div>
  )
}

export default PostForm