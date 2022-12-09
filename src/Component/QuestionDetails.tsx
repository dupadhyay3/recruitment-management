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
  const [isView, setIsView] = useState<boolean>(true);
  const [isEdit, setIsEdit] = useState<string>("");

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

    // questionContextValue.questionDispatch({
    //   type: "GET_QUESTION",
    //   payload: id,
    // });
  }, []);

  useEffect(() => {
    fetchQuestion();
  }, [fetchQuestion]);

  useEffect(() => {
    setQuestion(data.question ? data.question : "");
    setQueryAns(data.ans?.length ? data.ans[0] : "");
  }, [data]);

  const handleOnChangeCheckbox = (selectedIndex: number, e: any) => {
    if (
      data.ans &&
      !data.ans.every((el) => data.options?.some((data) => el === data.title))
    ) {
      data.ans.every((el, index) => {
        if (!data.options?.some((data) => el === data.title)) {
          data.ans?.splice(index, 1);
        }
      });
    }

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
    console.log(data.ans);

    setData((pre) => ({ ans: data.ans, ...pre }));
    // console.log("data", data);
  };

  const handleOnChangeQuery = (index: number, e: any) => {
    data.ans = [e.target.value];
    console.log("data.ans", data.ans);

    setData((pre) => ({ ans: data.ans, ...pre }));
  };

  const handleOnchangeQuestion = (value: string) => {
    console.log(value);
    data.question = value;
    setData((pre) => ({ question: data.question, ...pre }));
  };

  const handleOnChangeOptionType = (e: any) => {
    console.log(e.target.value);
    data.optionType = e.target.value;
    setData((pre) => ({ optionType: data.optionType, ...pre }));
  };

  const handleOnChangeExistingOptions = (index: number, e: any) => {
    if (data.options) data.options[index].title = e.target.value;
    setData((pre) => ({ options: data.options, ...pre }));
    console.log(data.options);
  };

  const handleOnChangeoptions = (index: number, e: any) => {
    if (data?.options?.length !== 4) {
      for (let i = 0; i <= 3; i++) {
        if (data.options) {
          if (index !== i) data.options[i] = { value: false, title: "" };
          else data.options[index] = { value: false, title: e.target.value };
        }
      }

      console.log(data.options);

      setData((pre) => ({ options: data.options, ...pre }));
    } else handleOnChangeExistingOptions(index, e);
  };

  const onSubmit = (e: any) => {
    e.preventDefault();
    if (data.optionType === "Query") {
      data.options = [{ value: false, query: "" }];
      setData((pre) => ({ options: data.options, ...pre }));
    }

    console.log(data.options, data.ans);
    if (data.ans) {
      if (
        data.optionType === "Query" ||
        data.ans.every((el) => data.options?.some((data) => el === data.title))
      ) {
        console.log("data", data);
      } else {
        alert("Check answer!");
      }
    }
  };

  return (
    <>
      <button onClick={() => setIsEdit("question")}>Edit Question</button>
      {data.optionType !== "Query" ? (
        <button onClick={() => setIsEdit("option")}>Edit Options</button>
      ) : null}
      <button onClick={() => setIsEdit("answer")}>Edit Answer</button>

      <form className="from" onSubmit={(e) => onSubmit(e)}>
        <div className="from-group">
          <InputField
            id={"question"}
            labelText={"Question"}
            inputType={"text"}
            inputValue={data.question}
            inputPlaceHolder={"Question"}
            onChange={handleOnchangeQuestion}
            isDisabled={isEdit === "question" ? false : true}
          />

          <Dropdawn
            id={"optionType"}
            name={"optionType"}
            dropdownArr={optionTypes}
            Select={"Select Option Type"}
            labelText={"OptionType"}
            selectedValue={data.optionType}
            onChange={(e: any) => handleOnChangeOptionType(e)}
            isDisabled={isEdit === "question" ? false : true}
          />

          {!isEdit || isEdit === "answer" ? (
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
                        disabled={
                          isEdit === "option" || isEdit === "answer"
                            ? false
                            : true
                        }
                      />
                    ) : data?.optionType === "Query" && !index ? (
                      <div>
                        <label htmlFor="query">SQL Query Answer</label>
                        <textarea
                          id={`custom-checkbox-${index}-${data?._id}`}
                          name={option?._id}
                          defaultValue={data.ans?.length ? data.ans[0] : ""}
                          onChange={(e) => handleOnChangeQuery(index, e)}
                          disabled={
                            isEdit === "option" || isEdit === "answer"
                              ? false
                              : true
                          }
                        ></textarea>
                      </div>
                    ) : data.optionType === "Single" ? (
                      <input
                        type="radio"
                        value={option?.title}
                        id={`custom-checkbox-${index}-${data?._id}`}
                        name={option?.title}
                        checked={data.ans?.includes(option?.title)}
                        onChange={(e) => handleOnChangeRadio(index, e)}
                        disabled={
                          isEdit === "option" || isEdit === "answer"
                            ? false
                            : true
                        }
                      />
                    ) : null}

                    {data.optionType !== "Query" ? (
                      <label htmlFor={`custom-checkbox-${index}-${data?._id}`}>
                        {option?.title}
                      </label>
                    ) : null}
                  </li>
                );
              })}
            </ul>
          ) : isEdit === "option" ? (
            <ul className="question-list">
              {data?.options?.length === 4 &&
                data?.options?.map((option, index) => {
                  return (
                    <li key={`${index}-${data?._id}`}>
                      <input
                        type="text"
                        value={option?.title}
                        id={`custom-checkbox-${index}-${data?._id}`}
                        name={option?.title}
                        onChange={(e) =>
                          handleOnChangeExistingOptions(index, e)
                        }
                      />
                    </li>
                  );
                })}

              {data?.options?.length !== 4 && (
                <div>
                  <input
                    type="text"
                    value={
                      data?.options?.length
                        ? data?.options[0].title
                          ? data?.options[0].title
                          : data?.options[0].query
                        : ""
                    }
                    id="option1"
                    required
                    onChange={(e) => handleOnChangeoptions(0, e)}
                  />
                  <input
                    type="text"
                    value={
                      data?.options?.length && data?.options[1]
                        ? data?.options[1].title
                        : ""
                    }
                    id="option2"
                    required
                    onChange={(e) => handleOnChangeoptions(1, e)}
                  />
                  <input
                    type="text"
                    value={
                      data?.options?.length && data?.options[2]
                        ? data?.options[2].title
                        : ""
                    }
                    id="option3"
                    required
                    onChange={(e) => handleOnChangeoptions(2, e)}
                  />
                  <input
                    type="text"
                    value={
                      data?.options?.length && data?.options[3]
                        ? data?.options[3].title
                        : ""
                    }
                    id="option4"
                    required
                    onChange={(e) => handleOnChangeoptions(3, e)}
                  />
                </div>
              )}
            </ul>
          ) : null}

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

          {isEdit ? (
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
          ) : null}
        </div>
      </form>
    </>
  );
};

export default QuestionDetail;
