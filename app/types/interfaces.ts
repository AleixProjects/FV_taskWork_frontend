export interface User {
  id?: string;
  name: string;
  email: string;
  password: string;
  role: string;
}

export interface Task {
  id?: string;
  name: string;
  description: string;
  start_date: string;
  end_date?: string;
  total_time: string;
  status: string;
  client?: Client;
  workers?: Worker[];
  materials?: Material[];
}

export interface Worker {
  id?: string;
  name: string;
  surname: string;
  role: string;
  image: string | null;
  tasks?: Task[];
}

export interface Client {
  id?: string;
  name: string;
  surname: string;
  dni?: string;
  address?: string;
  city?: string;
  postal_code?: string;
  phone_number?: string;
  email?: string;
  image?: string;
  tasks?: Task[];
}

export interface Material {
  id?: string;
  name: string;
  description: string;
  image: string | null;
  tasks?: Task[];
}

export interface TaskWorker {
  id?: string;
  task: Task;
  worker: Worker;
  total_time: string;
}

export interface TaskMaterial {
  id?: string;
  task: Task;
  material: Material;
  total_time: string;
}

export interface TaskWorkerInput {
  id?: string;
  task_id: string;
  worker_id: string;
  total_time: string;
}

export interface TaskMaterialInput {
  id?: string;
  task_id: string;
  material_id: string;
  quantity: string;
}

export type ValidationErrors = {
  title?: string;
  amount?: string;
  date?: string;
};

export type NavItem = {
  name: string;
  href: string;
  icon: React.ComponentType;
};

export interface SignupInput {
  name?: string;
  email: string;
  password: string;
  role?: string;
}

export interface RequestData {
  status: string;
  message: string;
  data: string[] | string | null;
  httpCode: number;
}
