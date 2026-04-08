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
          <p className={styles.headerBox}>
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
              #Applied Research (Engineering)
            </Link>

            <Link
              className={
                selectedTeam === 'board-advisors' ? styles.linkActive : ''
              }
              onClick={() => handleTeamFilter('board-advisors')}
            >
              #Board & Advisors
            </Link>
            <Link
              className={selectedTeam === 'ceo-team' ? styles.linkActive : ''}
              onClick={() => handleTeamFilter('ceo-team')}
            >
              #CEO
            </Link>
            <Link
              className={selectedTeam === 'cto' ? styles.linkActive : ''}
              onClick={() => handleTeamFilter('cto')}
            >
              #CxO Leadership
            </Link>

            <Link
              className={selectedTeam === 'database' ? styles.linkActive : ''}
              onClick={() => handleTeamFilter('database')}
            >
              #Database (Engineering)
            </Link>

            <Link
              className={
                selectedTeam === 'developer-growth' ? styles.linkActive : ''
              }
              onClick={() => handleTeamFilter('developer-growth')}
            >
              #Growth
            </Link>
            <Link
              className={
                selectedTeam === 'weaviate-labs' ? styles.linkActive : ''
              }
              onClick={() => handleTeamFilter('weaviate-labs')}
            >
              #Innovation Labs (Engineering)
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
              className={selectedTeam === 'delivery' ? styles.linkActive : ''}
              onClick={() => handleTeamFilter('delivery')}
            >
              #Platform & SRE (Platform Operations & Security)
            </Link>
          </div>
          <div className={styles.teamFilter}>
            <Link
              className={selectedTeam === 'product' ? styles.linkActive : ''}
              onClick={() => handleTeamFilter('product')}
            >
              #Product
            </Link>
            <Link
              className={
                selectedTeam === 'partnerships' ? styles.linkActive : ''
              }
              onClick={() => handleTeamFilter('partnerships')}
            >
              #Sales & Business Development
            </Link>

            <Link
              className={
                selectedTeam === 'solution-engineering' ? styles.linkActive : ''
              }
              onClick={() => handleTeamFilter('solution-engineering')}
            >
              #Solution Engineering (Platform Operations)
            </Link>
            <Link
              className={
                selectedTeam === 'support-engineering' ? styles.linkActive : ''
              }
              onClick={() => handleTeamFilter('support-engineering')}
            >
              #Support Engineering (Platform Operations & Security)
            </Link>

            <Link
              className={selectedTeam === 'wcd' ? styles.linkActive : ''}
              onClick={() => handleTeamFilter('wcd')}
            >
              #Weaviate Cloud Console (Engineering)
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
