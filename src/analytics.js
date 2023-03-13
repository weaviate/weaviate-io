export const analyticsSiteSearched = (searchTerm) =>
    plausible('site-search', {
        props: { searchTerm }
    })

export const analyticsSiteSearchSelected = (searchTerm, uri) =>
    plausible('site-search-selected', {
        props: { searchTerm, uri }
    })
