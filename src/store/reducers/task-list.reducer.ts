import { generateTasks } from '../../data/fixture';
import { ActionType, CREATE_TASK, SELECT_TASK } from '../actions/task.action';

const INITIAL_TASKS = generateTasks(12);

const initialState = {
  taskList: INITIAL_TASKS,
  selectedTask: null,
};

const TaskListReducer = (state = initialState, action: ActionType) => {
  switch (action.type) {
    case CREATE_TASK:
      return { ...state, selectedTask: null };
    case SELECT_TASK:
      const selectedTask = state.taskList.find(
        (task) => task.id === action.taskId
      );
      return { ...state, selectedTask: selectedTask };
    default:
      return state;
  }
};

export default TaskListReducer;
