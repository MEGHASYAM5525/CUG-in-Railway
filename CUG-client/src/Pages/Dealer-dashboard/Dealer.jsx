/* eslint-disable no-unused-vars */
import React from "react";
import {NavLink,  Link, Outlet } from "react-router-dom";
import { useAuth } from "../../store/Auth";

const Dealer = () => {
  const { isLoggedIn } = useAuth();
  return (
    <div>
      {/* dealer navbar */}
      <nav className="w-full flex items-center bg-custom-gradient fixed pt-36  justify-between py-3 px-10">
      <div className="flex-grow">
        <h1 className="text-4xl font-semibold text-white text-center">
          DEALER PORTAL
        </h1>
      </div>
      <div className="text-base font-medium space-x-5">
        {isLoggedIn ? (
          <Link
            to="/logout"
            className="py-2 px-4 border rounded text-white bg-[#ef4444] hover:bg-[#991b1b]">
            Logout
          </Link>
        ) : (
          ""
        )}
      </div>
    </nav>
      {/* Side bar for dealer */}
      <div className=" bg-gray-100 mt-16 min-h-screen flex">
        <div className="bg-gray-800 w-64 p-4">
          <NavLink to="add_new_cug" activeClassName="current">
            <button className="bg-blue-700 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded mb-2 border-solid border-2 w-56">
              Add New CUG
            </button>
          </NavLink>
          
          <NavLink to="allocation_wise_report" activeClassName="current">
            <button className="bg-blue-700 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded mb-4 border-2 w-full">
              Allocation-Wise Report
            </button>
          </NavLink>
          <NavLink to="plan_wise_billing_report" activeClassName="current">
            <button className="bg-blue-700 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded mb-4 border-2 w-full">
              Plan-Wise Billing Report
            </button>
          </NavLink>
        </div>
       
        <Outlet />
      </div>
    </div>
  );
};
export default Dealer;
