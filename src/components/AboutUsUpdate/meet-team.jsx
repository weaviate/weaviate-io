import React, { useState } from 'react';
import styles from './styles.module.scss';
import { LinkButton } from '/src/theme/Buttons';
import Link from '@docusaurus/Link';
import Person from './person';
import people from '/data/people.json';
import { ButtonContainer } from '../../theme/Buttons';

export default function MeetTheTeam() {
  const [selectedTeam, setSelectedTeam] = useState('applied-research');

  const handleTeamFilter = (team) => {
    setSelectedTeam(team);
  };

  const filterPeople = (person) => {
    if (selectedTeam === 'All') {
      return true;
    }
    return person.team.includes(selectedTeam);
  };

  return (
    <div className={styles.teamBG}>
      <div className="container" id="meet_the_team">
        <div className={styles.box}>
          <h1>Meet the Team</h1>
          <p className="text-center">
            Weaviate is a global remote-first startup, with teams hailing from
            many different parts of the world, where it is not totally uncommon
            for someone to work remotely from fun places.
          </p>
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
              onClick={() => handleTeamFilter('applied-research')}
            >
              #Applied Research
            </Link>
            <Link
              className={selectedTeam === 'wcd' ? styles.linkActive : ''}
              onClick={() => handleTeamFilter('wcd')}
            >
              #Cloud Services
            </Link>
            <Link
              className={
                selectedTeam === 'board-advisors' ? styles.linkActive : ''
              }
              onClick={() => handleTeamFilter('board-advisors')}
            >
              #Board&Advisors
            </Link>
            <Link
              className={selectedTeam === 'ceo-team' ? styles.linkActive : ''}
              onClick={() => handleTeamFilter('ceo-team')}
            >
              #CEO team
            </Link>
            <Link
              className={selectedTeam === 'cto' ? styles.linkActive : ''}
              onClick={() => handleTeamFilter('cto')}
            >
              #CTO team
            </Link>

            <Link
              className={selectedTeam === 'database' ? styles.linkActive : ''}
              onClick={() => handleTeamFilter('database')}
            >
              #Database
            </Link>
            <Link
              className={
                selectedTeam === 'developer-growth' ? styles.linkActive : ''
              }
              onClick={() => handleTeamFilter('developer-growth')}
            >
              #Developer Growth
            </Link>
          </div>
          <div className={styles.teamFilter}>
            <Link
              className={
                selectedTeam === 'developer-relations' ? styles.linkActive : ''
              }
              onClick={() => handleTeamFilter('developer-relations')}
            >
              #Developer Relations
            </Link>
            <Link
              className={selectedTeam === 'delivery' ? styles.linkActive : ''}
              onClick={() => handleTeamFilter('delivery')}
            >
              #Delivery
            </Link>
            <Link
              className={selectedTeam === 'finance' ? styles.linkActive : ''}
              onClick={() => handleTeamFilter('finance')}
            >
              #Finance
            </Link>
            <Link
              className={selectedTeam === 'marketing' ? styles.linkActive : ''}
              onClick={() => handleTeamFilter('marketing')}
            >
              #Marketing
            </Link>
            <Link
              className={
                selectedTeam === 'partnerships' ? styles.linkActive : ''
              }
              onClick={() => handleTeamFilter('partnerships')}
            >
              #Partnerships
            </Link>
            <Link
              className={
                selectedTeam === 'people-and-culture' ? styles.linkActive : ''
              }
              onClick={() => handleTeamFilter('people-and-culture')}
            >
              #People & Culture
            </Link>
            <Link
              className={selectedTeam === 'sales' ? styles.linkActive : ''}
              onClick={() => handleTeamFilter('sales')}
            >
              #Sales
            </Link>
            <Link
              className={
                selectedTeam === 'weaviate-labs' ? styles.linkActive : ''
              }
              onClick={() => handleTeamFilter('weaviate-labs')}
            >
              #Weaviate Labs
            </Link>
          </div>
          <hr></hr>
        </div>

        <div
          className={`${
            styles.peopleContainer
          } ${selectedTeam.toLowerCase()}-team`}
        >
          {people.filter(filterPeople).map((person) => (
            <Person key={person.name} details={person} />
          ))}
        </div>
        <div className={styles.buttonsContainer}>
          <Link className={styles.buttonOutline} to="/company/careers">
            Browse Open Positions
          </Link>
        </div>
      </div>
    </div>
  );
}
