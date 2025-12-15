// ----- NOTES -----

// Flex -> Shared LOW (GCP BASE)
// Plus -> Shared HIGH (GCP BASE) || Dedicated LOW (AWS BASE)
// ALWAYS HA (HIGH AVAILABILITY)
// Flex 7 Days Retention
// Plus 30 Days Retention

// HAFactor == ReplicationFactor === 3
// HybridFactorStorage == 2

import { pricebook } from './pricebook_20251213';

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

type AccuracyToCostOption = {
  compression: string | null;
  index: string;
  info: string;
  memoryCompression: string;
  price_per_1m_dimension: {
    flex: number; // GCP BASE LOW
    premium: number; // GCP BASE HIGH
  };
};

export const accuracyToCost: Record<number, AccuracyToCostOption> = {
  1: {
    compression: null,
    index: 'hnsw',
    info: 'HNSW graph index with no compression',
    memoryCompression: '',
    price_per_1m_dimension: {
      flex: pricebook.GCP.shared.Base.Low['Price per 1M Dims'].hnsw.None, // GCP BASE LOW
      premium: pricebook.GCP.shared.Base.High['Price per 1M Dims'].hnsw.None, // GCP BASE HIGH
    },
  },
  2: {
    compression: 'pq',
    index: 'hnsw',
    info: 'HNSW graph index with product quantization (PQ)',
    memoryCompression: '24x memory reduction',
    price_per_1m_dimension: {
      flex: pricebook.GCP.shared.Base.Low['Price per 1M Dims'].hnsw.pq, // GCP BASE LOW
      premium: pricebook.GCP.shared.Base.High['Price per 1M Dims'].hnsw.pq, // GCP BASE HIGH
    },
  },
  3: {
    compression: 'rq-8',
    index: 'hnsw',
    info: 'HNSW graph index with rotational quantization (RQ-8)',
    memoryCompression: '4x memory reduction',
    price_per_1m_dimension: {
      flex: pricebook.GCP.shared.Base.Low['Price per 1M Dims'].hnsw['rq-8'], // GCP BASE LOW
      premium: pricebook.GCP.shared.Base.High['Price per 1M Dims'].hnsw['rq-8'], // GCP BASE HIGH
    },
  },
  4: {
    compression: 'bq',
    index: 'hnsw',
    info: 'HNSW graph index with binary quantization (BQ)',
    memoryCompression: '32x memory reduction',
    price_per_1m_dimension: {
      flex: pricebook.GCP.shared.Base.Low['Price per 1M Dims'].hnsw.bq, // GCP BASE LOW
      premium: pricebook.GCP.shared.Base.High['Price per 1M Dims'].hnsw.bq, // GCP BASE HIGH
    },
  },
  5: {
    compression: 'rq-1',
    index: 'hnsw',
    info: 'Rotational quantization (RQ-1) and using HNSW graph index',
    memoryCompression: '32x memory reduction',
    price_per_1m_dimension: {
      flex: pricebook.GCP.shared.Base.Low['Price per 1M Dims'].hnsw['rq-1'], // GCP BASE LOW
      premium: pricebook.GCP.shared.Base.High['Price per 1M Dims'].hnsw['rq-1'], // GCP BASE HIGH
    },
  },
  6: {
    compression: null,
    index: 'FLAT',
    info: 'FLAT index with no compression',
    memoryCompression: '',
    price_per_1m_dimension: {
      flex: pricebook.GCP.shared.Base.Low['Price per 1M Dims'].flat.None, // GCP BASE LOW
      premium: pricebook.GCP.shared.Base.High['Price per 1M Dims'].flat.None, // GCP BASE HIGH
    },
  },

  7: {
    compression: 'bq',
    index: 'flat',
    info: 'FLAT index with binary quantization (BQ)',
    memoryCompression: '32x memory reduction',
    price_per_1m_dimension: {
      flex: pricebook.GCP.shared.Base.Low['Price per 1M Dims'].flat.bq, // GCP BASE LOW
      premium: pricebook.GCP.shared.Base.High['Price per 1M Dims'].flat.bq, // GCP BASE HIGH
    },
  },
};

export const minimumPrices = {
  flex: pricebook.Minimums.shared.Low['HA'],
  premium: pricebook.Minimums.shared.High['HA'],
};

export const TierFactors = {
  flex: pricebook['Tier Factors'].shared.Low,
  premium: pricebook['Tier Factors'].shared.High,
};

export const retentionFactors = {
  flex: 7,
  premium: 30,
  enterprise: 45,
};

export const storageUnitPricePerGib = {
  flex: pricebook.GCP.shared.Base.Low['Price per 1GiB Storage'].block_store,
  premium: pricebook.GCP.shared.Base.High['Price per 1GiB Storage'].block_store,
};

export const backupUnitPricePerGib = {
  flex: pricebook.GCP.shared.Base.Low['Price per 1GiB Backup'].object_store,
  premium: pricebook.GCP.shared.Base.High['Price per 1GiB Backup'].object_store,
};

export const replicationFactor = 3;
export const hybridFactorStorage = 2.15; // Increased from 2 to 2.15 (15. December 2025)
export const HAFactor = 3;
export const backupCompressionReduction = 0.25;
export const flatIndexOverhead = 1.1;

export const nodes = 3;
export const hoursInMonth = 730;
