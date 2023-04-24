import React from 'react'
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns'
import apis from './apis/posts'
import { useContext,useState } from 'react'
import dataContext from './context/dataContext'

const NewPost = () => {
  const [postTitle,setPostTitle] = useState('')
  const [postBody,setPostBody] = useState('')
  const {posts,setPosts} = useContext(dataContext);
  const navigate = useNavigate()

  const handleSubmit = async (e) =>{
    e.preventDefault();
    const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
    const datetime = format(new Date(),'MMMM dd, YYY pp');
    const newPost = {id, title:postTitle, datetime, body:postBody};
    try{
      const response = await apis.post('/posts', newPost);
      const allPosts = [...posts,response.data];
      setPosts(allPosts);
      setPostTitle('');
      setPostBody('');
      navigate('/')
    }catch(err){
      console.log(`Error: ${err.message}`)
    }
    
  }


  return (
    <main className='NewPost'>
        <h2>New Post</h2>
        <form className='newPostForm' onSubmit={handleSubmit}>
          <label htmlFor="postTitle">Title:</label>
          <input 
            type="text"
            id='postTitle'
            required
            value={postTitle}
            onChange={(e)=> setPostTitle(e.target.value)} 
          />

          <label htmlFor="postBody">Post:</label>
          <textarea 
            type="text"
            id='postBody'
            required
            value={postBody}
            onChange={(e)=> setPostBody(e.target.value)} 
          />

          <button type='submit'>Submit</button>
        </form>
    </main>
  )
}

export default NewPost
