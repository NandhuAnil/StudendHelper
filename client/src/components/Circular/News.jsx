import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './Circular.css';


const NewsApp = () => {
  const [news, setNews] = useState([]);
  const [linkEnabled, setLinkEnabled] = useState(false);
  const [title, setTitle] = useState('');
  const [link, setLink] = useState('');

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const response = await axios.get('http://localhost:3001/news');
      setNews(response.data);
    } catch (error) {
      console.error('Error fetching news:', error);
    }
  };

  const deleteNews = async (title) => {
    try {
      await axios.delete(`http://localhost:3001/news/${title}`);
      fetchNews();
      toast.success("News deleted successfully");
    } catch (error) {
      console.error('Error deleting news:', error);
    }
  };

  const handleUpload = async () => {
    try {
      const newNews = { title, link };
      await axios.post('http://localhost:3001/news', newNews);
      setTitle('');
      setLink('');
      toast.success("News uploaded successfully");
    } catch (error) {
      console.error('Error uploading news:', error);
      toast.error("Failed to upload news");
    }
  };

  return (
    <div className="main">
      <ToastContainer />
      <div className="circular-upload">
        <h2>Upload News</h2>
        <div className="inputfield">
          <label>
            Headline:
          </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter News heading here"
            />
            <label>
              Enable Links:  
              <input
                type="checkbox"
                checked={linkEnabled}
                onChange={(e) => setLinkEnabled(e.target.checked)}
              />
            </label>
          {linkEnabled && 
          <>
            <label>
              Link:
            </label>
            <input
              type="text"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              placeholder="Place your link here"
            /></>}
          <button onClick={handleUpload}>Upload</button>
        </div>
      </div>

      <div className="circular-list">
        <h2>Uploaded News</h2>
          {news.map((item) => (
            <div key={item} className="news-list">
              {item.title}
              <a href={item.link}>Click Here</a>
              <button onClick={() => deleteNews(item.title)}>Delete</button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default NewsApp;
