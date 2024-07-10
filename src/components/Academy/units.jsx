import React from "react";
import UnitCardSet from "./unitcards";
import { unitData } from '/src/components/Academy/unitData.js'
import './academy.css'

function Units(props) {

  let cardData = props.courseData;
  let courseName = props.courseName;
  let cardItems = [];

  for (let k in cardData) {
    let units = cardData[k].units.map(d => unitData[d])

    cardItems.push(
      <div>
        <hr/>
        <h3>{cardData[k].courseId}. {cardData[k].title}</h3>
        <p>{cardData[k].body}</p>
        <hr/>
        <div>
          <UnitCardSet cardData={units}/>
        </div>
      </div>
    )
  };

  return (<div>{cardItems}</div>)
}

export default Units;