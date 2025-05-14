import React, { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

export default function Jobs() {
  const { siteConfig } = useDocusaurusContext();
  const apiKey = '627t2m5j5DXEp2PzGXXIlsf_NTyBj_OATYIOkRYN';

  const [rawJobs, setRawJobs] = useState([]);
  const [tailorJobs, setTailorJobs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 20;
  const [departments, setDepartments] = useState({});
  const [selectedDepartment, setSelectedDepartment] = useState('');

  const headers = {
    Authorization: `Token token=${apiKey}`,
    'X-Api-Version': '20210218',
    'Content-Type': 'application/json',
  };

  useEffect(() => {
    if (!apiKey) {
      console.error(
        'Teamtailor API key is missing in siteConfig.customFields.teamtailorApiKey'
      );
      return;
    }
    fetchDepartments().then(fetchAllJobs);
  }, []);

  const fetchDepartments = async () => {
    try {
      const response = await fetch(
        'https://api.teamtailor.com/v1/departments',
        { headers }
      );
      if (!response.ok) {
        console.error(
          'Failed to fetch departments:',
          response.status,
          await response.text()
        );
        return;
      }

      const data = await response.json();
      const departmentMap = {};
      data.data.forEach((dept) => {
        departmentMap[dept.id] = dept.attributes.name;
      });
      setDepartments(departmentMap);
    } catch (error) {
      console.error('Error fetching departments:', error);
    }
  };

  const fetchJobsPage = async (page) => {
    try {
      const url = `https://api.teamtailor.com/v1/jobs?page[number]=${page}&page[size]=${jobsPerPage}`;
      const response = await fetch(url, { headers });

      if (!response.ok) {
        console.error(
          'Failed to fetch jobs page:',
          response.status,
          await response.text()
        );
        return { data: [], meta: { 'page-count': 0 } };
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching jobs page:', error);
      return { data: [], meta: { 'page-count': 0 } };
    }
  };

  const fetchAllJobs = async () => {
    let allJobs = [];
    let page = 1;
    let totalPages = 1;

    do {
      const data = await fetchJobsPage(page);
      if (!data || !data.data) break;

      allJobs = [...allJobs, ...data.data];
      totalPages = data.meta?.['page-count'] || 1;
      page += 1;
    } while (page <= totalPages);

    setRawJobs(allJobs);
    getJobs(allJobs);
  };

  const fetchDepartment = async (item) => {
    try {
      const related = item?.relationships?.department?.links?.related;
      if (!related) return 'No Department';

      const response = await fetch(related, { headers });
      if (!response.ok) return '--';

      const data = await response.json();
      return data.data?.attributes?.name || '--';
    } catch (error) {
      console.error('Error fetching department for job:', error);
      return '--';
    }
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
          department,
        };
      })
    );
    setTailorJobs(jobs);
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
