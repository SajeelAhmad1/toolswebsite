import './App.css';
import Navbar from './Components/Navbar';
import { Home } from './Components/Home';
import About from './Components/About';
import Contact from './Components/Contact';
import Footer from './Components/Footer';
import PrivacyPolicy from './Components/PrivacyPolicy';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Features from './Components/Features';
import FileUpload from './Components/FileUpload';
import PdfToWordConverter from './Components/tools/pdftoword';
import PdfToExcelConverter from './Components/tools/pdftoexcel';
import PdfToJpgConverter from './Components/tools/pdftojpg';
import DeletePdfPages from './Components/tools/delpdfpages';

function App() {
  return (
    <>
    
     <div className='Home'>
      {/* <BrowserRouter>
      <Navbar/><br/><br/><br/>
      <Routes>
        <Route path='/about-us' element={<About/>}/>
        <Route path='/' element={<Home />}/>
        <Route path="/contact-us" element={<Contact/>}/>
        <Route path="/privacy-policy" element={<PrivacyPolicy/>}/>
        <Route path="/features" element={<Features/>}/>
      </Routes>
      <Footer/>
      </BrowserRouter>  */}
      
    </div> 
    <div className="App">
      <h1>PDF Merge Tool</h1>
      {/* <PdfToWordConverter /> */}
      {/* <PdfToExcelConverter/> */}
      {/* <PdfToJpgConverter/> */}
      <DeletePdfPages/>

    </div>
    </>
  );
}

export default App;
