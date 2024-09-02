import React, { useState, useEffect, Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SideNavbar = React.lazy(() => import('../components/SideNavbar/SideNav'));
const Dashbroad = React.lazy(() => import('../components/Dashbroad/Dashbroad'));
const FileUpload = React.lazy(() => import('../components/FileManager/Upload/Uploadfile'));
const ViewFile = React.lazy(() => import('../components/FileManager/FileView/ViewFiles'));
const DeleteFile = React.lazy(() => import('../components/FileManager/FileView/DeleteFile'));
const EditFile = React.lazy(() => import('../components/FileManager/FileView/EditFile'));
const News = React.lazy(() => import('../components/Circular/News'));
const Circular = React.lazy(() => import('../components/Circular/Circular'));
const Newsslider = React.lazy(() => import('../components/Dashbroad/Newsslider'));

function TeacherPage() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

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

  const onFileChange = (files) => {
    console.log(files);
  };

  const handleDownload = async (fileName) => {
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

  const handleDelete = async (fileName) => {
    try {
      const response = await fetch(`http://localhost:3001/files/${fileName}`, {
        method: 'DELETE',
      });
      const data = await response.json();
      if (!response.ok) {
        alert(data.message || 'Error deleting file');
      } else {
        alert('File deleted successfully');
        window.location.reload();
      }
    } catch (error) {
      console.error('Error deleting file:', error);
      alert('Failed to delete file');
    }
  };

  const handleEdit = (fileName) => {
    const updatedDetails = {
      filename: 'New File Name',
      department: 'New Department',
      semester: 'New Semester',
      unit: 'New Unit',
    };

    fetch(`http://localhost:3001/files/${fileName}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedDetails),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to update file details');
        }
        // If successful, update the file details in the frontend
        // onEdit(updatedDetails);
      })
      .catch(error => {
        console.error('Error updating file details:', error);
      });
  };

  const switchToDashbroad = () => {
    setActiveComponent('dashbroad');
  };
  const switchToFileUpload = () => {
    setActiveComponent('fileupload');
  };
  const switchToFileView = () => {
    setActiveComponent('fileview');
  };
  const switchToFileEdit = () => {
    setActiveComponent('editfile');
  };
  const switchToDeleteFile = () => {
    setActiveComponent('deletefile');
  };
  const switchToNews = () => {
    setActiveComponent('news');
  };
  const switchToCircular = () => {
    setActiveComponent('circular');
  };

  return (
    <div className="Admin">
      <Suspense fallback={<div>Loading...</div>}>
        <div className="Admin-Nav">
          <SideNavbar
            ondashbroad={switchToDashbroad}
            onFileUpload={switchToFileUpload}
            onFileView={switchToFileView}
            onEditFile={switchToFileEdit}
            onDeleteFile={switchToDeleteFile}
            onNews={switchToNews}
            onCircular={switchToCircular}
            onLogout={handleLogout}
          />
        </div>
        <div className="Admin-content">
          {activeComponent === 'dashbroad' && (
            <div className="Newsdisplay">
              <Newsslider />
              <Dashbroad />
            </div>
          )}
          {activeComponent === 'fileupload' && (
            <FileUpload onFileChange={(files) => onFileChange(files)} />
          )}
          {activeComponent === 'fileview' && (
            <ViewFile files={files} onDownload={(fileName) => handleDownload(fileName)} />
          )}
          {activeComponent === 'editfile' && (
            <EditFile files={files} onEdit={(fileName) => handleEdit(fileName)} />
          )}
          {activeComponent === 'deletefile' && (
            <DeleteFile files={files} onDelete={(fileName) => handleDelete(fileName)} />
          )}
          {activeComponent === 'news' && <News />}
          {activeComponent === 'circular' && <Circular />}
        </div>
      </Suspense>
    </div>
  );
}

export default TeacherPage;
