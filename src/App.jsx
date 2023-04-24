import Header from './Header'
import Nav from './Nav'
import Footer from './Footer'
import Home from './Home'
import NewPost from './NewPost'
import PostDetails from './PostDetails'
import EditPost from './EditPost'
import About from './About'
import Missing from './Missing'
import { BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import { DataProvider } from './context/dataContext'

function App() {
  return (
    <Router>
        <div className="App">
          <Header title = 'My Blog Tuit'/>
            <DataProvider>
              <Nav/>
              <Routes>
                <Route exact path='/' element={<Home/>} />
                <Route path='/post' element={<NewPost/>} />
                <Route path='/edit/:id' element={<EditPost/>} />
                <Route path='/post/:id' element={<PostDetails/>} />

                <Route exact path='/about' element={<About />} />
                <Route exact path='*' element={<Missing />} />
              </Routes>
            </DataProvider>
          <Footer/>
        </div>
    </Router>
  )
}

export default App
