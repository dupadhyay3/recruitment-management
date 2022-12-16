import axios from "axios";
import { useEffect, useState } from "react";
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
        res.data[0].questionAnswer.map((data: any, index: any) => {
          axios
            .get(
              `${process.env.REACT_APP_API}/management/question/get/${data.questionId}`
            )
            .then((response: any) => {
              if (data.questionId === response.data?._id) {
                res.data[0].questionAnswer[index]["question"] =
                  response.data.question;
                res.data[0].questionAnswer[index]["RealAns"] =
                  response.data.ans;
                if (response.data.optionType !== "Query") {
                  res.data[0].questionAnswer[index]["isCorrect"] =
                    JSON.stringify(
                      JSON.stringify(res.data[0].questionAnswer[index].ans) ===
                        JSON.stringify(
                          res.data[0].questionAnswer[index].RealAns
                        )
                    );
                } else if (response.data.optionType === "Query") {
                  res.data[0].questionAnswer[index]["isCorrect"] = "Query";
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
  }, [id]);

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
