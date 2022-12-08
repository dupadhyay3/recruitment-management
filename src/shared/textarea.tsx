import React, { FC } from "react";
import cn from "classnames";
interface Itextarea {
  
  labelText?: String;
  labelClassName?: String;
  inputName?: String;
  inputValue?: String;
  inputPlaceHolder?: String;
  onChange?: any;
  id: String;
  rows?: String;
  class: String;
}
const Textarea: FC<Itextarea> = ({
  labelText,
  labelClassName,
  inputName,
  inputValue,
  inputPlaceHolder,
  onChange,
  id,
  rows
}) => {
  return (
    <>
      <label
        htmlFor={`${id}`}
        className={cn("block mb-2 text-sm font-medium text-gray-900 dark:text-white",
        `${labelClassName}`)}
      >
        {labelText}
      </label>
      <textarea
      id={`${id}`}
      name={`${inputName}`}
      value={`${inputValue}`}
      placeholder={`${inputPlaceHolder}`}
      onChange={(e) => {
        onChange(e.target.value);
      }}
    
        className={cn("block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500")}

      ></textarea>
    </>
  );
};

export default Textarea;
