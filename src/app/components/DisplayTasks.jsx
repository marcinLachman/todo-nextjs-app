"use client";
import { useState } from "react";
import Link from "next/link";

import { changeActiveStatus } from "../helpers/fetchFunction";
import { FiEdit3 } from "react-icons/fi";

const DisplayTasks = (task) => {
  const [isActive, setIsActive] = useState(task.isActive);

  const handleChange = async () => {
    try {
      setIsActive((current) => !current);
      await changeActiveStatus({
        id: task.id,
        isActive: !isActive,
      });
    } catch (error) {
      console.log(`Cant create new Task: ${error.message}`);
    }
  };

  return (
    <>
      <div className="md:flex flex-1 md:justify-between mx-8 space-y-4 space-x-8">
        <div className="space-x-1 md:space-x-2 lg:space-x-4 space-y-4">
          <div className="flex items-center space-x-4">
            <input
              type="checkbox"
              className=" w-4 h-4 md:w-6 md:h-6 lg:w-9 lg:h-9 accent-blue-500"
              checked={isActive || new Date(task.dateExpired) < new Date()}
              onChange={handleChange}
            />
            <h2
              className={` ${
                isActive || new Date(task.dateExpired) < new Date()
                  ? "text-sm md:text-xl lg:text-4xl font-bold text-pink-400 line-through"
                  : "text-sm md:text-xl lg:text-4xl font-bold "
              }`}
            >
              {task.taskName}
            </h2>
          </div>
          <div className="md:flex space-x-1 md:space-x-2 lg:space-x-4 text-sm">
            <p
              className={`${
                isActive || new Date(task.dateExpired) < new Date()
                  ? "text-pink-400 line-through"
                  : ""
              }`}
            >
              <span className="font-semibold">Data utworzenia:</span>{" "}
              {task.dateCreated.slice(0, 10)}
            </p>
            <p
              className={`${
                isActive || new Date(task.dateExpired) < new Date()
                  ? "text-pink-400 line-through"
                  : ""
              }`}
            >
              <span className="font-semibold">Data zakończenia:</span>{" "}
              {task.dateExpired.slice(0, 10)}
            </p>
          </div>
          <p
            className={`${
              isActive || new Date(task.dateExpired) < new Date()
                ? "text-pink-400 line-through text-xl"
                : "text-xl"
            }`}
          >
            {task.taskDescription}
          </p>
        </div>
        <div>
          <Link
            href={`${
              isActive || new Date(task.dateExpired) < new Date()
                ? ""
                : `pages/edit-task//${task.id}`
            }`}
          >
            {isActive || new Date(task.dateExpired) < new Date() ? (
              ""
            ) : (
              <FiEdit3 className="w-6 h-6 md:w-10 md:h-10 lg:w-14 lg:h-14" />
            )}
          </Link>
        </div>
      </div>
    </>
  );
};

export default DisplayTasks;
