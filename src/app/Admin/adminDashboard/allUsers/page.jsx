"use client";
import React, { useEffect, useState } from "react";
import Button from "@/components/ui/button/Button";
import AddIcon from "@mui/icons-material/Add";
import ReactAlert from "@/components/ui/alert/Alert";
import axios from "axios";
import AllUser from "./components/AllUser";

const pages = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [shopName, setShopName] = useState("");
  const [shopOwnerName, setShopOwnerName] = useState("");
  const [shopImage, setShopImage] = useState("");
  const [shopContact, setShopContact] = useState();
  const [loading, setLoading] = useState(false); // Loading state
  const [message, setMessage] = useState(false);
  const [shopAddress, setShopAddress] = useState(false);
  const [users, setUsers] = useState([]);
  const [error2, setError2] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

        if (!baseUrl) {
          console.log("Base URL is undefined!");
          return;
        }
        const response = await axios.get(`${baseUrl}/admin/user/getAllUser`); // Replace with the actual API endpoint
        setUsers(response.data.users);
      } catch (error) {
        setError2("Error fetching users and shops.");
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const FormData = {
      username,
      email,
      password,
      shopName,
      shopOwnerName,
      shopImage,
      shopContact,
      shopAddress,
    };

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

    if (!baseUrl) {
      console.log("Base URL is undefined!");
      return;
    }

    setLoading(true); // Start loading

    try {
      const response = await axios.post(
        `${baseUrl}/admin/user/addUser`,
        FormData
      );
      if (response.status === 200) {
        setMessage({
          success: true,
          text: "Add User Succesfully",
        });
      }
    } catch (error) {
      setMessage({
        success: false,
        text: "An error occurred. Please try again later.",
      });
    } finally {
      setLoading(false); // End loading
    }
  };
  console.log(users);

  return (
    <>
      <div>
        <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-7">
          Add Users
        </h3>
        <div className="rounded-2xl border  border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
          {message && (
            <ReactAlert success={message.success} message={message.text} />
          )}
          <div className="p-6">
            <div className="my-6">
              <form action="" className="space-y-6" onSubmit={handleSubmit}>
                <div className="md:flex md:space-y-0 space-y-6 items-center gap-6">
                  <div className="w-full">
                    <label
                      htmlFor="Username"
                      className="relative block rounded-md border border-gray-200 shadow-xs focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
                    >
                      <input
                        required
                        type="text"
                        id="Username"
                        className="peer w-full px-3 py-2 border-none bg-transparent placeholder-transparent focus:border-transparent focus:ring-0 focus:outline-hidden"
                        placeholder="Username"
                        onChange={(e) => setUsername(e.target.value)}
                      />

                      <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">
                        Username
                      </span>
                    </label>
                  </div>

                  <div className="w-full">
                    <label
                      htmlFor="email"
                      className="relative block rounded-md border border-gray-200 shadow-xs focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
                    >
                      <input
                        required
                        type="email"
                        id="email"
                        className="peer w-full px-3 py-2 border-none bg-transparent placeholder-transparent focus:border-transparent focus:ring-0 focus:outline-hidden"
                        placeholder="Email"
                        onChange={(e) => setEmail(e.target.value)}
                      />

                      <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">
                        Email
                      </span>
                    </label>
                  </div>

                  <div className="w-full">
                    <label
                      htmlFor="password"
                      className="relative block rounded-md border border-gray-200 shadow-xs focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
                    >
                      <input
                        required
                        type="password"
                        id="Username"
                        className="peer w-full  px-3 py-2 border-none bg-transparent placeholder-transparent focus:border-transparent focus:ring-0 focus:outline-hidden"
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                      />

                      <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">
                        Password
                      </span>
                    </label>
                  </div>
                </div>
                <div className="md:flex md:space-y-0 space-y-6 items-center gap-6">
                  <div className="w-full">
                    <label
                      htmlFor="Username"
                      className="relative block rounded-md border border-gray-200 shadow-xs focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
                    >
                      <input
                        required
                        type="text"
                        id="Username"
                        className="peer w-full  px-3 py-2 border-none bg-transparent placeholder-transparent focus:border-transparent focus:ring-0 focus:outline-hidden"
                        placeholder="Shop Name"
                        onChange={(e) => setShopName(e.target.value)}
                      />

                      <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">
                        Shop Name
                      </span>
                    </label>
                  </div>

                  <div className="w-full">
                    <label
                      htmlFor="email"
                      className="relative block rounded-md border border-gray-200 shadow-xs focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
                    >
                      <input
                        required
                        type="text"
                        id="email"
                        className="peer w-full px-3 py-2 border-none bg-transparent placeholder-transparent focus:border-transparent focus:ring-0 focus:outline-hidden"
                        placeholder="Email"
                        onChange={(e) => setShopOwnerName(e.target.value)}
                      />

                      <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">
                        Shop Owner Name
                      </span>
                    </label>
                  </div>

                  <div className="w-full">
                    <label
                      htmlFor="password"
                      className="relative block rounded-md border border-gray-200 shadow-xs focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
                    >
                      <input
                        required
                        type="number"
                        id="Username"
                        className="peer w-full  px-3 py-2 border-none bg-transparent placeholder-transparent focus:border-transparent focus:ring-0 focus:outline-hidden"
                        placeholder="Shop Contact"
                        onChange={(e) => setShopContact(e.target.value)}
                      />

                      <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">
                        Shop Contact
                      </span>
                    </label>
                  </div>
                </div>
                <div className="md:flex md:space-y-0 space-y-6 items-center gap-6">
                  <div className="w-full">
                    <label
                      htmlFor="password"
                      className="relative block rounded-md border border-gray-200 shadow-xs focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
                    >
                      <input
                        required
                        type="text"
                        id="Username"
                        className="peer w-full  px-3 py-2 border-none bg-transparent placeholder-transparent focus:border-transparent focus:ring-0 focus:outline-hidden"
                        placeholder="Address"
                        onChange={(e) => setShopAddress(e.target.value)}
                      />

                      <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">
                        Shop Address
                      </span>
                    </label>
                  </div>
                  <div className="w-full">
                    <label
                      htmlFor="password"
                      className="relative block rounded-md border border-gray-200 shadow-xs focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
                    >
                      <input
                        required
                        type="text"
                        id="Username"
                        className="peer w-full  px-3 py-2 border-none bg-transparent placeholder-transparent focus:border-transparent focus:ring-0 focus:outline-hidden"
                        placeholder="Password"
                        onChange={(e) => setShopImage(e.target.value)}
                      />

                      <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">
                        Shop Image Url
                      </span>
                    </label>
                  </div>
                </div>
                <Button
                  type="submit"
                  className="bg-blue-600 text-white hover:bg-blue-700"
                  loading={loading ? true : false}
                >
                  Add User
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6">
        <AllUser users={users} />
      </div>
    </>
  );
};

export default pages;
