export const SELECT_TASK = 'SELECT_TASK';
export const CREATE_TASK = 'CREATE_TASK';

export type ActionType = {
  type: string;
  taskId?: number;
};

export const selectTask = (id: number) => ({
  type: SELECT_TASK,
  taskId: id,
});

export const createTask = () => ({ type: CREATE_TASK });
