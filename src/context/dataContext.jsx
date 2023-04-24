import {useEffect,createContext,useState} from 'react'
import useAxiosFetch from '../hooks/useAxiosFetch'

const dataContext = createContext({})

export const DataProvider = ({children}) =>{
    const [posts,setPosts] = useState([])
    const [search,setSearch] = useState('')
    const [searchResults,setSearchResults] = useState([])
    const {data,isLoading,fetchError} = useAxiosFetch(' http://localhost:8000/posts')

    useEffect(() =>{
    setPosts(data)
    },[data])

    useEffect(() =>{
        const filteredResult = posts.filter(post => 
        ((post.body).toLowerCase()).includes(search.toLowerCase()) ||
        ((post.title).toLowerCase()).includes(search.toLowerCase()) 
        )
        setSearchResults(filteredResult.reverse())
    },[posts,search])
  
    return (
        <dataContext.Provider value={{
            search,setSearch,searchResults,isLoading,fetchError,posts,setPosts
        }}>
            {children}
        </dataContext.Provider>
    )
}

export default dataContext
