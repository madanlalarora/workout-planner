import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addExerciseToWorkout, removeExerciseFromWorkout, updateExerciseInWorkout, updateWorkout } from '../../store/slices/plansSlice';

function WorkoutBuilder({ planId, workout, isExpanded, onToggle, onDelete }) {
  const dispatch = useDispatch();
  const exercises = useSelector((state) => state.exercises.exercises);
  const [selectedExerciseId, setSelectedExerciseId] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [workoutName, setWorkoutName] = useState(workout.name);
  const [isEditingName, setIsEditingName] = useState(false);

  // Filter exercises based on search term
  const filteredExercises = Object.values(exercises).filter((exercise) =>
    exercise.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddExercise = () => {
    if (!selectedExerciseId) return;

    dispatch(addExerciseToWorkout({
      planId,
      workoutId: workout.id,
      exercise: {
        exerciseId: selectedExerciseId,
        sets: 3,
        reps: 10,
        notes: ''
      }
    }));
    setSelectedExerciseId('');
    setSearchTerm('');
    setShowSuggestions(false);
  };

  const handleSelectExercise = (exercise) => {
    setSelectedExerciseId(exercise.id);
    setSearchTerm(exercise.name);
    setShowSuggestions(false);
  };

  const handleRemoveExercise = (index) => {
    dispatch(removeExerciseFromWorkout({
      planId,
      workoutId: workout.id,
      exerciseIndex: index
    }));
  };

  const handleUpdateExercise = (index, field, value) => {
    const updates = { [field]: value };
    dispatch(updateExerciseInWorkout({
      planId,
      workoutId: workout.id,
      exerciseIndex: index,
      updates
    }));
  };

  const handleSaveWorkoutName = () => {
    if (workoutName.trim()) {
      dispatch(updateWorkout({
        planId,
        workoutId: workout.id,
        name: workoutName,
        exercises: workout.exercises
      }));
      setIsEditingName(false);
    }
  };

  const getImpactColor = (weight) => {
    switch (weight) {
      case 1:
        return 'bg-green-100 text-green-800';
      case 2:
        return 'bg-yellow-100 text-yellow-800';
      case 3:
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      {/* Workout Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3 flex-1">
            <button
              onClick={onToggle}
              className="text-gray-600 hover:text-gray-800"
            >
              {isExpanded ? '▼' : '▶'}
            </button>
            {isEditingName ? (
              <div className="flex items-center gap-2 flex-1">
                <input
                  type="text"
                  value={workoutName}
                  onChange={(e) => setWorkoutName(e.target.value)}
                  className="px-3 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  autoFocus
                />
                <button
                  onClick={handleSaveWorkoutName}
                  className="text-green-600 hover:text-green-800 text-sm"
                >
                  Save
                </button>
                <button
                  onClick={() => {
                    setWorkoutName(workout.name);
                    setIsEditingName(false);
                  }}
                  className="text-gray-600 hover:text-gray-800 text-sm"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <h4 className="text-lg font-semibold text-gray-800">{workout.name}</h4>
                <button
                  onClick={() => setIsEditingName(true)}
                  className="text-blue-600 hover:text-blue-800 text-sm"
                >
                  Edit
                </button>
              </div>
            )}
            <span className="text-sm text-gray-500">
              ({workout.exercises.length} {workout.exercises.length === 1 ? 'exercise' : 'exercises'})
            </span>
          </div>
          <button
            onClick={onDelete}
            className="text-red-600 hover:text-red-800 text-sm"
          >
            Delete Workout
          </button>
        </div>
      </div>

      {/* Workout Content */}
      {isExpanded && (
        <div className="p-4">
          {/* Add Exercise Section */}
          <div className="mb-4 p-4 bg-gray-50 rounded-lg">
            <h5 className="font-medium text-gray-700 mb-3">Add Exercise</h5>
            <div className="flex gap-2 relative">
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setShowSuggestions(true);
                    setSelectedExerciseId('');
                  }}
                  onFocus={() => setShowSuggestions(true)}
                  placeholder="Search for an exercise..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />

                {/* Autocomplete Dropdown */}
                {showSuggestions && searchTerm && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                    {filteredExercises.length > 0 ? (
                      filteredExercises.map((exercise) => (
                        <div
                          key={exercise.id}
                          onClick={() => handleSelectExercise(exercise)}
                          className="px-4 py-3 hover:bg-blue-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                        >
                          <div className="font-medium text-gray-800">{exercise.name}</div>
                          <div className="text-xs text-gray-500 mt-1">
                            <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded">
                              {exercise.category}
                            </span>
                            <span className="ml-2">
                              {exercise.muscles.map(m => m.muscle).join(', ')}
                            </span>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="px-4 py-3 text-gray-500 text-sm">
                        No exercises found
                      </div>
                    )}
                  </div>
                )}
              </div>
              <button
                onClick={handleAddExercise}
                disabled={!selectedExerciseId}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                Add
              </button>
            </div>
          </div>

          {/* Exercise List */}
          {workout.exercises.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No exercises added yet. Add your first exercise above.
            </div>
          ) : (
            <div className="space-y-3">
              {workout.exercises.map((exercise, index) => {
                const exerciseData = exercises[exercise.exerciseId];
                if (!exerciseData) return null;

                return (
                  <div
                    key={index}
                    className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1">
                        <h6 className="font-semibold text-gray-800 mb-2">
                          {index + 1}. {exerciseData.name}
                        </h6>
                        <div className="flex flex-wrap gap-2 mb-2">
                          {exerciseData.muscles.map((muscleTarget, mIndex) => (
                            <span
                              key={mIndex}
                              className={`px-2 py-1 rounded-full text-xs font-medium ${getImpactColor(
                                muscleTarget.weight
                              )}`}
                            >
                              {muscleTarget.muscle}
                            </span>
                          ))}
                        </div>
                      </div>
                      <button
                        onClick={() => handleRemoveExercise(index)}
                        className="text-red-600 hover:text-red-800 text-sm"
                      >
                        Remove
                      </button>
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">
                          Sets
                        </label>
                        <input
                          type="number"
                          min="1"
                          value={exercise.sets || 3}
                          onChange={(e) =>
                            handleUpdateExercise(index, 'sets', parseInt(e.target.value))
                          }
                          className="w-full px-3 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">
                          Reps
                        </label>
                        <input
                          type="number"
                          min="1"
                          value={exercise.reps || 10}
                          onChange={(e) =>
                            handleUpdateExercise(index, 'reps', parseInt(e.target.value))
                          }
                          className="w-full px-3 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <div className="col-span-1">
                        <label className="block text-xs font-medium text-gray-600 mb-1">
                          Notes
                        </label>
                        <input
                          type="text"
                          value={exercise.notes || ''}
                          onChange={(e) =>
                            handleUpdateExercise(index, 'notes', e.target.value)
                          }
                          placeholder="Optional"
                          className="w-full px-3 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default WorkoutBuilder;
