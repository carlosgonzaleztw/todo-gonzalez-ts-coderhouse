import { combineReducers, configureStore } from '@reduxjs/toolkit';
import taskListReducer from './reducers/task-list.reducer';

const RootReducer = combineReducers({
  tasks: taskListReducer,
});

export default configureStore({ reducer: RootReducer });
