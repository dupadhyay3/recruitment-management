import React, { FC } from "react";
import cn from "classnames";
interface Idropdawn {
  className?: String;
  labelText?: String;
  labelClassName?: String;
  inputType: String;
  inputName?: String;
  inputValue?: String;
  inputPlaceHolder?: String;
  onChange?: any;
  max?: any;
  inputClassName?: String;
  minLength?: any;
  maxLength?: any;
  id: String;
  name: String;
  dropdownArr: any[];
  Select:String
}

const Dropdawn: FC<Idropdawn> = ({
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
  name,
  dropdownArr,
  Select
}) => {
  return (
    <>
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

        <div className={cn("form-group-inner", `${className}`)}>
          <div className={cn("cmn-form-control", `${className}`)}>
            <select
              name={`${name}`}
              id={`${name}`}
              className={cn("form-control", `${className}`)}
              required
            >
              <option value=""> {`${Select}`}</option>
              {dropdownArr.map((obj: any, index: number) => (
                <option value={obj?.collegeName ? obj?.collegeName : obj.name}>
                  {obj?.collegeName ? obj?.collegeName : obj.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dropdawn;
