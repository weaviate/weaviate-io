import {
  type ChangeEventHandler,
  type ReactNode,
  useEffect,
  useRef,
  useState,
  type MouseEventHandler,
} from 'react';
import { Label } from '../Label/Label';
import { RangeMark } from './RangeMark/RangeMark';
import type { IData } from '../../../../types';

interface IRangeInputProps {
  name: keyof IData;
  label: string;
  value?: string;
  updateValue: (name: string, value: string) => void;
  range?: [string, string];
  step?: string;
  startExtra?: string;
  endExtra?: string | ReactNode;
  plan?: IData['plan'];
}

export const RangeInput = (props: IRangeInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [mouseDown, updateMouseDown] = useState(false);

  const updateTrackFill = () => {
    if (!inputRef.current || !props.value) return;

    const value = parseFloat(props.value);
    const min = props.range ? parseFloat(props.range[0]) : 0;
    const max = props.range ? parseFloat(props.range[1]) : 100;
    const percentage = ((value - min) / (max - min)) * 100;

    inputRef.current.style.setProperty('--track-fill', `${percentage}%`);
  };

  useEffect(() => {
    updateTrackFill();
  }, [props.value, props.range]);

  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    props.updateValue(props.name, e.target.value);
    updateTrackFill();
  };

  const onMouseDown: MouseEventHandler<HTMLInputElement> = () =>
    updateMouseDown(true);
  const onMouseUp: MouseEventHandler<HTMLInputElement> = () =>
    updateMouseDown(false);

  const className = `
    range 
    ${props.plan ? `plan-${props.plan}` : ''}
    ${mouseDown ? 'changing' : ''}
  `;

  return (
    <div className={className}>
      <div className="content">
        <RangeMark rangeMark={props.startExtra} />
        <div className="input">
          <input
            id={props.name}
            ref={inputRef}
            type="range"
            onChange={onChange}
            onMouseDown={onMouseDown}
            onMouseUp={onMouseUp}
            value={props.value}
            step={props.step}
            min={props.range ? props.range[0] : '0'}
            max={props.range ? props.range[1] : '100'}
            aria-valuemin={props.range ? parseFloat(props.range[0]) : 0}
            aria-valuemax={props.range ? parseFloat(props.range[1]) : 100}
            aria-valuenow={props.value ? parseFloat(props.value) : 0}
          />
        </div>
        <RangeMark rangeMark={props.endExtra} />
      </div>
    </div>
  );
};
