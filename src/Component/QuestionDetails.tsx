import React, { useCallback, useContext, useRef } from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
// import  from "./  assets/images/ring-36.svg";
import Spinner from "./../assets/images/ring-36.svg";
import InputField from "../shared/Input";
import Dropdawn from "../shared/dropdawn";

interface IQuestiondata {
  question?: string;
  optionType?: String;
  ans?: string[];
  _id?: string;
  options?: any[];
}

const QuestionDetail = () => {
  const [isLoad, setIsLoad] = useState(false);
  const { id } = useParams();
  const optionTypes = [
    { name: "Single" },
    { name: "Query" },
    { name: "Multiple" },
  ];
  // const questionContextValue = useContext(QuestionContext);

  const [data, setData] = useState<IQuestiondata>({});
  const [question, setQuestion] = useState<string>("");
  const [queryAns, setQueryAns] = useState<string>("");

  const fetchQuestion = useCallback(() => {
    axios
      .get(`${process.env.REACT_APP_API}/management/question/get/${id}`)
      .then((res: any) => {
        console.log("res", res);
        setData(res?.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    fetchQuestion();
  }, [fetchQuestion]);

  useEffect(() => {
    setQuestion(data.question ? data.question : "");
    setQueryAns(data.ans?.length ? data.ans[0] : "");
  }, [data]);

  const handleOnChangeCheckbox = (selectedIndex: number, e: any) => {
    if (data.ans?.includes(e.target.name)) {
      let index = data.ans.findIndex((data) => data === e.target.name);
      data.ans.splice(index, 1);
    } else {
      data.ans?.push(e.target.name);
    }
    setData((pre) => ({ ans: data.ans, ...pre }));
  };

  const handleOnChangeRadio = (selectedIndex: number, e: any) => {
    data.ans = [e.target.name];
    setData((pre) => ({ ans: data.ans, ...pre }));
  };

  const handleOnChangeQuery = (index: number, e: any) => {
    data.ans = [e.target.name];
    setData((pre) => ({ ans: data.ans, ...pre }));
  };

  const handleOnChangeOptionType = (e: any) => {
    console.log(e.target.value);
    data.optionType = e.target.value;
    setData((pre) => ({ optionType: data.optionType, ...pre }));
  };

  return (
    <>
      <form className="from">
        <div className="from-group">
          <InputField
            id={"question"}
            labelText={"Question"}
            inputType={"text"}
            inputValue={question}
            inputPlaceHolder={"Question"}
            onChange={setQuestion}
          />

          <ul className="question-list">
            {data?.options?.map((option, index) => {
              return (
                <li key={`${index}-${data?._id}`}>
                  {data?.optionType === "Multiple" ? (
                    <input
                      type="checkbox"
                      id={`custom-checkbox-${index}-${data?._id}`}
                      name={option?.title}
                      checked={data.ans?.includes(option?.title)}
                      onChange={(e) => handleOnChangeCheckbox(index, e)}
                    />
                  ) : data?.optionType === "Query" ? (
                    <div>
                      <label htmlFor="query">SQL Query Answer</label>
                      <textarea
                        id={`custom-checkbox-${index}-${data?._id}`}
                        name={option?._id}
                        defaultValue={data.ans}
                        onChange={(e) => handleOnChangeQuery(index, e)}
                      ></textarea>
                    </div>
                  ) : (
                    <input
                      type="radio"
                      value={option?.title}
                      id={`custom-checkbox-${index}-${data?._id}`}
                      name={option?.title}
                      checked={data.ans?.includes(option?.title)}
                      onChange={(e) => handleOnChangeRadio(index, e)}
                    />
                  )}

                  <label htmlFor={`custom-checkbox-${index}-${data?._id}`}>
                    {option?.title}
                  </label>
                </li>
              );
            })}
          </ul>

          <Dropdawn
            id={"optionType"}
            name={"optionType"}
            dropdownArr={optionTypes}
            Select={"Select Option Type"}
            labelText={"OptionType"}
            selectedValue={data.optionType}
            onChange={(e: any) => handleOnChangeOptionType(e)}
          />

          {/* <div className="form-group">
              <label htmlFor="collegeName">College Name</label>
              <div className="form-group-inner">
                <div className="cmn-form-control">
                  <select
                    name="collegeName"
                    id="collegeName"
                    className="form-control"
                    ref={collegeNameRef}
                    required
                  >
                    <option value="">Select College Name</option>
                    {collegeNames.map((obj, index) => (
                      <option key={index} value={obj.collegeName}>
                        {obj.collegeName}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>       */}
          <div className="form-group">
            <button
              type="submit"
              className="cmn-btn submit-btn"
              disabled={isLoad}
            >
              {!isLoad ? (
                <span>Submit</span>
              ) : (
                <span>
                  <img src={Spinner} alt="Spinner" />
                  Loading...
                </span>
              )}
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default QuestionDetail;
