import React from 'react';
import Coursera from '../../assets/Images/coursera.png';
import Udemy from '../../assets/Images/udemy1.jpg';
import Simply from '../../assets/Images/Simply.jpg';
import './Resume.css'

function Course() {
  return (
    <>
        <h1 style={{textAlign: 'center', margin: '40px auto'}}>Free Online Courses</h1>
        <div className="course-grid-container">
            <div className="course-grid-items">
                <div className="course-grid-item" >
                    <a href="https://www.coursera.org/courses?query=free"><img src={Coursera} alt="template" /></a>
                    <p>Coursera Free Online Courses</p>
                </div>
            </div>
            <div className="course-grid-items">
                <div className="course-grid-item" >
                    <a href="https://www.udemy.com/courses/free/"><img src={Udemy} alt="template" /></a>
                    <p>Udemy Free Online Courses</p>
                </div>
            </div>
            <div className="course-grid-items">
                <div className="course-grid-item" >
                    <a href="https://www.simplilearn.com/skillup-free-online-courses#exploreCoursesSkillup"><img src={Simply} alt="template" /></a>
                    <p>Simplilearn Free Online Courses</p>
                </div>
            </div>
        </div>
    </>
  )
}

export default Course
