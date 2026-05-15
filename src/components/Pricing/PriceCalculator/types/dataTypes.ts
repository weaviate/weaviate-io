export type TPlan = 'flex' | 'premium';
export type TDeploymentType = 'shared' | 'dedicated';

export interface IData {
  plan: TPlan;
  numOfObjects: string;
  objectSize: string;
  vectorDimensions: string;
  accuracyToCost: string;
  deploymentType: TDeploymentType;
}

export const starterState: IData = {
  plan: 'flex',
  numOfObjects: '100000',
  objectSize: '1024',
  vectorDimensions: '512',
  accuracyToCost: '3',
  deploymentType: 'shared',
};
