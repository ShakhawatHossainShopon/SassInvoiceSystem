"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";

const page = () => {
  const [Stores, setAdmins] = useState([]);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

        if (!baseUrl) {
          console.log("Base URL is undefined!");
          return;
        }
        const response = await axios.get(`${baseUrl}/admin/stores`); // Replace with the actual API endpoint
        setAdmins(response.data.store);
      } catch (error) {
        setError("Error fetching shops.");
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
                            Shop name
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500"
                          >
                            shop owner name
                          </th>

                          <th
                            scope="col"
                            className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500"
                          >
                            shop Contact
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500"
                          >
                            invoice Count
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500"
                          >
                            shop Id
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500"
                          >
                            shop address
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500"
                          >
                            shop Image Url
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 dark:divide-neutral-700">
                        {Stores.map((Store) => {
                          return (
                            <tr key={Store._id}>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200">
                                {Store?.shopName}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">
                                {Store?.shopOwnerName}
                              </td>

                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">
                                {Store?.shopContact}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">
                                {Store?.invoiceCount}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">
                                {Store?.shopId}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">
                                {Store?.shopAddress}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">
                                {Store?.shopImage}
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
