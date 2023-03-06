import React from 'react';
import styles from './styles.module.scss';
import { LinkButton } from '/src/theme/Buttons';

import Person from './person';
import people from '/data/people.json'
import { ButtonContainer } from '../../theme/Buttons';

export default function MeetTheTeam() {
  return (
    <div className="container" id="meet_the_team">
      <div className={styles.box}>
        <h1>
          Meet the <span className="highlight">Team</span>
        </h1>
        <p className="text-center">
          Weaviate a global remote-first startup, with teams hailing from many different parts of the world, where it is not totally uncommon for someone to work remotely from fun places. At Weaviate we believe that the next wave of software infrastructure is AI-first and that a strong open-source community is a basis for creating high-quality software.
        </p>
      </div>

      <div className={styles.peopleContainer}>
        {people.map((person) => {
          return (
            <Person key={person.name} details={person}/>
          )
        })}
      </div>
    
      <ButtonContainer>
        <LinkButton link="/company/careers">Browse Open Positions</LinkButton>
      </ButtonContainer>
    </div>


  );
}
