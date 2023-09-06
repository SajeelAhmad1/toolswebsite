import './App.css';
import Navbar from './Components/Navbar';
import { Home } from './Components/Home';
import About from './Components/About';
import Contact from './Components/Contact';
import Footer from './Components/Footer';
import PrivacyPolicy from './Components/PrivacyPolicy';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Features from './Components/Features';
import Pdftotext from './Components/Pdftotext';
import PdfToWordConverter from './Components/tools/pdftoword';
import ExcelToPdfConverter from './Components/tools/exceltopdf';
import DeletePdfPages from './Components/tools/delpdfpages';
import HtmlToPdfConverter from './Components/tools/htmltopdf';
import WordToPdfConverter from './Components/tools/wordtopdf';
import PdfPageSizeChanger from './Components/tools/resizepdf';
import PdfMerger from './Components/tools/mergepdf';
import PdfSplitter from './Components/tools/splitpdf';
// import PdfToJpgConverter from './Components/tools/rotatepdf';
// import PdfToHtmlConverter from './Components/tools/watermarkpdf';
import WatermarkPdfTool from './Components/tools/watermarkpdf';
import PageNumberTool from './Components/tools/pagenumber';
import PdfSignatureTool from './Components/tools/addSign';
import AddHeaderFooterToPDF from './Components/tools/addheaderfooter';
import JpgToPdfConverter from './Components/tools/jpg topdf';
import PdfToJpgConverter from './Components/tools/pdftojpg';
import PdfToHtmlConverter from './Components/tools/pdftohtml';
import PdfCompressor from './Components/tools/compresspdf';
import PdfToPowerpointConverter from './Components/tools/pdftoppt';
import PowerPointToPdfConverter from './Components/tools/ppttopdf';
import PdfPageOrganizer from './Components/tools/organizepdf';
import PdfToExcelConverter from './Components/tools/pdftoexcel1';

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
      </BrowserRouter>   */}
       
    </div> 
     <div className="App"> 
      <h1>PDF Merge Tool</h1> 
      {/* <PdfToWordConverter />  */}
      {/* <PdfToExcelConverter/> */}
      {/* <PdfToJpgConverter/> */}
      {/* <DeletePdfPages/> */}
      {/* <ExcelToPdfConverter/> */}
      {/* <PdfPageSizeChanger/> */}
      {/* <PdfMerger/> */}
      {/* <PdfSplitter/> */}
      {/* <PdfToJpgConverter/> */}
      {/* <WatermarkPdfTool/> */}
      {/* <PageNumberTool/> */}
      {/* <PdfSignatureTool/> */}
      {/* <AddHeaderFooterToPDF/> */}
      {/* <JpgToPdfConverter/> */}
      {/* <PdfToJpgConverter/> */}
      {/* <PdfToHtmlConverter/> */}
      {/* <PdfCompressor/> */}
      {/* <PdfToPowerpointConverter /> */}
      {/* <PowerPointToPdfConverter/> */}
      {/* <PdfPageOrganizer /> */}
      <PdfToExcelConverter />


     </div>
    </>
  );
}

export default App;
