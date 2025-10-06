export type TPlan = 'flex' | 'plus' | 'premium'
export type TDeploymentType = 'shared' | 'dedicated'

export interface IData {
  plan: TPlan
  numOfObjects: string
  objectSize: string
  vectorDimensions: string
  accuracyToCost: string
  deploymentType: TDeploymentType
}

export const starterState: IData = {
  plan: 'flex',
  numOfObjects: "100000",
  objectSize: "1000",
  vectorDimensions: "512",
  accuracyToCost: "2",
  deploymentType: 'shared'
}
