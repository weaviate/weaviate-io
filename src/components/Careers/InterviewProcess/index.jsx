import Link from '@docusaurus/Link';
import React from 'react';
import styles from './styles.module.scss';

export default function InterviewProcess() {
  return (
    <div id="interview-process" className="container">
      <div className={styles.title}>
        <h2>What to expect from our interview process</h2>
      </div>
      <div className={styles.box}>
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <div className={styles.cardHeaderLeft}>
              <div className={`${styles.img} ${styles.chatImg}`} />
            </div>
            <div className={styles.cardHeaderRight}>
              <h3 className={styles.cardTextColor}>
                Step 1 <h3>Introduction chat</h3>
              </h3>
            </div>
          </div>
          <div className={styles.contentDiv}>
            <p className={styles.textCardContent}>
              Introduce yourself. Tell us about your ambitions and life goals.
              We’d like to know about you as a person - so feel free to tell us
              about your pet, hobbies or whatever it is that makes you smile.
              We’ll tell you about Weaviate, our challenges and what it’s like
              working for a remote company. Ask anything you like.
            </p>
          </div>
          <div className={styles.cardFooter}>
            <div className={styles.cardFooterDiv}>
              <div className={styles.cardHeaderLeft}>
                <div className={`${styles.img} ${styles.startImg}`} />
              </div>
              <p>Member of the People & Culture team</p>
            </div>
            <div className={styles.cardFooterDiv}>
              <div className={`${styles.img} ${styles.clockSmallImg}`} />
              <p>30 min</p>
            </div>
          </div>
        </div>
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <div className={styles.cardHeaderLeft}>
              <div className={`${styles.img} ${styles.facesImg}`} />
            </div>
            <div className={styles.cardHeaderRight}>
              <h3 className={styles.cardTextColor}>
                Step 2 <h3>Meet your future team lead</h3>
              </h3>
            </div>
          </div>
          <div className={styles.contentDiv}>
            <p className={styles.textCardContent}>
              You will have the chance to talk about your experience in greater
              depth. Give us insights into how your skills fit this role and
              we’ll share more details about the job’s responsibilities. Feel
              free to ask anything you like about the role and your future team.
            </p>
          </div>
          <div className={styles.cardFooter}>
            <div className={styles.cardFooterDiv}>
              <div className={styles.cardHeaderLeft}>
                <div className={`${styles.img} ${styles.startImg}`} />
              </div>
              <p>Hiring Manager</p>
            </div>
            <div className={styles.cardFooterDiv}>
              <div className={`${styles.img} ${styles.clockSmallImg}`} />
              <p>1 hour</p>
            </div>
          </div>
        </div>
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <div className={styles.cardHeaderLeft}>
              <div className={`${styles.img} ${styles.checkImg}`} />
            </div>
            <div className={styles.cardHeaderRight}>
              <h3 className={styles.cardTextColor}>
                Step 3 <h3>Your challenge and follow-up interview</h3>
              </h3>
            </div>
          </div>
          <div className={styles.contentDiv}>
            <p className={styles.textCardContent}>
              You will receive a Weaviate-related challenge. This assignment
              gives you insights into the type of work related to this role and
              it helps us determine your problem-solving skills. It’s not about
              giving the right answers, it's about how you approach a problem
              and come up with a solution. This will be followed by an interview
              where we discuss your solution.
            </p>
          </div>
          <div className={styles.cardFooter}>
            <div className={styles.cardFooterDiv}>
              <div className={`${styles.img} ${styles.startImg}`} />
              <p>Hiring manager and 1-2 team members</p>
            </div>
            <div className={styles.cardFooterDiv}>
              <div className={`${styles.img} ${styles.clockSmallImg}`} />
              <p>1 hour</p>
            </div>
          </div>
        </div>
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <div className={styles.cardHeaderLeft}>
              <div className={`${styles.img} ${styles.heartImg}`} />
            </div>
            <div className={styles.cardHeaderRight}>
              <h3 className={styles.cardTextColor}>
                Step 4 <h3>Are we a cultural fit?</h3>
              </h3>
            </div>
          </div>
          <div className={styles.contentDiv}>
            <p className={styles.textCardContent}>
              To be able to have a strong remote culture, Weaviate needs to hire
              the right people with a good cultural fit. Let’s talk about your
              working style & preferences, and how it fits our values and
              company culture.
            </p>
          </div>
          <div className={styles.cardFooter}>
            <div className={styles.cardFooterDiv}>
              <div className={`${styles.img} ${styles.startImg}`} />
              <p>Member of the People & Culture team</p>
            </div>
            <div className={styles.cardFooterDiv}>
              <div className={`${styles.img} ${styles.clockSmallImg}`} />
              <p>45 min</p>
            </div>
          </div>
        </div>
        <div className={`${styles.card} ${styles.longCard}`}>
          <div className={`${styles.cardHeader} ${styles.longHead}`}>
            <div className={styles.cardHeaderLeft}>
              <div className={`${styles.img} ${styles.bigHeartImg}`} />
            </div>
          </div>
          <div className={styles.contentDiv}>
            <p className={styles.textCardContent}>
              <h3 className={styles.cTextColor}>Will you join Weaviate?</h3>
              When you successfully complete these steps, we will make you an
              offer to join Weaviate. As part of our onboarding process, we will
              conduct a background check, and our offer is contingent upon the
              results of this check.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
