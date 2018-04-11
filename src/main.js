import React, { Component } from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { listCampuses, listStudents } from "./store";
import Nav from "./nav";
import Campuses from "./campuses";
import Students from "./students";
import Home from "./home";
import Student from "./student";
import Campus from "./campus";
import StudentForm from "./studentForm";
import CampusForm from "./campusForm";

class Main extends Component {
  componentDidMount() {
    this.props.listCampuses();
    this.props.listStudents();
  }
  render() {
    return (
      <Router>
        <div>
          <div className="container-fluid">
            <Nav />
          </div>
          <br />
          <Route path="/" exact render={() => <Home />} />
          <Switch>
            <Route path="/api/campuses" exact render={() => <Campuses />} />
            <Route path="/api/students" exact render={() => <Students />} />
            <Route
              path="/api/students/:id"
              exact
              render={({ history, match }) => (
                <Student history={history} match={match} />
              )}
            />
            <Route
              path="/api/students/:id/studentForm"
              exact
              render={({ history, match }) => (
                <StudentForm history={history} match={match} />
              )}
            />
            <Route
              path="/api/campuses/:id"
              exact
              render={({ history, match }) => (
                <Campus history={history} match={match} />
              )}
            />
            <Route
              path="/api/campuses/:id/campusForm"
              exact
              render={({ history, match }) => (
                <CampusForm history={history} match={match} />
              )}
            />
          </Switch>
        </div>
      </Router>
    );
  }
}
const mapDispatchToProps = dispatch => {
  return {
    listCampuses: () => dispatch(listCampuses()),
    listStudents: () => dispatch(listStudents())
  };
};

export default connect(null, mapDispatchToProps)(Main);
