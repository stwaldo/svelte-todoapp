import type { Task } from "./model";

export interface ModalsDefinition {
  editTask: {
    visible: boolean;
    data: Task | null;
  };
  deleteTask: {
    visible: boolean;
    data: Task | null;
  };
}

export const modals: ModalsDefinition = {
  editTask: {
    visible: false,
    data: null,
  },
  deleteTask: {
    visible: false,
    data: null,
  },
};
