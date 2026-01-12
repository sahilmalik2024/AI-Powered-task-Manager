export interface Task {
    id: number;
    title: string;
    description: string;
    status: 'incomplete' | 'complete';
    priority: number;
    deadline: string;
  }
  