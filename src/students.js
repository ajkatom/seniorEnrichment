import React from "react";
import { connect } from "react-redux";
import { NavLink, Link } from "react-router-dom";
import { deleteStudent } from "./store";

const Students = ({ deleteStudent, campuses, students, student }) => {
  if (!students) return <h1>no students</h1>;
  return (
    <div className="container" id="students">
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
        <ul className="card-deck">
          {students.length ? (
            students.map(student => {
              let campus = campuses.find(campus => {
                return campus.id === student.campusId;
              });
              if (!campus) campus = null;
              return (
                <div key={student.id}>
                  <li>
                    <div className="card-header">student card</div>
                    <div className="card" style={{ width: "18rem" }}>
                      <img
                        className="card-img-top"
                        alt="Card image cap"
                        src={student.profilePic}
                      />
                      <div className="card-body">
                        <NavLink to={`/api/students/${student.id}`}>
                          <h3>student name: </h3>
                          <h3>{student.name}</h3>
                        </NavLink>
                        <Link
                          to={`/api/students/${student.id}/studentForm`}
                          type="button"
                          className="btn btn-primary"
                        >
                          EDIT
                        </Link>
                        <button
                          className="btn btn-primary"
                          onClick={() => deleteStudent(student.id)}
                        >
                          delete
                        </button>
                      </div>
                      {campus ? (
                        <NavLink to={`/api/campuses/${campus.id}`}>
                          <h3>{campus.name}</h3>
                        </NavLink>
                      ) : null}
                    </div>
                  </li>
                </div>
              );
            })
          ) : (
            <h1 className="noStudents"> there are no students</h1>
          )}
        </ul>
      </div>
    </div>
  );
};

const mapStateToProps = ({ campuses, students }) => {
  return {
    campuses,
    students
  };
};
const mapDispatchToProps = dispatch => {
  return {
    deleteStudent: id => dispatch(deleteStudent(id))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Students);
