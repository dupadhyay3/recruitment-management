import { useCallback } from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import InputField from "../shared/Input";
import Dropdawn from "../shared/dropdawn";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'
interface IQuestiondata {
  question?: string;
  optionType?: String;
  ans?: string[];
  _id?: string;
  options?: any[];
}

const QuestionDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const confirmDelete = () => {
    confirmAlert({
      title: 'Confirm to submit',
      message: 'Are you sure to do this.',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {handleDelete()}
        },
        {
          label: 'No',
          onClick: () => false
        }
      ]
    });
  };
  const confirmSubmit = (e:any) => {
    e.preventDefault();
    confirmAlert({
      title: 'Confirm to submit',
      message: 'Are you sure to do this.',
      buttons: [
        {
          label: 'Yes',
          onClick: (e) => {handleSubmit()}
        },
        {
          label: 'No',
          onClick: () => false
        }
      ]
    });
  };
  const showToastMessageEdit = () => {
    toast.success("Edit Success!", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };
  const showToastMessageDelete = () => {
    toast.success("Delete Success!", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  const optionTypes = [
    { name: "Single" },
    { name: "Query" },
    { name: "Multiple" },
  ];

  const [data, setData] = useState<IQuestiondata>({});
  const [isEdit, setIsEdit] = useState<string>("");

  const fetchQuestion = useCallback(() => {
    axios
      .get(`${process.env.REACT_APP_API}/management/question/get/${id}`)
      .then((res: any) => {
        setData(res?.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    fetchQuestion();
  }, [fetchQuestion]);

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
    setData((pre) => ({ ans: data.ans, ...pre }));
  };

  const handleOnChangeQuery = (index: number, e: any) => {
    data.ans = [e.target.value];
    setData((pre) => ({ ans: data.ans, ...pre }));
  };

  const handleOnchangeQuestion = (value: string) => {
    data.question = value;
    setData((pre) => ({ question: data.question, ...pre }));
  };

  const handleOnChangeOptionType = (e: any) => {
    data.optionType = e.target.value;
    setData((pre) => ({ optionType: data.optionType, ...pre }));
  };

  const handleOnChangeExistingOptions = (index: number, e: any) => {
    if (data.options) data.options[index].title = e.target.value;
    setData((pre) => ({ options: data.options, ...pre }));
  };

  const handleOnChangeoptions = (index: number, e: any) => {
    if (data?.options?.length !== 4) {
      for (let i = 0; i <= 3; i++) {
        if (data.options) {
          if (index !== i) data.options[i] = { value: false, title: "" };
          else data.options[index] = { value: false, title: e.target.value };
        }
      }
      setData((pre) => ({ options: data.options, ...pre }));
    } else handleOnChangeExistingOptions(index, e);
  };

  const handleSubmit = () => {
   
    if (data.optionType === "Query") {
      data.options = [{ value: false, query: "" }];
      setData((pre) => ({ options: data.options, ...pre }));
    }
    if (data.ans) {
      if (
        data.optionType === "Query" ||
        data.ans.every((el) => data.options?.some((data) => el === data.title))
      ) {
        
          axios
            .put(
              `${process.env.REACT_APP_API}/management/question/update/${id}`,
              data
            )
            .then((res) => {
              console.log(res);
              showToastMessageEdit()
              setTimeout(() => {
              navigate("/question-table");
              }, 2000);
              
             
            })
            .catch((err) => {
              console.log(err);
            });
        
      } else {
        alert("Check answer!");
      }
    }
  };

  const handleDelete = () => {
   
      axios
        .delete(`${process.env.REACT_APP_API}/management/question/delete/${id}`)
        .then((res) => {
          if (res.data.status) {
            showToastMessageDelete()
            setTimeout(() => {
            navigate("/question-table");
            }, 2000);
           
            
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  

  return (
    <>
    <div className="card">
      <div className="card-header flex items-center">
        <div className="">
          <h5 className="card-header-title">Question</h5>
        </div>
        <div className="ml-auto">
          <button className="btn btn-sm btn-dark mr-3" onClick={() => setIsEdit("question")}>Edit Question</button>
          {data.optionType !== "Query" ? (
            <button className="btn btn-sm btn-dark mr-3" onClick={() => setIsEdit("option")}>Edit Options</button>
          ) : null}
          <button className="btn btn-sm btn-dark mr-3" onClick={() => setIsEdit("answer")}>Edit Answer</button>
          <button className="btn btn-sm btn-primary mr-3" onClick={() => handleDelete()}>Delete Question</button>
        </div>
      </div>
      
        <form className="from" onSubmit={(e) => confirmSubmit(e)}>
        <div className="card-body">
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
                          <label className="form-label" htmlFor="query">SQL Query Answer</label>
                          <textarea
                            id={`custom-checkbox-${index}-${data?._id}`}
                            className={`form-control`}
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
                      <li className="pb-3" key={`${index}-${data?._id}`}>
                        <input
                          type="text"
                          className="form-control"
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
            </div>
            {isEdit ? (
              <div className="card-footer flex">
                <button type="submit" className="btn btn-sm btn-primary mr-3">
                  Submit
                </button>
              </div>
            ) : null}
          
        </form>
      </div>

      

      
    </>
  );
};

export default QuestionDetail;
