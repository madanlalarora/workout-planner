import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addExercise, updateExercise, deleteExercise } from '../../store/slices/exercisesSlice';
import { allMuscles } from '../../data/initialExercises';
import ExerciseCard from './ExerciseCard';
import ExerciseForm from './ExerciseForm';

function ExerciseManager() {
  const dispatch = useDispatch();
  const exercises = useSelector((state) => state.exercises.exercises);
  const [isAdding, setIsAdding] = useState(false);
  const [editingExercise, setEditingExercise] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');

  const exerciseList = Object.values(exercises);

  const filteredExercises = exerciseList.filter((exercise) => {
    const matchesSearch = exercise.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || exercise.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAddExercise = (exerciseData) => {
    const id = exerciseData.name.toLowerCase().replace(/\s+/g, '-');
    dispatch(addExercise({ ...exerciseData, id }));
    setIsAdding(false);
  };

  const handleUpdateExercise = (exerciseData) => {
    dispatch(updateExercise(exerciseData));
    setEditingExercise(null);
  };

  const handleDeleteExercise = (exerciseId) => {
    if (window.confirm('Are you sure you want to delete this exercise?')) {
      dispatch(deleteExercise(exerciseId));
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-3xl font-bold text-gray-800">Exercise Library</h2>
          <button
            onClick={() => setIsAdding(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            + Add Exercise
          </button>
        </div>

        {/* Search and Filter */}
        <div className="flex gap-4 mb-4">
          <input
            type="text"
            placeholder="Search exercises..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Categories</option>
            <option value="compound">Compound</option>
            <option value="isolation">Isolation</option>
          </select>
        </div>

        <div className="text-sm text-gray-600">
          Showing {filteredExercises.length} of {exerciseList.length} exercises
        </div>
      </div>

      {/* Add/Edit Form Modal */}
      {(isAdding || editingExercise) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h3 className="text-2xl font-bold mb-4">
              {isAdding ? 'Add New Exercise' : 'Edit Exercise'}
            </h3>
            <ExerciseForm
              exercise={editingExercise}
              onSubmit={isAdding ? handleAddExercise : handleUpdateExercise}
              onCancel={() => {
                setIsAdding(false);
                setEditingExercise(null);
              }}
            />
          </div>
        </div>
      )}

      {/* Exercise List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredExercises.map((exercise) => (
          <ExerciseCard
            key={exercise.id}
            exercise={exercise}
            onEdit={() => setEditingExercise(exercise)}
            onDelete={() => handleDeleteExercise(exercise.id)}
          />
        ))}
      </div>

      {filteredExercises.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No exercises found</p>
        </div>
      )}
    </div>
  );
}

export default ExerciseManager;
