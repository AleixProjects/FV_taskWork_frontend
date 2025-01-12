import { Task, Worker } from "~/types/interfaces";
import { getToken } from "./auth.server";

const url = process.env.API_URL;
// const token = localStorage.getItem("token");

// Show all workers
export async function getWorkers(request: Request): Promise<Task[]> {
  const token = await getToken(request);
  const response = await fetch(`${url}/workers`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Error on fetching workers");
  }

  const data = await response.json();
  return data;
}

//Show selected worker
export async function getWorker(id: string): Promise<Task[]> {
  const response = await fetch(`${url}/workers/${id}`, {
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

//ADD Worker
export async function addWorker(
  workerData: Worker,
  request: Request
): Promise<Worker> {
  console.log("Adding Worker");
  console.log(workerData);
  const token = await getToken(request);

  const response = await fetch(`${url}/workers`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(workerData),
  });
  if (!response.ok) {
    throw new Error("Error adding worker");
  }

  const data = await response.json();
  console.log(data);
  return data;
}

//DELETE Worker
export async function deleteWorker(
  id: string,
  request: Request
): Promise<void> {
  console.log("Deleting Worker");
  const token = await getToken(request);
  const { status } = await fetch(`${url}/workers/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!status) {
    console.error("Error deleting worker");
    throw new Error("Failed to delete worker.");
  }
}

//PATCH Worker
export async function updateWorker(
  workerData: Worker,
  request: Request
): Promise<Worker> {
  const token = await getToken(request);
  const response = await fetch(`${url}/workers/${workerData.id}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(workerData),
  });

  if (!response.ok) {
    throw new Error("Error updating worker");
  }

  const data = await response.json();
  return data;
}
