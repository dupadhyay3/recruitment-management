import React, { FC } from "react";
import cn from "classnames";

interface IInputField {
  className?:String;
  labelText?:String;
  labelClassName?:String;
  inputType:String;
  inputName?:String;
  inputValue?:String;
  inputPlaceHolder?:String;
  onChange?:any;
  max?:any
  inputClassName?:String;
  minLength?:any;
  maxLength?:any;
  id:String;
  isDisabled?: boolean
}
const InputField: FC<IInputField> = ({
  className,
  labelText,
  labelClassName,
  inputType,
  inputName,
  inputValue,
  inputPlaceHolder,
  onChange,
  max,
  inputClassName,
  minLength,
  maxLength,
  id,
  isDisabled
}) => {
  return (
    <div className={cn("mb-4", `${className}`)}>
      <label
        htmlFor={`${id}`}
        className={cn(
          "form-label",
          `${labelClassName}`
        )}
      >
        {labelText}
      </label>
      <input
        id={`${id}`}
        type={`${inputType}`}
        name={`${inputName}`}
        value={`${inputValue}`}
        placeholder={`${inputPlaceHolder}`}
        max={`${max}`}
        onChange={(e) => {
          onChange(e.target.value);
        }}
        minLength={minLength}
        maxLength={maxLength}
        disabled={isDisabled}
        className={cn(
          "form-control",
          `${inputClassName}`
        )}
      />
    </div>
  );
};

export default InputField;
