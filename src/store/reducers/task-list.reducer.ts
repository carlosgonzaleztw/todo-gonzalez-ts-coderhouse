import { generateTasks } from '../../data/fixture';
import { TaskType } from '../../types/task.type';
import {
  ActionType,
  CREATE_TASK,
  SELECT_TASK,
  UPDATE_TASK,
} from '../actions/task.action';

const INITIAL_TASKS = generateTasks(12);

export type TaskStateType = {
  list: TaskType[];
  selected: TaskType | null;
};

const initialState: TaskStateType = {
  list: INITIAL_TASKS,
  selected: null,
};

const TaskListReducer = (state = initialState, action: ActionType) => {
  switch (action.type) {
    case CREATE_TASK:
      return { ...state, selected: null };

    case SELECT_TASK:
      const selectedTask = state.list.find((task) => task.id === action.taskId);

      return { ...state, selected: selectedTask };

    case UPDATE_TASK:
      const updatedTaskList = state.list.map((task) => {
        if (task.id === action.task?.id) {
          return action.task;
        } else {
          return task;
        }
      });
      return { ...state, list: updatedTaskList };

    default:
      return state;
  }
};

export default TaskListReducer;
