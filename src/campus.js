import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink, Link } from "react-router-dom";
import { deleteCampus } from "./store";

const Campus = ({ campuses, students, campus, matchingStudents }) => {
  return (
    <div>
      <div className="container">
        {campus ? (
          <div>
            <img className="d-inline-flex" src={campus.picture} />
            <div className="container">
              <h2 className="d-inline-flex">{campus.name}</h2>
            </div>
            <div className="d-inline-flex">{campus.description}</div>
          </div>
        ) : null}
      </div>
      <Link
        to={"/api/campusForm"}
        type="button"
        className="btn btn-primary btn-lg btn-primary"
      >
        EDIT
      </Link>
      <button className="d-inline-flex" onClick={() => deleteCampus()}>
        delete
      </button>
      {console.log(matchingStudents)}

      {matchingStudents.length
        ? matchingStudents.map(student => {
            return (
              <div key={student.id}>
                <img className="d-inline-flex" src={campus.picture} />
                <NavLink
                  className="d-inline-flex"
                  to={`/api/students/${student.id}`}
                >
                  <h3 key={student.id}>{student.name}</h3>
                </NavLink>
              </div>
            );
          })
        : null}
    </div>
  );
};
const mapStateToProps = ({ students, campuses }) => {
  let matchingStudents = [];
  let campus = {};

  const id = location.hash.slice(location.hash.lastIndexOf("/") + 1);
  if (students && campuses) {
    campus = campuses.find(campus => campus.id === id * 1);
    matchingStudents = students.filter(student => {
      if (student.campusId === id * 1) return student;
    });
  }
  return {
    students,
    campuses,
    matchingStudents,
    campus
  };
};

export default connect(mapStateToProps)(Campus);
