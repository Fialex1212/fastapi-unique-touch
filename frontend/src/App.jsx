import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { BrowserRouter as Router,
        Route,
        Routes
      } from 'react-router-dom'

import useLocalStorage from './hooks/useLocalStorage'
import { userContext } from './contexts/userContext'

import Layout from './pages/Layout'
import Home from './pages/Home/Home'
import Gallery from './pages/Gallery/Gallery'
import Auth from './pages/Auth/Auth'
import Blog from './pages/Blog/Blog'
import NotFound from './pages/NotFound/NotFound'
import Profile from './pages/Profile/Profile'
import Contacts from './pages/Contacts/Contacts'
import Post from './pages/Post/Post'

import ScrollToTop from './utils/ScrollToTop'

const App = () => {
  const [ user, setUser ] = useLocalStorage('user'),
    queryClient = new QueryClient()
  
  return (
      <QueryClientProvider client={queryClient}>
        <userContext.Provider value={{ user, setUser }}>
          <Router>
            <ScrollToTop/>
            <Routes>
              <Route path="/" element={<Layout/>}>
                <Route index element={<Home/>}/>
                <Route path="/gallery" element={<Gallery/>}/>
                
                <Route path="/blog" element={<Blog/>}/>
                <Route path="/blog/:postId" element={<Post/>}/>

                <Route path="/profile" element={<Profile user={user}/>}/>
                <Route path="/contacts" element={<Contacts/>}/>
              </Route>
              <Route path="/auth" element={<Auth/>}/>
              <Route path="*" element={<NotFound/>}/>
            </Routes>
          </Router>
        </userContext.Provider>
      </QueryClientProvider>
  )
}

export default App