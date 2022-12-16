import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Table } from "../shared/table/Table";
import { CSVLink, CSVDownload } from "react-csv"
interface ICandidatedata {
  firstName: string;
  middleName: String;
  lastName: String;
  email: String;
  dob: String;
  mobileNo: String;
  educationDetails: String;
  areaOfIntrest: String;
  futureGoal: String;
  currentAddress: String;
  collegeName: String;
  experience: String;
  batch: String;
  collegeId: String;
  _id?: String;
}

const CandidateTable = () => {
  const navigate = useNavigate();

  const columns = [
    { accessor: "firstName", label: "Name" },
    { accessor: "email", label: "Email" },
    { accessor: "dob", label: "Dob" },
    { accessor: "mobileNo", label: "MobileNo" },
    { accessor: "collegeName", label: "CollegeName" },
    { accessor: "batch", label: "Batch" },
  ];

  const actions = [{ name: "Result" }];

  const [rows, setRows] = useState<ICandidatedata[]>([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API}/management/candidate/get`)
      .then((res: any) => {
        setRows(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const CandidatafullInfo = (id?: String) => {
    navigate(`/candidateall-table/${id}`);
  };

  const handleClickAction = (id?: string, actionName?: string) => {
    navigate(`/candidate-result/${id}`);
  };
const candidate="Candidate"
  return (
    <>
     <CSVLink data={rows} className="mr-0 text-blue-500">Export</CSVLink>
      <div>
          <Table
            rowsPerPage={15}
            rows={rows}
            onClickName={CandidatafullInfo}
            actions={actions}
            onClickAction={handleClickAction}
            columns={columns}
            heading={candidate}
          />
      
      </div>
    </>
  );
};

export default CandidateTable;
