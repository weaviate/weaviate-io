export function analyticsSiteSearched(searchTerm) {
    // Plausible might not be loaded, e.g. if blocked by an ad blocker
    if (typeof plausible === 'function')
        plausible('Site Search', {
            props: { searchTerm }
        });
}

export function analyticsSiteSearchSelected (searchTerm, uri, title) {
    // Plausible might not be loaded, e.g. if blocked by an ad blocker
    if (typeof plausible === 'function')
        plausible('Site Search Selected', {
            props: {
                searchTerm,
                uri,
                title,
                summary: JSON.stringify({searchTerm, uri, title})
            }
        });
}

export function analyticsSiteSearchResultsRejected(searchTerm) {
    // Plausible might not be loaded, e.g. if blocked by an ad blocker
    if (typeof plausible === 'function')
        plausible('Site Search Results Rejected', {
            props: {
                searchTerm
            }
        });
}
