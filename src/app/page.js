"use client";
import { useEffect, useState } from "react";

import DisplayTasks from "./components/DisplayTasks";
import { fetchTasks } from "./helpers/fetchFunction";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [dataTask, setDataTask] = useState([]);
  const [dateExpored, SetDateExpired] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const data = await fetchTasks();
      setDataTask(data.tasks);
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main>
      <h1 className="text-xl md:text-2xl lg:text-4xl font-bold text-center m-4">
        {loading ? "Wgrwam dane..." : "Lista zadań"}
      </h1>
      {dataTask
        ? dataTask.map((task) => (
            <section
              className=" bg-slate-200 my-4 mx-10 p-4 rounded-md"
              key={task.id}
            >
              <DisplayTasks {...task} />
            </section>
          ))
        : ""}
    </main>
  );
}
