import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {useSelector} from "react-redux"
import firebaseDb from "../firebase";

const View = () => {
  const currentId = useParams(); 
  const { id } = currentId;
  const {contacts : data } = useSelector((state) => state.data)

  console.log("currentId", currentId);


  return (
    <div className="container mt-5">
      {Object.keys(data).map((userId) => {
        if (userId === id) {
          return (
            <div class="card">
              <div class="card-header lead">제목  : {data[id].fullName}</div>
              <div class="card-body">
                {/* <p class="card-text">성함: {data[id].fullName}</p> */}  
               <p class="card-text">이메일: {data[id].email}</p>
                <p class="card-text">성함: {data[id].address}</p>
                <p class="card-text">내용: {data[id].mobile}</p>
            
                <Link to="/">
                  <a className="btn btn-info">돌아가기</a>
                </Link>
              </div>
            </div>
          );
        }
      })}
    </div>
  );
};

export default View;
