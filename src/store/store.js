import { configureStore } from '@reduxjs/toolkit';
import exercisesReducer from './slices/exercisesSlice';
import plansReducer from './slices/plansSlice';
import { loadState, saveState } from '../utils/localStorage';

// Load persisted state from localStorage
const persistedState = loadState();

export const store = configureStore({
  reducer: {
    exercises: exercisesReducer,
    plans: plansReducer
  },
  preloadedState: persistedState
});

// Subscribe to store changes and save to localStorage
store.subscribe(() => {
  saveState(store.getState());
});

export default store;
