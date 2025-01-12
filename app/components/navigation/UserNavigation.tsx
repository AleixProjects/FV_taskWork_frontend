import React, { useState } from "react";
import {
  HiArrowSmRight,
  HiChartPie,
  HiCollection,
  HiViewGrid,
} from "react-icons/hi";
import {
  HiUsers,
  HiUser,
  HiArrowLeftEndOnRectangle,
  HiArrowDownOnSquare,
  HiMiniUserGroup,
} from "react-icons/hi2";
import { BiBrightness } from "react-icons/bi";
import { NavLink } from "@remix-run/react";

const brandName = process.env.BRAND_NAME;

export function UserNavigation() {
  return (
    <>
      <button
        data-drawer-target="default-sidebar"
        data-drawer-toggle="default-sidebar"
        aria-controls="default-sidebar"
        type="button"
        className="z-50 inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        tabIndex={0}
      >
        <span className="sr-only">Open sidebar</span>
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          ></path>
        </svg>
      </button>

      <aside
        id="default-sidebar"
        className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
        aria-label="Sidenav"
      >
        <div className="overflow-y-auto py-5 px-3 h-full bg-white border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700">
          <ul className="space-y-2">
            <li>
              <img src="/brand/logo_FV.png" alt={brandName}></img>
            </li>
          </ul>
          <ul className="pt-5 mt-5 space-y-2 border-t border-gray-200 dark:border-gray-700">
            <li>
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  `flex items-center p-2 text-base font-normal rounded-lg group ${
                    isActive
                      ? "text-white bg-gray-900 dark:bg-gray-700"
                      : "text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`
                }
                tabIndex={0}
              >
                <HiChartPie className="w-6 h-6 text-gray-400 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                <span className="ml-3">Dashboard</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/tasks"
                className={({ isActive }) =>
                  `flex items-center p-2 text-base font-normal rounded-lg group ${
                    isActive
                      ? "text-white bg-gray-900 dark:bg-gray-700"
                      : "text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`
                }
                tabIndex={0}
              >
                <HiCollection className="w-6 h-6 text-gray-400 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                <span className="ml-3">Tasks</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/staff"
                className={({ isActive }) =>
                  `flex items-center p-2 text-base font-normal rounded-lg group ${
                    isActive
                      ? "text-white bg-gray-900 dark:bg-gray-700"
                      : "text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`
                }
                tabIndex={0}
              >
                <HiUsers className="w-6 h-6 text-gray-400 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                <span className="ml-3">Staff</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/materials"
                className={({ isActive }) =>
                  `flex items-center p-2 text-base font-normal rounded-lg group ${
                    isActive
                      ? "text-white bg-gray-900 dark:bg-gray-700"
                      : "text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`
                }
                tabIndex={0}
              >
                <HiViewGrid className="w-6 h-6 text-gray-400 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                <span className="ml-3">Materials</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/clients"
                className={({ isActive }) =>
                  `flex items-center p-2 text-base font-normal rounded-lg group ${
                    isActive
                      ? "text-white bg-gray-900 dark:bg-gray-700"
                      : "text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`
                }
                tabIndex={0}
              >
                <HiMiniUserGroup className="w-6 h-6 text-gray-400 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                <span className="ml-3">Clients</span>
              </NavLink>
            </li>
          </ul>
          <ul className="pt-5 mt-5 space-y-2 border-t border-gray-200 dark:border-gray-700">
            <li>
              <NavLink
                to="/profile"
                className={({ isActive }) =>
                  `flex items-center p-2 text-base font-normal rounded-lg group ${
                    isActive
                      ? "text-white bg-gray-900 dark:bg-gray-700"
                      : "text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`
                }
                tabIndex={0}
              >
                <HiUser className="w-6 h-6 text-gray-400 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                <span className="ml-3">Profile</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/settings"
                className={({ isActive }) =>
                  `flex items-center p-2 text-base font-normal rounded-lg group ${
                    isActive
                      ? "text-white bg-gray-900 dark:bg-gray-700"
                      : "text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`
                }
                tabIndex={0}
              >
                <BiBrightness className="w-6 h-6 text-gray-400 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                <span className="ml-3">Settings</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/logout"
                className={({ isActive }) =>
                  `flex items-center p-2 text-base font-normal rounded-lg group ${
                    isActive
                      ? "text-white bg-gray-900 dark:bg-gray-700"
                      : "text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`
                }
                tabIndex={0}
              >
                <HiArrowLeftEndOnRectangle className="w-6 h-6 text-gray-400 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                <span className="ml-3">Log Out</span>
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="hidden absolute bottom-0 left-0 justify-center p-4 space-x-4 w-full lg:flex bg-white dark:bg-gray-800 z-20 border-r border-gray-200 dark:border-gray-700">
          <a
            href="#"
            className="inline-flex justify-center p-2 text-gray-500 rounded cursor-pointer dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-600"
            tabIndex={0}
          >
            <svg
              aria-hidden="true"
              className="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M5 4a1 1 0 00-2 0v7.268a2 2 0 000 3.464V16a1 1 0 102 0v-1.268a2 2 0 000-3.464V4zM11 4a1 1 0 10-2 0v1.268a2 2 0 000 3.464V16a1 1 0 102 0V8.732a2 2 0 000-3.464V4zM16 3a1 1 0 011 1v7.268a2 2 0 010 3.464V16a1 1 0 11-2 0v-1.268a2 2 0 010-3.464V4a1 1 0 011-1z"></path>
            </svg>
          </a>
          <a
            href="#"
            data-tooltip-target="tooltip-settings"
            className="inline-flex justify-center p-2 text-gray-500 rounded cursor-pointer dark:text-gray-400 dark:hover:text-white hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-600"
            tabIndex={0}
          >
            <svg
              aria-hidden="true"
              className="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                clipRule="evenodd"
              ></path>
            </svg>
          </a>
          <div
            id="tooltip-settings"
            role="tooltip"
            className="inline-block absolute invisible z-10 py-2 px-3 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 transition-opacity duration-300 tooltip"
          >
            Settings page
            <div className="tooltip-arrow" data-popper-arrow></div>
          </div>
          <button
            type="button"
            data-dropdown-toggle="language-dropdown"
            className="inline-flex justify-center p-2 text-gray-500 rounded cursor-pointer dark:hover:text-white dark:text-gray-400 hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-600"
            tabIndex={0}
          >
            <svg
              aria-hidden="true"
              className="h-5 w-5 rounded-full mt-0.5"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              viewBox="0 0 3900 3900"
            >
              <path fill="#b22234" d="M0 0h7410v3900H0z" />
              <path
                d="M0 450h7410m0 600H0m0 600h7410m0 600H0m0 600h7410m0 600H0"
                stroke="#fff"
                strokeWidth="300"
              />
              <path fill="#3c3b6e" d="M0 0h2964v2100H0z" />
              <g fill="#fff">
                <g id="d">
                  <g id="c">
                    <g id="e">
                      <g id="b">
                        <path
                          id="a"
                          d="M247 90l70.534 217.082-184.66-134.164h228.253L176.466 307.082z"
                        />
                        <use xlink:href="#a" y="420" />
                        <use xlink:href="#a" y="840" />
                        <use xlink:href="#a" y="1260" />
                      </g>
                      <use xlink:href="#a" y="1680" />
                    </g>
                    <use xlink:href="#b" x="247" y="210" />
                  </g>
                  <use xlink:href="#c" x="494" />
                </g>
                <use xlink:href="#d" x="988" />
                <use xlink:href="#c" x="1976" />
                <use xlink:href="#e" x="2470" />
              </g>
            </svg>
          </button>
          <div
            className={`z-50 my-4 text-base list-none bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 hidden`}
            id="language-dropdown"
          >
            <ul className="py-1" role="none">
              <li>
                <a
                  href="#"
                  className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:text-white dark:text-gray-300 dark:hover:bg-gray-600"
                  role="menuitem"
                  tabIndex={0}
                >
                  <div className="inline-flex items-center">
                    <svg
                      aria-hidden="true"
                      className="h-3.5 w-3.5 rounded-full mr-2"
                      xmlns="http://www.w3.org/2000/svg"
                      id="flag-icon-css-us"
                      viewBox="0 0 512 512"
                    >
                      <g fillRule="evenodd">
                        <g strokeWidth="1pt">
                          <path
                            fill="#bd3d44"
                            d="M0 0h247v10H0zm0 20h247v10H0zm0 20h247v10H0zm0 20h247v10H0zm0 20h247v10H0zm0 20h247v10H0zm0 20h247v10H0z"
                            transform="scale(3.9385)"
                          />
                          <path
                            fill="#fff"
                            d="M0 10h247v10H0zm0 20h247v10H0zm0 20h247v10H0zm0 20h247v10H0zm0 20h247v10H0zm0 20h247v10H0z"
                            transform="scale(3.9385)"
                          />
                        </g>
                        <path
                          fill="#192f5d"
                          d="M0 0h98.8v70H0z"
                          transform="scale(3.9385)"
                        />
                        <path
                          fill="#fff"
                          d="M8.2 3l1 2.8H12L9.7 7.5l.9 2.7-2.4-1.7L6 10.2l.9-2.7-2.4-1.7h3zm16.5 0l.9 2.8h2.9l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8H45l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.4 0l1 2.8h2.8l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm16.5 0l.9 2.8h2.9l-2.4 1.7 1 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8h2.9L92 7.5l1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9z"
                          transform="scale(3.9385)"
                        />
                      </g>
                    </svg>
                    English (US)
                  </div>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-600"
                  role="menuitem"
                  tabIndex={0}
                >
                  <div className="inline-flex items-center">
                    <svg
                      aria-hidden="true"
                      className="h-3.5 w-3.5 rounded-full mr-2"
                      xmlns="http://www.w3.org/2000/svg"
                      id="flag-icon-css-es"
                      viewBox="0 0 512 512"
                    >
                      <path fill="#c60b1e" d="M0 0h512v512H0z" />
                      <path fill="#ffc400" d="M0 128h512v256H0z" />
                    </svg>
                    Español
                  </div>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-600"
                  role="menuitem"
                  tabIndex={0}
                >
                  <div className="inline-flex items-center">
                    <svg
                      aria-hidden="true"
                      className="h-3.5 w-3.5 rounded-full mr-2"
                      xmlns="http://www.w3.org/2000/svg"
                      id="flag-icon-css-ca"
                      viewBox="0 0 512 512"
                    >
                      <path fill="#fcdd09" d="M0 0h512v512H0z" />
                      <path fill="#d52b1e" d="M0 0h512v170.7H0z" />
                      <path fill="#d52b1e" d="M0 341.3h512V512H0z" />
                    </svg>
                    Català
                  </div>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </aside>
    </>
  );
}
