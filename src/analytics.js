export const captureSiteSearchAnalytics = (searchTerm) =>
    plausible('Site Search', {
        props: { searchTerm }
    })
