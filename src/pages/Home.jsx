import React from "react";
import { Link, Outlet } from "react-router-dom";
import { FaBook, FaInfoCircle, FaUser } from "react-icons/fa";
import Sidebar from "../components/sidebar";
import CourseListing from "./CourseListing";

const Home = () => {
  return (
    <div className="flex h-screen">
      <Sidebar page={""} />

      <div className="flex-1 p-6 bg-gray-100"></div>
    </div>
  );
};

export default Home;
