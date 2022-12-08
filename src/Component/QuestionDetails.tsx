import React, { useCallback, useContext, useRef } from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
// import  from "./  assets/images/ring-36.svg";
import Spinner from "./../assets/images/ring-36.svg";
import InputField from "./Input";

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

  // const handleOnChangeCheckbox = (selectedIndex : number, e : any) => {
  //   let options = data.options;
  //   if(options)
  //   options[selectedIndex].value = e.target.checked;

  //   let question = {
  //     ...data,
  //     options: options,
  //   };
  //   props.updateQuestion(question);
  // };

  // const handleOnChangeRadio = (selectedIndex, e) => {
  //   let options = props.question.options;
  //   options.map(
  //     (data) => (data.value = data.title === e.target.value ? true : false)
  //   );

  //   let question = {
  //     ...props.question,
  //     options: options,
  //   };
  //   props.updateQuestion(question);
  // };

  // const handleOnChangeQuery = (index, e, id) => {
  //   console.log(e);
  //   let options = props.question.options;
  //   options.map((data) => {
  //     data.query = e.target.value;
  //     return (data.value = data.query ? true : false);
  //   });

  //   let question = {
  //     ...props.question,
  //     options: options,
  //   };
  //   props.updateQuestion(question);
  // };

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
                      // onChange={(e) => handleOnChangeCheckbox(index, e)}
                    />
                  ) : data?.optionType === "Query" ? (
                    <div>
                       <label htmlFor="query">SQL Query Answer</label>
                      <textarea
                        id={`custom-checkbox-${index}-${data?._id}`}
                        name={option?._id}
                        defaultValue={option?.query}
                        // onChange={(e) => handleOnChangeQuery(index, e, option._id)}
                      ></textarea>
                    </div>
                  ) : (
                    <input
                      type="radio"
                      value={option?.title}
                      id={`custom-checkbox-${index}-${data?._id}`}
                      name={option?.title}
                      checked={data.ans?.includes(option?.title)}
                      // onChange={(e) => handleOnChangeRadio(index, e)}
                    />
                  )}

                  <label htmlFor={`custom-checkbox-${index}-${data?._id}`}>
                    {option?.title}
                  </label>
                </li>
              );
            })}
          </ul>

          <div>
            {data?.optionType === "Query" ? (
              <div>
                <label htmlFor="query">SQL Query Answer</label>
                <textarea
                  id="query"
                  placeholder="Type Query"
                  className="form-control"
                  value={queryAns}
                  onChange={(e) => setQueryAns(e.target.value)}
                  required
                ></textarea>
              </div>
            ) : (
              <InputField
                id={"answer"}
                labelText={"Answer"}
                inputType={"text"}
                inputValue={question}
                inputPlaceHolder={"Question"}
                onChange={setQuestion}
              />
            )}
          </div>
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
