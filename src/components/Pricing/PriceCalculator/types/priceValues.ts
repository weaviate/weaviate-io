// ----- NOTES -----

// Flex -> Shared LOW (GCP BASE)
// Plus -> Shared HIGH (GCP BASE) || Dedicated LOW (AWS BASE)
// ALWAYS HA (HIGH AVAILABILITY)
// Flex 7 Days Retention
// Plus 30 Days Retention

// HAFactor == ReplicationFactor === 3
// HybridFactorStorage == 2

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
    flex: number;
    plus_shared: number;
    plus_dedicated: number;
  };
};

export const accuracyToCost: Record<number, AccuracyToCostOption> = {
  1: {
    compression: null,
    index: 'hnsw',
    info: 'HNSW graph index with no compression',
    memoryCompression: '',
    price_per_1m_dimension: {
      flex: 69500, // GCP BASE LOW
      plus_shared: 69500, // GCP BASE HIGH
      plus_dedicated: 69500, // AWS BASE LOW
    },
  },
  2: {
    compression: 'pq',
    index: 'hnsw',
    info: 'HNSW graph index with product quantization (PQ)',
    memoryCompression: '24x memory reduction',
    price_per_1m_dimension: {
      flex: 62550, // GCP BASE LOW
      plus_shared: 62550, // GCP BASE HIGH
      plus_dedicated: 62550, // AWS BASE LOW
    },
  },
  3: {
    compression: 'rq-8',
    index: 'hnsw',
    info: 'HNSW graph index with rotational quantization (RQ-8)',
    memoryCompression: '4x memory reduction',
    price_per_1m_dimension: {
      flex: 59075, // GCP BASE LOW
      plus_shared: 59075, // GCP BASE HIGH
      plus_dedicated: 59075, // AWS BASE LOW
    },
  },
  4: {
    compression: 'bq',
    index: 'hnsw',
    info: 'HNSW graph index with binary quantization (BQ)',
    memoryCompression: '32x memory reduction',
    price_per_1m_dimension: {
      flex: 52125, // GCP BASE LOW
      plus_shared: 52125, // GCP BASE HIGH
      plus_dedicated: 52125, // AWS BASE LOW
    },
  },
  5: {
    compression: 'rq-1',
    index: 'hnsw',
    info: 'Rotational quantization (RQ-1) and using HNSW graph index',
    memoryCompression: '32x memory reduction',
    price_per_1m_dimension: {
      flex: 48650, // GCP BASE LOW
      plus_shared: 48650, // GCP BASE HIGH
      plus_dedicated: 48650, // AWS BASE LOW
    },
  },
  6: {
    compression: null,
    index: 'FLAT',
    info: 'FLAT index with no compression',
    memoryCompression: '',
    price_per_1m_dimension: {
      flex: 6950, // GCP BASE LOW
      plus_shared: 6950, // GCP BASE HIGH
      plus_dedicated: 6950, // AWS BASE LOW
    },
  },

  7: {
    compression: 'bq',
    index: 'flat',
    info: 'FLAT index with binary quantization (BQ)',
    memoryCompression: '32x memory reduction',
    price_per_1m_dimension: {
      flex: 869, // GCP BASE LOW
      plus_shared: 869, // GCP BASE HIGH
      plus_dedicated: 869, // AWS BASE LOW
    },
  },
};

export const minimumPrices = {
  flex: 45000000,
  plus_shared: 280000000,
  plus_dedicated: 750000000,
};

export const TierFactors = {
  flex: 1.2,
  plus_shared: 1,
  plus_dedicated: 1.2,
};

export const retentionFactors = {
  flex: 7,
  plus: 30,
  premium: 45,
};

export const storageUnitPricePerGib = {
  flex: 212500, // GCP BASE LOW
  plus_shared: 212500, // GCP BASE HIGH
  plus_dedicated: 100000, // AWS BASE LOW
};

export const backupUnitPricePerGib = {
  flex: 22000, // GCP BASE LOW
  plus_shared: 22000, // GCP BASE HIGH
  plus_dedicated: 4400, // AWS BASE LOW
};

export const replicationFactor = 3;
export const hybridFactorStorage = 2;
export const HAFactor = 3;
export const backupCompressionReduction = 0.25;
export const flatIndexOverhead = 1.1;

export const nodes = 3;
export const hoursInMonth = 730;
