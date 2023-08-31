import React from "react";
import "./Home.css";
import styled, { keyframes } from "styled-components";
import { Link } from "react-router-dom";

const fade = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Container = styled.div`
  text-align: center;
  padding: 2rem;
`;

const Header = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
`;

const ToolsContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;

const ToolCard = styled.div`
  width: 200px;
  height: 220px;
  border: 1px solid #ccc;
  margin: 10px;
  padding: 20px;
  animation: ${fade} 1s ease-in-out;
`;

export const Home = () => {
  const tools = [
    { id: 1, title: "PDF to Word" },
    { id: 2, title: "Split PDF" },
    { id: 3, title: "Compress PDF" },
    // ... add other tools
  ];
  return (
    <>     
      <div className="title"><br />
        <h1 class="heading title-font font-medium text-3xl ">
          Our 35 PDF tools family make your PDF work easy on one place
        </h1>
        <p class="para leading-relaxed mt-4">
          Our every PDF tool is smarter and faster to make your that edit,
          convert, merge, split, compress, lock, unlock, watermark and
          searchable 100% FREE with just in few clicks.
        </p>
      </div>
      <div className="tools">
        <div className="container">
          <div class="ui grid">

            <div class="four wide column">
              <div className="item">
                <div className="icon">
                  <img className="icon" src="images/mergepdf.svg" alt="" />
                </div>
                <h3 style={{ textAlign: "center" }}>Merge PDF</h3>
                <div className="content">
                Combine your multiple PDFs files into one PDFs document free in just few seconds.
                </div>
              </div>
            </div>


            <div class="four wide column">
              <div className="item">
                <div className="icon">
                  <img className="icon" src="images/splitpdf.svg" alt="" />
                </div>
                <h3 style={{ textAlign: "center" }}>Split PDF</h3>
                <div className="content">
                Extract pages from your PDF file or save a set of PDF pages easily. 
                </div>
              </div>
            </div>


            <div class="four wide column">
              <div className="item">
                <div className="icon">
                  <img className="icon" src="images/compresspdf.svg" alt="" />
                </div>
                <h3 style={{ textAlign: "center" }}>Compress PDf</h3>
                <div className="content">
                Reduce your PDF file size without losing quality.
                </div>
              </div>
            </div>


            <div class="four wide column">
              <div className="item">
                <div className="icon">
                  <img className="icon" src="images/pdftoword.svg" alt="" />
                </div>
                <h3 style={{ textAlign: "center" }}> PDF to word</h3>
                <div className="content">
                Convert your PDFs file into a editable word document easily within few clicks.
                </div>
              </div>
            </div>


            <div class="four wide column">
              <div className="item">
                <div className="icon">
                  <img className="icon" src="images/pdftoexcel.svg" alt="" />
                </div>
                <h3 style={{ textAlign: "center" }}>PDF to excel</h3>
                <div className="content">
                Convert your PDFs file into a Microsoft Excel or XLS spreadsheets.
                </div>
              </div>
            </div>


            <div class="four wide column">
              <div className="item">
                <div className="icon">
                  <img className="icon" src="images/pdftopowerpoint.svg" alt="" />
                </div>
                <h3 style={{ textAlign: "center" }}>pdf to PowerPoint</h3>
                <div className="content">
                Convert your PDFs file into PPT & PPTX Slideshows easily within few clicks.
                </div>
              </div>
            </div>

            <div class="four wide column">
              <div className="item">
                <div className="icon">
                  <img className="icon" src="images/pdftohtml.svg" alt="" />
                </div>
                <h3 style={{ textAlign: "center" }}>PDF to HTML</h3>
                <div className="content">
                  Convert youe images to pdf for free
                </div>
              </div>
            </div>

            <div class="four wide column">
              <div className="item">
                <div className="icon">
                  <img className="icon" src="images/wordtopdf.svg" alt="" />
                </div>
                <h3 style={{ textAlign: "center" }}>Word to pdf</h3>
                <div className="content">
                Make a PDF file easily form DOC & DOCX document within few clicks.
                </div>
              </div>
            </div>

            <div class="four wide column">
              <div className="item">
                <div className="icon">
                  <img className="icon" src="images/exceltopdf.svg" alt="" />
                </div>
                <h3 style={{ textAlign: "center" }}>Excel to PDF</h3>
                <div className="content">
                Make a PDF file easily form XLS & XLSX spreadsheets within few clicks.
                </div>
              </div>
            </div>

            <div class="four wide column">
              <div className="item">
                <div className="icon">
                  <img className="icon" src="images/powerpointtopdf.svg" alt="" />
                </div>
                <h3 style={{ textAlign: "center" }}>PowerPoint to PDF</h3>
                <div className="content">
                Make a PDF file easily form PPT & PPTX slideshows within few clicks.
                </div>
              </div>
            </div>

            <div class="four wide column">
              <div className="item">
                <div className="icon">
                  <img className="icon" src="images/htmltopdf.svg" alt="" />
                </div>
                <h3 style={{ textAlign: "center" }}>HTML to PDF</h3>
                <div className="content">
                  Convert youe images to pdf for free
                </div>
              </div>
            </div>

            <div class="four wide column">
              <div className="item">
                <div className="icon">
                  <img className="icon" src="images/editpdf.svg" alt="" />
                </div>
                <h3 style={{ textAlign: "center" }}>Edit PDF</h3>
                <div className="content">
                Add text, images, shapes and freehand annotations to a PDF document. Also add custom colors and edit text size, font or style.
                </div>
              </div>
            </div>


            <div class="four wide column">
              <div className="item">
                <div className="icon">
                  <img className="icon" src="images/pdftojpg.svg" alt="" />
                </div>
                <h3 style={{ textAlign: "center" }}>PDF to JPG</h3>
                <div className="content">
                Extract all images from a PDF document or extract each page as a separate JPG image easily.
                </div>
              </div>
            </div>


            <div class="four wide column">
              <div className="item">
                <div className="icon">
                  <img className="icon" src="images/jpgtopdf.svg" alt="" />
                </div>
                <h3 style={{ textAlign: "center" }}>JPG to PDF</h3>
                <div className="content">
                Convert JPG, PNG, BMP, TIFF & GIF into a PDF document. You easily change the orientation, margins and paper size.
                </div>
              </div>
            </div>


            <div class="four wide column">
              <div className="item">
                <div className="icon">
                  <img className="icon" src="images/signup.svg" alt="" />
                </div>
                <h3 style={{ textAlign: "center" }}>Sign PDF</h3>
                <div className="content">
                Add eSign in a PDF document with custom sign, stamp, date and name or request electronic signature from others.
                </div>
              </div>
            </div>


            <div class="four wide column">
              <div className="item">
                <div className="icon">
                  <img className="icon" src="images/watermarkpdf.svg" alt="" />
                </div>
                <h3 style={{ textAlign: "center" }}>Watermark PDF</h3>
                <div className="content">
                Add watermark with stamp, image or text with custom position, typography and transparency.
                </div>
              </div>
            </div>


            <div class="four wide column">
              <div className="item">
                <div className="icon">
                  <img className="icon" src="images/rotatepdf.svg" alt="" />
                </div>
                <h3 style={{ textAlign: "center" }}>Rotate PDF</h3>
                <div className="content">
                Rotate one or all pages in your PDFs the way you need them. You can even rotate multiple PDFs file at a time.
                </div>
              </div>
            </div>


            <div class="four wide column">
              <div className="item">
                <div className="icon">
                  <img className="icon" src="images/unlockpdf.svg" alt="" />
                </div>
                <h3 style={{ textAlign: "center" }}>Unlock PDF</h3>
                <div className="content">
                Remove a password security, encryption and permissions from your PDF in one click.
                </div>
              </div>
            </div>

            <div class="four wide column">
              <div className="item">
                <div className="icon">
                  <img className="icon" src="images/protectpdf.svg" alt="" />
                </div>
                <h3 style={{ textAlign: "center" }}>Protect PDF</h3>
                <div className="content">
                Encrypt your PDF file with a password Using PDFClear and prevent from unauthorized access.
                </div>
              </div>
            </div>


            <div class="four wide column">
              <div className="item">
                <div className="icon">
                  <img className="icon" src="images/organizepdf.svg" alt="" />
                </div>
                <h3 style={{ textAlign: "center" }}>Organize PDF</h3>
                <div className="content">
                Sort pages of your PDF file. Also delete PDF pages and add new PDF pages to your documents easily.
                </div>
              </div>
            </div>


            <div class="four wide column">
              <div className="item">
                <div className="icon">
                  <img className="icon" src="images/pdftopdfa.svg" alt="" />
                </div>
                <h3 style={{ textAlign: "center" }}>PDF to PDF/A</h3>
                <div className="content">
                Convert PDF document to PDF/A format for storing & archiving using PDFClear.
                </div>
              </div>
            </div>


            <div class="four wide column">
              <div className="item">
                <div className="icon">
                  <img className="icon" src="images/repairpdf.svg" alt="" />
                </div>
                <h3 style={{ textAlign: "center" }}>Repair PDF</h3>
                <div className="content">
                Repair damaged or corrupted PDF file and recover data from corrupt PDF document using PDFClear.
                </div>
              </div>
            </div>

            <div class="four wide column">
              <div className="item">
                <div className="icon">
                  <img className="icon" src="images/pagenumber.svg" alt="" />
                </div>
                <h3 style={{ textAlign: "center" }}>Page Number</h3>
                <div className="content">
                Add page numbers to your PDF files with custom position & dimensions with in few seconds.
                </div>
              </div>
            </div>


            <div class="four wide column">
              <div className="item">
                <div className="icon">
                  <img className="icon" src="images/ocrpdf.svg" alt="" />
                </div>
                <h3 style={{ textAlign: "center" }}>OCR PDF</h3>
                <div className="content">
                You easily convert your scanned PDF file into searchable and selectable document with custom language selection.
                </div>
              </div>
            </div>


            <div class="four wide column">
              <div className="item">
                <div className="icon">
                  <img className="icon" src="images/deletepdfpages.svg" alt="" />
                </div>
                <h3 style={{ textAlign: "center" }}>Delete PDF Pages</h3>
                <div className="content">
                Remove one or multiple PDF pages you don’t need easily and get net PDF file without deleted pages.
                </div>
              </div>
            </div>


            <div class="four wide column">
              <div className="item">
                <div className="icon">
                  <img className="icon" src="images/croppdf.svg" alt="" />
                </div>
                <h3 style={{ textAlign: "center" }}>Crop PDF</h3>
                <div className="content">
                Crop PDF unusable area, margins or watermarks in one click and all PDF pages are cropped.
                </div>
              </div>
            </div>


            <div class="four wide column">
              <div className="item">
                <div className="icon">
                  <img className="icon" src="images/epubtopdf.svg" alt="" />
                </div>
                <h3 style={{ textAlign: "center" }}>EPUB to PDF</h3>
                <div className="content">
                Convert your EPUB ebook files into with using PDFClear online, free, instantly and without any registration.
                </div>
              </div>
            </div>


            <div class="four wide column">
              <div className="item">
                <div className="icon">
                  <img className="icon" src="images/mobitopdf.svg" alt="" />
                </div>
                <h3 style={{ textAlign: "center" }}>MOBI to PDF</h3>
                <div className="content">
                Convert your file from Mobi pocket to PDF with free, online & fast.
                </div>
              </div>
            </div>

            <div class="four wide column">
              <div className="item">
                <div className="icon">
                  <img className="icon" src="images/pdftotext.svg" alt="" />
                </div>
                <h3 style={{ textAlign: "center" }}>PDF to Text</h3>
                <div className="content">
                Convert PDF to text using PDFClear and edit test easily.
                </div>
              </div>
            </div>


            <div class="four wide column">
              <div className="item">
                <div className="icon">
                  <img className="icon" src="images/replacepdftext.svg" alt="" />
                </div>
                <h3 style={{ textAlign: "center" }}>Replace Text in PDF</h3>
                <div className="content">
                Find and replace text in PDF just some click free and online.
                </div>
              </div>
            </div>


            <div class="four wide column">
              <div className="item">
                <div className="icon">
                  <img className="icon" src="images/addheaderfooter.svg" alt="" />
                </div>
                <h3 style={{ textAlign: "center" }}>Add Header & Footer</h3>
                <div className="content">
                Add header and footer on all PDF pages online, free and easy.
                </div>
              </div>
            </div>


            <div class="four wide column">
              <div className="item">
                <div className="icon">
                  <img className="icon" src="images/pdftograyscale.svg" alt="" />
                </div>
                <h3 style={{ textAlign: "center" }}>PDF to Grayscale</h3>
                <div className="content">
                Convert PDF to Grayscale. Make colored PDF text and images into black and white.
                </div>
              </div>
            </div>


            <div class="four wide column">
              <div className="item">
                <div className="icon">
                  <img className="icon" src="images/changepdfpagesize.svg" alt="" />
                </div>
                <h3 style={{ textAlign: "center" }}> Change PDF Page Size</h3>
                <div className="content">
                Upload your file from computer or a cloud and change custom page size like A4, A3 or Latter size.
                </div>
              </div>
            </div>


            <div class="four wide column">
              <div className="item">
                <div className="icon">
                  <img className="icon" src="images/comparepdffiles.svg" alt="" />
                </div>
                <h3 style={{ textAlign: "center" }}>Compare PDF Files</h3>
                <div className="content">
                You compare PDF files quick and easy using PDFClear.
                </div>
              </div>
            </div>

            <div class="four wide column">
              <div className="item">
                <div className="icon">
                  <img className="icon" src="images/fillablepdf.svg" alt="" />
                </div>
                <h3 style={{ textAlign: "center" }}>Fillable PDF</h3>
                <div className="content">
                Make Fillable PDF that allow users to enter text form fields.
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};
