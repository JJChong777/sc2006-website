"use client";

import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useAuth } from "../auth/authentication_functions/AuthContext";
import Link from "next/link"


function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const { isAuthenticated } = useAuth();
  return (
    <Disclosure as="nav" className="bg-white shadow">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <img
                    className="block h-8 w-auto"
                    src="logo.png"
                    alt="Your Company"
                  />
                </div>
                {/*nav links*/}
                <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                  {!isAuthenticated && (
                    <Link
                      href="/login"
                      className="border-b-2 border-transparent inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900 hover:border-gray-300 hover:text-gray-700"
                    >
                      Login
                    </Link>
                  )}
                  <Link
                    href="/search"
                    className="border-b-2 border-transparent inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900 hover:border-gray-300 hover:text-gray-700"
                  >
                    Search for a book!
                  </Link>
                  <Link
                    href="/map"
                    className="border-b-2 border-transparent inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900 hover:border-gray-300 hover:text-gray-700"
                  >
                    View Libraries
                  </Link>
                  <Link
                    href="/recommendations"
                    className="border-b-2 border-transparent inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900 hover:border-gray-300 hover:text-gray-700"
                  >
                    Recommend a book
                  </Link>
                </div>

                <div className="flex items-center"></div>
              </div>
              {isAuthenticated && (
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  {/* Profile dropdown */}
                  <Menu as="div" className="relative ml-3">
                    <Menu.Button className="flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="h-8 w-8 rounded-full"
                        src="profile.png"
                        alt="Your Profile"
                      />
                    </Menu.Button>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-200"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              href="/userlibrary"
                              className={
                                classNames(
                                  active ? "bg-gray-100" : "", "block px-4 py-2 text-sm text-gray-700"
                                )
                              }
                            >
                              Your Profile
                            </Link>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              href="/signout"
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                          )}
                            >
                              Sign out
                            </Link>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              )}
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 pt-2 pb-4">
              {/* Mobile menu items */}
              <Disclosure.Button
                as="a"
                href="#"
                className="block bg-indigo-50 border-l-4 border-indigo-500 py-2 pl-3 pr-4 text-base font-medium text-indigo-700"
              >
                Dashboard
              </Disclosure.Button>
              <Disclosure.Button
                as="a"
                href="#"
                className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700"
              >
                Team
              </Disclosure.Button>
              {/* Add more mobile menu items as needed */}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
