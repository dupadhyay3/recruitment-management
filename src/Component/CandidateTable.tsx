import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import CandidateAll from './CandidateDetails'
interface ICandidatedata {
  firstName: string;
  middleName: String;
  lastName: String;
  email: String;
  dob: String;
  mobileNo:String;
  educationDetails: String;
  areaOfIntrest: String;
  futureGoal: String;
  currentAddress: String;
  collegeName: String;
  experience:String;
  batch: String;
  collegeId: String;
  _id?:String
}

const CandidateTable = () => {
  const navigate=useNavigate()

  const [data, setData] = useState<ICandidatedata[]>([]);
  useEffect(() => {
    axios
      .get(`http://localhost:5000/management/candidate/get`)
      .then((res: any) => {
        // console.log("res", res);
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  });
  const  CandidatafullInfo = (id?:String) => {
    console.log("candidateIddddddd",id);
    navigate(`/candidateall-table/${id}`)
    };

  return (
    <>
      <table>
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
          {data.map((data) => {
            // console.log("dataaaaaaaaaaa",data);
            return (
              <tr>
                <td onClick={()=>CandidatafullInfo(data?._id)}>{data.firstName} {data.middleName} {data.lastName}</td>
                <td>{data.email}</td>
                <td>{data.dob}</td>
                <td>{data.mobileNo}</td>
                <td>{data.collegeName}</td>
                </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default CandidateTable;
