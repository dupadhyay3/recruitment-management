import React from "react";
import { useEffect, useState, useRef} from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import'../shared/css/common.css'
interface ICandidatedata {
  firstName?: string;
  middleName?: String;
  lastName?: String;
  email?: String;
  dob?: String;
  mobileNo?: String;
  educationDetails?: String;
  areaOfIntrest?: String;
  futureGoal?: String;
  currentAddress?: String;
  collegeName?: String;
  experience?: String;
  batch?: String;
  collegeId?: String;
  _id?: String;
}

const CandidateAll:any = () => {
  const firstNameRef = useRef<HTMLInputElement>(null);
  const middleNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const collegeNameRef = useRef<HTMLInputElement>(null);
  const experienceRef = useRef<HTMLInputElement>(null);
  const dateOfBirthRef = useRef<HTMLInputElement>(null);
  const educationDetailsRef = useRef<HTMLInputElement>(null);
  const areaOfInterestRef = useRef<HTMLInputElement>(null);
  const futureGoalRef = useRef<HTMLInputElement>(null);
  const currentAddressRef = useRef<HTMLInputElement>(null);
  const { id } = useParams();
  console.log("ONEiddddddd", id);

  const [data, setData] = useState<ICandidatedata>({});
  console.log("ONEdata", data);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/management/candidateall/get/${id}`)
      .then((res: any) => {
        console.log("res", res);
        if (
          firstNameRef?.current?.value &&
          middleNameRef?.current?.value &&
          lastNameRef?.current?.value &&
          emailRef?.current?.value &&
          phoneRef?.current?.value &&
          collegeNameRef?.current?.value &&
          experienceRef?.current?.value &&
          dateOfBirthRef?.current?.value &&
          educationDetailsRef?.current?.value &&
          areaOfInterestRef?.current?.value &&
          futureGoalRef?.current?.value &&
          currentAddressRef?.current?.value
        ) { firstNameRef.current.value=res.data.firstName
         

        }
        setTimeout(() => {
          console.log("firstname", firstNameRef?.current?.value, 'value');  
        }, 2000);
       
       
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  });
  return (
    <>
    <div className="registration-from-main">
  <h2>Candidate Details</h2>
  <form className="registration-from">  
  {/* onSubmit={(e) => onSubmit(e)} */}
    <div className="rgstr-from-group">
      <div className="form-group form-group3">
        <label htmlFor="firstName">Full Name</label>
        <div className="form-group-inner">
          <div className="cmn-form-control">
            {/* <span className="form-tagname">Firstname</span> */}
            <input
              id="firstName"
              placeholder="FirstName"
              type="text"
              className="form-control"
              ref={firstNameRef}
              required
            />
          </div>
          <div className="cmn-form-control">
            {/* <span className="form-tagname">Middlename</span> */}
            <input
              id="middleName"
              placeholder="MiddleName"
              type="text"
              className="form-control"
              // ref={middleNameRef}
              required
            />
          </div>
          <div className="cmn-form-control">
            {/* <span className="form-tagname">Lastname</span> */}
            <input
              id="lastName"
              placeholder="LastName"
              type="text"
              className="form-control"
              // ref={lastNameRef}
              required
            />
          </div>
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="dateOfBirth">Date of Birth</label>
        <div className="form-group-inner">
          <div className="cmn-form-control">
            {/* <span className="form-tagname">Date</span> */}
            <input
              id="dateOfBirth"
              placeholder="DateOfBirth"
              type="date"
              className="form-control"
              max={`${new Date().getFullYear() - 18}-${
                (new Date().getMonth() + 1).toString().length > 1
                  ? new Date().getMonth() + 1
                  : "0" + new Date().getMonth() + 1
              }-${
                new Date().getDate().toString.length > 1
                  ? new Date().getDate()
                  : "0" + new Date().getDate()
              }`}
              // ref={dateOfBirthRef}
              required
            />
          </div>
        </div>
      </div>
      <div className="form-group ">
        <label htmlFor="email">Email Address</label>
        <div className="form-group-inner">
          <div className="cmn-form-control">
            <input
              id="email"
              placeholder="Email"
              type="email"
              className="form-control"
              // ref={emailRef}
              required
              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
            />
          </div>
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="phone">Mobile No.</label>
        <div className="form-group-inner">
          <div className="cmn-form-control">
            <input
              id="phone"
              placeholder="Mobile No"
              type="text"
              className="form-control"
              // onChange={(e) => handleOnChangePhone(e)}
              // ref={phoneRef}
              // minLength="10"
              // maxLength="10"
              required
            />
          </div>
        </div>
      </div>{" "}
      <div className="form-group">
        <label htmlFor="collegeName">College Name</label>
        <div className="form-group-inner">
          <div className="cmn-form-control">
            <select
              name="collegeName"
              id="collegeName"
              className="form-control"
              // ref={collegeNameRef}
              required
            >
              <option value="">Select College Name</option>
              {/* {collegeNames.map((obj, index) => (
                <option key={index} value={obj.collegeName}>
                  {obj.collegeName}
                </option>
              ))} */}
            </select>
          </div>
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="experience">Experience</label>
        <div className="form-group-inner">
          <div className="cmn-form-control">
            <select
              name="experience"
              id="experience"
              className="form-control"
              // ref={experienceRef}
              required
            >
              <option value="">Select Experience</option>
              <option value="0">0</option>
              <option value="1-2">1-2</option>
              <option value="3-4">3-4</option>
              <option value="5-6">5-6</option>
              <option value="7-8">7-8</option>
              <option value="9-10">9-10</option>
              <option value="10+">10+</option>
            </select>
          </div>
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="currentAddress">Current Address</label>
        <div className="form-group-inner">
          <div className="cmn-form-control">
            <textarea
              id="currentAddress"
              placeholder="CurrentAddress"
              className="form-control"
              // ref={currentAddressRef}
              required
            ></textarea>
          </div>
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="educationDetails">
          Education Details : Last Semester Grade
        </label>
        <div className="form-group-inner">
          <div className="cmn-form-control">
            <textarea
              id="educationDetails"
              placeholder="EducationDetails"
              className="form-control"
              // ref={educationDetailsRef}
              required
            ></textarea>
          </div>
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="areaOfInterest">Area of Interest</label>
        <div className="form-group-inner">
          <div className="cmn-form-control">
            <textarea
              id="areaOfInterest"
              placeholder="AreaOfInterest"
              className="form-control"
              // ref={areaOfInterestRef}
              required
            ></textarea>
          </div>
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="futureGoal">Future Goal</label>
        <div className="form-group-inner">
          <div className="cmn-form-control">
            <textarea
              id="futureGoal"
              placeholder="FutureGoal"
              className="form-control"
              // ref={futureGoalRef}
              required
            ></textarea>
          </div>
        </div>
      </div>
      <div className="form-group">
        {/* <button type="submit" className="cmn-btn submit-btn" disabled={isLoad}>
          {!isLoad ? (
            <span>Submit</span>
          ) : (
            <span>
              <img src={Spinner} alt="Spinner" />
              Loading...
            </span>
          )}
        </button> */}
      </div>
    </div>
  </form>
</div>;
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
          <tr>
            <td>
              {data.firstName} {data.middleName} {data.lastName}
            </td>
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
        </tbody>
      </table>
    </>
  );
};

export default CandidateAll;

