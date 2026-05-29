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
            starter: 'Billed in arrears',
            team: 'Billed in arrears',
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
      heading: 'Support & SLAs',
      rows: [
        {
          label: 'Support',
          values: {
            free: 'Community',
            starter: 'Email response time - 24-hours',
            team: 'Email response time - 8-hours',
            enterprise: 'Dedicated TAM',
          },
        },
        {
          label: 'Availability',
          values: {
            free: false,
            starter: '99.5%',
            team: '99.5%',
            enterprise: '99.5%',
          },
        },
        
      ],
    },
    {
      heading: 'Security',
      rows: [
        {
          label: 'SSO & SAML',
          values: { free: false, starter: false, team: false, enterprise: true },
        },
      ],
    },
  ],
};

export default engramCompare;
