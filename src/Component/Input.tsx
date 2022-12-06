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
  inputClassName?:String;
  id:String;
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
  inputClassName,
  id,
}) => {
  return (
    <div className={cn("mb-2", `${className}`)}>
      <label
        htmlFor={`${id}`}
        className={cn(
          "block text-sm font-semibold text-gray-800",
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
        onChange={(e) => {
          onChange(e.target.value);
        }}
        className={cn(
          "block w-full px-4 py-2 mt-2 text-neutral-700 bg-white border rounded-md focus:border-neutral-400 focus:ring-neutral-300 focus:outline-none focus:ring focus:ring-opacity-40",
          `${inputClassName}`
        )}
      />
    </div>
  );
};

export default InputField;
