const databaseCompare = {
  title: 'Compare Database plans',
  columns: [
    { key: 'free', label: 'Free' },
    { key: 'flex', label: 'Flex' },
    { key: 'plus', label: 'Plus' },
    { key: 'premium', label: 'Premium' },
  ],
  banners: ['Features', 'Pricing dimensions'],
  sections: [
    {
      heading: 'Contract',
      rows: [
        {
          label: 'Contract',
          values: {
            free: 'Always free',
            flex: 'Monthly (Pay-as-you-go)',
            plus: 'Annual (prepaid)',
            premium: 'Prepaid Commitment',
          },
        },
      ],
    },
    {
      heading: 'Core Database',
      rows: [
        {
          label: 'Deployment type',
          values: {
            free: 'Shared',
            flex: 'Shared',
            plus: 'Shared',
            premium: 'Dedicated',
          },
        },
        {
          label: 'Object limit',
          values: {
            free: '100,000',
            flex: 'Unlimited',
            plus: 'Unlimited',
            premium: 'Unlimited',
          },
        },
        {
          label: 'Included resources',
          values: {
            free: '1 GB RAM · 20 GB disk',
            flex: 'Pay-as-you-go',
            plus: 'Prepaid annual',
            premium: 'Prepaid',
          },
        },
        {
          label: 'Clusters / collections',
          values: {
            free: '1 cluster · 1 collection',
            flex: 'Unlimited',
            plus: 'Unlimited',
            premium: 'Unlimited',
          },
        },
        {
          label: 'Hybrid search',
          values: { free: true, flex: true, plus: true, premium: true },
        },
        {
          label: 'Backup retention',
          values: {
            free: false,
            flex: '7 days',
            plus: '30 days',
            premium: '45 days',
          },
        },
        {
          label: 'Vector compression',
          values: { free: true, flex: true, plus: true, premium: true },
        },
        {
          label: 'HA / replication',
          values: { free: true, flex: true, plus: true, premium: true },
        },
        {
          label: 'Multi-tenancy',
          values: { free: true, flex: true, plus: true, premium: true },
        },
      ],
    },
    {
      heading: 'Security',
      rows: [
        {
          label: 'RBAC',
          values: { free: true, flex: true, plus: true, premium: true },
        },
        {
          label: 'SSO / SAML',
          values: { free: false, flex: false, plus: true, premium: true },
        },
        {
          label: 'Bring your own IdP',
          values: {
            free: false,
            flex: false,
            plus: false,
            premium: 'Coming soon',
          },
        },
        {
          label: 'HIPAA compliant',
          values: { free: false, flex: false, plus: false, premium: true },
        },
        {
          label: 'PrivateLink (AWS)',
          values: { free: false, flex: false, plus: false, premium: true },
        },
      ],
    },
    {
      heading: 'AI Services',
      rows: [
        {
          label: 'Query Agent monthly max requests',
          values: {
            free: '1,000',
            flex: '30,000',
            plus: 'Unlimited',
            premium: 'Unlimited',
          },
        },
        {
          label: 'Embeddings shared service',
          values: {
            free: 'Limited',
            flex: true,
            plus: true,
            premium: true,
          },
        },
      ],
    },
    {
      heading: 'Support / Onboarding',
      rows: [
        {
          label: 'Email support',
          values: { free: false, flex: true, plus: true, premium: true },
        },
        {
          label: 'Phone support',
          values: { free: false, flex: false, plus: true, premium: true },
        },
        {
          label: 'Slack support',
          values: { free: false, flex: false, plus: true, premium: true },
        },
        {
          label: 'Technical Account Team',
          values: {
            free: false,
            flex: false,
            plus: false,
            premium: true,
          },
        },
        {
          label: 'Instructor-led jumpstart training',
          values: {
            free: false,
            flex: false,
            plus: 'Available',
            premium: 'Available',
          },
        },
      ],
    },
    {
      heading: 'SLAs',
      rows: [
        {
          label: 'Availability',
          values: {
            free: 'Best effort',
            flex: '99.5%',
            plus: '99.9%',
            premium: '99.95%',
          },
        },
        {
          label: 'Severity 1 response time',
          values: {
            free: false,
            flex: '1 business day',
            plus: '4-hour',
            premium: '1-hour',
          },
        },
      ],
    },
    {
      heading: 'Pricing dimensions',
      rows: [
        {
          label: 'Minimum',
          values: {
            free: 'Free',
            flex: '$45 / month',
            plus: '$280 / month',
            premium: '$400 / month',
          },
        },
        {
          label: 'Vector dimensions',
          values: {
            free: 'Free',
            flex: 'from $0.01668 / 1M',
            plus: 'from $0.0139 / 1M',
            premium: 'from $0.00975 / 1M',
          },
        },
        {
          label: 'Storage',
          values: {
            free: 'Free',
            flex: 'from $0.255 / GiB',
            plus: 'from $0.2125 / GiB',
            premium: 'from $0.31875 / GiB',
          },
        },
        {
          label: 'Backup',
          values: {
            free: 'Free',
            flex: 'from $0.0264 / GiB',
            plus: 'from $0.022 / GiB',
            premium: 'from $0.033 / GiB',
          },
        },
        {
          label: 'Data transfer',
          values: {
            free: 'Free for promotional period',
            flex: 'Free for promotional period',
            plus: 'Free for promotional period',
            premium: 'Free for promotional period',
          },
        },
      ],
    },
  ],
};

export default databaseCompare;