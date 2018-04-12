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
    const { campuses } = this.props;
    let campus = campuses.find(campus => campus.id === ev.target.value * 1);
    this.setState(Object.assign(student, { campusId: ev.target.value * 1 }));
    this.setState({ campus: campus });
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
          <div className="d-flex justify-content-center">
            <div className="card-deck">
              {student ? (
                <div className="card">
                  <img
                    className="card-img-top"
                    alt="Card image cap"
                    src={student.profilePic}
                  />
                  <div className="card-body">
                    <h2>{student.name}</h2>
                    <h4>GPA : {student.gpa}</h4>
                    <br />
                    <Link
                      className="btn btn-primary"
                      to={`/api/students/${student.id}/studentForm`}
                      type="button"
                    >
                      EDIT
                    </Link>
                    <button
                      className="btn btn-primary"
                      onClick={() => {
                        deleteStudent(this.state.student.id);
                        history.push("/api/students");
                      }}
                    >
                      delete
                    </button>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
        <div />
        <div className="d-flex justify-content-center">
          <h2>Select New Campus</h2>
        </div>
        <div className="d-flex justify-content-center">
          <select
            className="form-control"
            name="campusId"
            value={this.state.campus.id}
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
            className="d-flex justify-content-center"
            onClick={() => updateStudent(this.state.student)}
          >
            change
          </button>
        </div>

        <div className="d-flex justify-content-center">
          <div className="card-deck">
            {campus.name ? (
              <div className="card">
                <img className="card-img-top" src={campus.picture} />
                <NavLink
                  className="d-inline-flex"
                  to={`/api/campuses/${campus.id}`}
                >
                  <h3>{campus.name}</h3>
                </NavLink>

                <h4>there are {counter.length} students enrolled</h4>
                <Link
                  className="card-body"
                  to={`/api/campuses/${campus.id}/campusForm`}
                  type="button"
                  className="btn btn-primary btn-lg btn-primary"
                >
                  EDIT CAMPUS
                </Link>
              </div>
            ) : null}
          </div>
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
    updateStudent: student => {
      dispatch(updateStudent(student));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Student);
