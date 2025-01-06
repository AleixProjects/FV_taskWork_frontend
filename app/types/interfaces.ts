export interface Task {
    //
}

export interface Worker {
    //
}

export interface Client {
    //
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
