import React from 'react';
import { unitData } from '/src/components/Academy/unitData.js';
import { courseData } from '/src/components/Academy/courseData.js';
import './academy.css'

function LearningGoals(props) {

  let data = ""
  if (props.unitName !== undefined) {
    data = unitData[props.unitName]
  } else if (props.courseName !== undefined) {
    data = courseData[props.courseName]
  }

  let goalsArray = [];
  let outcomesArray = [];

  for (let i = 0; i < data.learningGoals.length; i++) {
    goalsArray.push(
      <li>
        {data.learningGoals[i]}
      </li>
    );
  };
  for (let i = 0; i < data.learningOutcomes.length; i++) {
    outcomesArray.push(
      <li>
        {data.learningOutcomes[i]}
      </li>
    )
  };

  return (
    <div class="card __academycard">
      <div class="card__body">
        <div class="learning_goal_head">
          <h4><i class="fa-solid fa-person-chalkboard"></i>&nbsp;&nbsp;Here, we will cover:</h4>
          <span class="badge badge--secondary">Learning Goals</span>
        </div>

        <ul>{goalsArray}</ul>
        <hr/>
        <div class="learning_goal_head">
          <h4><i class="fa-solid fa-screwdriver-wrench"></i>&nbsp;&nbsp;By the time you are finished, you will be able to:</h4>
          <span class="badge badge--secondary">Learning Outcomes</span>
        </div>
        <ul>{outcomesArray}</ul>
      </div>
    </div>
  )
};

export default LearningGoals;
