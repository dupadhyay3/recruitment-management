import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Table } from "../shared/table/Table";
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
  _id?: String
}

const CandidateTable = () => {
  const navigate = useNavigate();
  
  const  CandidatafullInfo = (id?:String) => {
    console.log("candidateIddddddd",id);
    navigate(`/candidateall-table/${id}`)
    };

  const columns = [
    { accessor: 'firstName', label: 'Name' },
    { accessor: 'email', label: 'Email' },
    { accessor: 'dob', label: 'Dob' },
    { accessor: 'mobileNo', label: 'MobileNo' },
    { accessor: 'collegeName', label: 'CollegeName' },
    { accessor: 'batch', label: 'Batch' },
  ]

  const [rows, setRows] = useState<ICandidatedata[]>([]);
  useEffect(() => {
    axios
      .get(`http://localhost:5000/management/candidate/get`)
      .then((res: any) => {
        setRows(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  });
  return (
    <>
     <div>
      <Table rows={rows} onClickName={CandidatafullInfo} columns={columns} />
    </div> 

      {/* <table>
        <thead className="thead-light">
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Dob</th>
            <th>MobileNo</th>
            <th>CollegeName</th>
            <th>Batch</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((data, index) => {
            // console.log("dataaaaaaaaaaa",data);

            return (
              <tr key={index}>
                <td onClick={CandidatafullInfo}>
                  {data.firstName} {data.middleName} {data.lastName}
                </td>
                <td>{data.email}</td>
                <td>{data.dob}</td>
                <td>{data.mobileNo}</td>
                <td>{data.collegeName}</td>
                <td>{data.batch}</td>
              </tr>
            );
          })}
        </tbody>
      </table> */}
    </>
  );
};

export default CandidateTable;

