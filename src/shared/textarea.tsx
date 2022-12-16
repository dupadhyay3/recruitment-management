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
  isDisabled?: boolean
}
const Textarea: FC<Itextarea> = ({
  labelText,
  labelClassName,
  inputName,
  inputValue,
  inputPlaceHolder,
  onChange,
  id,
  rows,
  isDisabled
}) => {
  return (
    <>
      <label
        htmlFor={`${id}`}
        className={cn("form-label",
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
      disabled={isDisabled}
        className={cn("form-control")}

      ></textarea>
    </>
  );
};

export default Textarea;
