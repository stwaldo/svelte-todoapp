export interface Task {
  id: string;
  title: string;
  status: "PLANNED" | "IN_PROGRESS" | "COMPLETED";
  description: string;
  tags: TagData[];
}

export interface TagData {
  id: string;
  name: string;
  color: string;
}
