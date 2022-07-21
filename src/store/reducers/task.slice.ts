import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Dispatch } from 'react';
import { generateTasks } from '../../data/fixture';
import { getAllTasks } from '../../db/db.index';
import { TaskType } from '../../types/task.type';

export type TaskActionType = {
  taskId?: number;
  task?: TaskType;
};

interface TaskState {
  list: TaskType[];
  selected: TaskType | undefined;
}

const initialState: TaskState = {
  list: [],
  selected: undefined,
};

export const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    loadTasks: (state: TaskState, { payload }: PayloadAction<TaskType[]>) => {
      state.list = payload;
    },
    selectTask: (state: TaskState, { payload }: PayloadAction<number>) => {
      const selectedTask = state.list.find((task) => task.id === payload);
      state.selected = selectedTask;
    },
    createTask: (state: TaskState, { payload }: PayloadAction<TaskType>) => {
      state.list.unshift(payload);
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

const loadTasks = () => {
  return async (dispatch) => {
    try {
      const tasks = await getAllTasks();
      dispatch(loadTasks(tasks));
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  };
};

export const { selectTask, unselectTasks, createTask, deleteTask, updateTask } =
  taskSlice.actions;

export default taskSlice.reducer;
