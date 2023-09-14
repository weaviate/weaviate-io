import React from 'react';
import styles from './styles.module.scss';
import { LinkButton } from '/src/theme/Buttons';
import Link from '@docusaurus/Link';
import Person from './person';
import people from '/data/people.json';
import { ButtonContainer } from '../../theme/Buttons';

export default function MeetTheTeam() {
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
            <Link className={styles.pricingButton} to="#applied-research">
              #Applied Research
            </Link>
            <Link className={styles.pricingButton} to="#board-advisors">
              #Board&Advisors
            </Link>
            <Link className={styles.pricingButton} to="#ceo-team">
              #CEO team
            </Link>
            <Link className={styles.pricingButton} to="#cloud-services">
              #Cloud Services
            </Link>
            <Link className={styles.pricingButton} to="#cloud-strategy">
              #Cloud Strategy
            </Link>
            <Link className={styles.pricingButton} to="#core-engineering">
              #Core Engineering
            </Link>
            <Link className={styles.pricingButton} to="#customer-success">
              #Customer Success
            </Link>
          </div>
          <div className={styles.teamFilter}>
            <Link className={styles.pricingButton} to="#cx0">
              #CxO leadership
            </Link>
            <Link className={styles.pricingButton} to="#design">
              #Design
            </Link>
            <Link className={styles.pricingButton} to="#developer-growth">
              #Developer Growth
            </Link>
            <Link className={styles.pricingButton} to="#devrel">
              #DevRel
            </Link>
            <Link className={styles.pricingButton} to="#marketing">
              #Marketing
            </Link>
            <Link className={styles.pricingButton} to="#partnerships">
              #Partnerships
            </Link>
            <Link className={styles.pricingButton} to="#people-culture">
              #People&Culture
            </Link>
            <Link className={styles.pricingButton} to="#sales">
              #Sales
            </Link>
            <Link className={styles.pricingButton} to="#sales-engineering">
              #Sales Engineering
            </Link>
          </div>
          <hr></hr>
        </div>

        <div className={styles.peopleContainer}>
          {people.map((person) => {
            return <Person key={person.name} details={person} />;
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
