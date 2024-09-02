import React, { useState } from 'react';
import { ImageConfig } from '../../../config/ImageConfig'; 
import { IoFolderOpenOutline } from "react-icons/io5";
import { FiDownloadCloud } from "react-icons/fi";
import './FileList.css';

const FileListComponent = ({ files, onDownload }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('subject'); 
  const [showAll, setShowAll] = useState(false); 

  const filteredFiles = files.filter((file) => {
    const filenameMatch = file.filename && file.filename.toLowerCase().includes(searchTerm.toLowerCase());
    const subjectMatch = file.subject && file.subject.toLowerCase().includes(searchTerm.toLowerCase());
    return filenameMatch || subjectMatch;
  });


  const sortedFiles = filteredFiles.sort((a, b) => {
    if (a[sortBy] < b[sortBy]) return -1;
    if (a[sortBy] > b[sortBy]) return 1;
    return 0;
  });

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSort = (e) => {
    setSortBy(e.target.value);
  };

  const handleViewPDF = (fileName) => {
    window.open(`http://localhost:3001/viewpdf/${fileName}`, '_blank');
  };

  const handleDownload = (fileName) => {
    onDownload(fileName);
  };

  return (
    <div className="main-file">
      <div className="circle1"></div>
      <div className="circle2"></div>
      <div className="main-body">
        <h1>All Files</h1>

        <div className="search_bar" >
          <input type="text" value={searchTerm} onChange={handleSearch} placeholder="Search files here..."/>
          <select value={sortBy} onChange={handleSort}>
            <option value="filename">Filename</option>
            <option value="department">Department</option>
            <option value="semester">Semester</option>
            <option value="unit">Unit</option>
          </select>
          <select className="filter">
            <option>Filter</option>
          </select>
        </div>
        <div className="row-item">
          <p>There are more than <span>{showAll ? files.length : Math.min(files.length, 10)}</span> Files</p>
          {!showAll && <label onClick={() => setShowAll(true)}>See all</label>}
        </div>
      </div>
      {showAll ? (
        <div>
          {sortedFiles.map((file, index) => (
            <div className="file_card">
              <div key={index._id} className="file_details">
                <div className="img">
                  <img src={ ImageConfig['pdf']} alt="" />
                </div>
                <div className="text-1">
                  <h1>{file.subject}</h1>
                  <p>{file.department}</p>
                </div>
                <div className="text">
                  <span>{file.semester}</span>
                  <span>{file.unit}</span>
                </div>
                <div className="file_btn">
                  <button onClick={() => handleViewPDF(file.filename)} ><i><IoFolderOpenOutline /></i>View PDF</button>
                  <button onClick={() => handleDownload(file.filename)} ><i><FiDownloadCloud /></i>Download</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div>
          {sortedFiles.slice(0, 10).map((file, index) => (
            <div className="file_card">
              <div key={index._id} className="file_details">
                <div className="img">
                  <img src={ ImageConfig['pdf']} alt="" />
                </div>
                <div className="text-1">
                  <h1>{file.subject}</h1>
                  <p>{file.department}</p>
                </div>
                <div className="text">
                  <span>{file.semester}</span>
                  <span>{file.unit}</span>
                </div>
                <div className="file_btn">
                  <button onClick={() => handleViewPDF(file.filename)} ><i><IoFolderOpenOutline /></i>View PDF</button>
                  <button onClick={() => handleDownload(file.filename)} ><i><FiDownloadCloud /></i>Download</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FileListComponent;
