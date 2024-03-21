import React from 'react';
import styles from './styles.module.scss';
import Link from '@docusaurus/Link';

const ModalComponent = ({ details, onClose }) => {
  if (!details) return null; // Render nothing if no details are provided

  // Use the same `typeClass` logic as in your Card component, if applicable
  const typeClass = details.type ? details.type.toLowerCase() : '';
  const displayText = details.longText || details.text;

  return (
    <div className={styles.modals} onClick={onClose}>
      <div
        className={`${styles.modalContents} ${styles[typeClass] || ''}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.cardHeader}>
          {' '}
          {/* Consider reusing cardHeader class for consistency */}
          <span className={styles.cardType}>{details.category}</span>
        </div>
        <div className={styles.cardContents}>
          {details.photo && (
            <img
              src={'/img/site/' + details.photo}
              alt={details.title}
              className={styles.cardImage}
            />
          )}
          {/* If you have a specific class for images */}
          <h3 className={styles.cardTitle}>{details.title}</h3>{' '}
          {/* Assuming you define cardTitle for card titles */}
          <span className={styles.modalText}>{displayText}</span>
          <div className={styles.bottomCard}>
            {/* {details.tags.map((tag, index) => (
              <span key={index} className={styles.tag}>
                {tag}
              </span>
            ))} */}

            {/* Conditional rendering for related content */}
            {(details.bloglink || details.doclink || details.videolink) && (
              <>
                <p className={styles.relatedText}>Related Content:</p>
                <div className={styles.relatedBox}>
                  {details.bloglink && (
                    <Link to={details.bloglink}>
                      <div className={styles.relatedBlog}>
                        <div className={styles.relatedImage}></div>
                        <div className={styles.relatedBottom}>
                          <span className={styles.relatedTitle}>Blog:</span>
                          <span className={styles.relatedSubtitle}>
                            {/* Assuming you want to display a generic title or fetch it dynamically */}
                            Combining LangChain and Weaviate
                          </span>
                        </div>
                      </div>
                    </Link>
                  )}
                  {details.doclink && (
                    <Link to={details.doclink}>
                      <div className={styles.relatedBlog}>
                        <div className={styles.relatedImage}></div>
                        <div className={styles.relatedBottom}>
                          <span className={styles.relatedTitle}>Doc:</span>
                          <span className={styles.relatedSubtitle}>
                            {/* Assuming you want to display a generic title or fetch it dynamically */}
                            Documentation
                          </span>
                        </div>
                      </div>
                    </Link>
                  )}
                  {details.videolink && (
                    <Link to={details.videolink}>
                      <div className={styles.relatedBlog}>
                        <div className={styles.relatedImage}></div>
                        <div className={styles.relatedBottom}>
                          <span className={styles.relatedTitle}>Video:</span>
                          <span className={styles.relatedSubtitle}>
                            {/* Assuming you want to display a generic title or fetch it dynamically */}
                            Video
                          </span>
                        </div>
                      </div>
                    </Link>
                  )}
                </div>
              </>
            )}
          </div>
          <span className={styles.nextText}>1 of 25</span>
          <div className={styles.nextContainer}>
            <div className={styles.nextButton}>Previous</div>
            <div className={styles.nextButton}>Next</div>
          </div>
          {/*  {details.link && (
            <Link to={details.link} className={styles.cardLink}>
              Read more on site
            </Link>
          )}
           <div className={styles.closeButtonContainer}>
          <Link onClick={onClose} className={styles.close}>
            <i className="fa-solid fa-xmark"></i>
          </Link>
        </div> */}
        </div>
      </div>
    </div>
  );
};

export default ModalComponent;
