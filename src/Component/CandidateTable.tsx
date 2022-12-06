import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
interface Candidatedata {
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
}

const CandidateTable = () => {
  const navigate=useNavigate()
const  CandidatafullInfo = () => {
  navigate('/candidateall-table')
  };

  const [data, setData] = useState<Candidatedata[]>([]);
  useEffect(() => {
    axios
      .get(`http://localhost:5000/management/candidate/get`)
      .then((res: any) => {
        console.log("res", res);
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  });
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
            console.log("dataaaaaaaaaaa",data);

            return (
              <tr>
                <button onClick={CandidatafullInfo}><td>{data.firstName} {data.middleName} {data.lastName}</td></button>
                
                <td>{data.email}</td>
                <td>{data.dob}</td>
                <td>{data.mobileNo}</td>
                <td>{data.collegeName}</td>
                <td>{data.batch}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default CandidateTable;
