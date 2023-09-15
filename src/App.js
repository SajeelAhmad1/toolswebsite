import './App.css';
import Navbar from './Components/Navbar';
import { Home } from './Components/Home';
import About from './Components/About';
import Contact from './Components/Contact';
import Footer from './Components/Footer';
import PrivacyPolicy from './Components/PrivacyPolicy';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Features from './Components/Features';
import Pdftotext from './Components/tools/Pdftotext';
import PdfToWordConverter from './Components/tools/pdftoword';
import ExcelToPdfConverter from './Components/tools/exceltopdf';
import DeletePdfPages from './Components/tools/delpdfpages';
import HtmlToPdfConverter from './Components/tools/htmltopdf';
import WordToPdfConverter from './Components/tools/wordtopdf';
import PdfPageSizeChanger from './Components/tools/resizepdf';
import PdfMerger from './Components/tools/mergepdf';
import PdfSplitter from './Components/tools/splitpdf';
import RotatePdfTool from './Components/tools/rotatepdf';


// import PdfToHtmlConverter from './Components/tools/watermarkpdf';


import WatermarkPdfTool from './Components/tools/watermarkpdf';
import PageNumberTool from './Components/tools/pagenumber';
import PdfSignatureTool from './Components/tools/addSign';
import AddHeaderFooterToPDF from './Components/tools/addheaderfooter';
import JpgToPdfConverter from './Components/tools/jpgtopdf';
import PdfToJpgConverter from './Components/tools/pdftojpg';


import PdfToHtmlConverter from './Components/tools/pdftohtml';


import PdfCompressor from './Components/tools/compresspdf';
import PdfToPowerpointConverter from './Components/tools/pdftoppt';
import PowerPointToPdfConverter from './Components/tools/ppttopdf';
import PdfPageOrganizer from './Components/tools/organizepdf';
import PdfToExcelConverter from './Components/tools/pdftoexcel1';
import PdfTextReplacement from './Components/tools/test'

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
        <Route path="/merge-pdf" element={<PdfMerger/>}/>
        <Route path="/split-pdf" element={<PdfSplitter/>}/>
        <Route path="/compress-pdf" element={<PdfCompressor/>}/>
        <Route path="/pdftotext" element={<Pdftotext/>}/>
        <Route path="/pdftoword" element={<PdfToWordConverter/>}/>
        <Route path="/exceltopdf" element={<ExcelToPdfConverter/>}/>
        <Route path="/deletepdfpages" element={<DeletePdfPages/>}/>
        <Route path="/watermarkpdf" element={<WatermarkPdfTool/>}/>
        <Route path="/addpagenumbertopdf" element={<PageNumberTool/>}/>
        <Route path="/signp-pdf" element={<PdfSignatureTool/>}/>
        <Route path="/addheaderfooter" element={<AddHeaderFooterToPDF/>}/>
        <Route path="/jpgtopdf" element={<JpgToPdfConverter/>}/>
        <Route path="/pdftojpg" element={<PdfToJpgConverter/>}/>
        <Route path="/wordtopdf" element={<WordToPdfConverter/>}/>
        <Route path="/pdftohtml" element={<PdfToHtmlConverter/>}/>
        <Route path="/pdftoppt" element={<PdfToPowerpointConverter/>}/>
        <Route path="/ppttopdf" element={<PowerPointToPdfConverter/>}/>
        <Route path="/pdf-organizer" element={<PdfPageOrganizer/>}/>
        <Route path="/pdftoexcel" element={<PdfToExcelConverter/>}/>
        {/* <Route path="/resizepdf" element={<PdfPageSizeChanger/>}/> */}
        <Route path="/htmltopdf" element={<HtmlToPdfConverter/>}/>
        <Route path="/rotatepdf" element={<RotatePdfTool/>}/>
        
        
      </Routes>
      <Footer/>
      </BrowserRouter>  
       
    </div> 
     <div className="App"> 
      
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
      {/* <PdfToExcelConverter /> */}
      {/* <PdfTextReplacement /> */}


     </div>
    </>
  );
}

export default App;
