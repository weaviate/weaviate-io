const engramCompare = {
  title: 'Compare Engram plans',
  columns: [
    { key: 'free', label: 'Free' },
    { key: 'starter', label: 'Starter' },
    { key: 'team', label: 'Team' },
    { key: 'enterprise', label: 'Enterprise' },
  ],
  sections: [
    {
      heading: 'Plan',
      rows: [
        {
          label: 'Price',
          values: {
            free: '$0',
            starter: '$45 / mo',
            team: '$360 / mo',
            enterprise: 'Custom',
          },
        },
        {
          label: 'Overage rate',
          values: {
            free: '—',
            starter: '$0.0045 / run',
            team: '$0.0035 / run',
            enterprise: 'Negotiated',
          },
        },
      ],
    },
    {
      heading: 'Usage',
      rows: [
        {
          label: 'Pipeline runs / month',
          values: {
            free: '1,000',
            starter: '10,000',
            team: '90,000',
            enterprise: 'Committed',
          },
        },
        {
          label: 'Projects',
          values: {
            free: '1',
            starter: '3',
            team: '100',
            enterprise: 'Unlimited',
          },
        },
        {
          label: 'Overage behavior',
          values: {
            free: 'Throttle at cap',
            starter: 'Auto-topup',
            team: 'Auto-topup',
            enterprise: 'Custom',
          },
        },
      ],
    },
    {
      heading: 'Pipelines',
      rows: [
        {
          label: 'Personalisation pipeline',
          values: { free: true, starter: true, team: true, enterprise: true },
        },
        {
          label: 'All preset pipelines',
          values: { free: false, starter: true, team: true, enterprise: true },
        },
        {
          label: 'Custom pipeline builder',
          values: { free: false, starter: false, team: false, enterprise: true },
        },
      ],
    },
    {
      heading: 'Support & Security',
      rows: [
        {
          label: 'Support',
          values: {
            free: 'Community',
            starter: 'Email · 24 hr',
            team: 'Email · 8 hr',
            enterprise: 'Dedicated TAM',
          },
        },
        {
          label: 'SLA',
          values: { free: false, starter: true, team: true, enterprise: true },
        },
        {
          label: 'SSO & SAML',
          values: { free: false, starter: false, team: false, enterprise: true },
        },
      ],
    },
  ],
};

export default engramCompare;