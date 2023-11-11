"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { getTaskById, editTask, deleteTask } from "@/app/helpers/fetchFunction";

const EditTask = ({ params }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [taskData, setTaskData] = useState({
    taskName: "",
    taskDescription: "",
    dateExpired: "",
  });

  useEffect(() => {
    fetchDataById();
  }, []);

  const fetchDataById = async () => {
    try {
      setLoading(true);
      const data = await getTaskById(params.id);
      setTaskData({
        taskName: data.task.taskName,
        taskDescription: data.task.taskDescription,
        dateExpired: data.task.dateExpired,
      });
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setLoading(true);
      await editTask({
        id: params.id,
        taskName: taskData.taskName,
        taskDescription: taskData.taskDescription,
        dateExpired: taskData.dateExpired,
        dateUpdated: new Date().toISOString(),
      });
      router.push("/");
    } catch (error) {
      setLoading(false);
      console.log(`Cant create new Task: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (confirm("Jesteś pewien, że chcesz usunąć te zadanie")) {
      // Save it!
      await deleteTask(params.id);
      router.push("/");
    } else {
      // Do nothing!
      return;
    }
  };

  return (
    <section className="w-10/12 mx-auto">
      <h1 className="text-xl md:text-2xl lg:text-4xl text-center font-semibold m-4">
        {loading ? "Wgrywam dane..." : "Zmień treść zadania"}
      </h1>
      <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
        <label className="text-sm md:text-xl lg:text-xl" htmlFor="taskName">
          Nazwa zadania
        </label>
        <input
          className="rounded focus:outline-none bg-gray-200 py-3 px-2 hover:bg-gray-400 transition-all duration-200 ease-out"
          type="text"
          id="taskName"
          required
          minLength={4}
          value={taskData.taskName}
          onChange={(event) =>
            setTaskData({ ...taskData, taskName: event.target.value })
          }
        />
        <label
          className="text-sm md:text-xl lg:text-xl"
          htmlFor="taskDescription"
        >
          Opis zadania
        </label>
        <textarea
          className="rounded focus:outline-none bg-gray-200 py-3 px-2 hover:bg-gray-400 transition-all duration-200 ease-out"
          id="taskDescription"
          rows={4}
          cols={50}
          value={taskData.taskDescription}
          onChange={(event) =>
            setTaskData({ ...taskData, taskDescription: event.target.value })
          }
        ></textarea>
        <label className="text-sm md:text-xl lg:text-xl" htmlFor="dateExpired">
          Data zakończenia zadania
        </label>
        <input
          className="rounded focus:outline-none bg-gray-200 py-3 px-2 hover:bg-gray-400 transition-all duration-200 ease-out"
          type="date"
          id="dateExpired"
          value={taskData.dateExpired}
          min={new Date().toISOString().slice(0, 10)}
          onChange={(event) =>
            setTaskData({
              ...taskData,
              dateExpired: event.target.value,
            })
          }
        />
        <div className="flex justify-center space-x-6">
          <button
            className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-4 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            type="submit"
          >
            Dodaj Nowe zadanie
          </button>
          <button
            className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-4 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
            type="button"
            onClick={handleDelete}
          >
            Usuń zadanie
          </button>
        </div>
      </form>
    </section>
  );
};

export default EditTask;
