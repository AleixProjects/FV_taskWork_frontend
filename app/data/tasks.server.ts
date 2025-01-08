import { Task } from "~/types/interfaces";
import { getToken } from "./auth.server";
import { request } from "node_modules/axios/index.cjs";

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
export async function getTask(id: string): Promise<Task[]> {
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

export async function deleteTask(id: string, token: string): Promise<void> {

  const { error } = await fetch(`${url}/tasks/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (error) {
    console.error("Error deleting expense:", error);
    throw new Error("Failed to delete expense.");
  }
}
