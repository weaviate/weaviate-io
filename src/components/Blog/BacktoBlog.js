import React from 'react';
import Link from '@docusaurus/Link';
import { useLocation } from '@docusaurus/router'; 
import styles from './styles.module.scss';

const BackToBlogHub = () => {
  const location = useLocation(); 

  
  const isPlaybook = location.pathname.startsWith('/company/playbook');
  const blogHubLink = isPlaybook ? '/company/playbook' : '/blog';
  const linkText = isPlaybook ? '← Back to Home' : '← Back to Blogs';

  return (
    <Link to={blogHubLink} className={styles.blogHome}>
      {linkText}
    </Link>
  );
};

export default BackToBlogHub;
