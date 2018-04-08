import React from "react";
import { connect } from "react-redux";
import { NavLink, Link } from "react-router-dom";
import { deleteStudent, updateStudent } from "./store";

const Students = ({ campuses, students, student }) => {
  if (!students) return <h1>no students</h1>;
  return (
    <div className="d-inline-block">
      <h1>All Students</h1>
      <Link
        to={"/api/students/:id/StudentForm"}
        type="button"
        className="btn btn-primary btn-lg btn-primary"
      >
        ADD student
      </Link>
      <br />
      <br />
      <ul className="list-inline">{student(campuses, students)}</ul>
    </div>
  );
};

const mapStateToProps = ({ campuses, students }) => {
  const student = () =>
    students.length ? (
      students.map(student => {
        let campus = campuses.find(campus => {
          return campus.id === student.campusId;
        });
        if (!campus) campus = null;
        return (
          <div key={student.id}>
            <li className="list-inline-item">
              <img src={student.profilePic} />
              <NavLink to={`/api/students/${student.id}`}>
                <h3>{student.name}</h3>
              </NavLink>
              {campus ? (
                <NavLink to={`/api/campuses/${campus.id}`}>
                  <h3>{campus.name}</h3>
                </NavLink>
              ) : null}
            </li>
          </div>
        );
      })
    ) : (
      <h1> there are no students</h1>
    );
  return {
    campuses,
    student,
    students
  };
};

export default connect(mapStateToProps)(Students);
