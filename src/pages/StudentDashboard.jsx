import React, { useState, useMemo, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Sidebar from "../components/sidebar";
import { FaCheckCircle, FaCircle } from "react-icons/fa";
import { useFetchCourses } from "../queries/courses";
import Loader from "../components/Loader";
import { useNavigate } from "react-router-dom";

const StudentDashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const [currentTab, setCurrentTab] = useState("inProgress");
  const [completedCourses, setCompletedCourses] = useState([]);
  const { data: courses, isLoading, error, refetch } = useFetchCourses();
  const navigate = useNavigate();

  useEffect(() => {
    const savedCourses = localStorage.getItem("completedCourses");
    if (savedCourses) {
      setCompletedCourses(JSON.parse(savedCourses));
    }
  }, []);

  const enrolledCourses = useMemo(() => {
    if (!courses) return [];
    return courses.filter((course) =>
      course.students.some((student) => student._id === user._id)
    );
  }, [courses, user._id]);

  const filteredCourses = useMemo(() => {
    const completedCourseIds = new Set(
      completedCourses.map((course) => course.id)
    );
    if (currentTab === "inProgress") {
      return enrolledCourses.filter(
        (course) => !completedCourseIds.has(course._id)
      );
    } else if (currentTab === "completed") {
      return enrolledCourses.filter((course) =>
        completedCourseIds.has(course._id)
      );
    }
    return enrolledCourses;
  }, [enrolledCourses, completedCourses, currentTab]);

  const saveCompletedCourse = (course) => {
    const updatedCourses = [
      ...completedCourses,
      {
        id: course._id,
        name: course.name,
        instructor: course.instructor,
      },
    ];
    localStorage.setItem("completedCourses", JSON.stringify(updatedCourses));
    setCompletedCourses(updatedCourses);
  };

  const handleCompleteCourse = (courseId) => {
    const course = enrolledCourses.find((course) => course._id === courseId);
    if (course) {
      saveCompletedCourse(course);
      refetch();
    }
  };

  return (
    <div className="flex h-screen">
      <Sidebar page={"dashboard"} />

      <div className="flex-grow pt-16 md:pl-[5.5rem]  p-6 bg-gray-100">
        <div className="text-center">
          <img
            src="https://via.placeholder.com/150"
            alt={user.name}
            className="rounded-full mx-auto mb-4 md:w-32"
          />
          <h2 className="text-2xl font-semibold">
            {user.name || "Ankush Yamkar"}
          </h2>
          <p className="text-gray-600">{user.email}</p>
          <p className="text-gray-600">ID: {user._id}</p>
          <p className="text-gray-600 mt-2">
            Enrolled Courses: {enrolledCourses.length}
          </p>
        </div>
        <div>
          <h3 className="text-xl font-semibold mt-8 mb-4">My Courses</h3>
          {isLoading && (
            <div className="flex-1 flex items-center justify-center mt-16">
              <Loader />
            </div>
          )}
          {courses && !isLoading && (
            <div className="w-full mb-6">
              <div
                className="flex items-center mt-4"
                style={{ fontSize: "17px", fontWeight: "bold" }}
              >
                <div
                  className={`grid content-between cursor-pointer border rounded-none rounded-l-md ${
                    currentTab === "inProgress" ? "bg-white" : "bg-gray-200"
                  }`}
                  onClick={() => setCurrentTab("inProgress")}
                >
                  <div className="flex mx-4 my-1 py-4">
                    <div className="py-0 my-0" style={{ lineHeight: "1" }}>
                      In Progress
                    </div>
                    <div
                      className="py-0 mx-1 my-0"
                      style={{ lineHeight: "1", color: "#4182F9" }}
                    >
                      ({filteredCourses.length})
                    </div>
                  </div>
                  {currentTab === "inProgress" && (
                    <div
                      className="focus h-0.5"
                      style={{ backgroundColor: "#4182F9" }}
                    ></div>
                  )}
                </div>

                <div
                  className={`grid content-between cursor-pointer border rounded-none rounded-r-md ${
                    currentTab === "completed" ? "bg-white" : "bg-gray-200"
                  }`}
                  onClick={() => setCurrentTab("completed")}
                >
                  <div className="flex mx-4 my-1 py-4">
                    <div className="py-0 my-0" style={{ lineHeight: "1" }}>
                      Completed
                    </div>
                    <div
                      className="py-0 mx-1 my-0"
                      style={{ lineHeight: "1", color: "#4182F9" }}
                    >
                      ({completedCourses.length})
                    </div>
                  </div>
                  {currentTab === "completed" && (
                    <div
                      className="focus h-0.5"
                      style={{ backgroundColor: "#4182F9" }}
                    ></div>
                  )}
                </div>
              </div>
            </div>
          )}
          {filteredCourses.length === 0 ? (
            <p>
              You have not{" "}
              {currentTab === "inProgress" ? "started" : "completed"} any
              courses yet.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredCourses.map((course) => (
                <div
                  key={course._id}
                  className="p-4 mb-4 bg-white rounded-lg shadow-md"
                >
                  <div>
                    <h4
                      className="text-lg font-semibold"
                      onClick={() => navigate("/" + course._id)}
                    >
                      {course.name}
                    </h4>
                  </div>
                  <div className="flex items-center justify-between my-2">
                    <p className="text-gray-600 italic">
                      - {course.instructor}
                    </p>
                    {currentTab === "inProgress" && !course.completed && (
                      <button
                        className="flex items-center px-4 py-2 rounded bg-blue-500 text-white"
                        onClick={() => handleCompleteCourse(course._id)}
                      >
                        <FaCheckCircle className="mr-1" /> Complete
                      </button>
                    )}
                    {currentTab === "completed" && course.completed && (
                      <button
                        className="flex items-center px-4 py-2 rounded bg-green-500 text-white"
                        disabled
                      >
                        Completed
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
