import React from 'react';
import styles from './styles.module.scss';
import Link from '@docusaurus/Link';

const ModalComponent = ({ details, onClose }) => {
  if (!details) return null; // Render nothing if no details are provided

  return (
    <div className={styles.modals} onClick={onClose}>
      <div
        className={styles.modalContents}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.modalGrid}>
          {details.photo && (
            <img src={'/img/site/' + details.photo} alt={details.title} />
          )}
          <h3>{details.title}</h3>
          <span className={styles.modalText}>{details.text}</span>
          <div>
            {details.tags.map((tag, index) => (
              <span key={index} className={styles.tag}>
                {tag}
              </span>
            ))}
          </div>
          {details.link && (
            <Link to={details.link} className={styles.modalLink}>
              Read more on site
            </Link>
          )}
        </div>
        <div className={styles.closeButtonContainer}>
          <Link onClick={onClose} className={styles.close}>
            <i className="fa-solid fa-xmark"></i>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default ModalComponent;
