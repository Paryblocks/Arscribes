import { Document, Page} from 'react-pdf';
import { useState, useEffect } from 'react';

const EditablePDFViewer = ({ pdfData }) => {
  return (
    <div>
      <Document src={pdfData}>
        <Page pageNumber={1}/>
      </Document>
    </div>
  );
};

export default EditablePDFViewer;
