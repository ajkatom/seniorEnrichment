import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Alert } from "reactstrap";
import omit from "object.omit";
import store, { createStudent, updateStudent, clearErrors } from "./store";
import { connect } from "react-redux";
import Campuses from "./campuses";

class StudentForm extends Component {
  constructor() {
    super();
    this.state = {
      firstName: "",
      lastName: "",
      profilePic: "",
      email: "",
      gpa: 0,
      campusId: -1,
      errors: ""
    };
    this.onChange = this.onChange.bind(this);
    this.changeState = this.changeState.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
  }

  changeState(student, errors) {
    this.setState({
      firstName: student.firstName,
      lastName: student.lastName,
      profilePic: student.profilePic,
      email: student.email,
      gpa: student.gpa,
      campusId: student.campusId,
      errors: errors
    });
    if (student.id) {
      this.setState({
        id: student.id
      });
    }
  }
  componentWillReceiveProps(nextProps) {
    const { students, errors } = nextProps;
    if (students.length) {
      let id = nextProps.match.params.id;
      console.log();
      let student = students.reduce((theStudent, student) => {
        if (student.id === id * 1) theStudent = student;
        return theStudent;
      }, {});
      student = omit(student, "name");
      for (let key in student) {
        this.setState({ [key]: student[key] });
      }
      this.setState({ errors: errors });
    }
  }
  componentWillMount() {
    const id = this.props.match.params.id * 1;
    const { errors, students } = this.props;
    students.map(student => {
      if (student.id === id) this.changeState(student, errors);
    });
  }
  onDismiss() {
    this.setState({ errors: "" });
    clearErrors();
  }

  onChange(ev) {
    let key = ev.target.name;
    let value = ev.target.value;
    if (key === "campusId") value *= 1;
    this.setState({ [key]: value });
  }

  render() {
    const { match, history, campuses, students, createStudent } = this.props;
    const { errors } = this.state;
    const id = match.params.id * 1;

    return (
      <div>
        {errors ? (
          <Alert color="info" isOpen={!!errors} toggle={this.onDismiss}>
            {errors}
          </Alert>
        ) : !id ? (
          <div>
            <h1>Create Student</h1>
            <input
              name="firstName"
              placeholder="first name "
              defaultValue=""
              onChange={this.onChange}
            />
            <input
              name="lastName"
              placeholder="last name "
              defaultValue=""
              onChange={this.onChange}
            />
            <input
              name="profilePic"
              placeholder="pic url "
              defaultValue=""
              onChange={this.onChange}
            />
            <input
              name="email"
              placeholder="email"
              defaultValue=""
              onChange={this.onChange}
            />
            <input
              name="gpa"
              placeholder="gpa"
              defaultValue="0"
              type="number"
              min="0"
              max="4.0"
              onChange={this.onChange}
            />
            <select
              className="form-control"
              name="campusId"
              value={this.state.campusId}
              onChange={this.onChange}
            >
              <option value="null">None</option>
              {campuses.map(campus => (
                <option key={campus.id} value={campus.id}>
                  {campus.name}
                </option>
              ))}
            </select>
          </div>
        ) : students.length ? (
          <div>
            <h1>{this.state.name}</h1>
            <input
              name="firstName"
              placeholder={this.state.firstName}
              defaultValue={this.state.firstName}
              onChange={this.onChange}
            />
            <input
              name="lastName"
              placeholder={this.state.lastName}
              defaultValue={this.state.lastName}
              onChange={this.onChange}
            />
            <input
              name="profilePic"
              placeholder={this.state.profilePic}
              defaultValue={this.state.profilePic}
              onChange={this.onChange}
            />
            <input
              name="email"
              placeholder={this.state.email}
              defaultValue={this.state.email}
              onChange={this.onChange}
            />
            <input
              name="gpa"
              placeholder={this.state.gpa}
              defaultValue={this.state.gpa}
              type="number"
              min="0"
              max="4.0"
              onChange={this.onChange}
            />
            <select
              className="form-control"
              name="campusId"
              defaultValue={this.state.campusId}
              onChange={this.onChange}
            >
              <option value="-1">None</option>
              {campuses.map(
                campus =>
                  campus.id === this.state.campusId ? (
                    <option
                      key={campus.id}
                      name="campusId"
                      value={campus.id}
                      selected
                    >
                      {campus.name}
                    </option>
                  ) : (
                    <option key={campus.id} name="campusId" value={campus.id}>
                      {campus.name}
                    </option>
                  )
              )}
            </select>
          </div>
        ) : null}

        {id ? (
          <button
            onClick={() => {
              this.props.updateStudent(this.state);
            }}
          >
            update
          </button>
        ) : (
          <button
            onClick={() => {
              this.props.createStudent(this.state);
            }}
          >
            create
          </button>
        )}
      </div>
    );
  }
}

const mapStateToProps = ({ students, campuses, errors }) => {
  return {
    students,
    campuses,
    errors
  };
};

const mapDispatchToProps = dispatch => {
  return {
    createStudent: state => {
      state = omit(state, "errors");
      dispatch(createStudent(state));
      dispatch(clearErrors());
    },
    updateStudent: (state, id) => {
      state = omit(state, "errors");
      dispatch(updateStudent(state, id));
      dispatch(clearErrors());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(StudentForm);
