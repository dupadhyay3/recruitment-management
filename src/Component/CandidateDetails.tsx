import React from "react";
import { useEffect, useState } from "react";
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

const CandidateAll = () => {
 

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
            <th>educationDetails</th>
            <th>areaOfIntrest</th>
            <th>futureGoal</th>
            <th>currentAddress</th>
            <th>experience</th>
            <th>batch</th>
            <th>collegeId</th>
          </tr>
        </thead>
        <tbody>
          {data.map((data) => {
            console.log(data);

            return (
              <tr>
                <td>{data.firstName} {data.middleName} {data.lastName}</td>
                <td>{data.email}</td>
                <td>{data.dob}</td>
                <td>{data.mobileNo}</td>
                <td>{data.collegeName}</td>
                <td>{data.batch}</td>
                <td>{data.educationDetails}</td>
                <td>{data.areaOfIntrest}</td>
                <td>{data.futureGoal}</td>
                <td>{data.currentAddress}</td>
                <td>{data.experience}</td>
                <td>{data.collegeId}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default CandidateAll;
