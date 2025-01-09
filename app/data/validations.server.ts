import { Task } from "~/types/interfaces";

type ValidationErrors = Record<string, string>;

export interface TypeErrors {
  name?: string;
  code?: string;
}

// ----------------------------
// VALIDACIONS GENERALS
// ----------------------------

function isValidTitle(value: string): boolean {
  return value.trim().length > 0 && value.trim().length <= 100;
}

function isValidDescription(value: string): boolean {
  return value.trim().length <= 500;
}

function isValidAmount(value: number): boolean {
  return !isNaN(value) && value > 0;
}

function isValidDate(value: Date): boolean {
  return value.getTime() >= new Date().getTime();
}

function isValidEmail(value: string): boolean {
  return value.trim().includes("@");
}

function isValidPassword(value: string): boolean {
  return value.trim().length >= 7;
}

// ----------------------------
// VALIDACIÓ DE TASKS
// ----------------------------

export function validateTask(input: Task): void {
  const validationErrors: ValidationErrors = {};

  if (!isValidTitle(input.name)) {
    validationErrors.title =
      "Invalid task name. Must be at most 100 characters long";
  }

  if (!isValidDescription(input.description)) {
    validationErrors.title =
      "Invalid task name. Must be at most 100 characters long";
  }

  // Llança l'error si hi ha alguna validació fallida
  if (Object.keys(validationErrors).length > 0) {
    throw validationErrors;
  }
  console.log("Task validated");
}

// ----------------------------
// VALIDACIÓ DE CREDENCIALS
// ----------------------------

interface CredentialsInput {
  email: string;
  password: string;
}

export function validateCredentials(input: CredentialsInput): void {
  const validationErrors: ValidationErrors = {};

  // Validacions individuals
  if (!isValidEmail(input.email)) {
    validationErrors.email = "Invalid email address.";
  }

  if (!isValidPassword(input.password)) {
    validationErrors.password =
      "Invalid password. Must be at least 7 characters long.";
  }

  // Llança l'error si hi ha alguna validació fallida
  if (Object.keys(validationErrors).length > 0) {
    throw validationErrors;
  }
}
