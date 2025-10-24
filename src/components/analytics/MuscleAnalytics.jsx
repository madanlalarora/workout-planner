import { useSelector } from 'react-redux';
import { allMuscles } from '../../data/initialExercises';

function MuscleAnalytics({ plan }) {
  const exercises = useSelector((state) => state.exercises.exercises);

  // Calculate muscle engagement totals across all workouts
  const calculateMuscleEngagement = () => {
    const muscleData = {};

    // Initialize all muscles
    allMuscles.forEach((muscle) => {
      muscleData[muscle] = { total: 0, count: 0 };
    });

    // Iterate through all workouts and exercises
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

  // Find max total for scaling
  const maxTotal = Math.max(
    ...Object.values(muscleEngagement).map((m) => m.total),
    1
  );

  // Sort muscles by total engagement
  const sortedMuscles = allMuscles
    .map((muscle) => ({
      name: muscle,
      ...muscleEngagement[muscle]
    }))
    .filter((m) => m.total > 0)
    .sort((a, b) => b.total - a.total);

  const getEngagementColor = (total) => {
    const percentage = (total / maxTotal) * 100;
    if (percentage >= 75) return 'bg-red-500';
    if (percentage >= 50) return 'bg-orange-500';
    if (percentage >= 25) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getEngagementLevel = (total) => {
    const percentage = (total / maxTotal) * 100;
    if (percentage >= 75) return 'Very High';
    if (percentage >= 50) return 'High';
    if (percentage >= 25) return 'Medium';
    return 'Low';
  };

  if (sortedMuscles.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-xl font-semibold mb-4">Muscle Engagement Analytics</h3>
        <p className="text-gray-500 text-center py-8">
          No exercises added yet. Add exercises to see muscle engagement.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 className="text-xl font-semibold mb-4">Muscle Engagement Analytics</h3>
      <p className="text-sm text-gray-600 mb-6">
        Total muscle engagement across all workouts in this plan
      </p>

      <div className="space-y-4">
        {sortedMuscles.map((muscle) => {
          const percentage = (muscle.total / maxTotal) * 100;
          return (
            <div key={muscle.name} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-medium text-gray-800 capitalize">
                  {muscle.name}
                </span>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-gray-600">
                    {muscle.count} {muscle.count === 1 ? 'exercise' : 'exercises'}
                  </span>
                  <span className="text-sm font-semibold text-gray-700">
                    Total: {muscle.total}
                  </span>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    getEngagementLevel(muscle.total) === 'Very High' ? 'bg-red-100 text-red-800' :
                    getEngagementLevel(muscle.total) === 'High' ? 'bg-orange-100 text-orange-800' :
                    getEngagementLevel(muscle.total) === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {getEngagementLevel(muscle.total)}
                  </span>
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                <div
                  className={`h-full ${getEngagementColor(muscle.total)} transition-all duration-300`}
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Summary Stats */}
      <div className="mt-6 pt-6 border-t border-gray-200 grid grid-cols-3 gap-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-600">
            {sortedMuscles.length}
          </div>
          <div className="text-sm text-gray-600">Muscles Targeted</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-green-600">
            {plan.workouts.reduce((sum, w) => sum + w.exercises.length, 0)}
          </div>
          <div className="text-sm text-gray-600">Total Exercises</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-purple-600">
            {Object.values(muscleEngagement).reduce((sum, m) => sum + m.total, 0)}
          </div>
          <div className="text-sm text-gray-600">Total Engagement</div>
        </div>
      </div>
    </div>
  );
}

export default MuscleAnalytics;
