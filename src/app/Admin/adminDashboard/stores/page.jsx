"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import  Button  from "@/components/ui/button/Button";

const Page = () => {
  const [stores, setStores] = useState([]);
  const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false); // For loading state

  useEffect(() => {
    const fetchData = async () => {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
        if (!baseUrl) {
          console.log("Base URL is undefined!");
          return;
        }
        const response = await axios.get(`${baseUrl}/admin/stores`);
        setStores(response.data.store);
      } catch (error) {
        setError("Error fetching shops.");
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handlePermission = async (shopId, currentPermission) => {
    try {
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
      if (!baseUrl) {
        console.log("Base URL is undefined!");
        return;
      }

      const updatedPermission = !currentPermission; // Toggle permission
      await axios.patch(`${baseUrl}/admin/Store/permission`, {
        permission: updatedPermission,
        shopId
      });

      setStores((prevStores) =>
        prevStores.map((store) =>
          store._id === shopId ? { ...store, permission: updatedPermission } : store
        )
      );
    } catch (error) {
      console.error("Error updating permission:", error);
    }
  };

  const handleResetInvoice = async (shopId)=>{
    try {
      setLoading(true);
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
      if (!baseUrl) {
        console.log("Base URL is undefined!");
        return;
      }
      const response = await axios.post(`${baseUrl}/admin/Store/resetInvoice`, {
      shopId, // Send the shopId in the request body
      });
      if (response.status === 200) {
      alert(response.data.message); // Success message
    } else {
      alert(response.data.error); // Error message
    }
    } catch (error) {
      console.error("Error Reset Invoices", error);
    } finally {
      setLoading(false); // Set loading to false once the request is complete
    }
  }

  return (
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
                        <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">
                          Shop Name
                        </th>
                        <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">
                          Owner Name
                        </th>
                        <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">
                          Contact
                        </th>
                        <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">
                          Invoice Count
                        </th>
                      
                        <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">
                          Address
                        </th>
                        <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">
                          Image URL
                        </th>
                        <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">
                          Actions
                        </th>
                         <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">
                          Reset
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-neutral-700">
                      {stores.map((store) => (
                        <tr key={store._id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200">
                            {store.shopName}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">
                            {store.shopOwnerName}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">
                            {store.shopContact}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">
                            {store.invoiceCount}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">
                            {store.shopAddress}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">
                            {store.shopImage}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">
                            <Button onClick={() => handlePermission(store._id, store.permission)}>
                              {store.permission ? "Disable" : "Enable"}
                            </Button>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">
                            <Button className="bg-red-700 text-gray-50" onClick={() => handleResetInvoice(store.shopId)}>
                             Reset Invoice
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
