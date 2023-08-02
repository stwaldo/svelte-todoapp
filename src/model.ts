export interface Task {
  id: string;
  title: string;
  completed: boolean;
  description: string;
  tags: TagData[];
}

export interface TagData {
  id: string;
  name: string;
  color: string;
}
