import './App.css'
import Header from './components/header.jsx'
import Footer from './components/footer.jsx'
import Explorer from 'haru-reactjs-component-explorer'
import VideoMain from 'haru-reactjs-component-videomaker'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const FileExplorer = () => {
  return (
    <div className='container'>
        <Header/>
        <Explorer />
        <Footer/>
    </div>
  )
}
const VideoMainHome = () => {
  return (
    <div className='container'>
        <Header/>
        <VideoMain />
        <Footer/>
    </div>
  )
}
const Home = () => {
  return (
    <div className='container'>
        <Header/>
        <div className='container'></div>
        <Footer/>
    </div>
  )
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/file-explorer" element={<FileExplorer/>} git restore />
        <Route path="/videoman" element={<VideoMainHome/>} git restore />
      </Routes>
    </Router>
  )
}

export default App
