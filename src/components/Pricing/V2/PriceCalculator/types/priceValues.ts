import { pricebook } from './pricebook_20260415';

export const vectorDimensions = [
  '256',
  '384',
  '512',
  '768',
  '1024',
  '1536',
  '3072',
  '4096',
  '10752',
];

export const numOfObjects = [
  '1000',
  '10000',
  '100000',
  '1000000',
  '10000000',
  '50000000',
];

export const objectSize = [
  '512',
  '1024',
  '4096',
  '8192',
  '1000000',
  '4000000',
  '8000000',
];

export type TOptimizationProfile = 'cost-optimized' | 'performance-optimized';

type OptimizationProfileOption = {
  index: string; // vector index family
  compression: string | null; // quantization
  label: string; // tech spec shown in the UI (matches the Console)
  title: string;
  description: string;
  price_per_1m_dimension: {
    flex: number; // GCP shared Base, Low tier
    plus: number; // GCP shared Base, Mid tier
    premium: number; // GCP shared Base, High tier
  };
};

// Two optimization profiles mirror the Console's OptimizationProfile component:
//   Cost Optimized        -> hfresh / auto  (HFRESH · AUTO)
//   Performance Optimized -> hnsw  / rq-8    (HNSW · RQ-8)
export const optimizationProfiles: Record<
  TOptimizationProfile,
  OptimizationProfileOption
> = {
  'cost-optimized': {
    index: 'hfresh',
    compression: 'auto',
    label: 'HFRESH · AUTO',
    title: 'Cost Optimized',
    description:
      'Lower memory footprint and storage cost. Suitable for small or non-latency-sensitive workloads.',
    price_per_1m_dimension: {
      flex: pricebook.GCP.shared.Base.Low['Price per 1M Dims'].hfresh.Auto,
      plus: pricebook.GCP.shared.Base.Mid['Price per 1M Dims'].hfresh.Auto,
      premium: pricebook.GCP.shared.Base.High['Price per 1M Dims'].hfresh.Auto,
    },
  },
  'performance-optimized': {
    index: 'hnsw',
    compression: 'rq-8',
    label: 'HNSW · RQ-8',
    title: 'Performance Optimized',
    description:
      'In-memory retrieval balancing speed and search quality. Suitable for most workloads.',
    price_per_1m_dimension: {
      flex: pricebook.GCP.shared.Base.Low['Price per 1M Dims'].hnsw['rq-8'],
      plus: pricebook.GCP.shared.Base.Mid['Price per 1M Dims'].hnsw['rq-8'],
      premium: pricebook.GCP.shared.Base.High['Price per 1M Dims'].hnsw['rq-8'],
    },
  },
};

export const minimumPrices = {
  flex: pricebook.Minimums.shared.Low['HA'],
  plus: pricebook.Minimums.shared.Mid['HA'],
  premium: pricebook.Minimums.shared.High['HA'],
};

export const TierFactors = {
  flex: pricebook['Tier Factors'].shared.Low,
  plus: pricebook['Tier Factors'].shared.Mid,
  premium: pricebook['Tier Factors'].shared.High,
};

export const retentionFactors = {
  flex: 7,
  plus: 30,
  premium: 30,
  enterprise: 45,
};

export const storageUnitPricePerGib = {
  flex: pricebook.GCP.shared.Base.Low['Price per 1GiB Storage'].block_store,
  plus: pricebook.GCP.shared.Base.Mid['Price per 1GiB Storage'].block_store,
  premium: pricebook.GCP.shared.Base.High['Price per 1GiB Storage'].block_store,
};

export const backupUnitPricePerGib = {
  flex: pricebook.GCP.shared.Base.Low['Price per 1GiB Backup'].object_store,
  plus: pricebook.GCP.shared.Base.Mid['Price per 1GiB Backup'].object_store,
  premium: pricebook.GCP.shared.Base.High['Price per 1GiB Backup'].object_store,
};

export const hybridFactorStorage = 2.15; // Increased from 2 to 2.15 (15. December 2025)
export const HAFactor = 3; // Replication Factor
export const backupCompressionReduction = 0.25;
export const flatIndexOverhead = 1.1;
