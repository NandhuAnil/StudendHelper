import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CarouselPage.css';

function Newsslider() {
    const [news, setNews] = useState([]);

    const fetchNews = async () => {
        try {
          const response = await axios.get('http://localhost:3001/news');
          setNews(response.data);
        } catch (error) {
          console.error('Error fetching news:', error);
        }
    };
    useEffect(() => {
        fetchNews();
    }, []);
    
    return (
        <div className="scroll">
        {news.map((item) => (
            <div key={item._id} className="scrolling-text">
                {item.title}  
                {item.link && <a href={item.link}> Read More</a>}
            </div>
        ))}
        </div>
    )
}

export default Newsslider
