import React from 'react';
import CourseCardSet from './coursecards';
import './academy.css'

function Courses(props) {

  return (
    <div>
      <CourseCardSet cardData={props.courseData}/>
    </div>
  )
};

export default Courses;