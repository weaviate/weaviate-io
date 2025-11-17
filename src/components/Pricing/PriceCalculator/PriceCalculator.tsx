import { useState } from 'react';
import './styles/index.scss';
import {
  Plans,
  VectorDimensionsSelect,
  NumberOfObjectsSelect,
} from './components/Elements/Calculator';
import { PriceReview } from './components/Elements/PriceReview/PriceReview';
import { ObjectSizeSelect } from './components/Elements/Calculator';
import { IData, TDeploymentType, starterState } from './types';
import { AccuracyToCost } from './components/Elements/Calculator/AccuracyToCost/AccuracyToCost';
import { Switch } from './components/Elements/Form/Switch/Switch';
import {
  vectorDimensions,
  numOfObjects,
  objectSize,
} from './types/priceValues';

export const PriceCalculator = () => {
  const [data, updateData] = useState<IData>(starterState);

  const updateValue = (n: string, v: string) => {
    // Clamp value to maximum available in the corresponding array
    const clampValue = (fieldName: string, value: string): string => {
      let maxValues: string[] = [];

      switch (fieldName) {
        case 'vectorDimensions':
          maxValues = vectorDimensions;
          break;
        case 'numOfObjects':
          maxValues = numOfObjects;
          break;
        case 'objectSize':
          maxValues = objectSize;
          break;
        default:
          return value;
      }

      const numericValue = parseFloat(value);
      const maxValue = Math.max(...maxValues.map((v) => parseFloat(v)));

      if (numericValue > maxValue) {
        return maxValue.toString();
      }

      return value;
    };

    const clampedValue = clampValue(n, v);

    const deploymentType = (n: string, v: string): TDeploymentType => {
      // Will clean this up, just here for testing.
      if (n === 'plan' && v === 'flex') return 'shared';
      if (n !== 'plan' && data.plan === 'flex') return 'shared';
      if (n === 'plan' && v !== 'flex') return data.deploymentType;
      if (n === 'deploymentType')
        return data.plan === 'flex' ? 'shared' : (v as TDeploymentType);
      return data.deploymentType;
    };

    updateData({
      ...data,
      [n]: clampedValue,
      deploymentType: deploymentType(n, clampedValue),
    });
  };

  const updateDeploymentType = (deploymentType: TDeploymentType) => {
    updateData({ ...data, deploymentType: deploymentType });
  };

  return (
    <div className="priceCalculator">
      <div className="content">
        <h1>Estimate costs with Pricing Calculator</h1>
        <Plans data={data} updateValue={updateValue} />

        <Switch
          values={data.plan != 'flex' ? ['shared', 'dedicated'] : ['shared']}
          selectedValue={data.deploymentType}
          updateValue={updateDeploymentType}
          label="Deployment Type"
          badge_text={
            data.deploymentType === 'shared'
              ? 'Shared cost-efficient infrastructure'
              : 'Dedicated high-performance infrastructure'
          }
        />

        <div className="rowWrapper">
          <VectorDimensionsSelect data={data} updateValue={updateValue} />
          <NumberOfObjectsSelect data={data} updateValue={updateValue} />
          <ObjectSizeSelect data={data} updateValue={updateValue} />
        </div>
        <AccuracyToCost data={data} updateValue={updateValue} />
      </div>
      <PriceReview data={data} />
    </div>
  );
};
