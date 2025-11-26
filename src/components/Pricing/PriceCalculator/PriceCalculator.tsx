import { useState } from "react"
import './styles/index.scss'
import { Plans, VectorDimensionsSelect, NumberOfObjectsSelect } from "./components/Elements/Calculator"
import { PriceReview } from "./components/Elements/PriceReview/PriceReview"
import { ObjectSizeSelect } from "./components/Elements/Calculator"
import { IData, TDeploymentType, starterState } from "./types"
import { AccuracyToCost } from "./components/Elements/Calculator/AccuracyToCost/AccuracyToCost"

export const PriceCalculator = () => {
  const [ data, updateData ] = useState<IData>(starterState)
  
  const updateValue = (n: string, v: string) => {  
    const deploymentType = (n: string, v: string): TDeploymentType => {
      // Will clean this up, just here for testing.
      if (n === 'plan' && v === 'flex') return 'shared'
      if (n !== 'plan' && data.plan === 'flex') return 'shared'
      if (n === 'plan' && v !== 'flex') return data.deploymentType
      if (n === 'deploymentType') return data.plan === 'flex' ? 'shared' : v as TDeploymentType
      return 'dedicated'
    }

    updateData({ ...data, [n]: v, deploymentType: deploymentType(n, v), })
  }

  const onClick = () => {
    const deploymentType: TDeploymentType = data.deploymentType === 'dedicated' ? 'shared' : 'dedicated'
    updateValue("deploymentType", deploymentType)
  }

  return (
    <div className="priceCalculator">
      <div className="content">
        <h1>Estimate costs with Pricing Calculator</h1>
        <Plans data={data} updateValue={updateValue} />

        <div className="deploymentType" onClick={onClick}>
          Deployment type : 
          <strong className={`${data.deploymentType === 'shared' ? 'active' : ''}`}>Shared</strong> 
          | 
          <strong className={`${data.deploymentType === 'dedicated' ? 'active' : ''} ${data.plan === 'flex' ? 'disabled' : ''}`}>Dedicated</strong>
        </div>

        

        <div className="rowWrapper">
          <VectorDimensionsSelect data={data} updateValue={updateValue} />
          <NumberOfObjectsSelect data={data} updateValue={updateValue} />
          <ObjectSizeSelect data={data} updateValue={updateValue} />
        </div>
        <AccuracyToCost data={data} updateValue={updateValue} />
      </div>
      <PriceReview data={data} />
    </div>
  )
}
