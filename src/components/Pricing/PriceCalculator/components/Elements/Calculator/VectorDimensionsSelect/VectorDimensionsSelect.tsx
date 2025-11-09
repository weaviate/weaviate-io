import { useState, useEffect } from 'react';
import { Select } from '../../Form/Select/Select';
import { SelectInputTarget } from '../../Form/Select/SelectInputTarget/SelectInputTarget';
import { addCommas } from '../../../../helpers';
import type { IData } from '../../../../types';
import { vectorDimensions } from '../../../../types/priceValues';

interface IVectorDimensionsSelectProps {
  data: IData;
  updateValue: (name: string, value: string) => void;
}

export const VectorDimensionsSelect = (props: IVectorDimensionsSelectProps) => {
  const [open, updateOpen] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>(
    addCommas(props.data.vectorDimensions)
  );

  // Sync input value when data changes from outside
  useEffect(() => {
    setInputValue(addCommas(props.data.vectorDimensions));
  }, [props.data.vectorDimensions]);

  const handleInputChange = (value: string) => {
    setInputValue(value);
    // Remove commas and validate if it's a valid number
    const cleanValue = value.replace(/,/g, '');
    if (cleanValue && /^\d+$/.test(cleanValue)) {
      props.updateValue('vectorDimensions', cleanValue);
    }
  };

  const target = (
    <SelectInputTarget
      popoverProps={null!}
      ref={null!}
      value={inputValue}
      onChange={handleInputChange}
      placeholder="Enter dimensions"
    />
  );

  const levels: IData['vectorDimensions'][] = vectorDimensions;

  const items = levels.map((level) => {
    const onClick = () => {
      updateOpen(false);
      setInputValue(addCommas(level));
      props.updateValue('vectorDimensions', level);
    };
    const active = level === props.data.vectorDimensions;

    return (
      <li key={level}>
        <button className={active ? 'active' : ''} onClick={onClick}>
          {addCommas(level)}
        </button>
      </li>
    );
  });

  const content = (
    <div>
      <ul className="selectList">{items}</ul>
    </div>
  );

  return (
    <div className="row single">
      <div className="label">Vector Dimensions</div>
      <Select
        open={open}
        onOpenChange={updateOpen}
        content={content}
        target={target}
        inputValue={inputValue}
        onInputChange={handleInputChange}
      />
    </div>
  );
};
