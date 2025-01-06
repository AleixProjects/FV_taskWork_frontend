export interface Task {
    id: string;
    name: string;
    description: string;
    startDate: string;
    endDate: string;
    totalHours: number;
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
