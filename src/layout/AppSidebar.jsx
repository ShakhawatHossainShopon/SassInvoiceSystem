"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useSidebar } from "../context/SidebarContext";
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import GroupRoundedIcon from "@mui/icons-material/GroupRounded";
import ManageAccountsRoundedIcon from "@mui/icons-material/ManageAccountsRounded";
import PersonAddAltRoundedIcon from "@mui/icons-material/PersonAddAltRounded";
import StoreRoundedIcon from "@mui/icons-material/StoreRounded";
import InventoryRoundedIcon from "@mui/icons-material/InventoryRounded";
const navItems = [
  {
    icon: <DashboardRoundedIcon />,
    name: "Dashboard",
    path: "/Admin/adminDashboard", // Path for the link
  },
  {
    icon: <StoreRoundedIcon />,
    name: "Stores",
    path: "/Admin/adminDashboard/stores", // Path for the link
  },
  {
    icon: <GroupRoundedIcon />,
    name: "All Users",
    path: "/Admin/adminDashboard/allUsers", // Path for the link
  },
  {
    icon: <ManageAccountsRoundedIcon />,
    name: "Admins",
    path: "/Admin/adminDashboard/admins", // Path for the link
  },
];

const AppSidebar = () => {
  const { isExpanded, isMobileOpen, isHovered, setIsHovered } = useSidebar();
  const pathname = usePathname();

  const isActive = (path) => path === pathname;

  return (
    <aside
      className={`fixed mt-16 flex flex-col lg:mt-0 top-0 px-5 left-0 bg-white text-gray-900 h-screen transition-all duration-300 ease-in-out z-50 border-r border-gray-200 
        ${
          isExpanded || isMobileOpen
            ? "w-[290px]"
            : isHovered
            ? "w-[290px]"
            : "w-[90px]"
        } 
        ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      onMouseEnter={() => !isExpanded && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`py-8 flex ${
          !isExpanded && !isHovered ? "lg:justify-center" : "justify-start"
        }`}
      >
        <Link href="/">
          {isExpanded || isHovered || isMobileOpen ? (
            <>
              <p className="text-xl">SassInvoiceSystem</p>
            </>
          ) : (
            <p cla>SassInvoiceSystem</p>
          )}
        </Link>
      </div>

      <div className="flex flex-col overflow-y-auto duration-300 ease-linear no-scrollbar">
        <nav className="mb-6">
          <div className="flex flex-col gap-4">
            <div>
              <h2
                className={`mb-4 text-xs uppercase flex leading-[20px] text-gray-400 ${
                  !isExpanded && !isHovered
                    ? "lg:justify-center"
                    : "justify-start"
                }`}
              >
                Menu
              </h2>
              {/* Loop through navItems to render each item */}
              <ul className="flex flex-col gap-4 overflow-x-hidden">
                {navItems.map((nav, index) => (
                  <li key={index}>
                    <Link
                      href={nav.path}
                      className={`${
                        isActive(nav.path)
                          ? "bg-blue-500 text-white hover:bg-blue-500"
                          : "text-gray-600"
                      } menu-item group flex items-center p-2 rounded-lg hover:text-gray-700 hover:bg-gray-200`}
                    >
                      <span
                        className={`${
                          isActive(nav.path) ? "" : ""
                        } flex items-center mr-3 text-xl`}
                      >
                        {nav.icon}
                      </span>
                      {(isExpanded || isHovered || isMobileOpen) && (
                        <span className="font-semibold tracking-wider">
                          {nav.name}
                        </span>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default AppSidebar;
