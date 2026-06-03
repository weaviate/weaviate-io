import type { TOptimizationProfile } from './priceValues';

export type TPlan = 'flex' | 'plus' | 'premium';
export type TDeploymentType = 'shared' | 'dedicated';

export interface IData {
  plan: TPlan;
  numOfObjects: string;
  objectSize: string;
  vectorDimensions: string;
  optimizationProfile: TOptimizationProfile;
  deploymentType: TDeploymentType;
}

export const starterState: IData = {
  plan: 'flex',
  numOfObjects: '100000',
  objectSize: '1024',
  vectorDimensions: '512',
  optimizationProfile: 'performance-optimized',
  deploymentType: 'shared',
};
