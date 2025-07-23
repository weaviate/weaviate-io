import React from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';
import Head from '@docusaurus/Head';

const CloudPage = () => {
  return (
    <>
      <Head>
        <meta name="robots" content="noindex" />
        <link rel="canonical" href="https://console.weaviate.cloud" />
        <title>Redirecting to Console...</title>
      </Head>

      <BrowserOnly
        fallback={
          <div className="loadingIcon">
            <svg
              width="50px"
              height="50px"
              viewBox="0 0 200 200"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                fill="#130C49"
                stroke="#130C49"
                strokeWidth="15"
                r="15"
                cx="40"
                cy="65"
              >
                <animate
                  attributeName="cy"
                  calcMode="spline"
                  dur="2"
                  values="65;135;65;"
                  keySplines=".5 0 .5 1;.5 0 .5 1"
                  repeatCount="indefinite"
                  begin="-.4"
                />
              </circle>
              <circle
                fill="#130C49"
                stroke="#130C49"
                strokeWidth="15"
                r="15"
                cx="100"
                cy="65"
              >
                <animate
                  attributeName="cy"
                  calcMode="spline"
                  dur="2"
                  values="65;135;65;"
                  keySplines=".5 0 .5 1;.5 0 .5 1"
                  repeatCount="indefinite"
                  begin="-.2"
                />
              </circle>
              <circle
                fill="#130C49"
                stroke="#130C49"
                strokeWidth="15"
                r="15"
                cx="160"
                cy="65"
              >
                <animate
                  attributeName="cy"
                  calcMode="spline"
                  dur="2"
                  values="65;135;65;"
                  keySplines=".5 0 .5 1;.5 0 .5 1"
                  repeatCount="indefinite"
                  begin="0"
                />
              </circle>
            </svg>
          </div>
        }
      >
        {() => {
          window.location.href = 'https://console.weaviate.cloud';

          return (
            <div className="loadingIcon">
              <svg
                width="50px"
                height="50px"
                viewBox="0 0 200 200"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  fill="#130C49"
                  stroke="#130C49"
                  strokeWidth="15"
                  r="15"
                  cx="40"
                  cy="65"
                >
                  <animate
                    attributeName="cy"
                    calcMode="spline"
                    dur="2"
                    values="65;135;65;"
                    keySplines=".5 0 .5 1;.5 0 .5 1"
                    repeatCount="indefinite"
                    begin="-.4"
                  />
                </circle>
                <circle
                  fill="#130C49"
                  stroke="#130C49"
                  strokeWidth="15"
                  r="15"
                  cx="100"
                  cy="65"
                >
                  <animate
                    attributeName="cy"
                    calcMode="spline"
                    dur="2"
                    values="65;135;65;"
                    keySplines=".5 0 .5 1;.5 0 .5 1"
                    repeatCount="indefinite"
                    begin="-.2"
                  />
                </circle>
                <circle
                  fill="#130C49"
                  stroke="#130C49"
                  strokeWidth="15"
                  r="15"
                  cx="160"
                  cy="65"
                >
                  <animate
                    attributeName="cy"
                    calcMode="spline"
                    dur="2"
                    values="65;135;65;"
                    keySplines=".5 0 .5 1;.5 0 .5 1"
                    repeatCount="indefinite"
                    begin="0"
                  />
                </circle>
              </svg>
            </div>
          );
        }}
      </BrowserOnly>
    </>
  );
};

export default CloudPage;
