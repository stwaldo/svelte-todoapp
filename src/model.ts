export interface Task {
  id: string;
  title: string;
  status: "IN_PROGRESS" | "PLANNED" | "COMPLETED";
  description: string;
  tags: TagData[];
}

export interface TagData {
  id: string;
  name: string;
  color: string;
}
