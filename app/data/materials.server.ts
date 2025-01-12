import { Material } from "~/types/interfaces";
import { getToken } from "./auth.server";

const url = process.env.API_URL;

export async function getMaterials(request: Request): Promise<Material[]> {
  const token = await getToken(request);
  const response = await fetch(`${url}/materials`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Error on fetching materials");
  }

  const data = await response.json();
  return data;
}

export async function getMaterial(id: string): Promise<Material> {
  const token = localStorage.getItem("token");
  const response = await fetch(`${url}/materials/${id}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Error on fetching material");
  }

  const data = await response.json();
  return data;
}

export async function addMaterial(
  materialData: Material,
  request: Request
): Promise<Material> {
  console.log("Adding Material");
  console.log(materialData);
  const token = await getToken(request);
  const response = await fetch(`${url}/materials`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(materialData),
  });

  if (!response.ok) {
    throw new Error("Error on adding material");
  }

  const data = await response.json();
  console.log(data);
  return data;
}

export async function deleteMaterial(
  id: string,
  request: Request
): Promise<void> {
  const token = await getToken(request);
  const response = await fetch(`${url}/materials/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Error on deleting material");
  }
}

export async function updateMaterial(
  materialData: Material,
  request: Request
): Promise<Material> {
  const token = await getToken(request);
  const response = await fetch(`${url}/materials/${materialData.id}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(materialData),
  });

  if (!response.ok) {
    throw new Error("Error on updating material");
  }

  const data = await response.json();
  return data;
}
