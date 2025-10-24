import { createSlice } from '@reduxjs/toolkit';
import { initialExercises } from '../../data/initialExercises';

const exercisesSlice = createSlice({
  name: 'exercises',
  initialState: {
    exercises: initialExercises
  },
  reducers: {
    addExercise: (state, action) => {
      const { id, name, category, muscles } = action.payload;
      state.exercises[id] = { id, name, category, muscles };
    },
    updateExercise: (state, action) => {
      const { id, name, category, muscles } = action.payload;
      if (state.exercises[id]) {
        state.exercises[id] = { id, name, category, muscles };
      }
    },
    deleteExercise: (state, action) => {
      delete state.exercises[action.payload];
    },
    updateExerciseMuscles: (state, action) => {
      const { exerciseId, muscles } = action.payload;
      if (state.exercises[exerciseId]) {
        state.exercises[exerciseId].muscles = muscles;
      }
    }
  }
});

export const { addExercise, updateExercise, deleteExercise, updateExerciseMuscles } = exercisesSlice.actions;
export default exercisesSlice.reducer;
