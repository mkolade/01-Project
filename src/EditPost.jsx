import React from 'react'
import { useEffect } from 'react'
import { useParams,Link,useNavigate } from 'react-router-dom'
import { format } from 'date-fns'
import apis from './apis/posts'
import { useContext,useState } from 'react'
import dataContext from './context/dataContext'

const EditPost = () => {
    const [editTitle,setEditTitle] = useState('')
    const [editBody,setEditBody] = useState('')
    const {posts,setPosts} = useContext(dataContext);
    const {id} = useParams();
    const post = posts.find(post=> (post.id).toString() === id)
    const navigate = useNavigate()

    useEffect(() =>{
        if(post){
            setEditBody(post.body)
            setEditTitle(post.title)
        }

    },[post,setEditBody,setEditTitle])

    const handleEdit = async(id) =>{
        const datetime = format(new Date(),'MMMM dd, YYY pp');
        const editedPost = {id, title:editTitle, datetime, body:editBody};
        try{
          const response = await apis.put(`/posts/${id}`,editedPost)
          setPosts(posts.map((post) => post.id == id ? {...response.data} : post));
          setEditBody('')
          setEditTitle('')
          navigate('/')
        }catch(err){
          console.log(`Error: ${err.message}`)
        }
    }
    
    return (
        <main className='NewPost'>
            {editTitle &&
                <>
                    <h2>Edit Post</h2>
                    <form className='newPostForm' onSubmit={(e) => e.preventDefault()}>
                        <label htmlFor="postTitle">Title:</label>
                        <input 
                            type="text"
                            id='postTitle'
                            required
                            value={editTitle}
                            onChange={(e)=> setEditTitle(e.target.value)} 
                        />

                        <label htmlFor="postBody">Post:</label>
                        <textarea 
                            type="text"
                            id='postBody'
                            required
                            value={editBody}
                            onChange={(e)=> setEditBody(e.target.value)} 
                        />

                        <button type='button' onClick={() => handleEdit(post.id)}>Submit</button>
                    </form>
                </>
            }{!editTitle &&
                <>
                    <h2>Post Not Found</h2>
                    <p>Well that's disappointing.</p>
                    <p>
                      <Link to={'/'}>
                          Visit Our Homepage
                      </Link>
                    </p>
                </>
              }
        </main>
    )
}

export default EditPost
