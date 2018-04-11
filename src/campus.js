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

    if (!campuses || !campus) return null;
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
          className="btn btn-primary"
          to={`/api/campuses/${campus.id}/campusForm`}
          type="button"
          className="btn btn-primary btn-lg btn-primary"
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
        <div>
          <h2>add existing students</h2>
          <select
            className="form-control"
            name="campusId"
            value={this.state.student.id}
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
            className="btn btn-primary"
            onClick={() => {
              console.log(typeof pathname);
              updateStudent(this.state.student, this.state.student.id);
            }}
          >
            ADD STUDENT
          </button>
        </div>
        <h2>Enrolled students</h2>
        {matchingStudents.length
          ? matchingStudents.map(student => {
              return (
                <div className="container" key={student.id}>
                  <div className="card-deck">
                    <div className="card">
                      <img
                        className="card-img-top"
                        src={student.profilePic}
                        height="100pix"
                        width="100pix"
                      />
                      <NavLink
                        className="card-body"
                        to={`/api/students/${student.id}`}
                      >
                        <h3 key={student.id}>{student.name}</h3>
                      </NavLink>
                    </div>
                  </div>
                </div>
              );
            })
          : null}
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
    updateStudent: (student, id) => {
      dispatch(updateStudent(student, id));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Campus);
