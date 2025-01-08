import { Task } from "~/types/interfaces";
import { getToken } from "./auth.server";

const url = process.env.API_URL;
// const token = localStorage.getItem("token");


// Show all workers
export async function getWorkers(request: Request): Promise<Task[]> {
  const token = await getToken(request)
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
