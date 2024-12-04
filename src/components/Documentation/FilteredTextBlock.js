import React from 'react';
import CodeBlock from '@theme/CodeBlock';

// GitHub configuration - could be moved to a separate config file
const GITHUB_CONFIG = {
    baseUrl: 'https://github.com/weaviate/weaviate-io',
    branch: 'main',
};

const DOCS_CONFIG = {
  baseUrls: {
      py: 'https://weaviate-python-client.readthedocs.io/en/stable/weaviate.html',
      pyv3: undefined,
      ts: undefined,
      java: undefined,
      go: undefined,
  }
};

const FilteredTextBlock = ({
    text,
    startMarker,
    endMarker,
    language,
    includeStartMarker = 'false',
    title = '',
    path,
}) => {
    // Filter out lines that are before the start marker, and lines with or after the end marker
    includeStartMarker = includeStartMarker == 'true';
    const lines = text.split('\n');
    const universalStartMarker = 'START-ANY';
    const universalEndMarker = 'END-ANY';
    let withinMarkers = false;
    let format;
    switch (language) {
        case 'java':
            // remove leading indent of 4 spaces
            format = (input) => input.replace(/^    /, '');
            break;
        case 'goraw':
            format = (input) =>
                input
                    // replace remaining tabs with 2 spaces
                    .replace(/\t/g, '    ');
            break;
        case 'gonew':
            format = (input) =>
                input
                    // replace remaining tabs with 2 spaces
                    .replace(/\t/g, '  ')
                    .replace(/^  /g, '');
            break;
        case 'go':
            format = (input) =>
                input
                    // remove leading indent of 2 or 1 tabs
                    .replace(input.match(/^\t\t/) ? /^\t\t/ : /^\t/, '')
                    // replace remaining tabs with 2 spaces
                    .replace(/\t/, '  ');
            break;
        default:
            format = (input) => input;
    }

    const filteredLines = lines
        .filter((line) => {
            if (
                line.includes(startMarker) ||
                line.includes(universalStartMarker)
            ) {
                withinMarkers = true;
                return includeStartMarker;
            }

            if (line.includes(endMarker) || line.includes(universalEndMarker)) {
                withinMarkers = false;
                return false;
            }

            return withinMarkers;
        })
        .map(format)
        .join('\n');

    let language2 = language;
    switch (language2) {
        case 'gonew':
            language2 = 'go';
            break;
        case 'goraw':
            language2 = 'go';
            break;
        case 'javaraw':
            language2 = 'java';
            break;
    }

    // Generate GitHub URL if path is provided
    const githubUrl = path
        ? `${GITHUB_CONFIG.baseUrl}/blob/${GITHUB_CONFIG.branch}/${path}`
        : null;

    // Get docs URL if available for this language
    const docsUrl = DOCS_CONFIG.baseUrls[language2];

    return (
        <div>
            <CodeBlock className={`language-${language2}`} title={title}>
                {filteredLines}
            </CodeBlock>
            {githubUrl && (
                <div>
                    <a
                        href={githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="badge badge--secondary"
                        title="View full source on GitHub"
                    >
                        <svg height="16" width="16" aria-hidden="true" viewBox="0 0 16 16" style={{ verticalAlign: 'middle' }}>
                            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>
                        </svg>
                        <span style={{ verticalAlign: 'middle' }}>&nbsp;&nbsp;View full example code</span>
                    </a>
                </div>
            )}
                {docsUrl && (
                    <a
                        href={docsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="badge badge--secondary inline-flex items-center"
                        title="View API documentation"
                    >
                        <svg height="16" width="16" aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" style={{ verticalAlign: 'middle' }}>
                            <path d="M6.5 2h11c.7 0 1.3.6 1.3 1.3v17.4c0 .7-.6 1.3-1.3 1.3h-11c-.7 0-1.3-.6-1.3-1.3V3.3C5.2 2.6 5.8 2 6.5 2zm1 2v16h9V4h-9zm2 3h5v1h-5V7zm0 3h5v1h-5v-1zm0 3h3v1h-3v-1z"/>
                        </svg>
                        <span style={{ verticalAlign: 'middle' }}>&nbsp;&nbsp;API docs</span>
                    </a>
                )}
        </div>
    );
};

export default FilteredTextBlock;
