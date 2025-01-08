
export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: string;
}

export interface Task {
  id: string;
  name: string;
  description: string;
  start_date: string;
  end_date: string;
  total_time: number;
  status: string;
  client?: Client;
  workers?: Worker[];
  materials?: Material[];
}

export interface Worker {
  id: string;
  name: string;
  surname: string;
  role: string;
  image: string;
  tasks?: Task[];
}

export interface Client {
  id: string;
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
  name: string;
  description: string;
  image: string;
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
  email: string;
  password: string;
}

export interface RequestData {
  status: string,
  message: string,
  data: string | null,
  httpCode: number
}
