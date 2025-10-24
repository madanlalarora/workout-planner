import { createSlice } from '@reduxjs/toolkit';
import { nanoid } from '@reduxjs/toolkit';

const plansSlice = createSlice({
  name: 'plans',
  initialState: {
    plans: []
  },
  reducers: {
    createPlan: (state, action) => {
      const { name, description } = action.payload;
      const newPlan = {
        id: nanoid(),
        name,
        description: description || '',
        workouts: [],
        createdAt: Date.now(),
        updatedAt: Date.now()
      };
      state.plans.push(newPlan);
    },
    updatePlan: (state, action) => {
      const { id, name, description } = action.payload;
      const plan = state.plans.find(p => p.id === id);
      if (plan) {
        plan.name = name;
        plan.description = description;
        plan.updatedAt = Date.now();
      }
    },
    deletePlan: (state, action) => {
      state.plans = state.plans.filter(p => p.id !== action.payload);
    },
    addWorkoutToPlan: (state, action) => {
      const { planId, workout } = action.payload;
      const plan = state.plans.find(p => p.id === planId);
      if (plan) {
        plan.workouts.push({
          id: nanoid(),
          name: workout.name,
          exercises: workout.exercises || [],
          createdAt: Date.now()
        });
        plan.updatedAt = Date.now();
      }
    },
    updateWorkout: (state, action) => {
      const { planId, workoutId, name, exercises } = action.payload;
      const plan = state.plans.find(p => p.id === planId);
      if (plan) {
        const workout = plan.workouts.find(w => w.id === workoutId);
        if (workout) {
          workout.name = name;
          workout.exercises = exercises;
          plan.updatedAt = Date.now();
        }
      }
    },
    deleteWorkoutFromPlan: (state, action) => {
      const { planId, workoutId } = action.payload;
      const plan = state.plans.find(p => p.id === planId);
      if (plan) {
        plan.workouts = plan.workouts.filter(w => w.id !== workoutId);
        plan.updatedAt = Date.now();
      }
    },
    addExerciseToWorkout: (state, action) => {
      const { planId, workoutId, exercise } = action.payload;
      const plan = state.plans.find(p => p.id === planId);
      if (plan) {
        const workout = plan.workouts.find(w => w.id === workoutId);
        if (workout) {
          workout.exercises.push({
            exerciseId: exercise.exerciseId,
            sets: exercise.sets || 3,
            reps: exercise.reps || 10,
            notes: exercise.notes || ''
          });
          plan.updatedAt = Date.now();
        }
      }
    },
    removeExerciseFromWorkout: (state, action) => {
      const { planId, workoutId, exerciseIndex } = action.payload;
      const plan = state.plans.find(p => p.id === planId);
      if (plan) {
        const workout = plan.workouts.find(w => w.id === workoutId);
        if (workout) {
          workout.exercises.splice(exerciseIndex, 1);
          plan.updatedAt = Date.now();
        }
      }
    },
    updateExerciseInWorkout: (state, action) => {
      const { planId, workoutId, exerciseIndex, updates } = action.payload;
      const plan = state.plans.find(p => p.id === planId);
      if (plan) {
        const workout = plan.workouts.find(w => w.id === workoutId);
        if (workout && workout.exercises[exerciseIndex]) {
          workout.exercises[exerciseIndex] = {
            ...workout.exercises[exerciseIndex],
            ...updates
          };
          plan.updatedAt = Date.now();
        }
      }
    }
  }
});

export const {
  createPlan,
  updatePlan,
  deletePlan,
  addWorkoutToPlan,
  updateWorkout,
  deleteWorkoutFromPlan,
  addExerciseToWorkout,
  removeExerciseFromWorkout,
  updateExerciseInWorkout
} = plansSlice.actions;

export default plansSlice.reducer;
