import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import axios from "axios";

const LIST_CAMPUSES = "LIST_CAMPUSES";
const DELETE_CAMPUS = "DELETE_CAMPUS";
const CREATE_CAMPUS = "CREATE_CAMPUS";
const UPDATE_CAMPUS = "UPDATE_CAMPUS";

const LIST_STUDENTS = "LIST_STUDENT";
const DELETE_STUDENT = "DELETE_STUDENT";
const CREATE_STUDENT = "CREATE_STUDENT";
const UPDATE_STUDENT = "UPDATE_STUDENT";

const ERROR = "ERROR";
const CLEAR_ERROR = "CLEAR_ERROR";

//--------thunks------------------------
// ------students-----------------------
const listStudents = () => {
  return dispatch => {
    return axios
      .get("/api/students")
      .then(students => students.data)
      .then(students => {
        dispatch({
          type: LIST_STUDENTS,
          students
        });
      })
      .catch(error => {
        const err = error.response.data;
        dispatch({
          type: ERROR,
          err
        });
      });
  };
};
const deleteStudent = id => {
  return dispatch => {
    return axios.delete(`/api/students/${id}`).then(() => {
      dispatch({
        type: DELETE_STUDENT,
        id
      });
    });
  };
};
const createStudent = student => {
  if (!student.profilePic) {
    student.profilePic =
      "https://cdnb.artstation.com/p/assets/images/images/000/287/547/large/89Ilustra1.jpg?1415281882";
  }
  return dispatch => {
    return axios
      .post("/api/students", student)
      .then(res => res.data)
      .then(studentData => {
        window.location.href = `/#/api/students/${studentData.id}`;
        dispatch({
          type: CREATE_STUDENT,
          studentData
        });
      })
      .catch(error => {
        const err = error.response.data;
        dispatch({
          type: ERROR,
          err
        });
      });
  };
};
const updateStudent = (student, pathName) => {
  const { id } = student;
  return dispatch => {
    return axios
      .put(`/api/students/${id}`, student)
      .then(res => res.data)
      .then(studentData => {
        if (!pathName) {
          window.location.href = `/#/api/students/${studentData.id}`;
        }
        dispatch({
          type: UPDATE_STUDENT,
          studentData
        });
      })
      .catch(error => {
        const err = error.response.data;
        dispatch({
          type: ERROR,
          err
        });
      });
  };
};

//-------campuses------------------
const listCampuses = () => {
  return dispatch => {
    return axios
      .get("/api/campuses")
      .then(campuses => campuses.data)
      .then(campuses => {
        dispatch({
          type: LIST_CAMPUSES,
          campuses
        });
      })
      .catch(error => {
        const err = error.response.data;
        dispatch({
          type: ERROR,
          err
        });
      });
  };
};
const deleteCampus = id => {
  return dispatch => {
    return axios.delete(`/api/campuses/${id}`).then(() => {
      dispatch({
        type: DELETE_CAMPUS,
        id
      });
    });
  };
};

//-------campus thunk-------
const createCampus = campus => {
  if (!campus.picture) {
    campus.picture =
      " https://www.sunshinedaydream.biz/assets/images/buttons/pink-floyd-the-wall-hammers-button.jpg";
  }
  return dispatch => {
    return axios
      .post("/api/campuses", campus)
      .then(res => res.data)
      .then(campusData => {
        window.location.href = `/#/api/campuses/${campusData.id}`;
        dispatch({
          type: CREATE_CAMPUS,
          campusData
        });
      })
      .catch(error => {
        const err = error.response.data;
        dispatch({
          type: ERROR,
          err
        });
      });
  };
};
const updateCampus = (campus, id) => {
  return dispatch => {
    return axios
      .put(`/api/campuses/${id}`, campus)
      .then(res => res.data)
      .then(campusData => {
        window.location.href = `/#/api/campuses/${id}`;
        dispatch({
          type: UPDATE_CAMPUS,
          campusData
        });
      })
      .catch(error => {
        const err = error.response.data;
        dispatch({
          type: ERROR,
          err
        });
      });
  };
};
//------clear errors------

const clearErrors = () => {
  return dispatch => {
    return dispatch({
      type: CLEAR_ERROR
    });
  };
};

//--------reducers-----------------
const campusReducer = (state = [], action) => {
  switch (action.type) {
    case LIST_CAMPUSES:
      state = action.campuses;
      break;
    case CREATE_CAMPUS:
      state = [...state, action.campusData];
      break;
    case DELETE_CAMPUS:
      state = state.filter(campus => campus.id !== action.id * 1);
      break;
    case UPDATE_CAMPUS:
      let index = state.findIndex(
        campus => campus.id === action.campusData.id * 1
      );
      state = [
        ...state.slice(0, index),
        action.campusData,
        ...state.slice(index + 1)
      ];
  }
  return state;
};

const studentReducer = (state = [], action) => {
  switch (action.type) {
    case LIST_STUDENTS:
      state = action.students;
      break;
    case CREATE_STUDENT:
      state = [...state, action.studentData];
    case DELETE_STUDENT:
      state = state.filter(student => student.id !== action.id * 1);
      break;
    case DELETE_CAMPUS:
      state = state.map(student => {
        if (student.campusId === action.id * 1) student.campusId = null;
        return student;
      });

      break;
    case UPDATE_STUDENT:
      let index = state.findIndex(
        student => student.id === action.studentData.id * 1
      );
      state = [
        ...state.slice(0, index),
        action.studentData,
        ...state.slice(index + 1)
      ];
  }
  return state;
};

const errorReducer = (state = "", action) => {
  switch (action.type) {
    case ERROR:
      state = action.err;
      break;
    case CLEAR_ERROR:
      state = "";
  }
  return state;
};

const reducer = combineReducers({
  students: studentReducer,
  campuses: campusReducer,
  errors: errorReducer
});
//----------store---------

const store = createStore(reducer, applyMiddleware(thunk));

//--------exprot-----------
export default store;

export {
  listCampuses,
  listStudents,
  deleteStudent,
  createStudent,
  updateStudent,
  deleteCampus,
  createCampus,
  updateCampus,
  clearErrors
};
