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
  const [tailorJobs, setTailorJobs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 10;
  const [departments, setDepartments] = useState({});
  const [selectedDepartment, setSelectedDepartment] = useState('');

  useEffect(() => {
    fetchDepartments().then(fetchAllJobs);
  }, []);

  const fetchDepartments = async () => {
    const url = 'https://api.teamtailor.com/v1/departments';
    const response = await fetch(url, { headers });
    const data = await response.json();
    const departmentMap = {};
    data.data.forEach((dept) => {
      departmentMap[dept.id] = dept.attributes.name;
    });
    setDepartments(departmentMap);
  };

  const fetchJobsPage = async (page) => {
    const url = `https://api.teamtailor.com/v1/jobs?page[number]=${page}&page[size]=${jobsPerPage}`;
    const response = await fetch(url, { headers });
    const data = await response.json();
    return data;
  };

  const fetchAllJobs = async () => {
    let allJobs = [];
    let page = 1;
    let totalPages = 1;

    do {
      const data = await fetchJobsPage(page);
      allJobs = [...allJobs, ...data.data];
      totalPages = data.meta['page-count'];
      page += 1;
    } while (page <= totalPages);

    setRawJobs(allJobs);
    getJobs(allJobs);
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
    setTailorJobs(jobs);
  };

  const fetchDepartment = async (item) => {
    if (!item.relationships.department.links) {
      return 'No Department';
    }
    return await fetch(item.relationships.department.links.related, {
      headers: headers,
    })
      .then((res) => res.json())
      .then((data) => (data.data ? data.data.attributes.name : '--'));
  };

  const handleDepartmentChange = (event) => {
    setSelectedDepartment(event.target.value);
    setCurrentPage(1);
  };

  const filteredJobs = tailorJobs.filter((job) =>
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
                  <option value="">ALL DEPARTMENTS</option>
                  {Object.values(departments).map((dept, index) => (
                    <option key={index} value={dept}>
                      {dept}
                    </option>
                  ))}
                </select>
              </div>
              <p className={styles.removeInMobile}>LOCATION</p>
            </div>

            {currentJobs.length > 0 ? (
              currentJobs.map((job) => (
                <a
                  key={job.id}
                  className={styles.jobContent}
                  href={job.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <p>{job.title}</p>
                  <p>{job.department}</p>
                  <p className={styles.removeInMobile}>
                    {job.remote && 'Remote'}
                  </p>
                </a>
              ))
            ) : (
              <p>No jobs found</p>
            )}

            <div className={styles.pagination}>
              <button
                className={styles.paginationButtons}
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <button
                className={styles.paginationButtons}
                onClick={() => paginate(currentPage + 1)}
                disabled={indexOfLastJob >= filteredJobs.length}
              >
                Next
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
