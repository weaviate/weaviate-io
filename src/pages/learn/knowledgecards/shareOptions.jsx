import React, { useState } from 'react';
import styles from './styles.module.scss';

const ShareOptions = ({ url }) => {
  const [showShareOptions, setShowShareOptions] = useState(false);
  const [shareSuccess, setShareSuccess] = useState(false);

  const handleShare = (platformUrl) => {
    window.open(platformUrl, '_blank');
    setShowShareOptions(false);
    setShareSuccess(false);
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setShowShareOptions(false);
      setShareSuccess(true);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  return (
    <div className={styles.shareContainer}>
      {!shareSuccess && !showShareOptions && (
        <button
          className={styles.shareButton}
          onClick={() => setShowShareOptions(true)}
        >
          Share
        </button>
      )}
      {shareSuccess && (
        <div className={styles.shareButton}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-1.959 17l-4.5-4.319 1.395-1.435 3.08 2.937 7.021-7.183 1.422 1.409-8.418 8.591z" />
          </svg>
        </div>
      )}
      {showShareOptions && !shareSuccess && (
        <div className={`${styles.shareButton} ${styles.shareIcons}`}>
          <div
            onClick={() =>
              handleShare(
                `https://twitter.com/intent/tweet?url=${encodeURIComponent(
                  url
                )}`
              )
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path d="M 14.2856 10.172 L 23.2216 0 h -2.1168 l -7.7624 8.8304 L 7.1472 0 H 0 l 9.3704 13.3544 L 0 24.02 h 2.1168 l 8.192 -9.3272 l 6.544 9.3272 h 7.1472 M 2.8808 1.5632 H 6.1328 l 14.9704 20.9704 h -3.2528" />
            </svg>
          </div>

          <div
            onClick={() =>
              handleShare(
                `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                  url
                )}`
              )
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path d="M0 0v24h24v-24h-24zm8 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.397-2.586 7-2.777 7 2.476v6.759z" />
            </svg>
          </div>
          <div onClick={copyLink}>
            {' '}
            <svg
              width="24"
              height="24"
              xmlns="http://www.w3.org/2000/svg"
              fill-rule="evenodd"
              clip-rule="evenodd"
            >
              <path d="M14.851 11.923c-.179-.641-.521-1.246-1.025-1.749-1.562-1.562-4.095-1.563-5.657 0l-4.998 4.998c-1.562 1.563-1.563 4.095 0 5.657 1.562 1.563 4.096 1.561 5.656 0l3.842-3.841.333.009c.404 0 .802-.04 1.189-.117l-4.657 4.656c-.975.976-2.255 1.464-3.535 1.464-1.28 0-2.56-.488-3.535-1.464-1.952-1.951-1.952-5.12 0-7.071l4.998-4.998c.975-.976 2.256-1.464 3.536-1.464 1.279 0 2.56.488 3.535 1.464.493.493.861 1.063 1.105 1.672l-.787.784zm-5.703.147c.178.643.521 1.25 1.026 1.756 1.562 1.563 4.096 1.561 5.656 0l4.999-4.998c1.563-1.562 1.563-4.095 0-5.657-1.562-1.562-4.095-1.563-5.657 0l-3.841 3.841-.333-.009c-.404 0-.802.04-1.189.117l4.656-4.656c.975-.976 2.256-1.464 3.536-1.464 1.279 0 2.56.488 3.535 1.464 1.951 1.951 1.951 5.119 0 7.071l-4.999 4.998c-.975.976-2.255 1.464-3.535 1.464-1.28 0-2.56-.488-3.535-1.464-.494-.495-.863-1.067-1.107-1.678l.788-.785z" />
            </svg>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShareOptions;
