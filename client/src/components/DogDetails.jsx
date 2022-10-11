import React from "react";
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDogDetail } from "../redux/actions";
import './styles/DogDetails.css'

const DogDetails = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const dogInfo = useSelector((state) => state.dogsDetail);
  

  const [loading, setloading] = useState(true);

  useEffect(() => {
    dispatch(getDogDetail(params.id)).then(() => setloading(false));
  }, [params.id]);

  return (
    <div className="All-Container">
      <Link to='/home'><button className="anashe">Go Back</button></Link>
      {loading ? (
        <span>Loading...</span>
      ) : (
        <div className="Info-Container">
          <img src={dogInfo.image} alt="Dog" width="476px" height="400px"/>
          <h2 className="name">{dogInfo.name}</h2>                 
          <h3 className="alturapa">Height: {dogInfo.height} cm</h3>               
          <h4 className="pesopa">Weight: {dogInfo.weight} kg</h4>               
          <h4 className="lifespanpa">LifeSpan: {dogInfo.createdDB ? dogInfo.life_span + " years" : dogInfo.life_span}</h4>  
          <h5 className="temperamentspa">{!dogInfo.createdDB ? dogInfo.temperament : dogInfo.temperaments.map((el) => el.name + (", "))}</h5>
        </div>
      )}
    </div>
  );
};

export default DogDetails;