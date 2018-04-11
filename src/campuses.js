import React from "react";
import { connect } from "react-redux";
import { NavLink, Link } from "react-router-dom";
import { deleteCampus } from "./store";

const Campuses = ({ campuses, students, deleteCampus }) => {
  if (!campuses) return <h1>no Campuses</h1>;
  return (
    <div className="container">
      <h1>All Campuses</h1>
      <div className="d-inline-block">
        <Link
          to={"/api/campuses/:id/campusForm"}
          type="button"
          className="btn btn-primary btn-lg btn-primary"
        >
          ADD CAMPUS
        </Link>
        <ul className="card-deck">
          {campuses.length ? (
            campuses.map(campus => {
              let counter = students.filter(student => {
                return student.campusId === campus.id;
              });
              return (
                <div key={campus.id}>
                  <li key={campus.id}>
                    <div className="card" style={{ width: "18rem" }}>
                      <img
                        className="card-img-top"
                        alt="Card image cap"
                        src={campus.picture}
                      />
                      <div className="card-body">
                        <NavLink to={`/api/campuses/${campus.id}`}>
                          <h3>{campus.name}</h3>
                        </NavLink>
                        <Link
                          to={`/api/campuses/${campus.id}/campusForm`}
                          type="button"
                          className="btn btn-primary"
                        >
                          EDIT
                        </Link>
                        <button
                          className="btn btn-primary"
                          onClick={() => deleteCampus(campus.id)}
                        >
                          delete
                        </button>
                        {counter.length} students
                      </div>
                    </div>
                  </li>
                </div>
              );
            })
          ) : (
            <h1> THERE ARE NO CAMPUSES</h1>
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
    deleteCampus: id => {
      dispatch(deleteCampus(id));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Campuses);
