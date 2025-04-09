import { Routes, Route, Outlet } from 'react-router-dom'
import Main from './pages/Main'
import About from './pages/About'
import NotFound from './pages/NotFound'
import ExTrack from './pages/ExTrack'
import Navbar from './components/Navbar'
import Data from './components/Data'
function Home(){
  return (
    <>
      <Navbar></Navbar>
      <Outlet/>
    </>
  )
}
function App() {

  return (
    <>
    <Routes>
      <Route element={<Home/>}>
        <Route path="/" element={<Main />} />
        <Route path="/about" element={<About />} />
        <Route path="/track" element={<ExTrack />} />
        <Route path="/stats" element={<Data />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>

    </>
  )
}

export default App
