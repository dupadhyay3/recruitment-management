import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Table } from "../shared/table/Table";

interface IQuestiondata {
    question: string;
    optionType: String;
    _id : string
}
const question="Question"
const QuestionTable = () => {
  const navigate = useNavigate();
  
  const  questionfullInfo = (id?:String) => {
    navigate(`/question-detail/${id}`);
    };

  const columns = [
    { accessor: 'question', label: 'Question' },
    { accessor: 'optionType', label: 'OptionType' },
  ]

  const [rows, setRows] = useState<IQuestiondata[]>([]);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API}/management/question/get`)
      .then((res: any) => {
        console.log(res);
        setRows(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <>
     
      <Table rowsPerPage={6} rows={rows} onClickName={questionfullInfo} columns={columns} heading={question} />
    
    </>
  );
};

export default QuestionTable;
