import React from 'react';
import { useState } from 'react';
import styles from './styles.module.scss';
import { LinkButton } from '/src/theme/Buttons';
import Link from '@docusaurus/Link';
import Person from './person';
import people from '/data/people.json';
import { ButtonContainer } from '../../theme/Buttons';

export default function MeetTheTeam() {
  const [selectedTeam, setSelectedTeam] = useState('All'); // Initialize with 'All' to show all by default

  const handleTeamFilter = (team) => {
    setSelectedTeam(team);
  };

  return (
    <div className={styles.teamBG}>
      <div className="container" id="meet_the_team">
        <div className={styles.box}>
          <h1>Meet the Team</h1>
          <p className="text-center">
            Weaviate a global remote-first startup, with teams hailing from many
            different parts of the world, where it is not totally uncommon for
            someone to work remotely from fun places.
          </p>
          <div className={styles.teamFilter}>
            <Link onClick={() => handleTeamFilter('All')}>#All</Link>
            <Link onClick={() => handleTeamFilter('applied-research')}>
              #Applied Research
            </Link>
            <Link onClick={() => handleTeamFilter('wcs')}>#Cloud Services</Link>
            <Link onClick={() => handleTeamFilter('board-advisors')}>
              #Board&Advisors
            </Link>
            <Link onClick={() => handleTeamFilter('ceo-team')}>#CEO team</Link>

            <Link onClick={() => handleTeamFilter('cloud')}>#Cloud</Link>
            <Link onClick={() => handleTeamFilter('cloud-strategy')}>
              #Cloud Strategy
            </Link>
            <Link onClick={() => handleTeamFilter('core-engineering')}>
              #Core Engineering
            </Link>
            <Link onClick={() => handleTeamFilter('customer-success')}>
              #Customer Success
            </Link>
          </div>
          <div className={styles.teamFilter}>
            <Link onClick={() => handleTeamFilter('database')}>#Database</Link>
            <Link onClick={() => handleTeamFilter('design')}>#Design</Link>
            <Link onClick={() => handleTeamFilter('developer-growth')}>
              #Developer Growth
            </Link>

            <Link onClick={() => handleTeamFilter('developer-relations')}>
              #Developer Relations
            </Link>
            <Link onClick={() => handleTeamFilter('marketing')}>
              #Marketing
            </Link>
            <Link onClick={() => handleTeamFilter('partnerships')}>
              #Partnerships
            </Link>
            <Link onClick={() => handleTeamFilter('people-and-culture')}>
              #People & Culture
            </Link>
            <Link onClick={() => handleTeamFilter('sales')}>#Sales</Link>

            <Link onClick={() => handleTeamFilter('sales-engineering')}>
              #Sales Engineering
            </Link>
          </div>
          <hr></hr>
        </div>

        <div
          className={`${
            styles.peopleContainer
          } ${selectedTeam.toLowerCase()}-team`}
        >
          {people.map((person) => {
            if (selectedTeam === 'All' || person.team === selectedTeam) {
              return <Person key={person.name} details={person} />;
            }
            return null;
          })}
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
