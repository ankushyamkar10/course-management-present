import { createSlice } from "@reduxjs/toolkit";

const getCompletedCourses = () => {
  try {
    const serializedState = localStorage.getItem("completedCourses");
    return serializedState ? JSON.parse(serializedState) : [];
  } catch (error) {
    console.error("Error loading completed courses from localStorage:", error);
    return [];
  }
};

const saveToCompletedCourses = (courses) => {
  try {
    const serializedState = JSON.stringify(courses);
    localStorage.setItem("completedCourses", serializedState);
  } catch (error) {
    console.error("Error saving completed courses to localStorage:", error);
  }
};

const initialState = {
  completedCourses: getCompletedCourses(),
};

const completedCoursesSlice = createSlice({
  name: "completedCourses",
  initialState,
  reducers: {
    addCourse(state, action) {
      const iscompleted = state.completedCourses.some(
        (course) => course._id === action.payload._id
      );

      if (!iscompleted) {
        state.completedCourses.push(action.payload);
        saveToCompletedCourses(state.completedCourses);
      }
    },
    getCourses(state) {
      return state;
    },
  },
});

export const { addCourse, getCourses } = completedCoursesSlice.actions;

export const completedCoursesReducer = completedCoursesSlice.reducer;
