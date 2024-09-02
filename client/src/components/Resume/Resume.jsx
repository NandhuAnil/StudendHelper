import React from 'react';
import Resume1 from '../../assets/Images/Resume1.jpg';
import Resume2 from '../../assets/Images/Resume2.jpg';
import Resume3 from '../../assets/Images/Resume3.jpg';
import './Resume.css'

function Resume() {
  return (
    <>
      <h1 style={{textAlign: 'center', margin: '40px auto'}}>Resumes Templates</h1>
      <div className="resume-grid-container">
        <div className="resume-grid-items">
          <div className="resume-grid-item" >
              <a href="https://docs.google.com/presentation/d/1Zjm3q3GDgs5bB0iEI9sZHAGVHV_sioBR5vUp_3XBQe4/template/preview"><img src={Resume1} alt="template" /></a>
              <p>Fresher Resume Template</p>
          </div>
        </div>
        <div className="resume-grid-items">
          <div className="resume-grid-item" >
              <a href="https://docs.google.com/presentation/d/1Q_6NWvIPWmKkcVemTb8R-IapZDF7WF6S6LxQf0pIylY/template/preview"><img src={Resume2} alt="template" /></a>
              <p>Professional resume</p>
          </div>
        </div>
        <div className="resume-grid-items">
          <div className="resume-grid-item" >
              <a href="https://docs.google.com/presentation/d/18fqhAKsgyMBbk-Ep6T-4a1AqpQ4hoYvJOOPsxyebc1g/template/preview"><img src={Resume3} alt="template" /></a>
              <p>College Resume</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default Resume
