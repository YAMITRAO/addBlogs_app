

import React, { useEffect, useReducer } from 'react'
import DataContext from './DataContext'

const url = "https://crudcrud.com/api/036fefe880674024806608a3c2fb971b/post"

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

  if(action.type === "CHANGE_ISEDIT_TRUE"){
    console.log("Change edit to ttrue and the form data is");
    console.log(action.data);
    state.isEdit = true;
    state.formEditValue = {
      ...action.data
    }
    return {
      ...state
    }
  }

  if(action.type === "CHANGE_ISEDIT_FALSE"){
    state.isEdit = false;
    state.formEditValue = {
      ...action.data
    }
    return {
      ...state
    }
  }

  return state
}



const DataProvider = (props) => {

  // useEffect( () => {
  //   fetch(url).then( res => {
  //     if(res.ok){
  //       return res.json().then( data => {

  //         if(data.length > 0){
  //           dispatchFun({ type:"LOAD_DATA", data:data});
  //         }
  //       })
  //     }
  //   })
  
  // }, [])
  
  const getApiFun = async() => {
    try{
      const response = await fetch(url);
       if( !response.ok){
           throw new Error('Problem In Getting Data from API');
        }
      const data = await response.json();
      if(data.length > 0){
        dispatchFun({ type:"LOAD_DATA", data:data});
      }
    }
    catch(error){
      console.log("API_GET_ERROR",error);
    }
  }

  useEffect( () => {
   getApiFun();
  }, [])

  

  const [state, dispatchFun] = useReducer( reducer, {
    displayPostForm: false,
    postData : [
      
    ],
    isEdit:false,
    formEditValue:{
      _id:"",
      title:"",
      imgUrl:"",
      desc:"",
    }

  })


  const postFormDisplatHandler = (data) => {
    dispatchFun({type:"POST_FORM_DISPLAY"});
  }

  // const updatePostData = (data) => {
  //   fetch(url,{
  //     headers: { "Content-Type": "application/json; charset=utf-8" },
  //     method: 'POST',
  //     body: JSON.stringify({
  //         ...data
  //     })
  //   }).then( res => {
  //     if(res.ok ){
  //       fetch(url).then( res => {
  //         if(res.ok){
  //           return res.json().then(data => {
  //             dispatchFun({ type:"LOAD_DATA", data:data})
  //           })
  //         }
  //       })
  //     }
  //   })
  // }

  //change::::::start
  const updatePostData = async(mydata) => {
    try{
      const response = await fetch(url,{
        headers: { "Content-Type": "application/json; charset=utf-8" },
      method: 'POST',
      body: JSON.stringify({
          ...mydata
      })
      })
      if(!response.ok) {
        throw new Error('Problem in posting the data to server');
      }
      const data = await response.json();
      console.log(data);
      await getApiFun();
    }
    catch(error){
      console.log("API_POST_ERROR:-", error);
    }
  }

  //change::::::end

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

  const updateThePost = (data) => {
    console.log("update the post of", data);
    let sendData= {
      type: data.type,
      data:{
        ...data
      }
    }
    dispatchFun(sendData);
  }

  const putHandler = (data) => {
    console.log("Update button clicked and the data to put request is")
    console.log(data);
    const putUrl = `${url}/${data._id}`
    fetch(putUrl, {
      headers: { "Content-Type": "application/json; charset=utf-8" },
      method: 'PUT',
      body: JSON.stringify({
          title:data.title,
          desc:data.desc,
          imgUrl:data.imgUrl,
      })
    }).then( res => {
      if(res.ok){
        fetch(url).then(res => {
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
      isEdit: state.isEdit,
      formEditValue: state.formEditValue,
      updatePostHandler : updateThePost,
      putThePost : putHandler,
    }
  return (
    <DataContext.Provider value={data}>
        {props.children}
    </DataContext.Provider>
  )
}

export default DataProvider