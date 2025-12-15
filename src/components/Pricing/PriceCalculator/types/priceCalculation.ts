import {
  HAFactor,
  hybridFactorStorage,
  backupCompressionReduction,
  flatIndexOverhead,
  retentionFactors,
  storageUnitPricePerGib,
  backupUnitPricePerGib,
  accuracyToCost,
  minimumPrices,
} from './priceValues';
import { IData } from './dataTypes';
import { TierFactors } from './priceValues';

const calculateOptimalSegments = (dims: number) => {
  let result = dims;

  if (dims >= 2048 && dims % 8 === 0) {
    result = dims / 8;
  } else if (dims >= 768 && dims % 6 === 0) {
    result = dims / 6;
  } else if (dims >= 256 && dims % 4 === 0) {
    result = dims / 4;
  } else if (dims % 2 === 0) {
    result = dims / 2;
  }
  return result;
};

const calculateDimensionBytes = (quant: string | null, dims: number) => {
  let result = 0;
  if (quant === null) {
    result = dims * 4;
  } else if (quant === 'pq') {
    result = Math.ceil(calculateOptimalSegments(dims));
  } else if (quant === 'sq') {
    result = dims;
  } else if (quant === 'rq-8') {
    result = dims;
  } else if (quant === 'bq' || quant === 'rq-1') {
    result = Math.ceil(dims * 0.125);
  } else {
    result = dims * 4;
  }

  return result;
};

const calculateVectorSize = (
  dims: number,
  quant: string | null,
  indexType: string
) => {
  // Calculate the size of the vector in bytes

  const dimSizeBytesUncompressed = dims * 4;
  const dimSizeBytesCompressed = calculateDimensionBytes(quant, dims);

  let result = 0;
  if (indexType === 'hnsw' && quant !== null) {
    result = dimSizeBytesUncompressed + dimSizeBytesCompressed;
  } else if (indexType === 'hnsw' && quant === null) {
    result = dimSizeBytesUncompressed;
  } else if (indexType === 'flat' && quant !== null) {
    result = dimSizeBytesCompressed * flatIndexOverhead;
  } else if (indexType === 'flat' && quant === null) {
    result = dimSizeBytesUncompressed * flatIndexOverhead;
  }

  return result;
};

const calculateCollectionObjectSize = (
  collectionVectorSize: number,
  objDataSize: number
) => {
  return collectionVectorSize + objDataSize;
};

const calculateStorageGiB = (collectionObjSize: number, objCount: number) => {
  const collectionStorageGiB =
    (collectionObjSize * objCount * hybridFactorStorage) / 1024 ** 3;
  return collectionStorageGiB;
};

const calculateBackupGiB = (
  collectionStorageGiB: number,
  retentionDays: number
) => {
  const backupStorageGiB =
    collectionStorageGiB * (1 - backupCompressionReduction) * retentionDays;
  return backupStorageGiB;
};

export const calculateCosts = (data: IData) => {
  const retentionDays = retentionFactors[data.plan];

  const indexCompressionCombination =
    accuracyToCost[Number(data.accuracyToCost)];
  const index = indexCompressionCombination.index;
  const compression = indexCompressionCombination.compression
    ? indexCompressionCombination.compression
    : null;

  const vectorSize = calculateVectorSize(
    Number(data.vectorDimensions),
    compression,
    index
  );
  const collectionObjSize = calculateCollectionObjectSize(
    vectorSize,
    Number(data.objectSize)
  );
  const collectionStorageGiB = calculateStorageGiB(
    collectionObjSize,
    Number(data.numOfObjects)
  );
  const backupStorageGiB = calculateBackupGiB(
    collectionStorageGiB,
    retentionDays
  );

  const totalDimensions =
    Number(data.vectorDimensions) * Number(data.numOfObjects);

  // Construct the pricing key based on plan and deployment type
  const pricingKey = data.plan === 'flex' ? 'flex' : 'premium';

  const storageUnitPrice = storageUnitPricePerGib[pricingKey];
  const backupUnitPrice = backupUnitPricePerGib[pricingKey];
  const minimalSpend = minimumPrices[pricingKey];
  const costPer1MDimensions =
    indexCompressionCombination.price_per_1m_dimension[pricingKey];

  const storageCost = collectionStorageGiB * storageUnitPrice * HAFactor;
  const backupCost = backupStorageGiB * backupUnitPrice * HAFactor;
  const dimensionCost =
    (totalDimensions / 10 ** 6) * costPer1MDimensions * HAFactor;

  // Final Calculation
  // Question: Is the total cost the sum of these three costs?
  const totalCostBeforeMin =
    (storageCost + backupCost + dimensionCost) * TierFactors[pricingKey];
  const finalCostMicrocents = Math.max(minimalSpend, totalCostBeforeMin);

  const result = microcentsToDollars(finalCostMicrocents);

  // Debugging
  console.log('totalDimensions', totalDimensions);
  console.log('storageCost', microcentsToDollars(storageCost));
  console.log('backupCost', microcentsToDollars(backupCost));
  console.log('dimensionCost', microcentsToDollars(dimensionCost));
  console.log('finalCost', result);

  return Math.round(result).toLocaleString();
};

const microcentsToDollars = (microcents: number) => {
  const result = microcents / 10 ** 6;
  return result;
};

// TODO: Pricebook 30th Octorber 2025
// TODO : Flex Shared Low , Premium Shared High, Premium Dedicated Low (Contact Sales)
// Create a script for extracting the pricebook values that we need
// Double check again with the calulator
