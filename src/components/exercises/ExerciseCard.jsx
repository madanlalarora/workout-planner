function ExerciseCard({ exercise, onEdit, onDelete }) {
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

  const getImpactLabel = (weight) => {
    switch (weight) {
      case 1:
        return 'Low';
      case 2:
        return 'Medium';
      case 3:
        return 'High';
      default:
        return '';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">{exercise.name}</h3>
          <span className="inline-block mt-1 px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
            {exercise.category}
          </span>
        </div>
        <div className="flex gap-2">
          <button
            onClick={onEdit}
            className="text-blue-600 hover:text-blue-800 text-sm"
          >
            Edit
          </button>
          <button
            onClick={onDelete}
            className="text-red-600 hover:text-red-800 text-sm"
          >
            Delete
          </button>
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-sm font-medium text-gray-700">Target Muscles:</p>
        <div className="flex flex-wrap gap-2">
          {exercise.muscles.map((muscleTarget, index) => (
            <div
              key={index}
              className={`px-3 py-1 rounded-full text-xs font-medium ${getImpactColor(
                muscleTarget.weight
              )}`}
            >
              {muscleTarget.muscle} • {getImpactLabel(muscleTarget.weight)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ExerciseCard;
