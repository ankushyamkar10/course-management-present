import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useAddStudentToCourse, useFetchCourseById } from "../queries/courses";
import { FaHeart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa6";
import { useSocialActionOnCourse } from "../queries/courses";
import Sidebar from "../components/sidebar";
import Loader from "../components/Loader";

const CourseDetail = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { data: course, isLoading, error } = useFetchCourseById(courseId);
  const { mutate: socialMutate } = useSocialActionOnCourse();
  const { mutate: addStudentMutate } = useAddStudentToCourse();
  const { completedCourses } = useSelector((state) => state.completedCourses);
  const [isSyllabusExpanded, setIsSyllabusExpanded] = useState(false);

  const isEnrolled = course?.students?.some(
    (student) => student._id === user._id
  );
  const isLiked = course?.likedBy?.some((id) => id === user._id);

  const handleLike = async () => {
    socialMutate({ courseId: courseId, studentId: user._id, like: true });
  };

  const handleDislike = async () => {
    socialMutate({ courseId: courseId, studentId: user._id, like: false });
  };

  const handleAdd = async () => {
    addStudentMutate({ courseId, studentId: user._id });
  };

  const progressPercentage = completedCourses.some(
    (course) => course.id === courseId
  )
    ? 100
    : Math.floor(Math.random() * 100);

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-100">
      <Sidebar page={"courses"} />
      {isLoading && (
        <div
          style={{ height: "calc(100vh - 64px)" }}
          className="flex-1 flex items-center justify-center"
        >
          <Loader />
        </div>
      )}
      {course && !isLoading && (
        <div className="flex-grow pt-16 md:pt-0 md:pl-[5.5rem] p-6 bg-gray-100">
          <p className="text-gray-600 my-4 mt-8">
            <span
              className="font-semibold cursor-pointer"
              onClick={() => navigate("/")}
            >
              Courses
            </span>{" "}
            {"> "} {course?.name}
          </p>

          <div className="w-full mb-8 flex flex-col md:flex-row">
            <div className="relative w-full md:w-1/3 h-80 bg-gray-800 text-white overflow-hidden rounded-lg shadow-md">
              <img
                src={
                  course?.thumbnail ||
                  "https://via.placeholder.com/1920x1080?text=Education"
                }
                alt={course?.name}
                className="absolute inset-0 w-full h-full object-cover opacity-50"
              />
            </div>
            <div className="md:hidden flex items-center mt-2">
              {isLiked ? (
                <FaHeart
                  className="text-red-500 cursor-pointer text-2xl"
                  onClick={handleDislike}
                />
              ) : (
                <FaRegHeart
                  className="cursor-pointer text-2xl"
                  onClick={handleLike}
                />
              )}
              <span className="ml-2 text-lg">
                {course?.likedBy.length}{" "}
                {course?.likedBy.length === 1 ? "Like" : "Likes"}
              </span>
            </div>
            <div className="md:ml-4 mt-3 md:w-1/2">
              <h1 className="text-2xl font-bold">{course?.name}</h1>
              <p className="text-lg mt-2">{course?.description}</p>
              <p className="text-base mt-2 italic">- {course?.instructor}</p>
              <div className="hidden md:flex md:items-center md:mt-2">
                {isLiked ? (
                  <FaHeart
                    className="text-red-500 cursor-pointer text-xl"
                    onClick={handleDislike}
                  />
                ) : (
                  <FaRegHeart
                    className="cursor-pointer text-xl"
                    onClick={handleLike}
                  />
                )}
                <span className="ml-2 text-sm">
                  {course?.likedBy.length}{" "}
                  {course?.likedBy.length === 1 ? "Like" : "Likes"}
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <h2 className="text-2xl font-semibold mb-4">Course Details</h2>
              <p className="mb-2 text-lg">
                <span className="font-semibold">Duration:</span>{" "}
                {course?.duration}
              </p>
              <p className="mb-2 text-lg">
                <span className="font-semibold">Schedule:</span>{" "}
                {course?.schedule}
              </p>
              <p className="mb-2 text-lg">
                <span className="font-semibold">Location:</span>{" "}
                {course?.location}
              </p>
              <p className="mb-2 text-lg">
                <span className="font-semibold">Pre-requisites:</span>{" "}
                {course?.prerequisites.join(", ") || "None"}
              </p>
              <p className="mb-2 text-lg">
                <span className="font-semibold">Enrollment Status:</span>{" "}
                {course?.enrollmentStatus}
              </p>
              <div className="my-4">
                <h2 className="text-xl font-semibold mb-4">Progress</h2>
                <div className="relative pt-1">
                  <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
                    <div
                      style={{ width: `${progressPercentage}%` }}
                      className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
                    ></div>
                  </div>
                  <span className="text-gray-600 text-sm">
                    {progressPercentage}% Completed
                  </span>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4">Syllabus</h2>
              <div>
                {course?.syllabus.map((week) => (
                  <div
                    key={week._id}
                    className="mb-4 p-4 bg-gray-100 rounded-lg cursor-pointer hover:bg-gray-200 transition"
                    onClick={() =>
                      setIsSyllabusExpanded((prev) =>
                        prev === week._id ? "" : week._id
                      )
                    }
                  >
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                      Week {week.week}: {week.topic}
                    </h3>
                    {isSyllabusExpanded === week._id && (
                      <ul className="list-disc list-inside text-gray-600">
                        {week.content.split(",").map((item, index) => (
                          <li key={index}>{item.trim()}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Enrolled Students</h2>
            <div className="bg-gray-100 p-4 rounded-lg">
              {course?.students.map((student) => (
                <div key={student._id} className="mb-4">
                  <p className="text-base font-semibold">{student.name}</p>
                  <p className="text-gray-600">{student.email}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="text-right">
            <button
              className="btn text-blue-500 transition-colors duration-200 bg-blue-100 rounded-lg dark:text-blue-400 dark:bg-gray-800 hover:bg-blue-200 px-6 py-3"
              onClick={() => !isEnrolled && handleAdd()}
              disabled={!isEnrolled && course?.enrollmentStatus !== "Open"}
            >
              {isEnrolled ? "Already Enrolled" : "Enroll Now!"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseDetail;
