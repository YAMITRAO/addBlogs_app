import React, { useContext, useRef } from 'react'
import style from "./PostForm.module.css";
import DataContext from '../../store/DataContext';

const PostForm = () => {
  const ctx = useContext(DataContext);

  const imageUrlRef = useRef();
  const titleRef = useRef();
  const descRef = useRef();

  const formSubmitHandler = (e) => {
    e.preventDefault();
    const enteredImgUrl = imageUrlRef.current.value;
    const enteredTitle = titleRef.current.value;
    const enteredDesc = descRef.current.value;

    let data = {
        title:enteredTitle,
        imgUrl :enteredImgUrl,
        desc: enteredDesc,
    }

    //to send the post data to postData
    ctx.postDataHandler(data);

    // to close the post form
    ctx.displayPostHandler();
  }

  return (
    <div className={style.container}>
         <form onSubmit={ formSubmitHandler}>
            <div className={style.inputContainer}>
              <div className={style.postImg}>
              <label>Image Url</label>
              <input type='text' placeholder='Enter image url' ref={imageUrlRef}/>
              </div>

              <div className={style.postTitle}>
              <label>Title</label>
              <input type='text' placeholder='Enter the Title' ref={titleRef}/>
              </div>

              <div className={style.postDesc}>
              <label>Description</label>
              <input type='text' placeholder='Enter description' ref={descRef}/>
              </div>

              <div className={style.postButton}>
                <button type="submit" >Add Post</button>
                <button type="button" onClick={ ( )=> {
                   ctx.displayPostHandler()
                }}>Close</button>
              </div>

            </div>
         </form>
      </div>
  )
}

export default PostForm