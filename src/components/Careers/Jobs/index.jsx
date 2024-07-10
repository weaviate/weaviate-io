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
  const [currentPage, setCurrentPage] = useState(1);
  const [jobsPerPage] = useState(6); // Updated to 6 jobs per page
  const [departments, setDepartments] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState('');

  const fetchJobs = () => {
    const url = 'https://api.teamtailor.com/v1/jobs';
    fetch(url, {
      headers: headers,
    })
      .then((response) => response.json())
      .then((data) => {
        setRawJobs(data);
        getJobs(data.data);
      });
  };

  const getJobs = async (jobsData) => {
    const jobs = await Promise.all(
      jobsData.map(async (item) => {
        const department = await fetchDepartment(item);
        return {
          id: item.id,
          title: item.attributes.title,
          remote: item.attributes['remote-status'],
          link: item.links['careersite-job-url'],
          department: department,
        };
      })
    );
    setTailorjobs(jobs);
    const uniqueDepartments = [...new Set(jobs.map((job) => job.department))];
    setDepartments(uniqueDepartments);
  };

  const fetchDepartment = async (item) => {
    if (!item.relationships.department.links) {
      return 'No Department';
    }
    return await fetch(item.relationships.department.links.related, {
      headers: headers,
    })
      .then((res) => res.json())
      .then((data) => (data.data ? data.data.attributes.name : '-'));
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleDepartmentChange = (event) => {
    setSelectedDepartment(event.target.value);
    setCurrentPage(1); // Reset to first page on department change
  };

  const filteredJobs = tailorjobs.filter((job) =>
    selectedDepartment ? job.department === selectedDepartment : true
  );

  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
              <div className={styles.removeInMobile}>
                <select
                  value={selectedDepartment}
                  onChange={handleDepartmentChange}
                  className={styles.departmentSelect}
                >
                  <option value="">All departments</option>
                  {departments.map((dept, index) => (
                    <option key={index} value={dept}>
                      {dept}
                    </option>
                  ))}
                </select>
              </div>
              <p className={styles.removeInMobile}>LOCATION</p>
            </div>

            {currentJobs &&
              currentJobs.length > 0 &&
              currentJobs.map((job) => (
                <a
                  key={job.id}
                  className={styles.jobContent}
                  href={job.link}
                  target="_blank"
                >
                  <p>{job.title}</p>
                  <p>{job.department}</p>
                  <p className={styles.removeInMobile}>
                    {job.remote && 'Remote'}
                  </p>
                </a>
              ))}

            <div className={styles.pagination}>
              <button
                className={styles.paginationButtons}
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
              >
                1
              </button>
              <button
                className={styles.paginationButtons}
                onClick={() => paginate(currentPage + 1)}
                disabled={indexOfLastJob >= filteredJobs.length}
              >
                2
              </button>
            </div>
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
