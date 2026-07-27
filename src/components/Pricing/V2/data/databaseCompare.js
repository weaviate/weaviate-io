const databaseCompare = {
  title: 'Compare Database plans',
  columns: [
    { key: 'free', label: 'Free' },
    { key: 'flex', label: 'Flex' },
    { key: 'plus', label: 'Plus' },
    { key: 'premiumShared', label: 'Shared', group: 'Premium' },
    { key: 'premiumDedicated', label: 'Dedicated', group: 'Premium' },
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
            plus: 'Prepaid Commitment',
            premiumShared: 'Prepaid Commitment',
            premiumDedicated: 'Prepaid Commitment',
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
            premiumShared: 'Shared',
            premiumDedicated: 'Dedicated',
          },
        },
        {
          label: 'Object limit',
          values: {
            free: '100,000',
            flex: 'Unlimited',
            plus: 'Unlimited',
            premiumShared: 'Unlimited',
            premiumDedicated: 'Unlimited',
          },
        },
        {
          label: 'Collection limit',
          values: {
            free: '1',
            flex: '1000',
            plus: '1000',
            premiumShared: '1000',
            premiumDedicated: '1000',
          },
        },
        {
          label: 'Hybrid search',
          values: {
            free: true,
            flex: true,
            plus: true,
            premiumShared: true,
            premiumDedicated: true,
          },
        },
        {
          label: 'Backup retention',
          values: {
            free: false,
            flex: '7 days',
            plus: '30 days',
            premiumShared: '30 days',
            premiumDedicated: '45 days',
          },
        },
        {
          label: 'Flexible index types',
          values: {
            free: false,
            flex: true,
            plus: true,
            premiumShared: true,
            premiumDedicated: true,
          },
        },
        {
          label: 'Vector compression',
          values: {
            free: true,
            flex: true,
            plus: true,
            premiumShared: true,
            premiumDedicated: true,
          },
        },
        {
          label: 'HA / replication',
          values: {
            free: false,
            flex: true,
            plus: true,
            premiumShared: true,
            premiumDedicated: true,
          },
        },
        {
          label: 'Multi-tenancy',
          values: {
            free: true,
            flex: true,
            plus: true,
            premiumShared: true,
            premiumDedicated: true,
          },
        },
      ],
    },
    {
      heading: 'Security',
      rows: [
        {
          label: 'RBAC',
          values: {
            free: true,
            flex: true,
            plus: true,
            premiumShared: true,
            premiumDedicated: true,
          },
        },
        {
          label: 'SSO / SAML',
          values: {
            free: false,
            flex: false,
            plus: true,
            premiumShared: true,
            premiumDedicated: true,
          },
        },
        {
          label: 'Bring your own IdP',
          values: {
            free: false,
            flex: false,
            plus: false,
            premiumShared: false,
            premiumDedicated: 'Coming soon',
          },
        },
        {
          label: 'HIPAA compliant',
          values: {
            free: false,
            flex: false,
            plus: false,
            premiumShared: false,
            premiumDedicated: true,
          },
        },
        {
          label: 'PrivateLink (AWS)',
          values: {
            free: false,
            flex: false,
            plus: false,
            premiumShared: false,
            premiumDedicated: true,
          },
        },
        {
          label: 'Encrypted volumes (customer keys)',
          values: {
            free: false,
            flex: false,
            plus: false,
            premiumShared: false,
            premiumDedicated: true,
          },
        },
      ],
    },
    {
      heading: 'Observability',
      rows: [
        {
          label: 'Metrics endpoint',
          values: {
            free: false,
            flex: false,
            plus: 'Coming soon',
            premiumShared: true,
            premiumDedicated: true,
          },
        },
        {
          label: 'Console metrics',
          values: {
            free: true,
            flex: true,
            plus: true,
            premiumShared: true,
            premiumDedicated: true,
          },
        },
      ],
    },
    {
      heading: 'AI Services',
      rows: [
        {
          label: 'Query Agent',
          values: {
            free: 'Free tier',
            flex: 'Free tier + usage-based',
            plus: 'Free tier + usage-based',
            premiumShared: 'Free tier + usage-based',
            premiumDedicated: 'Free tier + usage-based',
          },
        },
        {
          label: 'Query Agent rate limits',
          values: {
            free: '1,000 req/mo',
            flex: '30,000 req/mo',
            plus: 'Unlimited',
            premiumShared: 'Unlimited',
            premiumDedicated: 'Unlimited',
          },
        },
        {
          label: 'Embeddings',
          values: {
            free: '2,000 req/day',
            flex: 'Usage-based',
            plus: 'Usage-based',
            premiumShared: 'Usage-based',
            premiumDedicated: 'Coming soon',
          },
        },
      ],
    },
    {
      heading: 'Support / Onboarding',
      rows: [
        {
          label: 'Email support',
          values: {
            free: true,
            flex: true,
            plus: true,
            premiumShared: true,
            premiumDedicated: true,
          },
        },
        {
          label: 'Phone support',
          values: {
            free: false,
            flex: false,
            plus: false,
            premiumShared: true,
            premiumDedicated: true,
          },
        },
        {
          label: 'Slack support',
          values: {
            free: false,
            flex: false,
            plus: false,
            premiumShared: true,
            premiumDedicated: true,
          },
        },
        {
          label: 'Technical Account Team',
          values: {
            free: false,
            flex: false,
            plus: false,
            premiumShared: 'Add-on',
            premiumDedicated: 'Add-on',
          },
        },
        {
          label: 'Instructor-led jumpstart training',
          values: {
            free: false,
            flex: false,
            plus: 'Available',
            premiumShared: 'Available',
            premiumDedicated: 'Available',
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
            premiumShared: '99.9%',
            premiumDedicated: '99.95%',
          },
        },
        {
          label: 'Severity 1 response time',
          values: {
            free: false,
            flex: '1 business day',
            plus: '8-hours',
            premiumShared: '4-hours',
            premiumDedicated: '1-hour',
          },
        },
      ],
    },
    {
      heading: 'Upgrades',
      rows: [
        {
          label: 'Cluster upgrades',
          values: {
            free: 'Weaviate-managed',
            flex: 'Weaviate-managed',
            plus: 'Weaviate-managed',
            premiumShared: 'Weaviate-managed',
            premiumDedicated: 'Customer-directed',
          },
        },
      ],
    },
    {
      heading: 'Cloud Availability',
      rows: [
        {
          label: 'Cloud Service Provider',
          values: {
            free: 'AWS',
            flex: 'GCP, AWS',
            plus: 'GCP, AWS',
            premiumShared: 'GCP, AWS',
            premiumDedicated: 'GCP, AWS, Azure',
          },
        },
        {
          label: 'Regions',
          values: {
            free: 'Limited (2)',
            flex: 'Limited (7)',
            plus: 'Limited (7)',
            premiumShared: 'Limited (7)',
            premiumDedicated: 'All (~40)',
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
            premiumShared: 'from $400 / month',
            premiumDedicated: 'from $400 / month',
          },
        },
        {
          label: 'Vector dimensions',
          values: {
            free: 'Free',
            flex: 'from $0.00465 / 1M',
            plus: 'from $0.003875 / 1M',
            premiumShared: 'from $0.003875 / 1M',
            premiumDedicated: 'from $0.002718 / 1M',
          },
        },
        {
          label: 'Storage',
          values: {
            free: 'Free',
            flex: 'from $0.12 / GiB',
            plus: 'from $0.10 / GiB',
            premiumShared: 'from $0.10 / GiB',
            premiumDedicated: 'from $0.1505 / GiB',
          },
        },
        {
          label: 'Backup',
          values: {
            free: 'Free',
            flex: 'from $0.0264 / GiB',
            plus: 'from $0.0042 / GiB',
            premiumShared: 'from $0.0042 / GiB',
            premiumDedicated: 'from $0.0063 / GiB',
          },
        },
        {
          label: 'Data transfer',
          values: {
            free: 'Free',
            flex: 'Free for promotional period',
            plus: 'Free for promotional period',
            premiumShared: 'Free for promotional period',
            premiumDedicated: 'Free for promotional period',
          },
        },
      ],
    },
  ],
};

export default databaseCompare;
