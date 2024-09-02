import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CarouselPage.css';
import { Carousel } from 'react-bootstrap';

function Dashbroad() {
    const [images, setImages] = useState([]);

    // Function to fetch uploaded images from the server
    const fetchImages = async () => {
        try {
            const response = await axios.get('http://localhost:3001/images');
            setImages(response.data);
        } catch (error) {
            console.error('Error fetching images:', error);
        }
    };
    // Fetch images when the component mounts
    useEffect(() => {
        fetchImages();
    }, []);

  return (
    <div>
        <Carousel>
        {images.map((image) => (
            <Carousel.Item key={image._id} >
                <div style={{ display: 'flex' , justifyContent: 'center'}}><img style={{ height: '100vh', objectFit: 'cover', margin: '0 auto', width: '80vw' }} className="d-flex" src={`http://localhost:3001/${image.imagePath}`} alt="Bannar"/></div>
                <div>
                    <Carousel.Caption style={{zIndex: '100px', left: '0px', top: '0rem', backgroundColor: 'rgba(0, 0, 0, 0.6)', display: 'flex', justifyContent: 'flex-end' , flexDirection: 'column', width: '100%', height: '100%'}} >
                        <h3>{image.imageName}</h3>
                        <p></p>
                    </Carousel.Caption>
                </div>
            </Carousel.Item>
        ))}
        </Carousel>
    </div>
  )
}

export default Dashbroad
