import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "../shared/css/common.css";
import InputField from "../shared/Input";
import Textarea from "../shared/textarea";
import Dropdawn from "../shared/dropdawn";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
interface ICandidatedata {
  optionType?: string;
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

const CandidateAll: any = () => {
  const showToastMessageEdit = () => {
    toast.success("Edit Success!", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };
  const showToastMessageDelete = () => {
    toast.success("Delete Success!", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };
  const experienceArr = [
    {
      name: "0",
    },
    {
      name: "1-2",
    },
    {
      name: "2-3",
    },
    {
      name: "3-4",
    },
  ];
  const navigate = useNavigate();
  const [data, setData] = useState<ICandidatedata>({});
  const [collegeNames, setcollegeNames] = useState<any[]>([]);
  const [isEdit, setIsEdit] = useState<string>("");
  const [firstName, setfirstName] = useState<String>("");
  const [middleName, setmiddleName] = useState<String>("");
  const [lastName, setlastName] = useState<String>("");
  const [email, setemail] = useState<String>("");
  const [dob, setdob] = useState<String>("");
  const [mobileNo, setmobileNo] = useState<String>("");
  const [educationDetails, seteducationDetails] = useState<String>("");
  const [areaOfIntrest, setareaOfIntrest] = useState<String>("");
  const [futureGoal, setfutureGoal] = useState<String>("");
  const [currentAddress, setcurrentAddress] = useState<String>("");
  const [collegeName, setcollegeName] = useState<String>("");
  const [experience, setexperience] = useState<String>("");

  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API}/management/candidateall/get/${id}`)
      .then((res: any) => {
        setData(res.data);
      })
      .catch((err) => {});

    axios.get(`${process.env.REACT_APP_API}/users/college/get`).then((res) => {
      setcollegeNames(res?.data);
    });
  }, [id]);

  useEffect(() => {
    setfirstName(data.firstName ? data.firstName : "");
    setmiddleName(data.middleName ? data.middleName : "");
    setlastName(data.lastName ? data.lastName : "");
    setdob(data.dob ? data.dob : "");

    setemail(data.email ? data.email : "");
    setmobileNo(data.mobileNo ? data.mobileNo : "");
    setcurrentAddress(data.currentAddress ? data.currentAddress : "");
    seteducationDetails(data.educationDetails ? data.educationDetails : "");
    setareaOfIntrest(data.areaOfIntrest ? data.areaOfIntrest : "");
    setfutureGoal(data.futureGoal ? data.futureGoal : "");
    setcollegeName(data.collegeName ? data.collegeName : "");
    setexperience(data.experience ? data.experience : "");
  }, [data]);

  const handleOnChangeExperience = (e: any) => {
    setexperience(e.target.value);
  };

  const handleOnChangeCollege = (e: any) => {
    setcollegeName(e.target.value);
  };

  const handleDelete = () => {
    if (window.confirm("Please confirm, to delete") === true) {
      axios
        .delete(
          `${process.env.REACT_APP_API}/management/candidate/delete/${id}`
        )
        .then((res) => {
          if (res.data.status) {
            showToastMessageDelete();
            setTimeout(() => {
              navigate("/candidate-table");
            }, 3000);
          }
        })
        .catch((err) => {});
    }
  };
  const handleSubmit = (e: any) => {
    e.preventDefault();
    const response = {
      firstName: firstName,
      middleName: middleName,
      lastName: lastName,
      email: email,
      dob: dob,
      mobileNo: mobileNo,
      educationDetails: educationDetails,
      areaOfIntrest: areaOfIntrest,
      futureGoal: futureGoal,
      currentAddress: currentAddress,
      collegeName: collegeName,
      experience: experience,
    };

    if (window.confirm("Please confirm, to edit edit") === true) {
      axios
        .put(
          `${process.env.REACT_APP_API}/management/candidate/update/${id}`,
          response
        )
        .then((res) => {
          if (res.data.status) {
            showToastMessageEdit();
            setTimeout(() => {
              navigate("/candidate-table");
            }, 3000);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  return (
    <>
      <ToastContainer />
      <button onClick={() => setIsEdit("candidate")}>Edit Candidate</button>
      <br />
      <button onClick={handleDelete}>Delete Candidate </button>
      <div className="registration-from-main">
        <h2> Candidate Details</h2>
        <form className="registration-from" onSubmit={(e) => handleSubmit(e)}>
          <div className="rgstr-from-group">
            <div className="form-group form-group3">
              <div className="form-group-inner">
                <div className="cmn-form-control">
                  <InputField
                    labelText={"FirstName"}
                    inputType={"text"}
                    inputName={"FirstName"}
                    inputValue={firstName}
                    inputPlaceHolder={"FirstName"}
                    onChange={setfirstName}
                    id={"firstName"}
                    isDisabled={isEdit === "candidate" ? false : true}
                  />
                </div>
                <div className="cmn-form-control">
                  <InputField
                    labelText={"MiddleName"}
                    inputType={"text"}
                    inputName={"MiddleName"}
                    inputValue={middleName}
                    inputPlaceHolder={"MiddleName"}
                    onChange={setmiddleName}
                    id={"middleName"}
                    isDisabled={isEdit === "candidate" ? false : true}
                  />
                </div>
                <div className="cmn-form-control">
                  <InputField
                    labelText={"LastName"}
                    inputType={"text"}
                    inputName={"LastName"}
                    inputValue={lastName}
                    inputPlaceHolder={"LastName"}
                    onChange={setlastName}
                    id={"lastName"}
                    isDisabled={isEdit === "candidate" ? false : true}
                  />
                </div>
              </div>
            </div>
            <div className="form-group">
              <div className="form-group-inner">
                <div className="cmn-form-control">
                  <InputField
                    labelText={"Date of Birth"}
                    inputType={"date"}
                    inputName={"dob"}
                    inputValue={dob}
                    inputPlaceHolder={"Date of birth"}
                    onChange={setdob}
                    max={`${new Date().getFullYear() - 18}-${
                      (new Date().getMonth() + 1).toString().length > 1
                        ? new Date().getMonth() + 1
                        : "0" + new Date().getMonth() + 1
                    }-${
                      new Date().getDate().toString.length > 1
                        ? new Date().getDate()
                        : "0" + new Date().getDate()
                    }`}
                    id={"dob"}
                    isDisabled={isEdit === "candidate" ? false : true}
                  />
                </div>
              </div>
            </div>
            <div className="form-group ">
              <div className="form-group-inner">
                <div className="cmn-form-control">
                  <InputField
                    labelText={"Email"}
                    inputType={"email"}
                    inputName={"email"}
                    inputValue={email}
                    inputPlaceHolder={"email"}
                    onChange={setemail}
                    id={"email"}
                    isDisabled={isEdit === "candidate" ? false : true}
                  />
                </div>
              </div>
            </div>
            <div className="form-group">
              <div className="form-group-inner">
                <div className="cmn-form-control">
                  <InputField
                    labelText={"Mobile NO."}
                    inputType={"text"}
                    inputName={"phone"}
                    inputValue={mobileNo}
                    inputPlaceHolder={"mobileNo"}
                    minLength={10}
                    maxLength={10}
                    onChange={setmobileNo}
                    id={"phone"}
                    isDisabled={isEdit === "candidate" ? false : true}
                  />
                </div>
              </div>
            </div>{" "}
            <Dropdawn
              onChange={(e: any) => handleOnChangeCollege(e)}
              selectedValue={collegeName}
              id={"collegeName"}
              name={"collegeName"}
              labelText={"College Name"}
              dropdownArr={collegeNames}
              Select={"Select college"}
              isDisabled={isEdit === "candidate" ? false : true}
            />
            <Dropdawn
              onChange={handleOnChangeExperience}
              selectedValue={experience}
              id={"exerience"}
              name={"experience"}
              labelText={"Experience"}
              dropdownArr={experienceArr}
              Select={"Select Experience"}
              isDisabled={isEdit === "candidate" ? false : true}
            />
            <div className="form-group">
              <div className="form-group-inner">
                <div className="cmn-form-control">
                  <Textarea
                    labelText={"currentAddress"}
                    inputName={"currentAddress"}
                    inputValue={currentAddress}
                    inputPlaceHolder={"currentAddress"}
                    onChange={setcurrentAddress}
                    isDisabled={isEdit === "candidate" ? false : true}
                    id={"currentAddress"}
                    rows={"4"}
                    class={"form-control"}
                  />
                </div>
              </div>
            </div>
            <div className="form-group">
              <div className="form-group-inner">
                <div className="cmn-form-control">
                  <Textarea
                    labelText={"Education Details : Last Semester Grade"}
                    inputName={"educationDetails"}
                    inputValue={educationDetails}
                    inputPlaceHolder={"EducationDetails"}
                    onChange={seteducationDetails}
                    isDisabled={isEdit === "candidate" ? false : true}
                    id={"educationDetails"}
                    rows={"4"}
                    class={"form-control"}
                  />
                </div>
              </div>
            </div>
            <div className="form-group">
              <div className="form-group-inner">
                <div className="cmn-form-control">
                  <Textarea
                    labelText={"Area of Interest"}
                    inputName={"areaOfInterest"}
                    inputValue={areaOfIntrest}
                    inputPlaceHolder={"AreaOfInterest"}
                    onChange={setareaOfIntrest}
                    isDisabled={isEdit === "candidate" ? false : true}
                    id={"areaOfInterest"}
                    rows={"4"}
                    class={"form-control"}
                  />
                </div>
              </div>
            </div>
            <div className="form-group">
              <div className="form-group-inner">
                <div className="cmn-form-control">
                  <Textarea
                    labelText={"Future Goal"}
                    inputName={"futureGoal"}
                    inputValue={futureGoal}
                    inputPlaceHolder={"FutureGoal"}
                    onChange={setfutureGoal}
                    isDisabled={isEdit === "candidate" ? false : true}
                    id={"futureGoal"}
                    rows={"4"}
                    class={"form-control"}
                  />
                </div>
              </div>
            </div>
            <div className="form-group">
              {isEdit ? <button type="submit">Submit</button> : null}
            </div>
          </div>
        </form>
      </div>
      ;
    </>
  );
};

export default CandidateAll;
