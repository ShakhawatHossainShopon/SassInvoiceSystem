"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";

const page = () => {
  const [admins, setAdmins] = useState([]);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

        if (!baseUrl) {
          console.log("Base URL is undefined!");
          return;
        }
        const response = await axios.get(`${baseUrl}/admin/auth/getAdmin`); // Replace with the actual API endpoint
        setAdmins(response.data.Admins);
      } catch (error) {
        setError("Error fetching users and shops.");
        console.error(error);
      }
    };

    fetchData();
  }, []);
  return (
    <div>
      <div>
        <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-7">
          All Users
        </h3>
        <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
          <div className="my-6">
            <div className="flex flex-col">
              <div className="-m-1.5 overflow-x-auto">
                <div className="p-1.5 min-w-full inline-block align-middle">
                  <div className="overflow-hidden">
                    <table className="min-w-full">
                      <thead>
                        <tr>
                          <th
                            scope="col"
                            className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500"
                          >
                            UserName
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500"
                          >
                            Email
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500"
                          >
                            Password
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 dark:divide-neutral-700">
                        {admins.map((admin) => {
                          return (
                            <tr key={admin._id}>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200">
                                {admin?.username}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">
                                {admin?.email}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">
                                {admin?.password}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
