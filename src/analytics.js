export const analyticsSiteSearched = (searchTerm) =>
    plausible('Site Search', {
        props: { searchTerm }
    })

export const analyticsSiteSearchSelected = (searchTerm, uri) =>
    plausible('Site Search Selected', {
        props: { searchTerm, uri }
    })
