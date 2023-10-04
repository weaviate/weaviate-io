import React, { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import Link from '@docusaurus/Link';
import fetch, { Headers } from 'node-fetch';

const headers = new Headers();
headers.append(
  'Authorization',
  'Token token=gFRyDB4BidMCbV888Q6lE1W8ubQvQYvGxNW8Ruas'
);
headers.append('X-Api-Version', '20210218');

export default function Jobs() {
  const [rawJobs, setRawJobs] = useState([]);
  const [tailorjobs, setTailorjobs] = useState([]);

  const fetchJobs = () => {
    const url = 'https://api.teamtailor.com/v1/jobs';
    const res = fetch(url, {
      headers: headers,
    })
      .then((response) => response.json())
      .then((data) => setRawJobs(data));
  };

  const getJobs = () => {
    return rawJobs.data.map(async (item, index) => {
      const departament = await fetchDepartament(item);
      let aux = {
        title: item.attributes.title,
        remote: item.attributes['remote-status'],
        link: item.links['careersite-job-url'],
        departament: departament,
      };
      console.log(aux);
      setTailorjobs((tailorjobs) => [...tailorjobs, aux]);
    });
  };

  const fetchDepartament = async (item) => {
    return await fetch(item.relationships.department.links.related, {
      headers: headers,
    })
      .then((res) => res.json())
      .then((data) => (data.data ? data.data.attributes.name : '--'));
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  useEffect(() => {
    if (rawJobs.data && rawJobs.data.length > 0) {
      getJobs();
    }
  }, [rawJobs]);

  return (
    <div className={styles.jobBoard}>
      <div className="container" id="jobs">
        <div className={styles.title}>
          <h2>Let’s work together</h2>
          <p>
            All positions at Weaviate are fully remote. However, certain
            positions are located in specific regions.
          </p>
        </div>

        <div className={styles.fakeWidth}>
          <div className={styles.jobBox}>
            <div className={styles.jobHeader}>
              <p>ROLE</p>
              <p className={styles.removeInMobile}>TEAM</p>
              <p className={styles.removeInMobile}>LOCATION</p>
            </div>
            {tailorjobs &&
              tailorjobs.length > 0 &&
              tailorjobs.map((job) => (
                <a
                  key={job.id}
                  className={styles.jobContent}
                  href={job.link}
                  target="_blank"
                >
                  <p>{job.title}</p>
                  <p className={styles.removeInMobile}>{job.departament}</p>
                  <p className={styles.removeInMobile}>
                    {job.remote && 'Remote'}
                  </p>
                </a>
              ))}
          </div>
        </div>
        <div className={styles.titleFooter}></div>
        <div className={styles.buttons}>
          <Link
            className={styles.buttonOutline}
            to="mailto:careers@weaviate.io"
          >
            Let’s have a chat
          </Link>
        </div>
      </div>
    </div>
  );
}
