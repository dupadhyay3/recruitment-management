import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

const CandidateResult = () => {
    const { id } = useParams();
    const [Data, setData] = useState([])
    useEffect(() => {
        axios
        .get(`${process.env.REACT_APP_API}/management/result/get/${id}`)
        .then((res: any) => {
          console.log("res.data", res.data);
          setData(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    
        console.log("Data", Data[0]);
    },[])
   
    
  return (
    <div>CandidateResult</div>
  )
}

export default CandidateResult