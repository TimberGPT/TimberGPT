"use client";

import React from "react";
import Link from "next/link";
import { House } from "lucide-react";

const Breadcrumb = ({ items = [], currentPage }) => {
  return (
    <div className="mt-4 ml-4 sm:mt-6 sm:ml-6 md:ml-8">
      <div className="flex items-center overflow-x-auto whitespace-nowrap px-4 py-2 sm:px-5">
        <div className="flex items-center gap-1 sm:gap-2">
          {/* Home icon */}
          <Link
            href="/dashboard"
            className="flex items-center hover:text-purple-700 transition-colors duration-200"
            aria-label="Home"
          >
            <House className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          </Link>

          {/* Map breadcrumb items */}
          {items.map((item, index) => (
            <React.Fragment key={index}>
              {/* Arrow SVG */}
              <div className="flex-shrink-0">
                <svg
                  width="15"
                  height="14"
                  viewBox="0 0 15 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3 w-3 sm:h-3.5 sm:w-3.5"
                >
                  <path
                    d="M0.719158 7.92012L11.3466 7.92012L6.66563 12.6011L7.91613 13.8516L14.7319 7.03576L7.91613 0.219947L6.66563 1.47044L11.3466 6.15139L0.719158 6.15139L0.719158 7.92012Z"
                    fill="black"
                    fillOpacity="0.45"
                  />
                </svg>
              </div>
              <Link
                href={item.href}
                className="text-xs sm:text-sm text-gray-600 font-medium hover:text-purple-700 hover:underline transition-colors truncate max-w-[150px] sm:max-w-[200px] md:max-w-none"
              >
                {item.label}
              </Link>
            </React.Fragment>
          ))}

          {/* Current page (active state) */}
          {currentPage && (
            <>
              {/* Arrow SVG */}
              <div className="flex-shrink-0">
                <svg
                  width="15"
                  height="14"
                  viewBox="0 0 15 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3 w-3 sm:h-3.5 sm:w-3.5"
                >
                  <path
                    d="M0.719158 7.92012L11.3466 7.92012L6.66563 12.6011L7.91613 13.8516L14.7319 7.03576L7.91613 0.219947L6.66563 1.47044L11.3466 6.15139L0.719158 6.15139L0.719158 7.92012Z"
                    fill="black"
                    fillOpacity="0.45"
                  />
                </svg>
              </div>
              {/* Active page styling */}
              <div className="px-3 py-1.5 sm:py-2 bg-purple-100 rounded-full outline outline-2 outline-purple-700 outline-offset-[-5px] flex justify-center items-center">
                <span className="text-xs sm:text-sm text-black font-medium truncate max-w-[200px] sm:max-w-[250px] md:max-w-none">
                  {currentPage}
                </span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Breadcrumb;
