import React from 'react';
import { useState } from 'react';
import styles from './styles.module.scss';
import { LinkButton } from '/src/theme/Buttons';
import Link from '@docusaurus/Link';
import Person from './person';
import people from '/data/people.json';
import knowledge from '/data/knowledgecards.json';
import { ButtonContainer } from '../../theme/Buttons';

export default function MeetTheTeam() {
  const [selectedTeam, setSelectedTeam] = useState('All');

  const handleTeamFilter = (team) => {
    setSelectedTeam(team);
  };

  return (
    <div className={styles.teamBG}>
      <div className="container" id="meet_the_team">
        <div className={styles.box}>
          <div className={styles.teamFilter}>
            <Link
              className={selectedTeam === 'All' ? styles.linkActive : ''}
              onClick={() => handleTeamFilter('All')}
            >
              #All
            </Link>
            <Link
              className={
                selectedTeam === 'applied-research' ? styles.linkActive : ''
              }
              onClick={() => handleTeamFilter('Tutorial')}
            >
              #Tutorial
            </Link>
            <Link
              className={
                selectedTeam === 'applied-research' ? styles.linkActive : ''
              }
              onClick={() => handleTeamFilter('Information')}
            >
              #Information
            </Link>
            <Link
              className={
                selectedTeam === 'applied-research' ? styles.linkActive : ''
              }
              onClick={() => handleTeamFilter('Image')}
            >
              #Information
            </Link>
          </div>
          <hr></hr>
        </div>

        <div
          className={`${
            styles.peopleContainer
          } ${selectedTeam.toLowerCase()}-team`}
        >
          {knowledge.map((person) => {
            if (selectedTeam === 'All' || person.type === selectedTeam) {
              return <Person key={person.name} details={person} />;
            }
            return null;
          })}
        </div>
        <div className={styles.buttonsContainer}>
          <Link className={styles.buttonOutline} to="/developers/weaviate">
            More information
          </Link>
        </div>
      </div>
    </div>
  );
}
