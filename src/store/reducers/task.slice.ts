import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { generateTasks } from '../../data/fixture';
import { TaskType } from '../../types/task.type';

const INITIAL_TASKS = generateTasks(12);

export type TaskActionType = {
  taskId?: number;
  task?: TaskType;
};

interface TaskState {
  list: TaskType[];
  selected: TaskType | undefined;
}

const initialState: TaskState = {
  list: INITIAL_TASKS,
  selected: undefined,
};

export const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    selectTask: (state: TaskState, { payload }: PayloadAction<number>) => {
      const selectedTask = state.list.find((task) => task.id === payload);
      state.selected = selectedTask;
    },
    createTask: (state: TaskState, { payload }: PayloadAction<TaskType>) => {
      const newTask: TaskType = {
        id: Math.random(),
        title: payload.title,
        description: payload.description,
        isChecked: false,
      };
      state.list.push(newTask);
    },
    unselectTasks: (state: TaskState) => {
      state.selected = undefined;
    },
    updateTask: (state: TaskState, { payload }: PayloadAction<TaskType>) => {
      const updatedList = state.list.map((task) => {
        if (task.id === payload.id) {
          return payload;
        }
        return task;
      });
      state.list = updatedList;
    },
    deleteTask: (state: TaskState, { payload }: PayloadAction<number>) => {
      const updatedList = state.list.filter((task) => task.id !== payload);
      state.list = updatedList;
    },
  },
});

export const { selectTask, unselectTasks, createTask, deleteTask, updateTask } =
  taskSlice.actions;

export default taskSlice.reducer;
