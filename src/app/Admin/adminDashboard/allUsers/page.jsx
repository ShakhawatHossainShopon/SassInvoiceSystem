import React from "react";
import Button from "@/components/ui/button/Button";
import AddIcon from "@mui/icons-material/Add";

const pages = () => {
  return (
    <div>
      <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-7">
        All Users
      </h3>
      <div className="rounded-2xl border  border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
        <div className="p-6">
          <Button className="font-semibold bg-green-600 text-gray-50 hover:bg-green-700">
            Add User{" "}
            <span>
              <AddIcon />
            </span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default pages;
