import { generateTasks } from '../../data/fixture';

const INITIAL_TASKS = generateTasks(12);

const initialState = {
  taskList: INITIAL_TASKS,
  selectedTask: null,
};

const taskListReducer = (state = initialState, action) => {
  return state;
};

export default taskListReducer;
