export const fetchTasks = async () => {
  const response = await fetch(
    "http://localhost:3000/api/tasks/get-all-tasks",
    {
      next: {
        revalidate: 10,
      },
    }
  );
  const data = await response.json();
  return data;
};

export const getTaskById = async (id) => {
  const response = await fetch(
    `http://localhost:3000/api/tasks/get-all-tasks/${id}`
  );
  const data = await response.json();
  return data;
};

export const addTask = async (data) => {
  const response = await fetch("http://localhost:3000/api/tasks/create-task", {
    method: "POST",
    body: JSON.stringify(data),
    //@ts-ignore
    "Content-Type": "application/json",
  });
  return (await response).json();
};

export const editTask = async (data) => {
  const response = await fetch(
    `http://localhost:3000/api/tasks/edit-task/${data.id}`,
    {
      method: "PUT",
      body: JSON.stringify(data),
      //@ts-ignore
      "Content-Type": "application/json",
    }
  );
  return (await response).json();
};

export const changeActiveStatus = async (data) => {
  const response = await fetch(
    `http://localhost:3000/api/tasks/change-active-status/${data.id}`,
    {
      method: "PUT",
      body: JSON.stringify(data),
      //@ts-ignore
      "Content-Type": "application/json",
    }
  );
  return (await response).json();
};

export const deleteTask = async (id) => {
  await fetch(`http://localhost:3000/api/tasks/delete-task/${id}`, {
    method: "DELETE",
    //@ts-ignore
    "Content-Type": "application/json",
  });
  return {};
};
