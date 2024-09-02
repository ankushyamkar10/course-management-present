import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/sidebar";
import CourseCard from "../components/CourseCard";
import Loader from "../components/Loader";
import { useFetchCourses } from "../queries/courses";
import { FaSearch } from "react-icons/fa";

const CourseListing = () => {
  const navigate = useNavigate();
  const { data, error, isLoading } = useFetchCourses();


  const [searchTerm, setSearchTerm] = useState("");

  const filteredCourses = useMemo(() => {
    if (!data) return [];
    return data.filter(
      (course) =>
        course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [data, searchTerm]);

  return (
    <div className="flex flex-col">
      <Sidebar page={"courses"} />
      <div className="flex-1 pt-16 md:pt-0 md:pl-[5.5rem] p-6 bg-gray-100">
        {/* Search bar */}
        <div className="my-4 relative">
          <span>
            <FaSearch className="absolute top-3.5 left-3 text-gray-400 text-sm" />
          </span>
          <input
            type="text"
            placeholder="Search for courses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pl-8"
          ></input>
        </div>

        {/* Results Count */}
        <div className="mb-4 text-gray-700">
          {!searchTerm ? (
            <p>All Courses ({data?.length || 0}) </p>
          ) : (
            <p>
              Showing {filteredCourses.length} course
              {filteredCourses.length > 1 ? "s" : ""}
            </p>
          )}
        </div>

        {isLoading && (
          <div
            style={{ height: "calc(100vh - 64px)" }}
            className="flex-1 flex items-center justify-center"
          >
            <Loader />
          </div>
        )}

        {data && !isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 place-items-center">
            {filteredCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseListing;
