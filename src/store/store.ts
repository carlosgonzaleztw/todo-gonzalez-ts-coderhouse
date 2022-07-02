import { combineReducers, configureStore } from '@reduxjs/toolkit';
import TaskListReducer from './reducers/task-list.reducer';

const RootReducer = combineReducers({
  tasks: TaskListReducer,
});

export default configureStore({ reducer: RootReducer });
