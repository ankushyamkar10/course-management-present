import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "../features/auth/authSlice";
import { completedCoursesReducer } from "../features/courses/courseSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    completedCourses: completedCoursesReducer,
  },
});

export { store };
