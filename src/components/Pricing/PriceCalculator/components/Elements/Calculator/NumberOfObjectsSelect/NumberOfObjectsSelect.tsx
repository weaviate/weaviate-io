import { useState, useEffect } from 'react';
import { Select } from '../../Form/Select/Select';
import { SelectInputTarget } from '../../Form/Select/SelectInputTarget/SelectInputTarget';
import { addCommas } from '../../../../helpers';
import type { IData } from '../../../../types';
import { numOfObjects } from '../../../../types/priceValues';

interface INumberOfObjectsSelectProps {
  data: IData;
  updateValue: (name: string, value: string) => void;
}

export const NumberOfObjectsSelect = (props: INumberOfObjectsSelectProps) => {
  const [open, updateOpen] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>(
    addCommas(props.data.numOfObjects)
  );

  // Sync input value when data changes from outside
  useEffect(() => {
    setInputValue(addCommas(props.data.numOfObjects));
  }, [props.data.numOfObjects]);

  const handleInputChange = (value: string) => {
    setInputValue(value);
    // Remove commas and validate if it's a valid number
    const cleanValue = value.replace(/,/g, '');
    if (cleanValue && /^\d+$/.test(cleanValue)) {
      props.updateValue('numOfObjects', cleanValue);
    }
  };

  const target = (
    <SelectInputTarget
      popoverProps={null!}
      ref={null!}
      value={inputValue}
      onChange={handleInputChange}
      placeholder="Enter number"
    />
  );

  const levels: IData['numOfObjects'][] = numOfObjects;

  const items = levels.map((level) => {
    const onClick = () => {
      updateOpen(false);
      setInputValue(addCommas(level));
      props.updateValue('numOfObjects', level);
    };
    const active = level === props.data.numOfObjects;

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
      <div className="label">Number of Objects</div>
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
