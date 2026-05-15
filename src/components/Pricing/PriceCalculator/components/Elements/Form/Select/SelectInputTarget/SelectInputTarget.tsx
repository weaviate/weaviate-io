import { forwardRef, type Ref } from 'react';

interface ISelectInputTargetProps {
  popoverProps: Record<string, unknown>;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  placeholder?: string;
  max?: number;
  maxLength?: number;
  min?: number;
}

export const SelectInputTarget = forwardRef(
  (props: ISelectInputTargetProps, ref: Ref<any>) => {
    const {
      popoverProps,
      value,
      onChange,
      onBlur,
      placeholder,
      max,
      maxLength,
      min,
    } = props;

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange(e.target.value);
    };

    return (
      <div className="selectInputTarget" ref={ref}>
        <input
          type="text"
          value={value}
          onChange={handleInputChange}
          onBlur={onBlur}
          placeholder={placeholder}
          max={max}
          maxLength={maxLength}
          min={min}
          className="selectInput"
        />
        <button className="selectChevronButton" {...popoverProps}>
          <img
            src="/img/pricing/chevronDown.svg"
            alt="Open dropdown"
            className="chevronIcon"
          />
        </button>
      </div>
    );
  }
);
