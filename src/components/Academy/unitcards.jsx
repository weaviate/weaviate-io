import React from 'react';
import AcademyCard from './card';
import './academy.css'

function CardSet(props) {

  let cardData = props.cardData;
  let cardItems = [];

  for (let i = 0; i < cardData.length; i++) {
    cardItems.push(
      <div class="col col--6">
        <AcademyCard
          title={i+1 + ". " + cardData[i].title}
          body={cardData[i].body}
          buttonType={cardData[i].buttonType}
          badgeType={cardData[i].badgeType}
          buttonURL={cardData[i].buttonURL}
        />
      </div>
    )
  };

  return (<div class="row __academy_cardgroup">{cardItems}</div>)
}

export default CardSet;
