import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import CourseListing from "./pages/CourseListing";
import CourseDetails from "./pages/CourseDetail";
import StudentDashboard from "./pages/StudentDashboard";
import Home from "./pages/Home";
import LoginForm from "./pages/Login";
import { auth } from "./firebase";
import { useSelector } from "react-redux";

const App = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginForm />} />

        {user ? (
          <>
            <Route path="/" element={<CourseListing />} />
            <Route path="/:courseId" element={<CourseDetails />} />
            <Route path="/dashboard" element={<StudentDashboard />} />
          </>
        ) : (
          <Route path="*" element={<Navigate to="/login" />} />
        )}
      </Routes>
    </Router>
  );
};

export default App;
