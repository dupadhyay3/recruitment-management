import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Table } from "../shared/table/Table";

interface IQuestionAnswer {
  RealAns: string[];
  ans: string[];
  isCorrect?: boolean;
  question: string;
  questionId: string;
  _id: string;
}

const CandidateResult = () => {
  const { id } = useParams();
  // const [Data, setData] = useState([]);

  const columns = [
    { accessor: "question", label: "Question" },
    { accessor: "RealAns", label: "Real Answer" },
    { accessor: "ans", label: "Candidate Answer" },
    { accessor: "isCorrect", label: "Result" },
  ];

  const [rows, setRows] = useState<IQuestionAnswer[]>([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API}/management/result/get/${id}`)
      .then((res: any) => {
        // console.log("res.data", res.data[0]);
        res.data[0].questionAnswer.map((data: any, index: any) => {
          // console.log("id", data.questionId);

          axios
            .get(
              `${process.env.REACT_APP_API}/management/question/get/${data.questionId}`
            )
            .then((response: any) => {
              // console.log(
              //   "one response",
              //   data.questionId,
              //   response.data?._id,
              //   data.questionId === response.data?._id
              // );
              if (data.questionId === response.data?._id) {
                res.data[0].questionAnswer[index]["question"] =
                  response.data.question;
                res.data[0].questionAnswer[index]["RealAns"] =
                  response.data.ans;
                if (response.data.optionType !== "Query") {
                  // console.log(
                  //   "response answer",
                  //   res.data[0].questionAnswer[index].ans,
                  //   res.data[0].questionAnswer[index].RealAns,
                  //   JSON.stringify(res.data[0].questionAnswer[index].ans) ===
                  //     JSON.stringify(res.data[0].questionAnswer[index].RealAns)
                  // );

                  res.data[0].questionAnswer[index]["isCorrect"] =
                    JSON.stringify(
                      JSON.stringify(res.data[0].questionAnswer[index].ans) ===
                        JSON.stringify(
                          res.data[0].questionAnswer[index].RealAns
                        )
                    );
                }
                console.log("simmilar", response.data);
              }
            });
        });

        setTimeout(() => {
          setRows(res.data[0].questionAnswer);
        }, 1000);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    console.log("data============", rows);
  }, [rows]);

  const handleQuestionAns = (id?: string) => {
    console.log(id);
  };

  return (
    <>
      <div>
        <Table
          rowsPerPage={7}
          rows={rows}
          columns={columns}
          onClickName={handleQuestionAns}
        />
      </div>
    </>
  );
};

export default CandidateResult;
