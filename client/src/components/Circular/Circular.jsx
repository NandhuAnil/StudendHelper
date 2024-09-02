import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Circular.css'

function ImageList() {
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageName, setImageName] = useState('');
  const [uploading, setUploading] = useState(false);

  // Function to fetch uploaded images from the server
  const fetchImages = async () => {
    try {
      const response = await axios.get('http://localhost:3001/images');
      setImages(response.data);
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };

  // Function to handle file selection
  const handleFileChange = (e) => {
    setSelectedImage(e.target.files[0]);
  };

  // Function to handle input change for image name
  const handleImageNameChange = (e) => {
    setImageName(e.target.value);
  };

  // Function to upload an image file
  const uploadImage = async () => {
    if (!selectedImage || !imageName) return;
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('image', selectedImage);
      formData.append('imageName', imageName);
      const response = await axios.post('http://localhost:3001/uploadImage', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Image uploaded successfully:', response.data);
      toast.success("Circular uploaded successfully");
      setSelectedImage(null);
      setImageName('');
      fetchImages();
      window.location.reload();
    } catch (error) {
      console.error('Error uploading image:', error);
    }
    setUploading(false);
  };

  // Function to delete an image 
  const deleteImage = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/images/${id}`);
      fetchImages();
      toast.success("Circular deleted successfully");
    } catch (error) {
      console.error('Error deleting image:', error);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  return (
    <div className="main">
      <ToastContainer />
      <div className="circular-upload">
        <h2>Upload your Circular</h2>
        <div className="inputfield">
          <input type="file" accept="image/*" onChange={handleFileChange} />
          <input type="text" value={imageName} onChange={handleImageNameChange} placeholder="Enter title of the event" />
          <button onClick={uploadImage} disabled={!selectedImage || !imageName || uploading}>
            {uploading ? 'Uploading...' : 'Upload'}
          </button>
        </div>
      </div>
      <hr />
      <div className="circular-list">
        <h2>Uploaded Circulars</h2>
        <ul>
          {images.map((image) => (
            <li key={image._id}>
              <img src={`http://localhost:3001/${image.imagePath}`} alt={image.imageName} />
              <div className="text">
                <h1>{image.imageName}</h1>
              </div>
              <div>
                <button onClick={() => deleteImage(image._id)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ImageList;
