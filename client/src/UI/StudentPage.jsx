import React,{ useState, useEffect } from 'react';
import axios from 'axios';
import { Navbar, StDashbroad, Newsslider, ViewFile, Resume, Course } from '../components'

function StudentPage() {
    const [activeComponent, setActiveComponent] = useState('dashbroad');
    const [files, setFiles] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3001/files')
        .then(response => response.json())
        .then(filesData => {
            setFiles(filesData); 
        })
        .catch(error => console.error('Error fetching files:', error));
    }, []);

    const handleDownload = async ( fileName ) => {
      try {
        const response = await axios.get(`http://localhost:3001/download/${fileName}`, {
            responseType: 'blob', // Important
        });
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', fileName);
        document.body.appendChild(link);
        link.click();
      } catch (error) {
          console.error('Error downloading file:', error);
      }
    };

    const switchToHome = () => {
        setActiveComponent('dashbroad');
    };
    const switchToNotes = () => {
        setActiveComponent('notes');
    };

  return (
    <div className="Student">
      <div className="nav-section">
        <Navbar onHome={switchToHome} onNotes={switchToNotes} />
      </div>
      <div className="std-content">
        {activeComponent === 'dashbroad' && (
          <div className="Newsdisplay"><Newsslider /><StDashbroad /><Resume /><Course /></div>
        )}
        {activeComponent === 'notes' && (
          <ViewFile files={files} onDownload={(fileName) => handleDownload(fileName)} />
        )}
      </div>
    </div>
  )
}

export default StudentPage
