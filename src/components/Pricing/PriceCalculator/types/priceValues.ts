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
  compression: string;
  index: string;
  info: string;
  memoryCompression: string;
};

export const accuracyToCost: Record<number, AccuracyToCostOption> = {
  1: {
    compression: 'None',
    index: 'HNSW',
    info: 'No compression and using HNSW graph index',
    memoryCompression: '',
  },
  2: {
    compression: 'PQ',
    index: 'HNSW',
    info: 'Product quantization (PQ) and using HNSW graph index',
    memoryCompression: '24x memory reduction',
  },
  3: {
    compression: 'RQ-8',
    index: 'HNSW',
    info: 'Rotational quantization (RQ-8) and using HNSW graph index',
    memoryCompression: '4x memory reduction',
  },
  4: {
    compression: 'None',
    index: 'FLAT',
    info: 'No compression and using FLAT index',
    memoryCompression: '',
  },
  5: {
    compression: 'BQ',
    index: 'FLAT',
    info: 'Binary quantization (BQ) and using FLAT index',
    memoryCompression: '32x memory reduction',
  },
};
