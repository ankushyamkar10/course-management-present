import React from "react";
import { Link, useNavigate } from "react-router-dom";
const Sidebar = ({ page }) => {
  return (
    <aside className="flex fixed z-[9999]">
      <div className="flex w-screen md:flex-col justify-evenly md:justify-start items-center gap-4 md:w-16 md:h-screen py-2 md:py-8 md:space-y-8 bg-white dark:bg-gray-900 dark:border-gray-700">
        <Link
          to="/"
          className={
            page === "courses"
              ? "p-1.5 text-blue-500 transition-colors duration-200 bg-blue-100 rounded-lg dark:text-blue-400 dark:bg-gray-800"
              : "p-1.5 text-gray-500 focus:outline-nones transition-colors duration-200 rounded-lg dark:text-gray-400 dark:hover:bg-gray-800 hover:bg-gray-100"
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1.5em"
            height="1.5em"
            viewBox="0 0 36 36"
          >
            <path
              fill="#553788"
              d="M15 31c0 2.209-.791 4-3 4H5c-4 0-4-14 0-14h7c2.209 0 3 1.791 3 4z"
            />
            <path
              fill="#9266cc"
              d="M34 33h-1V23h1a1 1 0 1 0 0-2H10c-4 0-4 14 0 14h24a1 1 0 1 0 0-2"
            />
            <path
              fill="#ccd6dd"
              d="M34.172 33H11c-2 0-2-10 0-10h23.172c1.104 0 1.104 10 0 10"
            />
            <path
              fill="#99aab5"
              d="M11.5 25h23.35c-.135-1.175-.36-2-.678-2H11c-1.651 0-1.938 6.808-.863 9.188C9.745 29.229 10.199 25 11.5 25"
            />
            <path
              fill="#269"
              d="M12 8a4 4 0 0 1-4 4H4C0 12 0 1 4 1h4a4 4 0 0 1 4 4z"
            />
            <path
              fill="#55acee"
              d="M31 10h-1V3h1a1 1 0 1 0 0-2H7C3 1 3 12 7 12h24a1 1 0 1 0 0-2"
            />
            <path
              fill="#ccd6dd"
              d="M31.172 10H8c-2 0-2-7 0-7h23.172c1.104 0 1.104 7 0 7"
            />
            <path
              fill="#99aab5"
              d="M8 5h23.925c-.114-1.125-.364-2-.753-2H8C6.807 3 6.331 5.489 6.562 7.5C6.718 6.142 7.193 5 8 5"
            />
            <path
              fill="#f4900c"
              d="M20 17a4 4 0 0 1-4 4H6c-4 0-4-9 0-9h10a4 4 0 0 1 4 4z"
            />
            <path
              fill="#ffac33"
              d="M35 19h-1v-5h1a1 1 0 1 0 0-2H15c-4 0-4 9 0 9h20a1 1 0 1 0 0-2"
            />
            <path
              fill="#ccd6dd"
              d="M35.172 19H16c-2 0-2-5 0-5h19.172c1.104 0 1.104 5 0 5"
            />
            <path
              fill="#99aab5"
              d="M16 16h19.984c-.065-1.062-.334-2-.812-2H16c-1.274 0-1.733 2.027-1.383 3.5c.198-.839.657-1.5 1.383-1.5"
            />
          </svg>
        </Link>
        <Link
          to="/dashboard"
          className={
            page === "dashboard"
              ? "p-1.5 text-blue-500 transition-colors duration-200 bg-blue-100 rounded-lg dark:text-blue-400 dark:bg-gray-800"
              : "p-1.5 text-gray-500 focus:outline-nones transition-colors duration-200 rounded-lg dark:text-gray-400 dark:hover:bg-gray-800 hover:bg-gray-100"
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1.5em"
            height="1.5em"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              fill-rule="evenodd"
              d="M12 1.25a4.75 4.75 0 1 0 0 9.5a4.75 4.75 0 0 0 0-9.5M8.75 6a3.25 3.25 0 1 1 6.5 0a3.25 3.25 0 0 1-6.5 0M12 12.25c-2.313 0-4.445.526-6.024 1.414C4.42 14.54 3.25 15.866 3.25 17.5v.102c-.001 1.162-.002 2.62 1.277 3.662c.629.512 1.51.877 2.7 1.117c1.192.242 2.747.369 4.773.369s3.58-.127 4.774-.369c1.19-.24 2.07-.605 2.7-1.117c1.279-1.042 1.277-2.5 1.276-3.662V17.5c0-1.634-1.17-2.96-2.725-3.836c-1.58-.888-3.711-1.414-6.025-1.414M4.75 17.5c0-.851.622-1.775 1.961-2.528c1.316-.74 3.184-1.222 5.29-1.222c2.104 0 3.972.482 5.288 1.222c1.34.753 1.961 1.677 1.961 2.528c0 1.308-.04 2.044-.724 2.6c-.37.302-.99.597-2.05.811c-1.057.214-2.502.339-4.476.339s-3.42-.125-4.476-.339c-1.06-.214-1.68-.509-2.05-.81c-.684-.557-.724-1.293-.724-2.601"
              clip-rule="evenodd"
            />
          </svg>
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;
