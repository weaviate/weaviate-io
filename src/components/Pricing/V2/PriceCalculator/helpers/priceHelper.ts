// DEPRECATED

import type { IData } from '../types';

const productTierFactor = (data: IData) => {
  const tierFactors = { shared: 1.0, dedicated: 1.5 };
  return tierFactors[data.deploymentType];
};

const calculateVectorDimensionUnits = (data: IData) => {
  const dimensions = parseInt(data.vectorDimensions);
  const totalObjects = parseInt(data.numOfObjects);
  return (dimensions * totalObjects) / 1_000_000;
};

const calculateAccuracyCost = (data: IData) => {
  const basePrice = {
    hnsw: { None: 69500, pq: 62550, 'rq-8': 59075 },
    flat: { None: 6950, bq: 869 },
  };

  const accuracyMap = {
    1: { indexType: 'hnsw', compression: 'None', price: basePrice.hnsw.None },
    2: { indexType: 'hnsw', compression: 'pq', price: basePrice.hnsw.pq },
    3: {
      indexType: 'hnsw',
      compression: 'rq-8',
      price: basePrice.hnsw['rq-8'],
    },
    4: { indexType: 'flat', compression: 'None', price: basePrice.flat.None },
    5: { indexType: 'flat', compression: 'bq', price: basePrice.flat.bq },
  };

  const step = parseInt(data.accuracyToCost);
  // @ts-ignore
  return accuracyMap[step].price;
};

const calculateStoragePrice = (data: IData): number => {
  const objCount = parseInt(data.numOfObjects);
  const objDataSize = parseInt(data.objectSize);
  const dims = parseInt(data.vectorDimensions);
  const replicationFactor = 3;

  const dimSizeBytesUncompressed = dims * 4;
  const accuracyData = calculateAccuracyCost(data);
  const indexType = accuracyData.indexType;

  let collectionVectorSize: number;
  if (indexType === 'hnsw') {
    collectionVectorSize = dimSizeBytesUncompressed;
  } else {
    const FlatIndexOverhead = 1.1;
    collectionVectorSize = dimSizeBytesUncompressed * FlatIndexOverhead;
  }

  const collectionObjSize = collectionVectorSize + objDataSize;

  const HybridFactorStorage = 2;
  const collectionStorageGiB =
    (collectionObjSize * objCount * HybridFactorStorage) / 1024 ** 3;

  const storageUnitPrice = 212500;
  const blockStorageRegionalFactor = 1.0;
  const tierFactor = productTierFactor(data);

  const totalUnitsConsumed = collectionStorageGiB * replicationFactor;
  const totalStoragePrice =
    totalUnitsConsumed *
    storageUnitPrice *
    blockStorageRegionalFactor *
    tierFactor;

  return totalStoragePrice / 1_000_000;
};

const calculateBackupPrice = (data: IData): number => {
  const objCount = parseInt(data.numOfObjects);
  const objDataSize = parseInt(data.objectSize);
  const dims = parseInt(data.vectorDimensions);
  const replicationFactor = 3;
  const daysRetention = 30;

  const dimSizeBytesUncompressed = dims * 4;
  const accuracyData = calculateAccuracyCost(data);
  const indexType = accuracyData.indexType;

  let collectionVectorSize: number;
  if (indexType === 'hnsw') {
    collectionVectorSize = dimSizeBytesUncompressed;
  } else {
    const FlatIndexOverhead = 1.1;
    collectionVectorSize = dimSizeBytesUncompressed * FlatIndexOverhead;
  }

  const collectionObjSize = collectionVectorSize + objDataSize;

  const HybridFactorStorage = 2;
  const BackupCompressionReduction = 0.25;
  const collectionStorageGiB =
    (collectionObjSize * objCount * HybridFactorStorage) / 1024 ** 3;
  const backupStorageGiB =
    collectionStorageGiB * (1 - BackupCompressionReduction) * daysRetention;

  const backupUnitPrice = 22000;
  const objectStorageRegionalFactor = 1.0;
  const tierFactor = productTierFactor(data);

  const totalUnitsConsumed = backupStorageGiB * replicationFactor;
  const totalBackupPrice =
    totalUnitsConsumed *
    backupUnitPrice *
    objectStorageRegionalFactor *
    tierFactor;

  return totalBackupPrice / 1_000_000;
};

const calculateFinalPrice = (
  dimensionUnits: number,
  accuracyCost: number,
  storagePrice: number,
  backupPrice: number,
  tierFactor: number
): number => {
  const replicationFactor = 3;
  const scaleFactor = 1;
  const nodeRegionalFactor = 1.0;

  const dimensionPrice =
    (dimensionUnits *
      accuracyCost *
      replicationFactor *
      scaleFactor *
      nodeRegionalFactor *
      tierFactor) /
    1_000_000;

  return dimensionPrice + storagePrice + backupPrice;
};

export const calculatePrice = (data: IData): string => {
  // The deployment type will always be shared for flex, shared or dedicated for plus.
  // Premium will not need any calculations.
  // const deployment_type = data.plan === 'flex' ? 'shared' : data.deploymentType
  const days_retention = 30; // Retention is TBD it differs, i need to figure it out.
  const dimension_units = calculateVectorDimensionUnits(data);
  const product_tier_factor = productTierFactor(data);
  const accuracy_cost = calculateAccuracyCost(data);
  const object_size_cost = calculateStoragePrice(data);

  const backup_price = calculateBackupPrice(data);
  const finalPrice = calculateFinalPrice(
    dimension_units,
    accuracy_cost,
    object_size_cost,
    backup_price,
    product_tier_factor
  );

  // Apply minimum pricing based on plan and deployment type (all HA)
  let adjustedPrice = finalPrice;
  if (data.plan === 'flex') {
    // Flex is always shared Low tier
    adjustedPrice = Math.max(finalPrice, 45);
  } else if (data.plan === 'plus') {
    // Plus is High tier, can be shared or dedicated
    if (data.deploymentType === 'shared') {
      adjustedPrice = Math.max(finalPrice, 280);
    } else if (data.deploymentType === 'dedicated') {
      adjustedPrice = Math.max(finalPrice, 1900);
    }
  }

  const roundedPrice = Math.round(adjustedPrice).toLocaleString();

  return roundedPrice;
};
