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
     <div>
      <Table rowsPerPage={3} rows={rows} onClickName={questionfullInfo} columns={columns} />
    </div> 
    </>
  );
};

export default QuestionTable;
