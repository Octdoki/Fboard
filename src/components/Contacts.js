import React, { useState, useEffect } from "react";
import ContactForm from "./ContactForm";
import firebaseDb from "../firebase";

const Contacts = () => {
  const [data, setData] = useState({});
  const [currentId, setCurrentId] = useState("");

  useEffect(() => {
    firebaseDb.child("contacts").on("value", (snapshot) => {
      if (snapshot.val() !== null) {
        setData({
          ...snapshot.val(),
        });
      } else {
        setData({});
      }
    });
  }, []);

  const addOrEdit = (obj) => {
    if (currentId === "") {
      firebaseDb.child("contacts").push(obj, (err) => {
        if (err) {
          console.log(err);
        } else {
          setCurrentId("");
        }
      });
    } else {
      firebaseDb.child(`contacts/${currentId}`).set(obj, (err) => {
        if (err) {
          console.log(err);
        } else {
          setCurrentId("");
        }
      });
    }
  };

  const onDelete = (id) => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      firebaseDb.child(`contacts/${id}`).remove((err) => {
        if (err) {
          console.log(err);
        } else {
          setCurrentId("");
        }
      });
    }
  };

  return (
    <>
      <div className="jumbotron jumbotron-fluid">
        <div className="container">
          <h1 className="display-4 text-center">연락 관리</h1>
        </div>
      </div>
      <div className="row">
        <div className="col-md-5">
          <ContactForm
            addOrEdit={addOrEdit}
            data={data}
            currentId={currentId}
          />
        </div>
        <div className="col-md-7">
          <table className="table table-borderless table-stripped">
            <thead className="thread-light">
              <tr>
                <th>성명</th>
                <th>연락처</th>
                <th>이메일</th>
                <th>주소</th>
                {/* <th>Action</th> */}
              </tr>
            </thead>
            <tbody>
              {Object.keys(data).map((id) => {
                return (
                  <tr key={id}>
                    <td>{data[id].fullName}</td>
                    <td>{data[id].mobile}</td>
                    <td>{data[id].email}</td>
                    <td>{data[id].address}</td>
                    <td>
                      <a
                        className="btn text-primary"
                        onClick={() => setCurrentId(id)}
                      >
                        <i className="fas fa-pencil-alt" />
                      </a>
                      <a
                        className="btn text-danger"
                        onClick={() => onDelete(id)}
                      >
                        <i className="fas fa-trash-alt" />
                      </a>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Contacts;
