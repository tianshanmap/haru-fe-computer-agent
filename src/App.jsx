import './App.css'
import Header from './components/header.jsx'
import Footer from './components/footer.jsx'
import ExplorerSection from './components/explorer/explorer.jsx'
import VideoCreator from './components/video/video_creator_main.jsx'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const FileExplorer = () => {
  return (
    <div className='container'>
        <Header/>
        <ExplorerSection />
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
const VideoCreatorHome = () => {
  return (
    <div className='container'>
        <Header/>
        <VideoCreator />
        <Footer/>
    </div>
  )
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/file-explorer" element={<FileExplorer/>} />
        <Route path="/videoman" element={<VideoCreatorHome/>} />
      </Routes>
    </Router>
  )
}

export default App
