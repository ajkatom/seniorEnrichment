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
const UPDATE_STUDENT = "UPDATE_CAMPUS";

//--------thunks------------------------
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
      });
  };
};
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
      "https://pixabay.com/en/avatar-person-neutral-man-blank-159236/";
  }
  return dispatch => {
    console.log(student);
    return axios
      .post("/api/students", student)
      .then(res => res.data)
      .then(studentData => {
        dispatch({
          type: CREATE_STUDENT,
          studentData
        });
      })
      .catch(console.error);
  };
};
const updateStudent = (student, id) => {
  return dispatch => {
    return axios
      .put(`/api/students/${id}`, student)
      .then(res => res.data)
      .then(studentData => {
        dispatch({
          type: UPDATE_STUDENT,
          studentData
        });
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
      state = [...state, action.campus];
      break;
    case DELETE_CAMPUS:
      state = state.filter(campus => campus.id !== action.id * 1);
      break;
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

const reducer = combineReducers({
  students: studentReducer,
  campuses: campusReducer
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
  updateStudent
};
