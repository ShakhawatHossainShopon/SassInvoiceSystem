import React from "react";
import axios from "axios"; // Import Axios

const AllUser = ({ shops, users }) => {
  // Function to handle delete action with Axios
  const handleDelete = async (userId, shopId) => {
    try {
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

      if (!baseUrl) {
        console.log("Base URL is undefined!");
        return;
      }
      // Send DELETE request to the API using Axios
      const response = await axios.delete(`${baseUrl}/admin/user/deleteUser`, {
        params: { userId: userId }, // Sending userId as query parameter
      });
      console.log(response);

      if (response.status === 200) {
        alert("User and associated shop deleted successfully!");
        // Optionally, you can update the UI by removing the user from the list
        // For example: trigger a state update to re-fetch the data or remove the item from the list
      } else {
        alert("Failed to delete user and shop.");
      }
    } catch (error) {
      console.error("Error deleting user and shop:", error);
      alert("An error occurred while deleting the user and shop.");
    }
  };

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
                        <th
                          scope="col"
                          className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500"
                        >
                          Shop ID
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase dark:text-neutral-500"
                        >
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-neutral-700">
                      {users.map((user) => {
                        return (
                          <tr key={user._id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200">
                              {user?.username}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">
                              {user?.email}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">
                              {user?.password}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">
                              {user?.shopId}
                            </td>

                            <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                              <button
                                type="button"
                                className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 focus:outline-hidden focus:text-blue-800 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400 dark:focus:text-blue-400"
                                onClick={() =>
                                  handleDelete(user._id, user.shopId)
                                }
                              >
                                Delete
                              </button>
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
  );
};

export default AllUser;
