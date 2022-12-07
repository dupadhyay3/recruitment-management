import React, { useRef } from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
// import  from "./  assets/images/ring-36.svg";
import Spinner from "./../assets/images/ring-36.svg";
import InputField from "./Input";

interface IQuestiondata {
  question?: string;
  optionType?: String;
  ans?: string;
  _id?: string;
}

const QuestionDetail = () => {
  const [isLoad, setIsLoad] = useState(false);
  const { id } = useParams();

  const [data, setData] = useState<IQuestiondata>({});
  const [question, setQuestion] = useState<string>("");
  const [queryAns, setQueryAns] = useState<string>("");

  useEffect(() => {
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
    setQuestion(data.question ? data.question : "");
    setQueryAns(data.ans ? data.ans : "");
  }, [data]);

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
