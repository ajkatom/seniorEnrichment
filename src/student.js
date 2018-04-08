import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink, Link } from "react-router-dom";
import { deleteStudent, updateStudent } from "./store";
import omit from "object.omit";

class Student extends Component {
  constructor(props) {
    super(props);
    const student = omit(this.props.student, "name");
    this.state = {
      student: student,
      campus: this.props.campus
    };
    this.onChange = this.onChange.bind(this);
  }
  onChange(ev) {
    const { student } = this.state;
    this.setState(Object.assign(student, { campusId: ev.target.value * 1 }));
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.student) {
      const student = omit(nextProps.student, "name");
      this.setState({
        student: student,
        campus: nextProps.campus
      });
    }
  }

  render() {
    const {
      history,
      match,
      student,
      campus,
      counter,
      students,
      campuses,
      deleteStudent,
      updateStudent
    } = this.props;
    if (!students || !student) return null;
    return (
      <div>
        <div className="container">
          {student ? (
            <div>
              <img className="d-inline-flex" src={student.profilePic} />
              <div className="container">
                <h2 className="d-inline-flex">{student.name}</h2>
              </div>

              <div className="d-inline-flex">{student.gpa}</div>
            </div>
          ) : null}
        </div>
        <h2>Select New Campus</h2>
        <select
          className="form-control"
          name="campusId"
          value={campus.id}
          onChange={this.onChange}
        >
          <option value="-1">None</option>
          {campuses.map(campus => (
            <option key={campus.id} value={campus.id}>
              {campus.name}
            </option>
          ))}
        </select>
        <button
          onClick={() =>
            updateStudent(this.state.student, this.state.student.id)
          }
        >
          change
        </button>
        <br />
        <Link
          to={`/api/students/${student.id}/studentForm`}
          type="button"
          className="btn btn-primary btn-lg btn-primary"
        >
          EDIT
        </Link>
        <button
          className="d-inline-flex"
          onClick={() => {
            deleteStudent(this.state.student.id);
            history.push("/api/students");
          }}
        >
          delete
        </button>
        <div>
          {campus ? (
            <div>
              <img className="d-inline-flex" src={campus.picture} />
              <NavLink
                className="d-inline-flex"
                to={`/api/campuses/${campus.id}`}
              >
                <h3>{campus.name}</h3>
              </NavLink>
              <br />
              {counter.length} students
            </div>
          ) : (
            <h3>This Student is not registered with a campus</h3>
          )}
          <Link
            className="d-inline-flex"
            to={`/api/campuses/${campus.id}/campusForm`}
            type="button"
            className="btn btn-primary btn-lg btn-primary"
          >
            EDIT campus
          </Link>
        </div>
      </div>
    );
  }
}
const mapStateToProps = ({ students, campuses }) => {
  let student = {};
  const id = location.hash.slice(location.hash.lastIndexOf("/") + 1);
  student = students.find(student => student.id === id * 1);
  let campus = {};
  if (student) campus = campuses.find(campus => campus.id === student.campusId);
  if (!campus) campus = {};
  let counter = students.filter(student => {
    return student.campusId === campus.id;
  });
  return {
    students,
    campuses,
    student,
    campus,
    counter
  };
};
const mapDispatchToProps = dispatch => {
  return {
    deleteStudent: id => {
      dispatch(deleteStudent(id));
    },
    updateStudent: (student, id) => {
      dispatch(updateStudent(student, id));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Student);
