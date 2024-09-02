import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './uploadfile.css';

import { ImageConfig } from '../../../config/ImageConfig'; 
import uploadImg from '../../../assets/FileUploadIcons/cloud-upload-regular-240.png';

const DropFileInput = props => {
    const [file, setFile] = useState(null);
    const [filename, setFilename] = useState('');
    const [subject, setSubject] = useState('');
    const [department, setDepartment] = useState('');
    const [semester, setSemester] = useState('');
    const [unit, setUnit] = useState('');

    const wrapperRef = useRef(null);

    const [fileList, setFileList] = useState([]);

    const onDragEnter = () => wrapperRef.current.classList.add('dragover');

    const onDragLeave = () => wrapperRef.current.classList.remove('dragover');

    const onDrop = () => wrapperRef.current.classList.remove('dragover');

    
    const onFileDrop = (e) => {
        const newFile = e.target.files[0];
        if (newFile) {
            const updatedList = [...fileList, newFile];
            setFileList(updatedList);
            props.onFileChange(updatedList);
        }
    }

    const fileRemove = (file) => {
        const updatedList = [...fileList];
        updatedList.splice(fileList.indexOf(file), 1);
        setFileList(updatedList);
        props.onFileChange(updatedList);
    }

    const onChangeFile = (e) => {
        setFile(e.target.files[0]);
        setFilename(e.target.files[0].name);
    };

    const handleUpload = (e) => {
        e.preventDefault();
      if (file && filename && subject && department && semester && unit) {
        const formData = new FormData();
        formData.append("pdf", file);
        formData.append("filename", filename);
        formData.append("subject", subject);
        formData.append("department", department);
        formData.append("semester", semester);
        formData.append("unit", unit);

        axios
            .post("http://localhost:3001/upload", formData,
            {
              headers: { "Content-Type": "multipart/form-data" },
            }
            )
            .then((response) => {
                console.log(response.data);
                toast.success("File uploaded successfully");
                fileRemove(file)
                window.location.reload();
            })
            .catch((error) => {
                console.error(error);
            });
        // Reset form fields
        setFile('');
        setSubject('');
        setFilename('');
        setDepartment('');
        setSemester('');
        setUnit('');
      } else {
        toast.error("Please fill all the fields");
      }
    };

    return (
        <>
        <div className='upload'>
        <ToastContainer />
            <h1>Upload Files</h1>
            <div className='details'>
                <label>
                    Subject:
                    <input type="text" value={subject} onChange={(e) => setSubject(e.target.value)} placeholder='Enter the subjectName'/>
                </label>
                <label>
                    Department:
                    <select value={department} onChange={(e) => setDepartment(e.target.value)}>
                        <option value="">Select Department</option>
                        <option value="IT">Information Technology</option>
                        <option value="CS">Computer Science</option>
                        <option value="ME">Mechanical Engineering</option>
                    </select>
                </label>
                <label>
                    Semester:
                    <select value={semester} onChange={(e) => setSemester(e.target.value)}>
                        <option value="">Select Semester</option>
                        {[...Array(8)].map((_, index) => (
                            <option key={index + 1} value={`${index + 1} Semester`}>
                            Semester -{index + 1} 
                            </option>
                        ))}
                    </select>
                </label>
                <label>
                    Units:
                    <select value={unit} onChange={(e) => setUnit(e.target.value)}>
                        <option value="">Select the Number of Units</option>
                        {[...Array(5)].map((_, index) => (
                            <option key={index + 1} value={`${index + 1} Unit`}>
                            Unit-{index + 1}
                            </option>
                        ))}
                    </select>
                </label>
            </div>

            <div className="upload_section">
                <div
                    ref={wrapperRef}
                    className="drop-file-input"
                    onDragEnter={onDragEnter}
                    onDragLeave={onDragLeave}
                    onDrop={onDrop}
                    >
                    <div className="drop-file-input__label">
                        <img src={uploadImg} alt="" />
                        <p>Drag & Drop your files here</p>
                    </div>
                    <input type="file" onChange={(e) => onChangeFile(e) || onFileDrop(e)} />
                </div>
                
                <div className="drop-file-preview">
                    <p className="drop-file-preview__title">
                        Ready to upload
                    </p>
                    <hr />
                    {
                        fileList.map((item, index) => (
                            <div key={index} className="drop-file-preview__item">
                                <img src={ImageConfig[item.type.split('/')[1]] || ImageConfig['default']} alt="" />
                                <div className="drop-file-preview__item__info">
                                    <p>{item.name}</p>
                                    <p>{Math.round(item.size / 1024)}KB</p>
                                </div>
                                <span className="drop-file-preview__item__del" onClick={() => fileRemove(item)}>x</span>
                            </div>
                        ))
                    }
                </div>
                
            </div> 
            <div className='btn'>
                <button onClick={handleUpload}>Upload</button>
            </div>           
        </div>
        </>
    );
    }

DropFileInput.propTypes = {
    onFileChange: PropTypes.func
}
DropFileInput.propTypes = {
    onFileUpload: PropTypes.func
}

export default DropFileInput;
