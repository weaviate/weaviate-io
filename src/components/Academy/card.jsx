import React from 'react';
import './academy.css'

function AcademyCard(props) {

  let badgeClass = ""
  let badgeTxt = ""
  let btnClass = ""
  let btnTxt = ""
  let btnURL = ""
  let btnComp = ""
  let note = ""

  if (props.badgeType == "theory") {
    badgeClass = "badge badge--success";
    badgeTxt = "Theory";
  } else if (props.badgeType == "practical") {
    badgeClass = "badge badge--info";
    badgeTxt = "Practical";
  } else if (props.badgeType == "course") {
    badgeClass = "badge badge--primary";
    badgeTxt = "Course";
  } else if (props.badgeType == "mixed") {
    badgeClass = "badge badge--warning";
    badgeTxt = "Mixed";
  } else {
    badgeClass = "badge badge--secondary";
    badgeTxt = "Other";
  };

  if (props.buttonType == "Notify") {
    btnClass = "button button--outline button--secondary button--block";
    btnTxt = "Notify me when ready";
  } else if (props.buttonType == "TBD") {
    btnClass = "button button--outline button--secondary button--block";
    btnTxt = "Coming soon";
  } else {
    btnClass = "button button--primary button--block";
    btnTxt = props.buttonType;
  };

  if (props.buttonURL == null) {
    btnComp = <button class={btnClass}>{btnTxt}</button>
  } else {
    btnURL = props.buttonURL
    btnComp = <a class={btnClass} href={btnURL}>{btnTxt}</a>
  }

  // const badgeClass = "badge badge--note";
  // const badgeTxt = props.badgeType;

  return (
    <div class="card __academycard">
      <div class="card__header">
        <h4>{props.title}</h4>
      </div>
      <div class="card__body">
        <span class={badgeClass}>{badgeTxt}</span> {props.note != null? <span class="badge badge--secondary">{props.note}</span>: null }
        <p>
        {props.body}
        </p>
      </div>
      <div class="card__footer">
        {btnComp}
      </div>
    </div>
  )
};

export default AcademyCard;