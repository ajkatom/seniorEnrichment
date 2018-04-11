import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Alert } from "reactstrap";
import omit from "object.omit";
import store, { updateCampus, createCampus, clearErrors } from "./store";
import { connect } from "react-redux";
import Campuses from "./campuses";

class CampusForm extends Component {
  constructor(props) {
    super(props);
    const { name, address, picture, description } = this.props;
    this.state = {
      name: name,
      picture: picture,
      address: address,
      description: description,
      errors: ""
    };
    this.onChange = this.onChange.bind(this);
    this.changeState = this.changeState.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
  }

  changeState(campus, errors) {
    this.setState({
      name: campus.name,
      picture: campus.picture,
      address: campus.address,
      description: campus.description,
      errors: errors
    });
  }
  componentWillReceiveProps(nextProps) {
    const { campuses, errors } = nextProps;
    if (campuses.length) {
      let id = nextProps.match.params.id;
      let campus = campuses.reduce((theCampus, campus) => {
        if (campus.id === id * 1) theCampus = campus;
        return theCampus;
      }, {});
      this.setState({ campus, errors });
    }
  }
  componentWillMount() {
    const { errors, campuses } = this.props;
    const id = this.props.match.params.id * 1;
    campuses.map(campus => {
      if (campus.id === id) this.changeState(campus, errors);
    });
  }

  onDismiss() {
    this.setState({ errors: "" });
    clearErrors();
  }
  onChange(ev) {
    let key = ev.target.name;
    let value = ev.target.value;
    this.setState({ [key]: value });
  }

  render() {
    const { match, history, campuses, students, createCampus } = this.props;
    const { name, address, picture, description, errors } = this.state;
    const id = match.params.id * 1;
    return (
      <div>
        {errors ? (
          <Alert color="info" isOpen={!!errors} toggle={this.onDismiss}>
            {errors}
          </Alert>
        ) : !id ? (
          <div>
            <h1>Create Campus</h1>
            <input
              name="name"
              placeholder="name"
              defaultValue=""
              onChange={this.onChange}
            />
            <input
              name="picture"
              placeholder="pic url "
              defaultValue=""
              onChange={this.onChange}
            />
            <input
              name="address"
              defaultValue=""
              placeholder="address"
              onChange={this.onChange}
            />
            <textarea
              name="description"
              placeholder="description"
              defaultValue=""
              onChange={this.onChange}
            />
          </div>
        ) : students.length ? (
          <div>
            <h1>{name}</h1>
            <input
              name="name"
              placeholder={name}
              defaultValue={name}
              onChange={this.onChange}
            />
            <input
              name="description"
              placeholder={description}
              defaultValue={description}
              onChange={this.onChange}
            />
            <input
              name="picture"
              placeholder={picture}
              defaultValue={picture}
              onChange={this.onChange}
            />
            <input
              name="address"
              placeholder={address}
              defaultValue={address}
              onChange={this.onChange}
            />
          </div>
        ) : null}
        {id ? (
          <button
            onClick={() => {
              this.props.updateCampus(this.state, id);
            }}
          >
            update
          </button>
        ) : (
          <button
            onClick={() => {
              this.props.createCampus(this.state);
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
    createCampus: state => {
      state = omit(state, "errors");
      dispatch(createCampus(state));
      dispatch(clearErrors());
    },
    updateCampus: (state, id) => {
      state = omit(state, "errors");
      dispatch(updateCampus(state, id));
      dispatch(clearErrors());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CampusForm);
