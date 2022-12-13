import React, { FC } from "react";
import cn from "classnames";
interface Idropdawn {
  className?: String;
  labelText?: String;
  labelClassName?: String;
  id: String;
  name: String;
  dropdownArr: any[];
  Select: String;
  selectedValue?: String;
  isDisabled?: boolean;
  onChange?: any;
}

const Dropdawn: FC<Idropdawn> = ({
  className,
  labelText,
  labelClassName,
  selectedValue,
  id,
  name,
  dropdownArr,
  Select,
  isDisabled,
  onChange,
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
              value={`${selectedValue}`}
              required
              onChange={(e) => onChange(e)}
              disabled={isDisabled}
            >
              <option value=""> {`${Select}`}</option>
              {dropdownArr.map((obj: any, index: number) => (
                <option
                  key={index}
                  value={obj?.collegeName ? obj?.collegeName : obj.name}
                >
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
