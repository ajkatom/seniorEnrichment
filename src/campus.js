import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink, Link } from "react-router-dom";
import { deleteCampus, updateStudent } from "./store";
import omit from "object.omit";

class Campus extends Component {
  constructor(props) {
    super(props);
    this.state = {
      student: {}
    };
    this.onChange = this.onChange.bind(this);
  }
  onChange(ev) {
    const campusId =
      location.hash.slice(location.hash.lastIndexOf("/") + 1) * 1;
    const studentId = ev.target.value * 1;
    const { students } = this.props;
    let student = students.find(student => student.id === studentId);
    student = omit(student, "name");
    student.campusId = campusId;
    this.setState({ student });
  }
  componentWillReceiveProps(nextProps) {
    const { campus } = nextProps;
    this.setState({ student: campus });
  }

  render() {
    const {
      history,
      deleteCampus,
      campuses,
      students,
      campus,
      matchingStudents,
      updateStudent
    } = this.props;
    const { student } = this.state;
    if (!campuses || !campus) return null;
    return (
      <div className="container">
        <div className="d-flex justify-content-center">
          <div className="card-deck">
            {campus ? (
              <div className="card">
                <img
                  className="card-img-top"
                  alt="Card image cap"
                  src={campus.picture}
                />
                <h2>{campus.name}</h2>
                <p>{campus.description}</p>
                <div className="card-body">
                  <Link
                    className="btn btn-primary"
                    to={`/api/campuses/${campus.id}/campusForm`}
                    type="button"
                    className="btn btn-primary btn"
                  >
                    EDIT
                  </Link>
                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      deleteCampus(campus.id);
                      history.push("/api/campuses");
                    }}
                  >
                    delete
                  </button>
                </div>
              </div>
            ) : null}
          </div>
        </div>
        <div className="d-flex justify-content-center">
          <h2>add existing students</h2>
        </div>
        <div className="d-flex justify-content-center">
          <select
            className="form-control"
            name="campusId"
            value={student.id}
            onChange={this.onChange}
          >
            <option value="-1">None</option>
            {students.map(student => (
              <option key={student.id} value={student.id}>
                {student.name}
              </option>
            ))}
          </select>
          <button
            className="btn btn-primary btn-sm"
            onClick={() => {
              if (!matchingStudents.includes(student)) {
                const pathName = history.location.pathname;
                updateStudent(student, pathName);
              } else {
                return (
                  <h3>this students is already enrolled in this school</h3>
                );
              }
            }}
          >
            ADD STUDENT
          </button>
        </div>
        <h2 className="d-flex justify-content-center">Enrolled students</h2>
        <div className="d-flex justify-content-center">
          {matchingStudents.length ? (
            matchingStudents.map(student => {
              return (
                <div key={student.id}>
                  <div className="card">
                    <img className="card-img-top" src={student.profilePic} />
                    <NavLink
                      className="card-body"
                      to={`/api/students/${student.id}`}
                    >
                      <h3 key={student.id}>{student.name}</h3>
                    </NavLink>
                  </div>
                </div>
              );
            })
          ) : (
            <h1>there are no students enrolled</h1>
          )}
        </div>
      </div>
    );
  }
}
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
const mapDispatchToProps = dispatch => {
  return {
    deleteCampus: id => {
      dispatch(deleteCampus(id));
    },
    updateStudent: (student, pathName) => {
      dispatch(updateStudent(student, pathName));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Campus);
