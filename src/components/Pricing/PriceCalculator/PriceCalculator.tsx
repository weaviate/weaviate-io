import { useState } from "react"
import './styles/index.scss'
import { RecallAccuracy, Throughput, Plans, VectorDimensionsSelect, NumberOfObjectsSelect } from "./components/Elements/Calculator"
import { PriceReview } from "./components/Elements/PriceReview/PriceReview"
import { ObjectSizeSelect } from "./components/Elements/Calculator"
import { IData, starterState } from "./types"
import { AccuracyToCost } from "./components/Elements/Calculator/AccuracyToCost/AccuracyToCost"

export const PriceCalculator = () => {
  const [ data, updateData ] = useState<IData>(starterState)
  const updateValue = (n: string, v: string) => updateData({ ...data, [n]: v })

  return (
    <div className="priceCalculator">
      <div className="content">
        <h1>Estimate costs with Pricing Calculator</h1>
        <Plans data={data} updateValue={updateValue} />
        <div className="rowWrapper">
          <VectorDimensionsSelect data={data} updateValue={updateValue} />
          <NumberOfObjectsSelect data={data} updateValue={updateValue} />
          <ObjectSizeSelect data={data} updateValue={updateValue} />
        </div>
        {/* <RecallAccuracy data={data} updateValue={updateValue} /> */}
        {/* <Throughput data={data} updateValue={updateValue} /> */}
        <AccuracyToCost data={data} updateValue={updateValue} />
      </div>
      <PriceReview data={data} />
    </div>
  )
}

// Unused sliders.
// <VectorDimensions data={data} updateValue={updateValue} />
// <NumOfObjects data={data} updateValue={updateValue} />
// <ObjectSize data={data} updateValue={updateValue} />
// <DataTiering data={data} updateValue={updateValue} />
