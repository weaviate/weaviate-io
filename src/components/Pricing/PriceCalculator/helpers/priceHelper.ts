import type { IData } from "../types"

const CONSTANTS = {
  HNSWByteOverheadFactor: 306,
  VectorOverheadBytes: 24,
  FlatIndexOverhead: 1.1,
  HNSWOverheadFactor: 2,
  GCFactor: 1.4,
  SizingErrorFactor: 1.2,
  HybridFactorStorage: 2,
  BackupCompressionReduction: 0.25
}

export const calculatePrice = (data: IData): number => {
  const objCount = parseInt(data.numOfObjects)
  const dims = parseInt(data.vectorDimensions)
  const objDataSize = parseInt(data.objectSize)
  const dataTieringPercent = parseInt(data.dataTiering)
  const replicationFactor = data.highAvailability ? 3 : 1
  const daysOfBackupRetention = 30

  const objCountInMemory = objCount
  const vectorCountInMemory = objCount

  const dimSizeBytesUncompressed = dims * 4
  const dimSizeBytesCompressed = getDimSizeBytesCompressed(dims, "None")

  const vectorSizeGiBobjects = ((dimSizeBytesCompressed + CONSTANTS.VectorOverheadBytes) * objCountInMemory) / (1024 ** 3)
  const vectorSizeGiBvectors = (((dimSizeBytesCompressed / dims) + CONSTANTS.VectorOverheadBytes) * vectorCountInMemory) / (1024 ** 3)

  const vectorSizeGiB = Math.min(vectorSizeGiBobjects, vectorSizeGiBvectors)

  const vectorHNSWGraphGiB = (CONSTANTS.HNSWByteOverheadFactor * objCount * CONSTANTS.HNSWOverheadFactor) / (1024 ** 3)

  const vectorRAMGiB = (vectorSizeGiB + vectorHNSWGraphGiB) * CONSTANTS.GCFactor * CONSTANTS.SizingErrorFactor

  const collectionRAMConsumptionGiB = vectorRAMGiB

  const vectorSizeStoragehnsw = (dimSizeBytesCompressed !== dimSizeBytesUncompressed ? dimSizeBytesCompressed : 0) + dimSizeBytesUncompressed
  const vectorSizeStorageflat = (dimSizeBytesUncompressed !== dimSizeBytesCompressed ? dimSizeBytesCompressed : dimSizeBytesUncompressed) * CONSTANTS.FlatIndexOverhead

  const collectionObjSize = vectorSizeStoragehnsw + vectorSizeStorageflat + objDataSize

  const collectionStorageGiB = (objCount * collectionObjSize * CONSTANTS.HybridFactorStorage) / (1024 ** 3)

  const collectionBackupStorageGiB = collectionStorageGiB * (1 - CONSTANTS.BackupCompressionReduction) * daysOfBackupRetention

  const clusterRAMConsumptionGiB = collectionRAMConsumptionGiB * replicationFactor
  const clusterStorageConsumptionGiB = collectionStorageGiB * replicationFactor
  const clusterBackupConsumptionGiB = collectionBackupStorageGiB * replicationFactor

  const ramCostPerGiB = 50
  const storageCostPerGiB = 0.1
  const backupCostPerGiB = 0.05

  const monthlyPrice = (clusterRAMConsumptionGiB * ramCostPerGiB) + 
                      (clusterStorageConsumptionGiB * storageCostPerGiB) + 
                      (clusterBackupConsumptionGiB * backupCostPerGiB)

  const tierMultiplier = data.productTier === "enterprise" ? 1.5 : 1
  return Math.round(monthlyPrice * tierMultiplier)
}

const getDimSizeBytesCompressed = (dims: number, compression: string): number => {
  if (compression === "SQ") {
    return dims
  }
  
  if (compression === "BQ") {
    return Math.ceil(dims * 0.125)
  }

  if (compression === "PQ") {
    const optimalSegmentsPQ8 = (dims >= 2048 && dims % 8 === 0) ? dims / 8 : Infinity
    const optimalSegmentsPQ6 = (dims >= 768 && dims % 6 === 0) ? dims / 6 : Infinity
    const optimalSegmentsPQ4 = (dims >= 256 && dims % 4 === 0) ? dims / 4 : Infinity
    const optimalSegmentsPQ2 = (dims % 2 === 0) ? dims / 2 : Infinity
    const optimalSegmentsPQnone = dims

    return Math.min(optimalSegmentsPQ8, optimalSegmentsPQ6, optimalSegmentsPQ4, optimalSegmentsPQ2, optimalSegmentsPQnone)
  }

  return dims * 4
}
