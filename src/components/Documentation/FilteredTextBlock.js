import React from 'react';
import CodeBlock from '@theme/CodeBlock';

// GitHub configuration - could be moved to a separate config file
const GITHUB_CONFIG = {
    baseUrl: 'https://github.com/weaviate/weaviate-io',
    branch: 'main',
};

const DOC_SYSTEMS = {
    py: {
        baseUrl:
            'https://weaviate-python-client.readthedocs.io/en/stable/weaviate.html',
        constructUrl: (baseUrl, ref) => `${baseUrl}#weaviate.${ref}`,
        icon: '/img/site/logo-py.svg',
    },
    pyv3: {
        baseUrl:
            'https://weaviate-python-client.readthedocs.io/en/v3.26.2/weaviate.html',
        constructUrl: (baseUrl, ref) => `${baseUrl}#weaviate.${ref}`,
        icon: '/img/site/logo-py.svg',
    },
    ts: {
        baseUrl: 'https://weaviate.github.io/typescript-client',
        constructUrl: (baseUrl, ref) => `${baseUrl}#${ref}`,
        icon: '/img/site/logo-ts.svg',
    },
    go: {
        baseUrl:
            'https://pkg.go.dev/github.com/weaviate/weaviate-go-client/v4/weaviate',
        constructUrl: (baseUrl, ref) => `${baseUrl}#${ref}`,
        icon: '/img/site/logo-go.svg',
    },
};

DOC_SYSTEMS.python = DOC_SYSTEMS.py;
DOC_SYSTEMS.js = DOC_SYSTEMS.ts;
DOC_SYSTEMS.gonew = DOC_SYSTEMS.go;
DOC_SYSTEMS.goraw = DOC_SYSTEMS.go;

// Custom styles for badges
const badgeStyles = {
    badge: {
        padding: '0.25rem 0.75rem', // Reduced vertical padding
        marginRight: '0.5rem', // Space between badges
        marginBottom: '0.5rem', // Space between rows when wrapped
    },
    deprecated: {
        backgroundColor: 'orange',
        color: 'black',
    },
};

// Function to format the display label
const formatLabel = (ref) => {
    const parts = ref.split('.');
    return '.' + parts[parts.length - 1];
};

const FilteredTextBlock = ({
    text,
    startMarker,
    endMarker,
    language,
    includeStartMarker = 'false',
    title = '',
    path,
    docRefs = [],
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
        case 'pyv3':
            language2 = 'py';
            break;
        case 'gonew':
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

    // Get doc system for this language
    const docSystem = DOC_SYSTEMS[language];

    // Generate doc links with proper URLs and icons
    const docLinks = Array.isArray(docRefs)
        ? docRefs.map((ref) => ({
              label: formatLabel(ref),
              url: docSystem?.constructUrl(docSystem.baseUrl, ref),
              icon: docSystem?.icon,
          }))
        : [];

    return (
        <div>
            <CodeBlock className={`language-${language2}`} title={title}>
                {filteredLines}
            </CodeBlock>
            <div className="flex flex-wrap gap-2 mt-2">
                {githubUrl && (
                    <a
                        href={githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="badge badge--secondary"
                        title="View full source on GitHub"
                        style={badgeStyles.badge}
                    >
                        <svg
                            height="16"
                            width="16"
                            aria-hidden="true"
                            viewBox="0 0 16 16"
                            style={{ verticalAlign: 'middle' }}
                        >
                            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>
                        </svg>
                        <span style={{ verticalAlign: 'middle' }}>
                            &nbsp;&nbsp;View full example code
                        </span>
                    </a>
                )}
                {docSystem?.baseUrl && (
                    <a
                        href={docSystem.baseUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="badge badge--secondary"
                        title="View API documentation"
                        style={badgeStyles.badge}
                    >
                        {docSystem.icon ? (
                            <img
                                src={docSystem.icon}
                                alt={`${language} docs`}
                                height="16"
                                width="16"
                                style={{ verticalAlign: 'middle' }}
                            />
                        ) : (
                            <svg
                                height="16"
                                width="16"
                                aria-hidden="true"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                style={{ verticalAlign: 'middle' }}
                            >
                                <path d="M6.5 2h11c.7 0 1.3.6 1.3 1.3v17.4c0 .7-.6 1.3-1.3 1.3h-11c-.7 0-1.3-.6-1.3-1.3V3.3C5.2 2.6 5.8 2 6.5 2zm1 2v16h9V4h-9zm2 3h5v1h-5V7zm0 3h5v1h-5v-1zm0 3h3v1h-3v-1z" />
                            </svg>
                        )}
                        <span style={{ verticalAlign: 'middle' }}>
                            &nbsp;&nbsp;API docs
                        </span>
                    </a>
                )}
                {language === 'pyv3' && (
                    <a
                        href="https://weaviate.io/developers/weaviate/client-libraries/python/python_v3"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="badge badge--warning"
                        title="View latest version documentation"
                        style={{
                            ...badgeStyles.badge,
                            ...badgeStyles.deprecated,
                        }}
                    >
                        <svg
                            height="16"
                            width="16"
                            aria-hidden="true"
                            viewBox="0 0 16 16"
                            fill="currentColor"
                            style={{ verticalAlign: 'middle' }}
                        >
                            <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                        </svg>
                        <span style={{ verticalAlign: 'middle' }}>
                            &nbsp;&nbsp;Deprecated (v3)
                        </span>
                    </a>
                )}
                {docLinks.map(({ label, url, icon }, index) => (
                    <a
                        key={index}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="badge badge--secondary"
                        title={`View ${label} documentation`}
                        style={badgeStyles.badge}
                    >
                        {icon ? (
                            <img
                                src={icon}
                                alt=""
                                height="16"
                                width="16"
                                style={{ verticalAlign: 'middle' }}
                            />
                        ) : (
                            <svg
                                height="16"
                                width="16"
                                aria-hidden="true"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                style={{ verticalAlign: 'middle' }}
                            >
                                <path d="M6.5 2h11c.7 0 1.3.6 1.3 1.3v17.4c0 .7-.6 1.3-1.3 1.3h-11c-.7 0-1.3-.6-1.3-1.3V3.3C5.2 2.6 5.8 2 6.5 2zm1 2v16h9V4h-9zm2 3h5v1h-5V7zm0 3h5v1h-5v-1zm0 3h3v1h-3v-1z" />
                            </svg>
                        )}
                        <span style={{ verticalAlign: 'middle' }}>
                            &nbsp;&nbsp;{label}
                        </span>
                    </a>
                ))}
            </div>
        </div>
    );
};

export default FilteredTextBlock;
