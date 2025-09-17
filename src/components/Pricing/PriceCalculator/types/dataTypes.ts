export type TPlan = 'flex' | 'plus' | 'premium'
export type TProductTier = 'standard' | 'enterprise' | 'businessCritical'

export type TRecallAccuracyLevel = 'Low' | 'Medium' | 'High' | 'Highest'
export type TThroughputLevel = 'Slow' | 'Fast' | 'Faster' | 'Fastest'
export type TDataTieringLevel = 'None' | 'Medium' | 'Aggresive'
export interface IData {
  plan: TPlan
  numOfObjects: string
  objectSize: string
  vectorDimensions: string
  recallAccuracy: string
  recallAccuracyLevel: TRecallAccuracyLevel
  throughput: string
  throughputLevel: TThroughputLevel
  dataTiering: string
  dataTieringLevel: TDataTieringLevel
  productTier: TProductTier
}

export const starterState: IData = {
  plan: 'flex',
  numOfObjects: "100000",
  objectSize: "40",
  vectorDimensions: "512",
  recallAccuracy: "30",
  recallAccuracyLevel: "Medium",
  throughput: "80",
  throughputLevel: "Fastest",
  dataTiering: "50",
  dataTieringLevel: "Medium",
  productTier: 'standard'
}
