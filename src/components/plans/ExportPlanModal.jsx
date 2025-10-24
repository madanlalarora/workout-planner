import { useSelector } from 'react-redux';
import { allMuscles } from '../../data/initialExercises';

function ExportPlanModal({ plan, onClose }) {
  const exercises = useSelector((state) => state.exercises.exercises);

  // Calculate muscle engagement
  const calculateMuscleEngagement = () => {
    const muscleData = {};
    allMuscles.forEach((muscle) => {
      muscleData[muscle] = { total: 0, count: 0 };
    });

    plan.workouts.forEach((workout) => {
      workout.exercises.forEach((exercise) => {
        const exerciseData = exercises[exercise.exerciseId];
        if (exerciseData) {
          exerciseData.muscles.forEach((muscleTarget) => {
            muscleData[muscleTarget.muscle].total += muscleTarget.weight;
            muscleData[muscleTarget.muscle].count += 1;
          });
        }
      });
    });

    return muscleData;
  };

  const muscleEngagement = calculateMuscleEngagement();
  const sortedMuscles = allMuscles
    .map((muscle) => ({
      name: muscle,
      ...muscleEngagement[muscle]
    }))
    .filter((m) => m.total > 0)
    .sort((a, b) => b.total - a.total);

  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getImpactBadge = (weight) => {
    switch (weight) {
      case 1: return 'Low';
      case 2: return 'Medium';
      case 3: return 'High';
      default: return '';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-2 sm:p-4 z-50">
      <div className="bg-white rounded-lg max-w-6xl w-full max-h-[95vh] overflow-y-auto">
        {/* Header with Print Button */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-3 sm:p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 print:hidden">
          <h2 className="text-lg sm:text-2xl font-bold text-gray-800">Export Workout Plan</h2>
          <div className="flex gap-2 w-full sm:w-auto">
            <button
              onClick={() => window.print()}
              className="flex-1 sm:flex-none bg-green-600 text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm sm:text-base"
            >
              Print / PDF
            </button>
            <button
              onClick={onClose}
              className="flex-1 sm:flex-none bg-gray-200 text-gray-800 px-3 sm:px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors text-sm sm:text-base"
            >
              Close
            </button>
          </div>
        </div>

        {/* Exportable Content */}
        <div className="p-4 sm:p-8">
          {/* Plan Header */}
          <div className="mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-4xl font-bold text-gray-900 mb-2">{plan.name}</h1>
            {plan.description && (
              <p className="text-base sm:text-lg text-gray-600 mb-2">{plan.description}</p>
            )}
            <p className="text-xs sm:text-sm text-gray-500">Created: {formatDate(plan.createdAt)}</p>
            <p className="text-xs sm:text-sm text-gray-500">Last Updated: {formatDate(plan.updatedAt)}</p>
          </div>

          {/* Summary Statistics */}
          <div className="mb-6 sm:mb-8 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 bg-gray-50 p-3 sm:p-4 rounded-lg">
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-blue-600">{plan.workouts.length}</div>
              <div className="text-xs sm:text-sm text-gray-600">Workouts</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-green-600">
                {plan.workouts.reduce((sum, w) => sum + w.exercises.length, 0)}
              </div>
              <div className="text-xs sm:text-sm text-gray-600">Exercises</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-purple-600">{sortedMuscles.length}</div>
              <div className="text-xs sm:text-sm text-gray-600">Muscles</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-orange-600">
                {Object.values(muscleEngagement).reduce((sum, m) => sum + m.total, 0)}
              </div>
              <div className="text-xs sm:text-sm text-gray-600">Engagement</div>
            </div>
          </div>

          {/* Muscle Engagement Table */}
          <div className="mb-6 sm:mb-8 overflow-x-auto">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3 sm:mb-4">Muscle Engagement</h2>
            <table className="w-full border-collapse border border-gray-300 text-sm sm:text-base">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-4 py-2 text-left">Muscle Group</th>
                  <th className="border border-gray-300 px-4 py-2 text-center">Exercises</th>
                  <th className="border border-gray-300 px-4 py-2 text-center">Total Impact</th>
                  <th className="border border-gray-300 px-4 py-2 text-center">Engagement Level</th>
                </tr>
              </thead>
              <tbody>
                {sortedMuscles.map((muscle, index) => {
                  const maxTotal = Math.max(...sortedMuscles.map(m => m.total), 1);
                  const percentage = (muscle.total / maxTotal) * 100;
                  const level = percentage >= 75 ? 'Very High' :
                               percentage >= 50 ? 'High' :
                               percentage >= 25 ? 'Medium' : 'Low';

                  return (
                    <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="border border-gray-300 px-4 py-2 font-medium capitalize">
                        {muscle.name}
                      </td>
                      <td className="border border-gray-300 px-4 py-2 text-center">
                        {muscle.count}
                      </td>
                      <td className="border border-gray-300 px-4 py-2 text-center font-semibold">
                        {muscle.total}
                      </td>
                      <td className="border border-gray-300 px-4 py-2 text-center">
                        {level}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Detailed Workout Tables */}
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3 sm:mb-4">Workout Details</h2>
            {plan.workouts.map((workout, workoutIndex) => (
              <div key={workout.id} className="mb-6 sm:mb-8 page-break-inside-avoid">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3 bg-blue-50 px-3 sm:px-4 py-2 rounded">
                  {workoutIndex + 1}. {workout.name}
                </h3>

                {workout.exercises.length === 0 ? (
                  <p className="text-gray-500 italic px-3 sm:px-4 text-sm">No exercises in this workout</p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-gray-300 mb-4 text-xs sm:text-sm">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="border border-gray-300 px-4 py-2 text-left">#</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">Exercise</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">Category</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">Target Muscles</th>
                        <th className="border border-gray-300 px-4 py-2 text-center">Sets</th>
                        <th className="border border-gray-300 px-4 py-2 text-center">Reps</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">Notes</th>
                      </tr>
                    </thead>
                    <tbody>
                      {workout.exercises.map((exercise, exerciseIndex) => {
                        const exerciseData = exercises[exercise.exerciseId];
                        if (!exerciseData) return null;

                        return (
                          <tr key={exerciseIndex} className={exerciseIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                            <td className="border border-gray-300 px-4 py-2 text-center font-medium">
                              {exerciseIndex + 1}
                            </td>
                            <td className="border border-gray-300 px-4 py-2 font-medium">
                              {exerciseData.name}
                            </td>
                            <td className="border border-gray-300 px-4 py-2 capitalize">
                              {exerciseData.category}
                            </td>
                            <td className="border border-gray-300 px-4 py-2">
                              {exerciseData.muscles.map((m, i) => (
                                <span key={i}>
                                  <span className="capitalize">{m.muscle}</span>
                                  <span className="text-xs text-gray-500"> ({getImpactBadge(m.weight)})</span>
                                  {i < exerciseData.muscles.length - 1 && ', '}
                                </span>
                              ))}
                            </td>
                            <td className="border border-gray-300 px-4 py-2 text-center font-semibold">
                              {exercise.sets || 3}
                            </td>
                            <td className="border border-gray-300 px-4 py-2 text-center font-semibold">
                              {exercise.reps || 10}
                            </td>
                            <td className="border border-gray-300 px-4 py-2 text-sm">
                              {exercise.notes || '-'}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="mt-8 pt-4 border-t border-gray-200 text-center text-sm text-gray-500">
            <p>Generated from Workout Dashboard on {formatDate(Date.now())}</p>
          </div>
        </div>
      </div>

      <style>{`
        @media print {
          .print\\:hidden {
            display: none !important;
          }
          .page-break-inside-avoid {
            page-break-inside: avoid;
          }
        }
      `}</style>
    </div>
  );
}

export default ExportPlanModal;
