import React, { useState, useEffect } from "react";
import firebaseDb from "../firebase";
import { useParams, useHistory } from "react-router-dom";
import { isEmpty } from "lodash";
import {useSelector, useDispatch} from "react-redux"
import { addContactsStart, editContactsStart } from "../redux/actions";
import InputGroup from 'react-bootstrap/InputGroup'

const AddEdit = () => {
  const values = {
    fullName: "",
    mobile: "",
    email: "",
    address: "",
  };
  const [initialState, setState] = useState(values);
  const [error, setError] = useState("")
  //const [data, setData] = useState({});

  //   console.log("currentId", currentId);

  const {contacts : data} = useSelector((state)=> state.data)

  const dispatch = useDispatch()

  const { fullName, mobile, email, address } = initialState;

  const currentId = useParams();
  const history = useHistory();

  const { id } = currentId;

  console.log("currentId", currentId);

  // useEffect(() => {
  //   firebaseDb.child("contacts").on("value", (snapshot) => {
  //     if (snapshot.val() !== null) {
  //       setData({
  //         ...snapshot.val(),
  //       });
  //     } else {
  //       setData({});
  //     }
  //   });
  // }, [id]);

  useEffect(() => {
    if (isEmpty(id)) {
      console.log("initialState", initialState);
      setState({ ...values });
    } else {
      setState({ ...data[id] });
    }
  }, [id, data]);

  const handleInputChange = (e) => {
    let { name, value } = e.target;
    setState({
      ...initialState,
      [name]: value,
    });
  };

  const handleSubmit = (e, obj) => {
    e.preventDefault();
    console.log("initialState", initialState);
    if (isEmpty(fullName) || isEmpty(email) || isEmpty(mobile) || isEmpty(address)) {
      setError("모든 문항을 채워주시길 바랍니다")

    } else if(isEmpty(id)) {
      dispatch(addContactsStart(initialState))
      setError("")
      history.push("/");
    }
    else{
      dispatch(editContactsStart( { initialState , id }))
      setError("")
      history.push("/");
    }
    
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6">
        {error && <div style={{ color: "red" }}>{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="bmd-label-floating">제목</label>
              <input
                type="text"
                className="form-control"
                name="fullName"
                value={fullName} 
                onChange={handleInputChange}
              />
            </div>   
            <div className="form-group">
              <div className="form-group">
              <label className="bmd-label-floating">성함</label>
              <input
                type="text"
                className="form-control"
                name="address"
                value={address}
                onChange={handleInputChange}
              />
              <label className="bmd-label-floating">이메일</label>
              <input
                type="email"
                className="form-control"
                name="email"
                value={email}
                onChange={handleInputChange}
              />
            </div> 
             
            <div class="input-group">
              <span class="input-group-text">내용</span>
              <textarea
                //type="text"
                className="form-control"
                aria-label = "With textarea"
                name="mobile"
                value={mobile}
                onChange={handleInputChange}
              />
            </div>
         
       
            </div>
            <button className="btn btn-default">취소</button>
            <button type="submit" className="btn btn-success btn-raised">
              제출
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddEdit;
