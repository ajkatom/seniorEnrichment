import React, { Component } from "react";
import { Link } from "react-router-dom";
import store, { createStudent, updateStudent } from "./store";
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
      campusId: -1
    };
    this.onChange = this.onChange.bind(this);
    this.changeState = this.changeState.bind(this);
  }

  changeState(student) {
    this.setState({
      firstName: student.firstName,
      lastName: student.lastName,
      profilePic: student.profilePic,
      email: student.email,
      gpa: student.gpa,
      campusId: student.campusId
    });
  }
  componentWillReceiveProps(nextProps) {
    const { students } = nextProps;
    if (students.length) {
      let id = nextProps.match.params.id;
      let student = students.reduce((theStudent, student) => {
        if (student.id === id * 1) theStudent = student;
        return theStudent;
      }, {});
      this.setState(student);
    }
  }
  componentWillMount() {
    const id = this.props.match.params.id * 1;
    this.props.students.map(student => {
      if (student.id === id) this.changeState(student);
    });
  }

  onChange(ev) {
    let key = ev.target.name;
    let value = ev.target.value;
    if (key === "campusId") value *= 1;

    this.setState({ [key]: value });
  }

  render() {
    const { match, history, campuses, students, createStudent } = this.props;
    const id = match.params.id * 1;
    return (
      <div>
        {!id ? (
          <div>
            <h1>Create Student</h1>
            <input
              name="firstName"
              defaultValue="first name "
              onChange={this.onChange}
            />
            <input
              name="lastName"
              defaultValue="last name "
              onChange={this.onChange}
            />
            <input
              name="profilePic"
              defaultValue="pic url "
              onChange={this.onChange}
            />
            <input name="email" defaultValue="email" onChange={this.onChange} />
            <input
              name="gpa"
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
                  {campus.id}
                </option>
              ))}
            </select>
          </div>
        ) : students.length ? (
          <div>
            <h1>{this.state.name}</h1>
            <input
              name="firstName"
              defaultValue={this.state.firstName}
              onChange={this.onChange}
            />
            <input
              name="lastName"
              defaultValue={this.state.lastName}
              onChange={this.onChange}
            />
            <input
              name="profilePic"
              defaultValue={this.state.profilePic}
              onChange={this.onChange}
            />
            <input
              name="email"
              defaultValue={this.state.email}
              onChange={this.onChange}
            />
            <input
              name="gpa"
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
              this.props.updateStudent(this.state, id);
              history.push("/api/students");
            }}
          >
            update
          </button>
        ) : (
          <button
            onClick={() => {
              this.props.createStudent(this.state);
              history.push("/api/students");
            }}
          >
            create
          </button>
        )}
      </div>
    );
  }
}

const mapStateToProps = ({ students, campuses }) => {
  return {
    students,
    campuses
  };
};

const mapDispatchToProps = dispatch => {
  return {
    createStudent: state => {
      dispatch(createStudent(state));
    },
    updateStudent: (state, id) => {
      dispatch(updateStudent(state, id));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(StudentForm);
