import axios from "axios";
import React, { useEffect, useReducer } from "react";

interface IQuestion {
  question: string;
  optionType: string;
  ans: string[];
  options: IOption[];
}

interface IOption {
  title?: string;
  value: boolean;
  query?: string;
  _id: string;
}

interface IAction {
  type: string;
  payload: any;
}

export const QuestionContext = React.createContext<any>({
  question: "",
  optionType: "",
  ans: [],
  options: [],
});

function questionReducer(state: any, action: IAction) {
  switch (action.type) {
    case "GET_QUESTION":
      let resData: any;
      axios
        .get(
          `${process.env.REACT_APP_API}/management/question/get/${action.payload}`
        )
        .then((res) => {
          resData = res?.data;
          console.log("res", resData);
        });
      return { ...state, ...resData };
    default:
      return state;
  }
}

export const QuestionProvider = (props: any) => {
  const [question, questionDispatch] = useReducer<any>(questionReducer, {
    question: "",
    optionType: "",
    ans: [],
    options: [],
  });

  useEffect(() => {
    console.log("question", question);
  }, [question]);

  return (
    <QuestionContext.Provider
      value={{
        question: question,
        questionDispatch: questionDispatch,
      }}
    >
      {props.children}
    </QuestionContext.Provider>
  );
};
