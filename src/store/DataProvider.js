

import React, { useEffect, useReducer } from 'react'
import DataContext from './DataContext'

const url = "https://crudcrud.com/api/db2a959b566842e9ae84cd7dfb45fe14/post"

const reducer = (state, action) => {
  if(action.type === "LOAD_DATA"){
    state.postData = [...action.data,];

    return {
      ...state
    }
  }

  if(action.type === "POST_FORM_DISPLAY"){
    state.displayPostForm = ! state.displayPostForm;
    return {
      ...state
    }
  }


  return state
}



const DataProvider = (props) => {

  useEffect( () => {
    fetch(url).then( res => {
      if(res.ok){
        return res.json().then( data => {

          if(data.length > 0){
            dispatchFun({ type:"LOAD_DATA", data:data});
          }
          // else{
          //   fetch(url,{
          //     headers: { "Content-Type": "application/json; charset=utf-8" },
          //     method: 'POST',
          //     body: JSON.stringify({
          //         title:"This is title",
          //         imgUrl : "https://images.pexels.com/photos/60597/dahlia-red-blossom-bloom-60597.jpeg?cs=srgb&dl=pexels-pixabay-60597.jpg&fm=jpg",
          //         desc: "This is an image"
          //     })
          //   }).then( res => {
          //     return res.json().then( data => {
          //       dispatchFun({ type:"LOAD_DATA", data:data});
          //     })
          //   })

          // }
        })
      }
    })
  
  }, [])

  const [state, dispatchFun] = useReducer( reducer, {
    displayPostForm: false,
    postData : [
      
    ],
  })


  const postFormDisplatHandler = (data) => {
    dispatchFun({type:"POST_FORM_DISPLAY"});
  }

  const updatePostData = (data) => {
    fetch(url,{
      headers: { "Content-Type": "application/json; charset=utf-8" },
      method: 'POST',
      body: JSON.stringify({
          ...data
      })
    }).then( res => {
      if(res.ok ){
        fetch(url).then( res => {
          if(res.ok){
            return res.json().then(data => {
              dispatchFun({ type:"LOAD_DATA", data:data})
            })
          }
        })
      }
    })
  }

  const deletePost = (postID) => {
    console.log("postid that must delete", postID);
    let deleteUrl = `${url}/${postID}`
    fetch(deleteUrl, {
      method:"DELETE"
    }).then( res => {
      if(res.ok){
        fetch(url).then( res => {
          if(res.ok){
            return res.json().then( data => {
              dispatchFun({ type:"LOAD_DATA", data:data});
            })
          }
        })
      }
    })
  }

    let data = {
      displayPostForm: state.displayPostForm,
      displayPostHandler: postFormDisplatHandler, 
      postData :state.postData,
      postDataHandler : updatePostData,
      postDeleteHandler : deletePost,
    }
  return (
    <DataContext.Provider value={data}>
        {props.children}
    </DataContext.Provider>
  )
}

export default DataProvider