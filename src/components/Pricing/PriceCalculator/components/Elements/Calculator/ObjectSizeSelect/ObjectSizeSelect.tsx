import React, { useState, useEffect } from 'react';
import { Label } from '../../Form/Label/Label';
import { Select } from '../../Form/Select/Select';
import { SelectInputTarget } from '../../Form/Select/SelectInputTarget/SelectInputTarget';
import { addNumSize } from '../../../../helpers';
import type { IData } from '../../../../types';
import { objectSize } from '../../../../types/priceValues';

interface IObjectSizeSelectSelect {
  data: IData;
  updateValue: (name: string, value: string) => void;
}

// Helper to parse size input (e.g., "2 MB", "512 KB", "1024 Bytes") back to raw number
const parseSize = (input: string): string | null => {
  const cleaned = input.trim().toLowerCase();

  // Match patterns like "2 MB", "512 KB", "1024 Bytes", or just numbers
  const mbMatch = cleaned.match(/^([\d.]+)\s*mb$/);
  const kbMatch = cleaned.match(/^([\d.]+)\s*kb?$/); // Matches both "kb" and "k"
  const bytesMatch = cleaned.match(/^([\d.]+)\s*bytes?$/);
  const numMatch = cleaned.match(/^(\d+)$/);

  if (mbMatch) {
    return String(Math.round(parseFloat(mbMatch[1]) * 1000000));
  } else if (kbMatch) {
    return String(Math.round(parseFloat(kbMatch[1]) * 1024));
  } else if (bytesMatch) {
    return String(Math.round(parseFloat(bytesMatch[1])));
  } else if (numMatch) {
    return numMatch[1];
  }

  return null;
};

export const ObjectSizeSelect = (props: IObjectSizeSelectSelect) => {
  const [open, updateOpen] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>(
    addNumSize(props.data.objectSize)
  );
  const [isEditing, setIsEditing] = useState<boolean>(false);

  // Sync input value when data changes from outside (but not while editing)
  useEffect(() => {
    if (!isEditing) {
      setInputValue(addNumSize(props.data.objectSize));
    }
  }, [props.data.objectSize, isEditing]);

  const handleInputChange = (value: string) => {
    setInputValue(value);
    setIsEditing(true);
  };

  const handleInputBlur = () => {
    setIsEditing(false);
    // Try to parse the input value
    const cleanValue = parseSize(inputValue);
    if (cleanValue) {
      props.updateValue('objectSize', cleanValue);
      // Format the value
      setInputValue(addNumSize(cleanValue));
    } else {
      // If invalid, revert to the current data value
      setInputValue(addNumSize(props.data.objectSize));
    }
  };

  const levels: IData['objectSize'][] = objectSize;
  
  // Calculate max value from the list
  const maxValue = Math.max(...levels.map(v => parseInt(v, 10)));

  const target = (
    <SelectInputTarget
      popoverProps={null!}
      ref={null!}
      value={inputValue}
      onChange={handleInputChange}
      onBlur={handleInputBlur}
      placeholder="Enter size"
      max={maxValue}
    />
  );
  const items = levels.map((level) => {
    const onClick = () => {
      updateOpen(false);
      setIsEditing(false);
      setInputValue(addNumSize(level));
      props.updateValue('objectSize', level);
    };
    const active = level === props.data.objectSize;

    return (
      <li key={level}>
        <button className={active ? 'active' : ''} onClick={onClick}>
          {addNumSize(level)}
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
      <div className="label">Object Size</div>
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
