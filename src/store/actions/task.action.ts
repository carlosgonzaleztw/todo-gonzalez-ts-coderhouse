import { TaskType } from '../../types/task.type';

export const SELECT_TASK = 'SELECT_TASK';
export const CREATE_TASK = 'CREATE_TASK';
export const UPDATE_TASK = 'UPDATE_TASK';
// TODO: ADD_TASK

export type ActionType = {
  type: string;
  taskId?: number;
  task?: TaskType;
};

export const selectTask = (id: number) => ({
  type: SELECT_TASK,
  taskId: id,
});

export const createTask = () => ({ type: CREATE_TASK });

export const updateTask = (task: TaskType) => ({
  type: UPDATE_TASK,
  task: task,
});
