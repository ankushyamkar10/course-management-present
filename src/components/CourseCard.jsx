import React from "react";
import { FaHeart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSocialActionOnCourse } from "../queries/courses";

const CourseCard = ({ course }) => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const borderColor =
    course.enrollmentStatus === "Open"
      ? "border-green-500"
      : course.enrollmentStatus === "Closed"
      ? "border-red-500"
      : "border-blue-500";

  const isLiked = course.likedBy.some((id) => id == user._id);

  const { mutate: socialMutate } = useSocialActionOnCourse();

  const handleLike = async () => {
    socialMutate({ courseId: course._id, studentId: user._id, like: true });
  };
  const handleDislike = async () => {
    socialMutate({ courseId: course._id, studentId: user._id, like: false });
  };

  return (
    <div
      key={course.id}
      className={`card glass my-4 w-full lg:w-5/6 bg-white shadow-lg rounded-lg overflow-hidden relative border border-red-500 h-fit`}
    >
      {isLiked ? (
        <span
          className="absolute top-3 right-3 text-red-500"
          onClick={handleDislike}
        >
          <FaHeart className="text-xl" />
        </span>
      ) : (
        <span className="absolute top-3 right-3" onClick={handleLike}>
          <FaRegHeart className="text-xl" />
        </span>
      )}
      <div className="flex flex-col">
        <figure className="w-full h-60 overflow-hidden flex-1 ">
          <img
            src={
              course.thumbnail ||
              "https://via.placeholder.com/400x300?text=Education"
            }
            alt={course.name}
            className="w-full h-60 object-center"
          />
        </figure>
        <div className="card-body p-4 flex flex-col w-full">
          <div>
            <h2
              className="card-title text-xl font-semibold mb-2"
              onClick={() => navigate("/" + course._id)}
            >
              {course.name}
            </h2>
            <p className="text-gray-700 mb-2">{course.description}</p>
            <div className="flex justify-between mb-2">
              <div>
                <p className="text-sm text-gray-600 mb-1">
                  Instructor: {course.instructor}
                </p>
                <p className="text-xs text-gray-500 mb-1">
                  Duration: {course.duration}
                </p>
              </div>
              <div>
                <p className="text-sm text-right text-gray-600 mb-1">
                  Enrolled By: {course.students.length}
                </p>
                <p className="text-xs text-right text-gray-500 mb-1">
                  Liked By: {course.likedBy.length}
                </p>
              </div>
            </div>
          </div>
          <div className="card-actions justify-end mt-4">
            <button
              className="btn w-full text-blue-500 transition-colors duration-200 bg-blue-100 rounded-lg dark:text-blue-400 dark:bg-gray-800 hover:bg-blue-200"
              onClick={() => navigate("/" + course._id)}
            >
              View Course
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
