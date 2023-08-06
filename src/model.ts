export type StatusType = "PLANNED" | "IN_PROGRESS" | "COMPLETED";

export interface TaskColumn {
  status: StatusType;
  items: Task[];
}

export interface Task {
  id: string;
  title: string;
  status: StatusType;
  description: string;
  tags: TagData[];
}

export interface TagData {
  id: string;
  name: string;
  color: string;
}
