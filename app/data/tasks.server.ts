import {
  RequestData,
  Task,
  TaskMaterial,
  TaskMaterialInput,
  TaskWorker,
  TaskWorkerInput,
} from "~/types/interfaces";
import { getToken } from "./auth.server";

const url = process.env.API_URL;
// const token = localStorage.getItem("token");

// Show all tasks
export async function getTasks(request: Request): Promise<Task[]> {
  const token = await getToken(request);
  const response = await fetch(`${url}/tasks`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Error on fetching tasks");
  }

  const data = await response.json();
  return data;
}

//Show selected task
export async function getTask(id: string, request: Request): Promise<Task[]> {
  const token = await getToken(request);
  const response = await fetch(`${url}/tasks/${id}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Error on fetching tasks");
  }

  const data = await response.json();
  return data;
}

export async function addTask(taskData: Task, request: Request): Promise<Task> {
  console.log("Adding task");
  const token = await getToken(request);
  const response = await fetch(`${url}/tasks`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(taskData),
  });

  if (!response.ok) {
    throw new Error("Error adding task");
  }

  const data = await response.json();
  console.log(data);
  return data;
}

export async function deleteTask(id: string, request: Request): Promise<void> {
  const token = await getToken(request);
  const { status } = await fetch(`${url}/tasks/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!status) {
    console.error("Error deleting task");
    throw new Error("Failed to delete task.");
  }
}

export async function updateTask(
  taskData: Task,
  request: Request
): Promise<Task> {
  const token = await getToken(request);
  const response = await fetch(`${url}/tasks/${taskData.id}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(taskData),
  });

  if (!response.ok) {
    throw new Error("Error updating task");
  }

  const data = await response.json();
  console.log(data);
  return data;
}

// TASK WORKERS

export async function getTaskWorkersAll(
  request: Request
): Promise<RequestData> {
  const token = await getToken(request);
  const response = await fetch(`${url}/task-workers`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Error on fetching task workers");
  }

  const data = await response.json();
  return data;
}

export async function addTaskWorker(
  taskWorker: TaskWorkerInput,
  request: Request
): Promise<void> {
  console.log("Adding Worker to Task");
  const token = await getToken(request);
  const response = await fetch(`${url}/task-workers`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(taskWorker),
  });

  if (!response.ok) {
    throw new Error("Error adding worker to task");
  }

  const data = await response.json();
  // console.log(data);
  return data;
}

export async function deleteTaskWorker(
  taskWorker: TaskWorkerInput,
  request: Request
): Promise<void> {
  console.log("Deleting Worker from Task");
  const token = await getToken(request);

  const taskWorkersAll: RequestData = await getTaskWorkersAll(request);

  const taskWorkerToDelete: TaskWorker = taskWorkersAll.data?.find(
    (taskWorkerFind: TaskWorker) =>
      taskWorkerFind.task.id == taskWorker.task_id &&
      taskWorkerFind.worker.id == taskWorker.worker_id
  );

  // console.log(taskWorkerToDelete);

  if (!taskWorkerToDelete) {
    console.error("Error deleting worker from task");
    throw new Error("Failed to delete worker from task.");
  }

  const { status } = await fetch(
    `${url}/task-workers/${taskWorkerToDelete.id}}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );

  if (!status) {
    console.error("Error deleting worker from task");
    throw new Error("Failed to delete worker from task.");
  }
}

// TASK MATERIALS

export async function getTaskMaterialsAll(
  request: Request
): Promise<RequestData> {
  const token = await getToken(request);
  const response = await fetch(`${url}/task-materials`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Error on fetching task materials");
  }

  const data = await response.json();
  return data;
}

export async function addTaskMaterial(
  taskMaterial: TaskMaterialInput,
  request: Request
): Promise<void> {
  console.log("Adding Material to Task");
  const token = await getToken(request);
  const response = await fetch(`${url}/task-materials`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(taskMaterial),
  });

  if (!response.ok) {
    throw new Error("Error adding material to task");
  }

  const data = await response.json();
  return data;
}

export async function deleteTaskMaterial(
  taskMaterial: TaskMaterialInput,
  request: Request
): Promise<void> {
  console.log("Deleting Material from Task");
  const token = await getToken(request);

  const taskMaterialsAll: RequestData = await getTaskMaterialsAll(request);

  const taskMaterialToDelete: TaskMaterial = taskMaterialsAll.data?.find(
    (taskMaterialFind: TaskMaterial) =>
      taskMaterialFind.task.id == taskMaterial.task_id &&
      taskMaterialFind.material.id == taskMaterial.material_id
  );
  console.log("taskMaterialToDelete");
  console.log(taskMaterialToDelete);

  if (!taskMaterialToDelete) {
    console.error("Error deleting material from task");
    throw new Error("Failed to delete material from task.");
  }

  const { status } = await fetch(
    `${url}/task-materials/${taskMaterialToDelete.id}}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );

  if (!status) {
    console.error("Error deleting material from task");
    throw new Error("Failed to delete material from task.");
  }
}
