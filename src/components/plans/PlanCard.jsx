function PlanCard({ plan, onEdit, onDelete, onExport }) {
  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const totalExercises = plan.workouts.reduce(
    (sum, workout) => sum + workout.exercises.length,
    0
  );

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-gray-800 mb-1">{plan.name}</h3>
          {plan.description && (
            <p className="text-sm text-gray-600">{plan.description}</p>
          )}
        </div>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex items-center text-sm text-gray-600">
          <span className="font-medium mr-2">Workouts:</span>
          <span>{plan.workouts.length}</span>
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <span className="font-medium mr-2">Total Exercises:</span>
          <span>{totalExercises}</span>
        </div>
        <div className="flex items-center text-sm text-gray-500">
          <span>Created: {formatDate(plan.createdAt)}</span>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-2 pt-4 border-t border-gray-200">
        <button
          onClick={onEdit}
          className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm sm:text-base"
        >
          Edit Plan
        </button>
        <button
          onClick={onExport}
          className="sm:flex-none px-4 py-2 text-green-600 border border-green-600 rounded-lg hover:bg-green-50 transition-colors text-sm sm:text-base"
        >
          Export
        </button>
        <button
          onClick={onDelete}
          className="sm:flex-none px-4 py-2 text-red-600 border border-red-600 rounded-lg hover:bg-red-50 transition-colors text-sm sm:text-base"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default PlanCard;
