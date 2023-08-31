import './App.css';
import Navbar from './Components/Navbar';
import { Home } from './Components/Home';
import About from './Components/About';
import Contact from './Components/Contact';
import Footer from './Components/Footer';
import PrivacyPolicy from './Components/PrivacyPolicy';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Features from './Components/Features';
function App() {
  return (
    <>
    
    <div className='Home'>
      <BrowserRouter>
      <Navbar/><br/><br/><br/>
      <Routes>
        <Route path='/about-us' element={<About/>}/>
        <Route path='/' element={<Home />}/>
        <Route path="/contact-us" element={<Contact/>}/>
        <Route path="/privacy-policy" element={<PrivacyPolicy/>}/>
        <Route path="/features" element={<Features/>}/>
      </Routes>
      <Footer/>
      </BrowserRouter>
      
    </div>
    </>
  );
}

export default App;
