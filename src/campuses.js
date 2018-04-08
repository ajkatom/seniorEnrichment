import React from "react";
import { connect } from "react-redux";
import { NavLink, Link } from "react-router-dom";
import { deleteCampus } from "./store";

const Campuses = ({ campuses, students, campus }) => {
  return (
    <div className="container">
      <h1>All Campuses</h1>
      <div className="d-inline-block">
        <Link
          to={"/api/createCampus"}
          type="button"
          className="btn btn-primary btn-lg btn-primary"
        >
          ADD CAMPUS
        </Link>
        <br />
        <br />
        <ul className="list-inline">{campus(campuses, students)}</ul>
      </div>
    </div>
  );
};

const mapStateToProps = ({ campuses, students }) => {
  const campus = () =>
    campuses.length ? (
      campuses.map(campus => {
        let counter = students.filter(student => {
          return student.campusId === campus.id;
        });
        return (
          <div key={campus.id}>
            <li className="list-inline-item" key={campus.id}>
              <NavLink to={`/api/campuses/${campus.id}`}>
                <img src={campus.picture} />
                <h3>{campus.name}</h3>
              </NavLink>
              {counter.length} students
            </li>
            <Link
              to={"/api/campusForm"}
              type="button"
              className="btn btn-primary btn-lg btn-primary"
            >
              EDIT
            </Link>
            <button className="d-inline-flex" onClick={() => deleteCampus()}>
              delete
            </button>
          </div>
        );
      })
    ) : (
      <h1> THERE ARE NO CAMPUSES</h1>
    );
  return {
    campuses,
    campus
  };
};

export default connect(mapStateToProps)(Campuses);
